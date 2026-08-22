'use strict';

// What each numeric QSID in a .vil's "settings" object actually controls.
//
// Vial's .vil format stores QMK Settings as {"<qsid>": value}. The QSIDs
// themselves aren't self-describing — they're assigned by vial-qmk's
// firmware build, not by Vial's file format — so this table was built by
// reading the DECLARE_STATIC_SETTING(id, field) / DECLARE_STATIC_SETTING_
// NOTIFY(id, field, cb) macro calls in vial-kb/vial-qmk's
// quantum/qmk_settings.c (branch: vial), which is the source of truth this
// keyboard's firmware was built from. IDs 1-7 and 9-21 are confirmed by
// direct quotes from that file. ID 8 does not appear there — it's likely
// declared in a per-feature source file this lookup didn't reach — so it's
// listed as unidentified rather than guessed. If anything here looks wrong,
// Vial's own "QMK Settings" panel (when connected to real hardware) is the
// authoritative source — treat this as a reference, not a substitute.

const SETTINGS = [
  { id: 1, key: 'grave_esc_override', name: 'Grave Escape Override', description: "Whether QK_GESC sends ` / ~ instead of Esc when Shift/Cmd is held." },
  { id: 2, key: 'combo_term', name: 'Combo Term', description: 'Max time (ms) between two combo keys to still count as one combo.' },
  { id: 3, key: 'auto_shift', name: 'Auto Shift Enabled', description: 'Master on/off switch for Auto Shift (0 = disabled).' },
  { id: 4, key: 'auto_shift_timeout', name: 'Auto Shift Timeout', description: 'Hold duration (ms) past which Auto Shift sends the shifted character.' },
  { id: 5, key: 'osk_tap_toggle', name: 'One-Shot Tap Toggle', description: 'Number of taps on a one-shot mod/layer key that locks it on.' },
  { id: 6, key: 'osk_timeout', name: 'One-Shot Timeout', description: 'Time (ms) a one-shot modifier/layer stays armed if unused.' },
  { id: 7, key: 'tapping_term', name: 'Tapping Term', description: 'Hold duration (ms) that turns a mod-tap/layer-tap key into its hold action.' },
  { id: 8, key: null, name: 'Unidentified', description: 'Not found in quantum/qmk_settings.c — likely declared in a per-feature file this lookup didn’t reach. Meaning unconfirmed.' },
  { id: 9, key: 'mousekey_delay', name: 'Mouse Key Delay', description: 'Delay (ms) before cursor movement starts after a mouse key is held.' },
  { id: 10, key: 'mousekey_interval', name: 'Mouse Key Interval', description: 'Time (ms) between cursor movement steps while a mouse key is held.' },
  { id: 11, key: 'mousekey_move_delta', name: 'Mouse Key Move Delta', description: 'Pixels the cursor moves per movement step.' },
  { id: 12, key: 'mousekey_max_speed', name: 'Mouse Key Max Speed', description: 'Top speed multiplier the cursor accelerates to while held.' },
  { id: 13, key: 'mousekey_time_to_max', name: 'Mouse Key Time To Max', description: 'Time (ms) to reach max cursor speed from a standstill.' },
  { id: 14, key: 'mousekey_wheel_delay', name: 'Mouse Wheel Delay', description: 'Delay (ms) before scroll-wheel movement starts after a wheel key is held.' },
  { id: 15, key: 'mousekey_wheel_interval', name: 'Mouse Wheel Interval', description: 'Time (ms) between scroll-wheel steps while a wheel key is held.' },
  { id: 16, key: 'mousekey_wheel_max_speed', name: 'Mouse Wheel Max Speed', description: 'Top speed multiplier the scroll wheel accelerates to.' },
  { id: 17, key: 'mousekey_wheel_time_to_max', name: 'Mouse Wheel Time To Max', description: 'Time (ms) to reach max scroll speed from a standstill.' },
  { id: 18, key: 'tap_code_delay', name: 'Tap Code Delay', description: 'Delay (ms) QMK inserts between the press and release of any sent keystroke.' },
  { id: 19, key: 'tap_hold_caps_delay', name: 'Tap-Hold Caps Delay', description: 'Extra delay (ms) added after tapping Caps Lock, to cover the OS caps-lock lag.' },
  { id: 20, key: 'tapping_toggle', name: 'Tapping Toggle', description: 'Number of taps on a TT() layer key that locks the layer on.' },
  { id: 21, key: 'magic_settings', name: 'Magic Settings', description: "Bitmask of legacy QMK 'Magic' key remaps (e.g. swap Ctrl/Caps) — 0 means none active." },
];

module.exports = { SETTINGS };
