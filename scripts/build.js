'use strict';

// Compiles the human-readable .vil sources in src/ down to the compact,
// single-line JSON Vial/QMK expects, into dist/.

const fs = require('fs');
const path = require('path');
const vil = require('./lib/vil-json');

const SRC_DIR = path.join(__dirname, '..', 'src');
const DIST_DIR = path.join(__dirname, '..', 'dist');

fs.mkdirSync(DIST_DIR, { recursive: true });

const files = fs.readdirSync(SRC_DIR).filter(f => f.endsWith('.vil'));
if (files.length === 0) {
  console.error(`No .vil files found in ${SRC_DIR}`);
  process.exit(1);
}

for (const file of files) {
  const srcPath = path.join(SRC_DIR, file);
  const distPath = path.join(DIST_DIR, file);
  const obj = vil.parse(fs.readFileSync(srcPath, 'utf8'));
  fs.writeFileSync(distPath, vil.compact(obj) + '\n');
  console.log(`built ${path.relative(process.cwd(), distPath)}`);
}
