'use strict';

// Short display labels for keycodes, used by scripts/lib/layout-grid.js to
// draw compact ASCII-art keyboard diagrams. Anything not listed here falls
// back to the keycode's own text with the KC_ prefix stripped, which is
// already short enough for plain letters/digits (KC_Q -> Q, KC_5 -> 5).

const NAMES = {
  KC_TAB: 'Tab',
  KC_ESCAPE: 'Esc',
  KC_CAPSLOCK: 'Caps',
  KC_LSHIFT: 'Sft',
  KC_RSHIFT: 'Sft',
  KC_LCTRL: 'Ctl',
  KC_RCTRL: 'Ctl',
  KC_LALT: 'Alt',
  KC_RALT: 'Alt',
  KC_LGUI: 'Cmd',
  KC_RGUI: 'Cmd',
  KC_BSPACE: 'Bspc',
  KC_DELETE: 'Del',
  KC_ENTER: 'Ent',
  KC_SPACE: 'Spc',
  KC_QUOTE: "'",
  KC_SCOLON: ';',
  KC_SLASH: '/',
  KC_DOT: '.',
  KC_COMMA: ',',
  KC_MINUS: '-',
  KC_EQUAL: '=',
  KC_LBRACKET: '[',
  KC_RBRACKET: ']',
  KC_BSLASH: '\\',
  KC_GRAVE: '`',
  KC_LEFT: '←',
  KC_RIGHT: '→',
  KC_UP: '↑',
  KC_DOWN: '↓',
  KC_PGUP: 'PgUp',
  KC_PGDN: 'PgDn',
  KC_PGDOWN: 'PgDn',
  KC_HOME: 'Home',
  KC_END: 'End',
  KC_MS_BTN1: 'Clk',
  KC_MS_BTN2: 'RClk',
  KC_MS_BTN3: 'MClk',
  KC_MS_WH_UP: 'Wh↑',
  KC_MS_WH_DOWN: 'Wh↓',
  KC_MS_LEFT: 'M←',
  KC_MS_RIGHT: 'M→',
  KC_MS_UP: 'M↑',
  KC_MS_DOWN: 'M↓',
  CW_TOGG: 'CW',
  QK_LLCK: 'LLCK',
  QK_BOOT: 'BOOT',
  RGB_TOG: 'RGBtg',
  RGB_MOD: 'RGB+',
  RGB_HUI: 'Hue+',
  RGB_HUD: 'Hue-',
  RGB_SAI: 'Sat+',
  RGB_SAD: 'Sat-',
  RGB_VAI: 'Val+',
  RGB_VAD: 'Val-',
  FN_MO13: 'MO1',
  FN_MO23: 'MO2',
  KC_NO: '',
  KC_TRNS: '▽',
  'LSFT(KC_1)': '!',
  'LSFT(KC_2)': '@',
  'LSFT(KC_3)': '#',
  'LSFT(KC_4)': '$',
  'LSFT(KC_5)': '%',
  'LSFT(KC_6)': '^',
  'LSFT(KC_7)': '&',
  'LSFT(KC_8)': '*',
  'LSFT(KC_9)': '(',
  'LSFT(KC_0)': ')',
};

// Wrapper functions like LGUI(KC_C) -> hold this modifier while tapping kc.
const MOD_WRAP = {
  LGUI: '⌘',
  LCMD: '⌘',
  RGUI: '⌘',
  RCMD: '⌘',
  LALT: '⌥',
  LOPT: '⌥',
  RALT: '⌥',
  ROPT: '⌥',
  LCTL: '⌃',
  RCTL: '⌃',
  LSFT: '⇧',
  RSFT: '⇧',
  SGUI: '⇧⌘',
  LCA: '⌃⌥',
  LSA: '⇧⌥',
  LCAG: '⌃⌥⌘',
  MEH: '⌃⇧⌥',
  HYPR: '⌃⇧⌥⌘',
};

const WRAP_RE = /^([A-Z]+)\((.*)\)$/;

function label(code) {
  if (code in NAMES) return NAMES[code];
  const m = WRAP_RE.exec(code);
  if (m && MOD_WRAP[m[1]]) return MOD_WRAP[m[1]] + label(m[2]);
  if (code.startsWith('KC_')) return code.slice(3);
  return code;
}

// --- Reverse direction: label -> keycode, for scripts/lib/parse-layout-md.js ---
//
// A few bare labels (Sft, Ctl, Alt, Cmd) come from both an L* and an R*
// keycode in NAMES, so they can't be inverted context-free — which one a
// cell means depends on which half it's printed on (this board's own
// convention, confirmed against dist/default.vil: left-half modifier keys
// are the L* variant, right-half are R*). Wrapped mod-tap combos like
// LGUI(KC_C) are unambiguous either way, since every wrapped modifier in
// this project's actual .vil files uses the L*-prefixed function regardless
// of which half it's on (macOS treats LGUI/RGUI shortcuts identically).

const AMBIGUOUS_BARE = {
  Sft: { left: 'KC_LSHIFT', right: 'KC_RSHIFT' },
  Ctl: { left: 'KC_LCTRL', right: 'KC_RCTRL' },
  Alt: { left: 'KC_LALT', right: 'KC_RALT' },
  Cmd: { left: 'KC_LGUI', right: 'KC_RGUI' },
};

const REV_NAMES = {};
for (const [code, lbl] of Object.entries(NAMES)) {
  if (lbl in AMBIGUOUS_BARE) continue;
  if (!(lbl in REV_NAMES)) REV_NAMES[lbl] = code; // first entry wins (e.g. KC_PGDN over its KC_PGDOWN alias)
}

// Canonical (always L*-prefixed) reverse of MOD_WRAP, sorted longest-symbol
// first so a combo like "⇧⌘" is matched before its "⇧" or "⌘" substrings.
const REV_MOD_WRAP = [
  ['⌃⇧⌥⌘', 'HYPR'],
  ['⌃⇧⌥', 'MEH'],
  ['⇧⌘', 'SGUI'],
  ['⌃⌥⌘', 'LCAG'],
  ['⌃⌥', 'LCA'],
  ['⇧⌥', 'LSA'],
  ['⌘', 'LGUI'],
  ['⌥', 'LALT'],
  ['⌃', 'LCTL'],
  ['⇧', 'LSFT'],
].sort((a, b) => b[0].length - a[0].length);

// text: the trimmed content of one bracketed cell. side: 'left' or 'right',
// which half of the board this cell is printed on (only matters for the
// four ambiguous bare modifier labels above).
function parseLabel(text, side) {
  if (text === '' || text === '·') return 'KC_NO';
  if (text === '▽') return 'KC_TRNS';
  if (text in AMBIGUOUS_BARE) return AMBIGUOUS_BARE[text][side];
  for (const [sym, fn] of REV_MOD_WRAP) {
    if (text.startsWith(sym) && text.length > sym.length) {
      return `${fn}(${parseLabel(text.slice(sym.length), side)})`;
    }
  }
  if (text in REV_NAMES) return REV_NAMES[text];
  if (/^[A-Z0-9]$/.test(text)) return `KC_${text}`;
  // Bare layer functions with a numeric argument (MO(2), DF(0), TG(3), ...)
  // display exactly as their own raw syntax (label()'s fallback just
  // returns them unchanged), so they round-trip the same way.
  if (/^[A-Z]+\(\d+\)$/.test(text)) return text;
  throw new Error(`Unrecognized key label "${text}"`);
}

module.exports = { label, parseLabel };
