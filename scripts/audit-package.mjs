import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { assertNpmrc, assertSourceContent, assertSourceFilename } from './lib/source-policy.mjs';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const packageDir = join(root, 'packages/api');
const temporary = await mkdtemp(join(tmpdir(), 'pomelo-api-audit-'));
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const run = (command, args, cwd = root) => execFileSync(command, args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });

async function scan(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (['.git', 'node_modules', '.test-build', '.artifacts', 'dist'].includes(entry.name)) continue;
    assertSourceFilename(entry.name);
    const path = join(directory, entry.name);
    assert.ok(!entry.isSymbolicLink(), `Unexpected symbolic link: ${relative(root, path)}`);
    if (entry.isDirectory()) await scan(path);
    else {
      const bytes = await readFile(path);
      if (/^\.?npmrc(?:\..+)?$/i.test(entry.name)) assertNpmrc(bytes.toString('utf8'));
      // Inspect every text file, including extensionless files and dotfiles.
      if (bytes.includes(0)) continue;
      const text = bytes.toString('utf8');
      assertSourceContent(text, relative(root, path));
    }
  }
}

try {
  await scan(root);
  const workspace = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
  assert.equal(workspace.private, true, 'The workspace must remain private.');
  const manifest = JSON.parse(await readFile(join(packageDir, 'package.json'), 'utf8'));
  assert.equal(manifest.name, '@pomeloanalytics/api');
  assert.match(manifest.version, /^(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)-beta\.(?:0|[1-9]\d*)$/, 'Only beta prereleases may be packed for release.');
  assert.equal(manifest.private, undefined, 'The API release candidate must be publishable.');
  assert.equal(manifest.scripts?.prepublishOnly, undefined, 'The API release candidate must have no blocking publication hook.');
  assert.deepEqual(manifest.publishConfig, { registry: 'https://registry.npmjs.org/', access: 'public', tag: 'beta' });
  assert.deepEqual(manifest.files, ['dist', 'README.md', 'CHANGELOG.md', 'LICENSE']);
  assert.deepEqual(manifest.exports, { '.': { types: './dist/index.d.ts', import: './dist/index.js', default: './dist/index.js' } });
  assert.equal(Object.keys(manifest.dependencies ?? {}).length, 0, 'The API package must have no runtime dependencies.');
  const [dryRun] = JSON.parse(run(npm, ['pack', '--dry-run', '--ignore-scripts', '--json'], packageDir));
  assert.ok(dryRun.files.length > 4);
  for (const file of dryRun.files) {
    assert.ok(/^(?:package\.json|README\.md|CHANGELOG\.md|LICENSE|dist\/[a-zA-Z0-9/_-]+\.(?:js|d\.ts))$/.test(file.path), `Unexpected package file: ${file.path}`);
    const content = await readFile(join(packageDir, file.path), 'utf8');
    assertSourceContent(content, file.path);
  }
  const [packed] = JSON.parse(run(npm, ['pack', '--ignore-scripts', '--json', '--pack-destination', temporary], packageDir));
  const tarball = join(temporary, packed.filename);
  const archiveFiles = run('tar', ['-tzf', tarball]).trim().split('\n').sort();
  assert.deepEqual(archiveFiles, dryRun.files.map((file) => `package/${file.path}`).sort());
  await writeFile(join(temporary, 'package.json'), JSON.stringify({ name: 'pomelo-api-consumer-smoke', private: true, type: 'module' }));
  run(npm, ['install', '--ignore-scripts', '--no-audit', '--no-fund', tarball], temporary);
  await writeFile(join(temporary, 'consumer.ts'), [
    "import { createPomeloClient, PomeloClient, PomeloApiError, PomeloTransportError, type PomeloClientOptions } from '@pomeloanalytics/api';",
    "import { runMockExample } from './mock-consumer.js';",
    "const options: PomeloClientOptions = { token: 'synthetic-test-token' };",
    'if (!options.token || !PomeloApiError || !PomeloTransportError || !(createPomeloClient(options) instanceof PomeloClient)) throw new Error("Invalid package exports");',
    'await runMockExample();',
    '',
  ].join('\n'));
  await writeFile(join(temporary, 'mock-consumer.ts'), await readFile(join(root, 'examples/server/mock-consumer.ts'), 'utf8'));
  run(process.execPath, [join(root, 'node_modules/typescript/bin/tsc'), '--strict', '--target', 'ES2022', '--module', 'NodeNext', '--moduleResolution', 'NodeNext', '--outDir', 'compiled', 'consumer.ts', 'mock-consumer.ts'], temporary);
  run(process.execPath, ['compiled/consumer.js'], temporary);
  await writeFile(join(temporary, 'consumer.cjs'), [
    "const assert = require('node:assert/strict');",
    "const { createPomeloClient } = require('@pomeloanalytics/api');",
    'let calls = 0;',
    "const client = createPomeloClient({ token: 'synthetic-test-token', fetch: async () => { calls++; return Response.json({ items: [] }); } });",
    'client.sites.list().then(({ data }) => { assert.deepEqual(data, { items: [] }); assert.equal(calls, 1); }).catch(() => { process.exitCode = 1; });',
    '',
  ].join('\n'));
  run(process.execPath, ['consumer.cjs'], temporary);
  console.log(`Tarball audited: ${manifest.name}@${manifest.version}, ${dryRun.files.length} allowlisted files; fresh ESM and CommonJS consumers ran.`);
} finally {
  await rm(temporary, { recursive: true, force: true });
}
