'use strict';

// Short display labels for keycodes, used by scripts/render-layouts.js to
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
  KC_NO: '·',
  KC_TRNS: '▽',
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
  if (NAMES[code]) return NAMES[code];
  const m = WRAP_RE.exec(code);
  if (m && MOD_WRAP[m[1]]) return MOD_WRAP[m[1]] + label(m[2]);
  if (code.startsWith('KC_')) return code.slice(3);
  return code;
}

module.exports = { label };
