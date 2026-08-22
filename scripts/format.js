'use strict';

// Re-renders each layouts/*.md file (other than default.md) from its own
// content: parse it, then render it straight back out. Fixes column
// alignment after a hand edit (e.g. a longer key label, a changed setting
// value) without changing any key or setting value. Doesn't touch dist/ —
// run `npm run build` afterward to regenerate the .vil files.

const fs = require('fs');
const path = require('path');
const { parseLayoutMarkdown } = require('./lib/parse-layout-md');
const { renderLayoutMarkdown } = require('./lib/render-layout-md');

const LAYOUTS_DIR = path.join(__dirname, '..', 'layouts');

const files = fs.readdirSync(LAYOUTS_DIR).filter(f => f.endsWith('.md') && f !== 'default.md');
if (files.length === 0) {
  console.error(`No .md files found in ${LAYOUTS_DIR} (besides default.md, which doesn't exist — default.vil is read-only and excluded from this pipeline).`);
  process.exit(1);
}

let hadError = false;

for (const file of files) {
  const base = path.basename(file, '.md');
  const mdPath = path.join(LAYOUTS_DIR, file);
  try {
    const md = fs.readFileSync(mdPath, 'utf8');
    const parsed = parseLayoutMarkdown(md, base, null);
    fs.writeFileSync(mdPath, renderLayoutMarkdown(base, parsed));
    console.log(`formatted layouts/${file}`);
  } catch (err) {
    console.error(`error formatting layouts/${file}: ${err.message}`);
    hadError = true;
  }
}

if (hadError) process.exit(1);
