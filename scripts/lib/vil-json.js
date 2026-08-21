'use strict';

// Vial's .vil files are plain JSON. This module reformats them two ways:
//   pretty(obj)  -> human-readable, with key-matrix rows aligned into a grid
//   compact(obj) -> minimal single-line form matching Vial's own export style
//
// `uid` is a 64-bit id that exceeds Number.MAX_SAFE_INTEGER, so a normal
// JSON.parse/stringify round-trip would silently round it to the nearest
// representable double and corrupt it. We tag oversized integer literals as
// strings before parsing and strip the tag back off (as a raw literal, not a
// quoted string) whenever we serialize, so the exact digits always survive.

const BIGINT_TAG = 'BIGINT_LITERAL:';

function tagBigInts(text) {
  return text.replace(/:(\s*)(-?\d{16,})(\s*[,}])/g, (match, sp1, digits, tail) => {
    if (Number.isSafeInteger(Number(digits))) return match;
    return `:${sp1}"${BIGINT_TAG}${digits}"${tail}`;
  });
}

function parse(text) {
  return JSON.parse(tagBigInts(text));
}

function isBigIntTag(v) {
  return typeof v === 'string' && v.startsWith(BIGINT_TAG);
}

function literal(v) {
  if (isBigIntTag(v)) return v.slice(BIGINT_TAG.length);
  return JSON.stringify(v);
}

function isPrimitive(v) {
  return v === null || typeof v !== 'object';
}

function isArrayOfPrimitives(v) {
  return Array.isArray(v) && v.length > 0 && v.every(isPrimitive);
}

// Matches Vial's own export formatting: ", " / ": " separators, single line.
function compact(v) {
  if (Array.isArray(v)) return `[${v.map(compact).join(', ')}]`;
  if (v !== null && typeof v === 'object') {
    return `{${Object.entries(v)
      .map(([k, val]) => `${JSON.stringify(k)}: ${compact(val)}`)
      .join(', ')}}`;
  }
  return literal(v);
}

const INLINE_THRESHOLD = 160;

function pretty(v, indent) {
  if (Array.isArray(v)) return prettyArray(v, indent);
  if (v !== null && typeof v === 'object') return prettyObject(v, indent);
  return literal(v);
}

function prettyArray(arr, indent) {
  if (arr.length === 0) return '[]';
  const pad = '  '.repeat(indent);
  const padIn = '  '.repeat(indent + 1);

  // A list of same-shaped rows (key matrix layers, tap dance/combo entries,
  // encoder layers, ...) renders as a column-aligned grid.
  if (arr.length > 1 && arr.every(isArrayOfPrimitives)) {
    const colWidth = [];
    for (const row of arr) {
      row.forEach((cell, c) => {
        const len = literal(cell).length;
        if (!colWidth[c] || len > colWidth[c]) colWidth[c] = len;
      });
    }
    const rows = arr.map(row => {
      const cells = row.map((cell, c) =>
        c === row.length - 1 ? literal(cell) : literal(cell).padEnd(colWidth[c])
      );
      return `${padIn}[${cells.join(', ')}]`;
    });
    return `[\n${rows.join(',\n')}\n${pad}]`;
  }

  if (arr.every(isPrimitive)) {
    return `[${arr.map(literal).join(', ')}]`;
  }

  if (compact(arr).length <= INLINE_THRESHOLD) {
    return compact(arr);
  }

  const items = arr.map(el => `${padIn}${pretty(el, indent + 1)}`);
  return `[\n${items.join(',\n')}\n${pad}]`;
}

function prettyObject(obj, indent) {
  const entries = Object.entries(obj);
  if (entries.length === 0) return '{}';
  const pad = '  '.repeat(indent);
  const padIn = '  '.repeat(indent + 1);

  const allPrimitive = entries.every(([, v]) => isPrimitive(v));
  if (allPrimitive && compact(obj).length <= INLINE_THRESHOLD) {
    return compact(obj);
  }

  const lines = entries.map(([k, v]) => `${padIn}${JSON.stringify(k)}: ${pretty(v, indent + 1)}`);
  return `{\n${lines.join(',\n')}\n${pad}}`;
}

module.exports = {
  parse,
  compact,
  pretty: obj => pretty(obj, 0) + '\n',
};
