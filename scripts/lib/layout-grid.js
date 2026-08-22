'use strict';

// Shared grid layout/parsing logic for the ASCII keymap diagrams in
// layouts/*.md. scripts/render-layouts.js (src/*.vil -> layouts/*.md) and
// scripts/apply-layouts.js (layouts/*.md -> src/*.vil) both import this
// module so the two directions can never drift out of sync with each
// other — every width/offset used to parse a line is the exact same
// constant used to print it.
//
// Physical column order is read straight from the array itself (see
// scripts/lib/vil-json.js and the -1 sentinel for "no physical key here"),
// not inferred from any design doc. Per half, the array's column index runs
// from that half's outer edge to the center gap (confirmed against
// dist/default.vil), so the left half prints/parses in array order and the
// right half prints/parses reversed.
//
// Each printed line gets a single row label, R3 (top) down to R0 (thumbs),
// merging that layer's left-half array row with its right-half array row
// (layout[layer] stores left as rows 0-3 and right as rows 4-7).

const { label, parseLabel } = require('./keycode-labels');

const CELL_WIDTH = 5;
const CELL_TOTAL_WIDTH = CELL_WIDTH + 2; // "[" + text + "]"
const HALF_GAP = '   │   ';
const BLANK_CELL = ' '.repeat(CELL_TOTAL_WIDTH);
const ROW_LABEL_WIDTH = 2; // "R3"
const COLS = [0, 1, 2, 3, 4, 5, 6];
const HALF_BLOCK_WIDTH = COLS.length * CELL_TOTAL_WIDTH + (COLS.length - 1); // 7 cells + 6 joining spaces

// left-half array row index, right-half array row index, per printed line
const ROW_SPECS = [
  { rowLabel: 'R3', leftRow: 0, rightRow: 4 },
  { rowLabel: 'R2', leftRow: 1, rightRow: 5 },
  { rowLabel: 'R1', leftRow: 2, rightRow: 6 },
  { rowLabel: 'R0', leftRow: 3, rightRow: 7 },
];

function centered(text, width) {
  const padding = Math.max(0, width - text.length);
  const left = Math.floor(padding / 2);
  const right = padding - left;
  return `${' '.repeat(left)}${text}${' '.repeat(right)}`;
}

// -1 means no physical key exists there at all (e.g. the columns a thumb
// row doesn't use), so it renders as blank space rather than a bracketed
// cell — that keeps every row the same width per half, which is what lines
// the "│" gap up across rows and gives the thumb cluster its floating look.
function cell(code) {
  if (code === -1) return BLANK_CELL;
  return `[${centered(label(code), CELL_WIDTH)}]`;
}

// Unbracketed, same total width as cell() so it lines up with the row above.
function colHeaderCell(n) {
  return centered(String(n), CELL_TOTAL_WIDTH);
}

function renderRow(rowLabelText, leftRow, rightRow) {
  const left = leftRow.map(cell).join(' ');
  const right = [...rightRow].reverse().map(cell).join(' ');
  return `${rowLabelText.padEnd(ROW_LABEL_WIDTH)} ${left}${HALF_GAP}${right}`;
}

function renderColHeader() {
  const left = COLS.map(colHeaderCell).join(' ');
  const right = [...COLS].reverse().map(colHeaderCell).join(' ');
  return `${' '.repeat(ROW_LABEL_WIDTH)} ${left}${HALF_GAP}${right}`;
}

function renderLayer(layer) {
  const lines = [renderColHeader()];
  for (const [i, spec] of ROW_SPECS.entries()) {
    if (i === ROW_SPECS.length - 1) lines.push('');
    lines.push(renderRow(spec.rowLabel, layer[spec.leftRow], layer[spec.rightRow]));
  }
  return lines.join('\n');
}

// --- Parsing direction: a rendered code block -> a layer array ---

function parseCellToken(raw, side) {
  if (raw === BLANK_CELL) return -1;
  const m = /^\[(.*)\]$/.exec(raw);
  if (!m) throw new Error(`Malformed key cell ${JSON.stringify(raw)} (expected "[...]" or blank space)`);
  return parseLabel(m[1].trim(), side);
}

// line: one rendered row line (as produced by renderRow). Returns
// { leftCells: [7 codes], rightCells: [7 codes, in natural col0..6 order] }.
function parseRowLine(line) {
  const prefixLen = ROW_LABEL_WIDTH + 1;
  const rowLabel = line.slice(0, ROW_LABEL_WIDTH).trim();

  const leftBlock = line.slice(prefixLen, prefixLen + HALF_BLOCK_WIDTH);
  const gapStart = prefixLen + HALF_BLOCK_WIDTH;
  const gap = line.slice(gapStart, gapStart + HALF_GAP.length);
  if (gap !== HALF_GAP) {
    throw new Error(`Expected the "${HALF_GAP.trim()}" center gap after column 6 on row ${rowLabel}, found ${JSON.stringify(gap)} instead — check the row wasn't reflowed or re-spaced by hand.`);
  }
  const rightStart = gapStart + HALF_GAP.length;
  const rightBlock = line.slice(rightStart, rightStart + HALF_BLOCK_WIDTH);

  const splitBlock = block => COLS.map(i => block.substr(i * (CELL_TOTAL_WIDTH + 1), CELL_TOTAL_WIDTH));

  const leftCells = splitBlock(leftBlock).map(raw => parseCellToken(raw, 'left'));
  const rightCells = splitBlock(rightBlock)
    .map(raw => parseCellToken(raw, 'right'))
    .reverse();

  return { rowLabel, leftCells, rightCells };
}

// codeLines: the lines inside one layer's fenced code block (as written by
// renderLayer — column header, R3, R2, R1, blank, R0). Returns a full
// 8-row layer array in the source .vil's own row order.
function parseLayerBlock(codeLines) {
  const rowLines = codeLines.filter(l => /^(R3|R2|R1|R0)\b/.test(l));
  if (rowLines.length !== ROW_SPECS.length) {
    throw new Error(`Expected ${ROW_SPECS.length} rows (R3, R2, R1, R0) in this layer block, found ${rowLines.length}.`);
  }

  const layer = new Array(8);
  for (const [i, spec] of ROW_SPECS.entries()) {
    const { rowLabel, leftCells, rightCells } = parseRowLine(rowLines[i]);
    if (rowLabel !== spec.rowLabel) {
      throw new Error(`Expected row ${i + 1} in this layer block to be "${spec.rowLabel}", found "${rowLabel}" — rows must stay in order R3, R2, R1, R0.`);
    }
    layer[spec.leftRow] = leftCells;
    layer[spec.rightRow] = rightCells;
  }
  return layer;
}

module.exports = {
  CELL_TOTAL_WIDTH,
  ROW_LABEL_WIDTH,
  HALF_GAP,
  renderLayer,
  parseLayerBlock,
};
