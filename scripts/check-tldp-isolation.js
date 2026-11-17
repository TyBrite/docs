#!/usr/bin/env node
// Verifies that the TLDP product under tldp/ stays out of the Galactic Core pipelines:
//   1. sync.js copies nothing from tldp/ and nothing it copies contains TLDP SDK pages;
//   2. no TLDP page or SDK file sits in a Galactic Core path (sdk/, sdk-source/, workflows/, root pages);
//   3. docs.json keeps the two products' pages apart;
//   4. (sibling Galactic-Core checkout) the docs drift audit skips tldp/.
// Usage: node scripts/check-tldp-isolation.js [--root <dir>] [--repo-only]
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const rootArg = args.indexOf('--root');
const ROOT = path.resolve(rootArg >= 0 ? args[rootArg + 1] : path.join(__dirname, '..'));
const REPO_ONLY = args.includes('--repo-only');
const failures = [];
const fail = (m) => failures.push(m);

const isTldpPath = (rel) => rel.split(/[\\/]/)[0] === 'tldp';
// Markers that only TLDP content carries.
const TLDP_MARKERS = [/@tybrite-labs\/tldp-sdk/i, /api\.tybritelabs\.com\/logistics/i, /\bTldpClient\b/];

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  const st = fs.statSync(dir);
  if (!st.isDirectory()) { out.push(dir); return out; }
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name === '.git') continue;
    walk(path.join(dir, e.name), out);
  }
  return out;
}
const hasMarker = (file) => {
  if (!/\.(mdx?|ts|js|json|ya?ml|txt)$/.test(file)) return null;
  const text = fs.readFileSync(file, 'utf8');
  return TLDP_MARKERS.find((m) => m.test(text)) || null;
};

// 1. Every item sync.js copies.
const syncSrc = fs.readFileSync(path.join(ROOT, 'sync.js'), 'utf8');
const items = [...syncSrc.matchAll(/src:\s*'([^']+)'/g)].map((m) => m[1]);
if (!items.length) fail('sync.js: no syncItems found (the guard cannot read the file)');
const synced = [];
for (const src of items) {
  const norm = path.normalize(src);
  if (isTldpPath(norm) || norm.split(path.sep).includes('tldp')) fail(`sync.js copies ${src}, which is under tldp/`);
  for (const f of walk(path.join(ROOT, src))) synced.push(f);
}
for (const f of synced) {
  const rel = path.relative(ROOT, f);
  if (isTldpPath(rel)) fail(`sync.js would copy ${rel}`);
  const m = hasMarker(f);
  if (m) fail(`TLDP content (${m}) in a path sync.js copies to the Anvil mirror: ${rel}`);
}

// 2. Galactic Core paths hold no TLDP content (the machine-consumed SDK reference and everything the counts read).
for (const dir of ['sdk', 'sdk-source', 'workflows', 'api-reference']) {
  for (const f of walk(path.join(ROOT, dir))) {
    const m = hasMarker(f);
    if (m) fail(`TLDP content (${m}) under ${path.relative(ROOT, f)}`);
  }
}
for (const f of ['openapi.yaml', 'README.md', 'index.mdx']) {
  const p = path.join(ROOT, f);
  if (fs.existsSync(p) && hasMarker(p)) fail(`TLDP content in ${f}, which the API counts read`);
}
if (fs.existsSync(path.join(ROOT, 'sdk-source'))) {
  const services = path.join(ROOT, 'sdk-source/services');
  if (fs.existsSync(services)) {
    for (const f of fs.readdirSync(services)) {
      if (/^(Rates|Shipments|ProofOfDelivery)Service\.ts$/.test(f)) fail(`sdk-source/services/${f} looks like the TLDP SDK`);
    }
  }
}

// 3. docs.json keeps the products apart.
const docs = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs.json'), 'utf8'));
const pagesOf = (n, out = []) => {
  if (typeof n === 'string') out.push(n);
  else if (Array.isArray(n)) n.forEach((x) => pagesOf(x, out));
  else if (n && typeof n === 'object') { for (const k of ['pages', 'groups', 'tabs']) if (n[k]) pagesOf(n[k], out); }
  return out;
};
const products = docs.navigation && docs.navigation.products;
if (!Array.isArray(products) || products.length < 2) fail('docs.json: navigation.products must hold the Galactic Core and TLDP products');
else {
  for (const p of products) {
    const tldp = p.product === 'TLDP';
    for (const page of pagesOf(p)) {
      if (tldp && !page.startsWith('tldp/')) fail(`docs.json: TLDP product lists ${page}, outside tldp/`);
      if (!tldp && page.startsWith('tldp/')) fail(`docs.json: ${p.product} product lists ${page}`);
    }
  }
}

// 4. The docs drift audit (Galactic-Core checkout beside this repo) must skip tldp/.
if (!REPO_ONLY) {
  const audit = path.resolve(ROOT, '..', 'Galactic-Core/cloudflare-workers/scripts/openapi-audit/audit-docs-drift.mjs');
  if (fs.existsSync(audit)) {
    const src = fs.readFileSync(audit, 'utf8');
    const skip = src.match(/skipDirs\s*=\s*new Set\(\[([^\]]*)\]/);
    if (!skip || !/['"]tldp['"]/.test(skip[1])) fail('Galactic-Core audit-docs-drift.mjs does not skip tldp/ (its page walk would check TLDP examples against the Galactic Core SDK)');
  }
}

if (failures.length) {
  console.error('TLDP isolation check FAILED:');
  for (const f of failures) console.error('  - ' + f);
  process.exit(1);
}
console.log(`TLDP isolation check passed (${items.length} sync items, ${synced.length} synced files).`);
