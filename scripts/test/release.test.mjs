import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

// Execute the actual inline workflow with synthetic I/O. No npm or HTTP writes.
const workflow = await readFile(new URL('../../.github/workflows/release.yml', import.meta.url), 'utf8');
const steps = workflow.split('- name: Publish approved beta and verify registry with OIDC\n');
assert.equal(steps.length, 2, 'Expected exactly one release step');
const scripts = steps[1].split("node --input-type=module <<'NODE'\n");
assert.equal(scripts.length, 2, 'Expected exactly one inline release script');
const blocks = scripts[1].split('\n          NODE');
assert.equal(blocks.length, 2, 'Expected exactly one inline script terminator');
const block = blocks[0];
const code = block.replace(/^          /gm, '').replace(/^import .+;\n/gm, '');
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const run = new AsyncFunction('assert', 'execFileSync', 'createHash', 'writeFileSync', 'fetch', 'process', 'Date', 'AbortSignal', 'setTimeout', 'console', 'Buffer', code);
const version = '0.1.0-beta.3';
const previous = '0.1.0-beta.2';
const registry = 'https://registry.npmjs.org/';
const archive = Buffer.from('synthetic approved archive');
const metadata = {
  name: '@pomeloanalytics/api', version,
  dist: {
    tarball: `${registry}@pomeloanalytics/api/-/api-${version}.tgz`,
    integrity: `sha512-${createHash('sha512').update(archive).digest('base64')}`,
  },
};
const tags = { beta: previous, latest: previous };
const snapshot = (value = null, aliases = tags) => ({ metadata: value, tags: aliases });

async function scenario(snapshots, options = {}) {
  const calls = [], writes = [], receipts = [];
  let index = 0, now = 0;
  const fetch = async (url, init) => {
    calls.push(url);
    assert.ok(init.signal.timeout > 0 && init.signal.timeout <= 5000);
    let value;
    if (url.endsWith('/dist-tags')) {
      value = snapshots[Math.min(index, snapshots.length - 1)].tags;
      index++;
    } else if (url === `${registry}@pomeloanalytics%2fapi/${version}`) {
      value = snapshots[Math.min(index, snapshots.length - 1)].metadata;
    } else if (url === metadata.dist.tarball) {
      now += options.archiveTime ?? 0;
      return { ok: true, status: 200, arrayBuffer: async () => options.archive ?? archive };
    } else throw new Error(`Unexpected endpoint ${url}`);
    if (value === null) return { ok: false, status: 404, body: { cancel: async () => {} } };
    if (value instanceof Error) throw value;
    const status = value.status ?? 200;
    return {
      ok: status === 200, status,
      json: async () => {
        now += options.jsonTime ?? 0;
        if (value.invalidJson) throw new SyntaxError('Invalid JSON');
        return structuredClone(Object.hasOwn(value, 'json') ? value.json : value);
      },
    };
  };
  try {
    await run(assert, (_command, args) => writes.push(args), createHash,
      (path, value) => receipts.push({ path, value: JSON.parse(value) }), fetch,
      { env: {
        API_VERSION: version, SOURCE_SHA: 'f'.repeat(40),
        EXPECTED_SHA256: createHash('sha256').update(archive).digest('hex'),
        PROMOTE_LATEST: options.promote === false ? 'false' : 'true',
        EXPECTED_LATEST: options.expectedLatest ?? previous, RUNNER_TEMP: '/synthetic',
      } },
      { now: () => now }, { timeout: (timeout) => ({ timeout }) },
      (resolve, delay) => { now += delay; resolve(); }, { log() {} }, Buffer);
    return { calls, writes, receipts, now };
  } catch (error) {
    return { calls, writes, receipts, now, error };
  }
}

const published = snapshot(metadata, { beta: version, latest: previous });
const promoted = snapshot(metadata, { beta: version, latest: version });

test('release waits for version and aliases independently, without replaying writes', async () => {
  const result = await scenario([snapshot(), snapshot(), published, published, published, promoted]);
  assert.ifError(result.error);
  assert.deepEqual(result.writes.map((args) => args.slice(0, 2)), [
    ['publish', `./candidate/pomeloanalytics-api-${version}.tgz`], ['dist-tag', 'add'],
  ]);
  assert.deepEqual(result.receipts[0].value.after, promoted.tags);
  assert.ok(result.calls.every((url) => url !== `${registry}@pomeloanalytics%2fapi`));
});

