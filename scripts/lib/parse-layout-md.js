'use strict';

// Parses a layouts/*.md file's own text back into { layout, settings,
// combo, macro } — used by both scripts/build.js (to produce a dist/*.vil)
// and scripts/format.js (to re-render the same file with fixed alignment).
// See scripts/lib/layout-grid.js for the keymap grid format.
//
// Combo and macro entries use full keycode strings (e.g. "KC_A",
// "LSFT(KC_9)", "TD(1)") rather than the short labels the layer grids use —
// confirmed against a real populated .vil (FelixSchausberger/
// corne-colemak-dh-eurkey's corne_v4-1_custom_hrmods.vil) that combos can
// reference things the short-label table doesn't cover (tap dance keys),
// and that's also just what's already in the "layout" arrays, so there's
// one keycode syntax across the whole file instead of two.

const { parseLayerBlock } = require('./layout-grid');

// This board's firmware has 32 combo slots and 16 macro slots — confirmed
// structurally identical (same array lengths) across every .vil in this
// repo, so these are hardcoded rather than threaded through as arguments.
const COMBO_SLOTS = 32;
const MACRO_SLOTS = 16;
const COMBO_ENTRY_LENGTH = 5; // 4 trigger keys + 1 output, KC_NO-padded

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

// A GFM table rendered by scripts/lib/render-layout-md.js's renderTable():
// header row, separator row, then data rows, always in that order. Returns
// just the data rows, each split into trimmed cell strings.
function parseMarkdownTable(lines) {
  const pipeLines = lines.map(l => l.trim()).filter(l => l.startsWith('|'));
  if (pipeLines.length === 0) return [];
  return pipeLines.slice(2).map(l => l.split('|').map(c => c.trim()).filter((_, i, arr) => i > 0 && i < arr.length - 1));
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

  const settings = {};
  for (const [id, , value] of parseMarkdownTable(section.lines)) {
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

// Returns a full COMBO_SLOTS-length array of 5-element [trig1-4, output]
// entries — rows the user didn't list are filled with all-KC_NO.
function extractCombos(sections, label) {
  const section = sections.find(s => s.heading === 'Combos');
  if (!section) {
    throw new Error(`No "## Combos" section found in layouts/${label}.md.`);
  }

  const rows = parseMarkdownTable(section.lines).filter(cols => cols.length >= 2 && cols.some(c => c !== ''));
  if (rows.length > COMBO_SLOTS) {
    throw new Error(`layouts/${label}.md defines ${rows.length} combos but this board only has ${COMBO_SLOTS} combo slots.`);
  }

  const combos = rows.map(([triggerCell, outputCell], i) => {
    const triggers = triggerCell.split(',').map(t => t.trim()).filter(t => t !== '');
    if (triggers.length < 1 || triggers.length > 4) {
      throw new Error(`Combo row ${i + 1} in layouts/${label}.md has ${triggers.length} trigger keycode(s) — combos need 1 to 4, comma-separated.`);
    }
    if (!outputCell) {
      throw new Error(`Combo row ${i + 1} in layouts/${label}.md has no output keycode.`);
    }
    return [...triggers, ...Array(4 - triggers.length).fill('KC_NO'), outputCell];
  });

  const padding = Array.from({ length: COMBO_SLOTS - combos.length }, () => Array(COMBO_ENTRY_LENGTH).fill('KC_NO'));
  return [...combos, ...padding];
}

// Returns a full MACRO_SLOTS-length array of action lists (empty array for
// an unused macro slot, matching the .vil format's own "no macro" shape).
function extractMacros(sections, label) {
  const section = sections.find(s => s.heading === 'Macros');
  if (!section) {
    throw new Error(`No "## Macros" section found in layouts/${label}.md.`);
  }

  const subs = [];
  let current = null;
  for (const line of section.lines) {
    const m = /^### Macro (\d+)$/.exec(line.trim());
    if (m) {
      current = { n: Number(m[1]), lines: [] };
      subs.push(current);
    } else if (current) {
      current.lines.push(line);
    }
  }

  subs.forEach((s, i) => {
    if (s.n < 0 || s.n >= MACRO_SLOTS) {
      throw new Error(`"### Macro ${s.n}" in layouts/${label}.md is out of range — valid macro numbers are 0-${MACRO_SLOTS - 1}.`);
    }
    if (i > 0 && s.n <= subs[i - 1].n) {
      throw new Error(`Macro sections in layouts/${label}.md must be in ascending order — "### Macro ${s.n}" appears after "### Macro ${subs[i - 1].n}".`);
    }
  });

  const macros = Array.from({ length: MACRO_SLOTS }, () => []);
  for (const s of subs) {
    const actions = [];
    for (const raw of s.lines) {
      const line = raw.trim();
      if (line === '') continue;
      const m = /^-\s*(text|tap|down|up|delay):\s*(.+)$/.exec(line);
      if (!m) {
        throw new Error(
          `Unrecognized line in "### Macro ${s.n}" in layouts/${label}.md: ${JSON.stringify(raw)}. Expected "- text: \\"...\\"", "- tap: KC_A", "- down: KC_A", "- up: KC_A", or "- delay: 100".`
        );
      }
      const [, tag, payload] = m;
      if (tag === 'text') {
        let text;
        try {
          text = JSON.parse(payload);
        } catch {
          text = undefined;
        }
        if (typeof text !== 'string') {
          throw new Error(`"### Macro ${s.n}" text action in layouts/${label}.md must be a double-quoted string, e.g. \`- text: "hello"\` — got ${JSON.stringify(payload)}.`);
        }
        actions.push(['text', text]);
      } else if (tag === 'delay') {
        const ms = Number(payload.trim());
        if (Number.isNaN(ms)) {
          throw new Error(`"### Macro ${s.n}" delay action in layouts/${label}.md must be a number of milliseconds — got ${JSON.stringify(payload)}.`);
        }
        actions.push(['delay', ms]);
      } else {
        const keys = payload.split(',').map(k => k.trim()).filter(k => k !== '');
        if (keys.length === 0) {
          throw new Error(`"### Macro ${s.n}" ${tag} action in layouts/${label}.md needs at least one keycode.`);
        }
        actions.push([tag, ...keys]);
      }
    }
    macros[s.n] = actions;
  }

  return macros;
}

function parseLayoutMarkdown(md, label, expectedSettingIds) {
  const sections = splitSections(md);
  return {
    layout: extractLayers(sections, label),
    settings: extractSettings(sections, label, expectedSettingIds),
    combo: extractCombos(sections, label),
    macro: extractMacros(sections, label),
  };
}

module.exports = { parseLayoutMarkdown };
