import assert from 'node:assert/strict';

const forbidden = [
  /@analytics\/shared/,
  /(?:"|')file:/,
  /docs\/internal/,
  /packages\/services/,
  new RegExp(['sk', 'analytics'].join('-')),
  /\bisPunchout\b/,
  /\bgetMarketplaceStats\b/,
  /AKIA[A-Z0-9]{16}/,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /gh[pousr]_[A-Za-z0-9]{30,}/,
  /github_pat_[A-Za-z0-9_]{30,}/,
  /https?:\/\/[^\s/]+:[^\s@]+@/,
  /^\s*(?:export\s+)?(?:[A-Z0-9_]*TOKEN|AWS_SECRET_ACCESS_KEY|AWS_SESSION_TOKEN)\s*=\s*\S+/m,
  /^\s*(?:\/\/[^\s]+:)?(?:_authToken|_auth|_password|password|username|always-auth)\s*=/im,
];

export function assertSourceContent(text, path) {
  for (const pattern of forbidden) assert.ok(!pattern.test(text), `Disallowed content in ${path}`);
}

/** Sensitive source filenames are refused even when their current contents are empty. */
export function assertSourceFilename(name) {
  const environment = name === '.env' || name.startsWith('.env.');
  assert.ok(!environment || ['.env.example', '.env.template'].includes(name), 'Real environment files are not allowed in the public source.');
  assert.ok(!/\.(?:pem|key)$/i.test(name), 'Key files are not allowed in the public source.');
  assert.ok(!['credentials', '.credentials', '.netrc', '_netrc'].includes(name.toLowerCase()), 'Credential files are not allowed in the public source.');
}

/** Repository npm configuration is intentionally restricted to two non-secret settings. */
export function assertNpmrc(text) {
  const entries = text.split(/\r?\n/).map((line) => line.trim()).filter((line) => line && !line.startsWith('#') && !line.startsWith(';'));
  assert.deepEqual(entries.sort(), ['ignore-scripts=true', 'save-exact=true'], 'Repository .npmrc may contain only save-exact=true and ignore-scripts=true.');
}
