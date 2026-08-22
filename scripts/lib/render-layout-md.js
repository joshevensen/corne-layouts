'use strict';

// Renders a { layout, settings, combo, macro } object into the
// layouts/*.md text. Used by scripts/build.js (when first creating a new
// layout) and scripts/format.js (to re-render a layouts/*.md file from its
// own parsed content, fixing alignment without changing any value). See
// scripts/lib/layout-grid.js for the keymap grid format and
// scripts/lib/parse-layout-md.js for the reverse direction (including
// where the combo/macro on-disk format was confirmed from).

const { renderLayer } = require('./layout-grid');
const { SETTINGS } = require('./settings-catalog');

// Column-aligned like vil.pretty()'s matrix rows, so the table reads
// cleanly as plain text too, not just in a rendered Markdown viewer.
function renderTable(headers, rows) {
  const widths = headers.map((h, c) => Math.max(h.length, ...rows.map(r => r[c].length)));
  const line = cells => `| ${cells.map((c, i) => c.padEnd(widths[i])).join(' | ')} |`;
  const separator = `|${widths.map(w => '-'.repeat(w + 2)).join('|')}|`;
  return [line(headers), separator, ...rows.map(line)].join('\n');
}

// Combo/macro entries use full keycode strings (e.g. "KC_A", "LSFT(KC_9)",
// "TD(1)"), not the short labels the layer grids use — see the comment at
// the top of scripts/lib/parse-layout-md.js for why.

function renderComboSection(combos) {
  const rows = combos
    .filter(c => c.some(k => k !== 'KC_NO'))
    .map(c => [c.slice(0, 4).filter(k => k !== 'KC_NO').join(', '), c[4]]);

  return [
    '## Combos',
    'Two (or more) keys pressed together trigger a third action, with no timing penalty on either key by itself (unlike mod-tap) — see `docs/qmk-features.md` for good candidates (adjacent same-hand pairs you would not otherwise roll through, e.g. `Esc` on `Q`+`W`).',
    'List 1-4 trigger keycodes per row (comma-separated) and the output keycode they produce, using full keycode names — not the short labels in the layer grids above. Up to 32 combos total; leave the table with no data rows for none.',
    renderTable(['Trigger Keys', 'Output'], rows),
  ].join('\n\n');
}

function renderActionLine([tag, ...rest]) {
  if (tag === 'text') return `- text: ${JSON.stringify(rest[0])}`;
  if (tag === 'delay') return `- delay: ${rest[0]}`;
  return `- ${tag}: ${rest.join(', ')}`;
}

function renderMacroSection(macros) {
  const used = macros.map((actions, i) => ({ i, actions })).filter(({ actions }) => actions.length > 0);
  const body =
    used.length > 0
      ? used.map(({ i, actions }) => [`### Macro ${i}`, actions.map(renderActionLine).join('\n')].join('\n\n')).join('\n\n')
      : '_No macros are currently defined._';

  return [
    '## Macros',
    'A macro plays back a recorded sequence of keystrokes from a single key — good candidates: your email address, CLI invocations, git command prefixes, long import paths.',
    'One `### Macro N` subsection per macro you want (N is 0-15, matching the `M0`-`M15` keycode you\'d put on a key in a layer grid to trigger it). Each line is one action: `- text: "literal string"` types text as-is; `- tap: KC_A` / `- down: KC_A` / `- up: KC_A` take a comma-separated list of keycodes tapped/pressed/released together; `- delay: 100` waits that many milliseconds. Up to 16 macros total; omit a subsection for one you don\'t use.',
    body,
  ].join('\n\n');
}

function renderSettingsSection(settings) {
  const knownIds = new Set(SETTINGS.map(s => s.id));
  const rows = SETTINGS.map(s => {
    const value = settings[String(s.id)];
    return [String(s.id), s.name, value !== undefined ? String(value) : '', s.description];
  });

  for (const key of Object.keys(settings)) {
    if (!knownIds.has(Number(key))) {
      rows.push([key, 'Unidentified', String(settings[key]), "Not in this project's settings catalog — see scripts/lib/settings-catalog.js."]);
    }
  }

  return [
    '## Settings',
    "QMK Settings values from this file, in Vial's numeric QSID form. See `scripts/lib/settings-catalog.js` for where these names/descriptions come from and how confident they are (ID 8 is unidentified).",
    renderTable(['ID', 'Setting', 'Value', 'Description'], rows),
  ].join('\n\n');
}

function renderLayoutMarkdown(label, { layout, settings, combo, macro }) {
  const layerSections = layout.map((layer, i) => `## Layer ${i}\n\n\`\`\`\n${renderLayer(layer)}\n\`\`\``);

  return (
    [
      `# ${label}.vil — Visual Layout`,
      `Source of truth for \`dist/${label}.vil\` — edit the sections below, then run \`npm run build\` to produce it. Run \`npm run format\` first if you've hand-edited this file and columns have drifted out of alignment.`,
      ...layerSections,
      renderComboSection(combo || []),
      renderMacroSection(macro || []),
      renderSettingsSection(settings || {}),
    ].join('\n\n') + '\n'
  );
}

module.exports = { renderLayoutMarkdown };
