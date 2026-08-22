'use strict';

// layouts/*.md (other than default.md) is this repo's source of truth for
// this keyboard's keymaps. This merges each one's layer grids + Settings
// table onto dist/default.vil's structure — the vendor's frozen, protected
// factory dump (see .github/workflows/protect-default-layout.yml) — which
// supplies every field a layouts/*.md doesn't show: uid, encoder_layout,
// macro, tap_dance, combo, key_override, alt_repeat_key, layout_options,
// version, vial_protocol, via_protocol. Those fields are identical across
// every layout on this board (confirmed by diffing all of them against
// each other), so there's nothing lost by not tracking them per-layout —
// and default.vil already has to exist and stay unchanged regardless.

const fs = require('fs');
const path = require('path');
const vil = require('./lib/vil-json');
const { parseLayoutMarkdown } = require('./lib/parse-layout-md');

const DIST_DIR = path.join(__dirname, '..', 'dist');
const LAYOUTS_DIR = path.join(__dirname, '..', 'layouts');
const DEFAULT_VIL = path.join(DIST_DIR, 'default.vil');

if (!fs.existsSync(DEFAULT_VIL)) {
  console.error(`${path.relative(process.cwd(), DEFAULT_VIL)} is missing — it's the read-only vendor baseline every layout is merged onto. Restore it before building.`);
  process.exit(1);
}
const skeleton = vil.parse(fs.readFileSync(DEFAULT_VIL, 'utf8'));
const expectedSettingIds = Object.keys(skeleton.settings);

const files = fs.readdirSync(LAYOUTS_DIR).filter(f => f.endsWith('.md') && f !== 'default.md');
if (files.length === 0) {
  console.error(`No .md files found in ${LAYOUTS_DIR} (besides default.md, which doesn't exist — default.vil is read-only and excluded from this pipeline).`);
  process.exit(1);
}

let hadError = false;

for (const file of files) {
  const base = path.basename(file, '.md');
  try {
    const md = fs.readFileSync(path.join(LAYOUTS_DIR, file), 'utf8');
    const { layout, settings } = parseLayoutMarkdown(md, base, expectedSettingIds);

    if (layout.length !== skeleton.layout.length) {
      throw new Error(`layouts/${file} has ${layout.length} layer(s) but the vendor baseline has ${skeleton.layout.length} — layer count must match.`);
    }

    const obj = { ...skeleton, layout, settings };
    const distPath = path.join(DIST_DIR, `${base}.vil`);
    fs.writeFileSync(distPath, vil.compact(obj) + '\n');
    console.log(`built ${path.relative(process.cwd(), distPath)}`);
  } catch (err) {
    console.error(`error building layouts/${file}: ${err.message}`);
    hadError = true;
  }
}

if (hadError) process.exit(1);
