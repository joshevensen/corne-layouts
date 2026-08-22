'use strict';

// Parses a layouts/*.md file's own text back into { layout, settings } —
// used by both scripts/build.js (to produce a dist/*.vil) and
// scripts/format.js (to re-render the same file with fixed alignment).
// See scripts/lib/layout-grid.js for the keymap grid format.

const { parseLayerBlock } = require('./layout-grid');

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

function extractLayers(sections, label) {
  const layerSections = sections
    .map(s => ({ ...s, layerNum: /^Layer (\d+)$/.exec(s.heading) }))
    .filter(s => s.layerNum)
    .map(s => ({ n: Number(s.layerNum[1]), lines: s.lines }))
    .sort((a, b) => a.n - b.n);

  if (layerSections.length === 0) {
    throw new Error(`No "## Layer N" sections found in layouts/${label}.md.`);
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
      throw new Error(`Layer ${s.n} in layouts/${label}.md is missing its fenced \`\`\` code block.`);
    }
    try {
      return parseLayerBlock(s.lines.slice(codeStart + 1, codeEnd));
    } catch (err) {
      throw new Error(`Layer ${s.n} in layouts/${label}.md: ${err.message}`);
    }
  });
}

// expectedIds: setting IDs (as strings) that must be present, or null to
// skip that check (scripts/format.js doesn't have an external source of
// truth to check against — scripts/build.js does, and passes it in).
function extractSettings(sections, label, expectedIds) {
  const section = sections.find(s => s.heading === 'Settings');
  if (!section) {
    throw new Error(`No "## Settings" section found in layouts/${label}.md.`);
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
      throw new Error(`Settings row ${id} in layouts/${label}.md has a non-numeric value: ${JSON.stringify(value)}.`);
    }
    settings[id] = Number(value);
  }

  if (expectedIds) {
    const missing = expectedIds.filter(id => !(id in settings));
    if (missing.length > 0) {
      throw new Error(`Settings section in layouts/${label}.md is missing row(s) for ID(s) ${missing.join(', ')} — every setting must stay in the table (even if you don't change its value).`);
    }
  }

  return settings;
}

function parseLayoutMarkdown(md, label, expectedSettingIds) {
  const sections = splitSections(md);
  return {
    layout: extractLayers(sections, label),
    settings: extractSettings(sections, label, expectedSettingIds),
  };
}

module.exports = { parseLayoutMarkdown };