test('existing verified version and aliases require no publication or tag write', async () => {
  const result = await scenario([promoted]);
  assert.ifError(result.error);
  assert.equal(result.writes.length, 0);
  assert.equal(result.receipts[0].value.alreadyPublished, true);
});

test('default beta-only publication preserves previous latest', async () => {
  const result = await scenario([snapshot(), published], { promote: false });
  assert.ifError(result.error);
  assert.equal(result.writes.length, 1);
  assert.equal(result.receipts[0].value.after.latest, previous);
});

test('expired publication readback retains one write and bounds paired snapshots', async () => {
  const result = await scenario([snapshot()]);
  assert.match(String(result.error), /pending after acknowledged write/);
  assert.equal(result.writes.length, 1);
  assert.equal(result.calls.length, 22); // Initial pair + 10 shared pairs.
  assert.equal(result.receipts.length, 0);
});

test('latest readback uses the remaining shared budget and never repeats its write', async () => {
  const result = await scenario([snapshot(), published]);
  assert.match(String(result.error), /pending after acknowledged write/);
  assert.equal(result.writes.length, 2);
  assert.equal(result.calls.filter((url) => !url.endsWith('.tgz')).length, 22);
  assert.equal(result.receipts.length, 0);
});

for (const alias of ['beta', 'latest']) {
  test(`version 404 with ${alias} already selecting candidate stops before publish`, async () => {
    const result = await scenario([snapshot(null, { ...tags, [alias]: version })]);
    assert.match(String(result.error), /metadata missing while tags select candidate/);
    assert.equal(result.writes.length, 0);
  });
  test(`unrelated ${alias} drift before promotion stops the operation`, async () => {
    const result = await scenario([snapshot(), published, snapshot(metadata, { ...published.tags, [alias]: 'unrelated' })]);
    assert.match(String(result.error), /Unexpected beta tag|Latest changed before promotion/);
    assert.equal(result.writes.length, 1);
  });
}

for (const field of ['metadata', 'tags']) {
  for (const failure of [{ status: 403 }, { status: 500 }, { invalidJson: true }, new Error('Transport aborted')]) {
    test(`${field} ${failure.status ?? failure.message ?? 'invalid JSON'} is not absence`, async () => {
      const result = await scenario([{ ...snapshot(), [field]: failure }]);
      assert.ok(result.error);
      assert.equal(result.writes.length, 0);
    });
  }
}

test('dist-tags 404 is not permission to publish', async () => {
  const result = await scenario([snapshot(null, { status: 404 })]);
  assert.match(String(result.error), /Registry read failed: 404/);
  assert.equal(result.writes.length, 0);
});

test('different existing archive blocks both writes', async () => {
  const result = await scenario([published], { archive: Buffer.from('wrong bytes') });
  assert.match(String(result.error), /Registry archive mismatch/);
  assert.equal(result.writes.length, 0);
});

test('wrong integrity and cross-origin archive are rejected', async () => {
  for (const dist of [{ ...metadata.dist, integrity: 'sha512-wrong' }, { ...metadata.dist, tarball: 'https://other.test/file.tgz' }]) {
    const result = await scenario([snapshot({ ...metadata, dist }, published.tags)]);
    assert.ok(result.error);
    assert.equal(result.writes.length, 0);
  }
});

test('archive body completing after the deadline cannot promote or succeed', async () => {
  const result = await scenario([snapshot(), published], { archiveTime: 30001 });
  assert.ok(result.error);
  assert.equal(result.writes.length, 1);
  assert.equal(result.receipts.length, 0);
});

test('slow JSON body consumes the shared deadline, without a fresh timeout', async () => {
  const result = await scenario([snapshot(), published], { jsonTime: 16000 });
  assert.ok(result.error);
  assert.equal(result.writes.length, 1);
  assert.equal(result.receipts.length, 0);
});

test('unapproved latest change and malformed metadata stop before writes', async () => {
  for (const initial of [snapshot(null, { ...tags, latest: 'unrelated' }), snapshot({ json: [] }), snapshot({ json: null })]) {
    const result = await scenario([initial]);
    assert.ok(result.error);
    assert.equal(result.writes.length, 0);
  }
});

for (const alias of ['beta', 'latest']) {
  test(`malformed ${alias} never permits publication`, async () => {
    for (const value of [42, '', ' ', null, []]) {
      const result = await scenario([snapshot(null, { ...tags, [alias]: value })]);
      assert.match(String(result.error), /Invalid registry alias/);
      assert.equal(result.writes.length, 0);
    }
  });
}
