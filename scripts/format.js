'use strict';

// Re-aligns the .vil sources in src/ in place: parses each file and rewrites
// it in the pretty, column-aligned form. Run this after hand-editing a
// layout if row lengths changed enough to throw off alignment.

const fs = require('fs');
const path = require('path');
const vil = require('./lib/vil-json');

const SRC_DIR = path.join(__dirname, '..', 'src');

const files = fs.readdirSync(SRC_DIR).filter(f => f.endsWith('.vil'));
if (files.length === 0) {
  console.error(`No .vil files found in ${SRC_DIR}`);
  process.exit(1);
}

for (const file of files) {
  const srcPath = path.join(SRC_DIR, file);
  const obj = vil.parse(fs.readFileSync(srcPath, 'utf8'));
  fs.writeFileSync(srcPath, vil.pretty(obj));
  console.log(`formatted ${path.relative(process.cwd(), srcPath)}`);
}
