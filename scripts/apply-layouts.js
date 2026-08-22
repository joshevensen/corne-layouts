'use strict';

// Reverse of scripts/render-layouts.js: reads layouts/*.md, parses the
// keymap grids and Settings table back into a .vil object, and writes the
// result to src/<name>.vil (then rebuilds dist/<name>.vil, same as
// scripts/build.js). Edit the Markdown, then run this instead of hand-
// editing the JSON in src/.
//
// Everything a layouts/*.md file doesn't show — uid, encoder_layout,
// macro, tap_dance, combo, key_override, alt_repeat_key, layout_options,
// vial_protocol, via_protocol — is carried over unchanged from the
// existing src/<name>.vil, since this only overwrites `layout` and
// `settings`. That also means a name with no existing src/<name>.vil has
// nothing to carry those fields over from, so it's an error rather than a
// guess.
//
// default.vil is off limits here, same as everywhere else in this repo
// (see .github/workflows/protect-default-layout.yml) — it's read-only.

const fs = require('fs');
const path = require('path');
const vil = require('./lib/vil-json');
const { parseLayerBlock } = require('./lib/layout-grid');

const SRC_DIR = path.join(__dirname, '..', 'src');
const DIST_DIR = path.join(__dirname, '..', 'dist');
const LAYOUTS_DIR = path.join(__dirname, '..', 'layouts');

const PROTECTED = new Set(['default']);

function splitSections(md) {
  const lines = md.split('\n');
  const sections = [];
  let current = null;
  for (const line of lines) {
    const m = /^## (.+)$/.exec(line);
    if (m) {
      current = { heading: m[1].trim(), lines: [] };
      sections.push(current);
    } else if (current) {
      current.lines.push(line);
    }
  }
  return sections;
}

function extractLayers(sections, base) {
  const layerSections = sections
    .map(s => ({ ...s, layerNum: /^Layer (\d+)$/.exec(s.heading) }))
    .filter(s => s.layerNum)
    .map(s => ({ n: Number(s.layerNum[1]), lines: s.lines }))
    .sort((a, b) => a.n - b.n);

  if (layerSections.length === 0) {
    throw new Error(`No "## Layer N" sections found in layouts/${base}.md.`);
  }
  layerSections.forEach((s, i) => {
    if (s.n !== i) {
      throw new Error(`Expected layer sections numbered 0..${layerSections.length - 1} with none missing, but found "## Layer ${s.n}" out of sequence.`);
    }
  });

  return layerSections.map(s => {
    const codeStart = s.lines.findIndex(l => l.trim() === '```');
    const codeEnd = s.lines.indexOf('```', codeStart + 1);
    if (codeStart === -1 || codeEnd === -1) {
      throw new Error(`Layer ${s.n} in layouts/${base}.md is missing its fenced \`\`\` code block.`);
    }
    try {
      return parseLayerBlock(s.lines.slice(codeStart + 1, codeEnd));
    } catch (err) {
      throw new Error(`Layer ${s.n} in layouts/${base}.md: ${err.message}`);
    }
  });
}

function extractSettings(sections, base, existingSettings) {
  const section = sections.find(s => s.heading === 'Settings');
  if (!section) {
    throw new Error(`No "## Settings" section found in layouts/${base}.md.`);
  }

  const rows = section.lines
    .map(l => l.trim())
    .filter(l => l.startsWith('|'))
    .map(l => l.split('|').map(c => c.trim()).filter((_, i, arr) => i > 0 && i < arr.length - 1))
    .filter(cols => cols.length >= 3 && /^\d+$/.test(cols[0]));

  const settings = {};
  for (const cols of rows) {
    const [id, , value] = cols;
    if (value === '' || Number.isNaN(Number(value))) {
      throw new Error(`Settings row ${id} in layouts/${base}.md has a non-numeric value: ${JSON.stringify(value)}.`);
    }
    settings[id] = Number(value);
  }

  const expectedIds = Object.keys(existingSettings || {});
  const missing = expectedIds.filter(id => !(id in settings));
  if (missing.length > 0) {
    throw new Error(`Settings section in layouts/${base}.md is missing row(s) for ID(s) ${missing.join(', ')} — every setting present in src/${base}.vil must stay in the table (even if you don't change its value).`);
  }

  return settings;
}

fs.mkdirSync(DIST_DIR, { recursive: true });

const files = fs.readdirSync(LAYOUTS_DIR).filter(f => f.endsWith('.md'));
if (files.length === 0) {
  console.error(`No .md files found in ${LAYOUTS_DIR}`);
  process.exit(1);
}

let hadError = false;

for (const file of files) {
  const base = path.basename(file, '.md');

  if (PROTECTED.has(base)) {
    console.log(`skipped layouts/${file} — ${base}.vil is read-only (see .github/workflows/protect-default-layout.yml)`);
    continue;
  }

  const srcPath = path.join(SRC_DIR, `${base}.vil`);
  if (!fs.existsSync(srcPath)) {
    console.error(`skipped layouts/${file} — no existing src/${base}.vil to carry uid/encoder/macro/etc. from. Create it first (e.g. copy an existing .vil) before applying this Markdown.`);
    hadError = true;
    continue;
  }

  try {
    const baseObj = vil.parse(fs.readFileSync(srcPath, 'utf8'));
    const md = fs.readFileSync(path.join(LAYOUTS_DIR, file), 'utf8');
    const sections = splitSections(md);

    const layout = extractLayers(sections, base);
    if (layout.length !== baseObj.layout.length) {
      throw new Error(`layouts/${base}.md has ${layout.length} layer(s) but src/${base}.vil has ${baseObj.layout.length} — layer count must match. If you meant to add/remove a layer, edit src/${base}.vil directly instead.`);
    }
    const settings = extractSettings(sections, base, baseObj.settings);

    const newObj = { ...baseObj, layout, settings };

    fs.writeFileSync(srcPath, vil.pretty(newObj));
    console.log(`applied layouts/${file} -> src/${base}.vil`);

    const distPath = path.join(DIST_DIR, `${base}.vil`);
    fs.writeFileSync(distPath, vil.compact(newObj) + '\n');
    console.log(`built ${path.relative(process.cwd(), distPath)}`);
  } catch (err) {
    console.error(`error applying layouts/${file}: ${err.message}`);
    hadError = true;
  }
}

if (hadError) process.exit(1);
