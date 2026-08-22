'use strict';

// Renders a { layout, settings } pair into the layouts/*.md text — the
// keymap grids plus a "## Settings" table. Used by scripts/build.js (when
// first creating a new layout — see its comment) and scripts/format.js (to
// re-render a layouts/*.md file from its own parsed content, fixing
// alignment without changing any value). See scripts/lib/layout-grid.js
// for the grid format and scripts/lib/parse-layout-md.js for the reverse
// direction.

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

function renderLayoutMarkdown(label, { layout, settings }) {
  const layerSections = layout.map((layer, i) => `## Layer ${i}\n\n\`\`\`\n${renderLayer(layer)}\n\`\`\``);

  return (
    [
      `# ${label}.vil — Visual Layout`,
      `Source of truth for \`dist/${label}.vil\` — edit the grids and the Settings table below, then run \`npm run build\` to produce it. Run \`npm run format\` first if you've hand-edited this file and the columns have drifted out of alignment.`,
      ...layerSections,
      renderSettingsSection(settings || {}),
    ].join('\n\n') + '\n'
  );
}

module.exports = { renderLayoutMarkdown };
