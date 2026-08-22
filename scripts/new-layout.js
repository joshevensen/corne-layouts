'use strict';

// Creates a new, blank layouts/<name>.md — every real key set to KC_NO,
// using dist/default.vil's structure (layer count, and which slots are -1
// vs a real key) and its Settings values as the starting point, with no
// combos or macros defined. Run `npm run build` afterward to produce
// dist/<name>.vil.
//
// Usage: npm run new -- <name>   (the "--" is npm's own syntax for passing
// arguments through to the underlying script — see README.md). With no
// name given, defaults to "blank" (layouts/blank.md).

const fs = require('fs');
const path = require('path');
const vil = require('./lib/vil-json');
const { renderLayoutMarkdown } = require('./lib/render-layout-md');

const DIST_DIR = path.join(__dirname, '..', 'dist');
const LAYOUTS_DIR = path.join(__dirname, '..', 'layouts');
const DEFAULT_VIL = path.join(DIST_DIR, 'default.vil');

const rawName = process.argv[2] || 'blank';
const name = rawName.replace(/\.md$/i, '').trim();

if (!/^[a-z0-9][a-z0-9-]*$/i.test(name)) {
  console.error(`Invalid layout name "${rawName}" — use letters, digits, and hyphens only (no spaces, slashes, or extensions).`);
  process.exit(1);
}
if (name.toLowerCase() === 'default') {
  console.error(`"default" is reserved — default.vil is read-only and isn't part of this pipeline (see .github/workflows/protect-default-layout.yml). Pick a different name.`);
  process.exit(1);
}

const outPath = path.join(LAYOUTS_DIR, `${name}.md`);
if (fs.existsSync(outPath)) {
  console.error(`layouts/${name}.md already exists — pick a different name, or delete it first if you meant to start over.`);
  process.exit(1);
}

if (!fs.existsSync(DEFAULT_VIL)) {
  console.error(`${path.relative(process.cwd(), DEFAULT_VIL)} is missing — it supplies the layer count/structure and starting Settings values for a new layout.`);
  process.exit(1);
}
const skeleton = vil.parse(fs.readFileSync(DEFAULT_VIL, 'utf8'));

// Every real key goes to KC_NO; -1 (no physical key exists there) stays -1.
const layout = skeleton.layout.map(layer => layer.map(row => row.map(code => (code === -1 ? -1 : 'KC_NO'))));

fs.mkdirSync(LAYOUTS_DIR, { recursive: true });
fs.writeFileSync(outPath, renderLayoutMarkdown(name, { layout, settings: skeleton.settings, combo: [], macro: [] }));

console.log(`created layouts/${name}.md`);
console.log(`Run \`npm run build\` to produce dist/${name}.vil.`);
