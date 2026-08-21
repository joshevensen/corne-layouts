# QMK / Vial Keycode Reference — macOS, Corne 44-key

Scope: macOS-relevant keycodes + layer and mod-tap keycodes. Written for Vial
(GUI assignment), so where a keycode isn't in the picker, use the **Any** key
field and type the keycode text exactly as shown.

---

## 1. Modifiers — what the Mac actually sees

| Keycode | Alias | macOS key | Notes |
|---|---|---|---|
| `KC_LCTL` | `KC_LCTRL` | Control (⌃) | |
| `KC_LALT` | `KC_LOPT` | Option (⌥) | QMK aliases `KC_LOPT`/`KC_ROPT` exist for Mac clarity |
| `KC_LGUI` | `KC_LCMD` | Command (⌘) | `KC_LCMD` is the Mac-named alias |
| `KC_LSFT` | | Shift (⇧) | |
| `KC_RALT` | `KC_ROPT` | Right Option | macOS uses this for alt-glyphs (®, ø, …). Keep it real Option, not AltGr |
| `KC_RGUI` | `KC_RCMD` | Right Command | Some apps distinguish L/R; most don't |
| `KC_APP` | | — | Menu key. **No effect on macOS.** Don't waste a key on it |

**Wrapper functions** — hold modifier(s) while tapping a key. Nest freely.

| Function | Sends | Example |
|---|---|---|
| `LCTL(kc)` | ⌃ + kc | `LCTL(KC_LEFT)` → prev Space |
| `LALT(kc)` | ⌥ + kc | `LALT(KC_LEFT)` → move word left |
| `LGUI(kc)` | ⌘ + kc | `LGUI(KC_C)` → Copy |
| `LSFT(kc)` | ⇧ + kc | |
| `SGUI(kc)` | ⇧⌘ + kc | `SGUI(KC_4)` → screenshot selection |
| `LCA(kc)` | ⌃⌥ + kc | |
| `LSA(kc)` | ⇧⌥ + kc | |
| `LCAG(kc)` | ⌃⌥⌘ + kc | |
| `MEH(kc)` | ⌃⇧⌥ + kc | Three mods, no ⌘ — safe for app hotkeys |
| `HYPR(kc)` | ⌃⇧⌥⌘ + kc | Never collides with a stock macOS shortcut |
| `C(kc)`, `A(kc)`, `G(kc)`, `S(kc)` | shorthand | Same as LCTL/LALT/LGUI/LSFT |

> **Hyper/Meh tip:** if you use Karabiner-Elements, Raycast, or Hammerspoon,
> `KC_F13`–`KC_F24` are more reliable trigger keys than Hyper — macOS assigns
> nothing to them by default, and apps can bind them cleanly.

---

## 2. macOS system & media keycodes

These are HID Consumer Control usages. All of these work on macOS natively.

| Keycode | Alias | Does |
|---|---|---|
| `KC_MPLY` | `KC_MEDIA_PLAY_PAUSE` | Play/pause |
| `KC_MNXT` | `KC_MEDIA_NEXT_TRACK` | Next track |
| `KC_MPRV` | `KC_MEDIA_PREV_TRACK` | Previous track |
| `KC_MFFD` | `KC_MEDIA_FAST_FORWARD` | Scrub forward |
| `KC_MRWD` | `KC_MEDIA_REWIND` | Scrub back |
| `KC_MSTP` | `KC_MEDIA_STOP` | Stop |
| `KC_MUTE` | `KC_AUDIO_MUTE` | Mute |
| `KC_VOLU` | `KC_AUDIO_VOL_UP` | Volume up |
| `KC_VOLD` | `KC_AUDIO_VOL_DOWN` | Volume down |
| `KC_BRIU` | `KC_BRIGHTNESS_UP` | Display brightness up |
| `KC_BRID` | `KC_BRIGHTNESS_DOWN` | Display brightness down |
| `KC_MCTL` | `KC_MISSION_CONTROL` | Mission Control — **Apple-specific, macOS only** |
| `KC_LPAD` | `KC_LAUNCHPAD` | Launchpad — **Apple-specific, macOS only** |
| `KC_EJCT` | `KC_MEDIA_EJECT` | Eject. Mostly vestigial, but macOS still honors it |

**Known non-starters on macOS:**

| Keycode | Why it fails |
|---|---|
| `KC_PSCR` | No Print Screen. Use `SGUI(KC_3)` (full), `SGUI(KC_4)` (region), `SGUI(KC_5)` (capture UI) |
| `KC_INS` | No Insert key concept |
| `KC_SLCK`, `KC_PAUS` | Ignored |
| `KC_CALC`, `KC_MYCM`, `KC_MAIL` | Windows-oriented; unreliable or ignored |
| `KC_MSEL` | Windows "Media Select"; nothing on macOS |

**Alternate volume set:** `KC_KB_VOLUME_UP` / `KC_KB_VOLUME_DOWN` (aliases
`KC__VOLUP` / `KC__VOLDOWN`) are the *Keyboard*-page usages rather than the
Consumer page. macOS historically needed these. Modern macOS accepts
`KC_VOLU`/`KC_VOLD` — use those, and only fall back if volume doesn't respond.

---

## 3. Navigation & editing — what to actually put on your nav layer

Raw keycodes first, then the macOS text-editing chords worth binding directly.

| Keycode | Does |
|---|---|
| `KC_LEFT` `KC_DOWN` `KC_UP` `KC_RGHT` | Arrows |
| `KC_HOME` `KC_END` | Beginning/end of line — **unreliable in macOS apps**, prefer the ⌘ chords below |
| `KC_PGUP` `KC_PGDN` | Page up/down |
| `KC_BSPC` `KC_DEL` | Backspace / forward delete |
| `KC_TAB` | Tab |

| Bind this | Sends | macOS action |
|---|---|---|
| `LGUI(KC_LEFT)` | ⌘← | Start of line |
| `LGUI(KC_RGHT)` | ⌘→ | End of line |
| `LGUI(KC_UP)` | ⌘↑ | Top of document |
| `LGUI(KC_DOWN)` | ⌘↓ | End of document |
| `LALT(KC_LEFT)` | ⌥← | Word left |
| `LALT(KC_RGHT)` | ⌥→ | Word right |
| `LALT(KC_BSPC)` | ⌥⌫ | Delete word back |
| `LGUI(KC_BSPC)` | ⌘⌫ | Delete to start of line |
| `LCTL(KC_LEFT)` / `LCTL(KC_RGHT)` | ⌃← / ⌃→ | Switch Space (desktop) |
| `LGUI(KC_TAB)` | ⌘⇥ | App switcher |
| `LGUI(KC_GRV)` | ⌘` | Cycle windows within app |
| `LGUI(KC_SPC)` | ⌘Space | Spotlight (or Raycast) |

Add ⇧ to any of the movement chords to select instead of move —
e.g. `SGUI(KC_LEFT)` selects to start of line.

---

## 4. Layer keycodes

`n` = layer number. Layer 0 is your base.

| Keycode | Behavior | Use for |
|---|---|---|
| `MO(n)` | **Mo**mentary — layer active only while held | The workhorse. Thumb keys |
| `LT(n, kc)` | Hold → layer n; tap → `kc` | Best value per key. `LT(1, KC_SPC)` = hold for nav, tap for space |
| `TG(n)` | **T**og**g**le on/off | Gaming or numpad layers you stay in |
| `TO(n)` | Activate n, turn off all others | Hard switch. Needs a way back |
| `DF(n)` | Set the **d**efault layer | Qwerty ↔ alternate base. Persists |
| `OSL(n)` | **O**ne-**s**hot **l**ayer — next keypress only | Symbols you type one at a time |
| `TT(n)` | Momentary on hold; toggles after N rapid taps | Clever, but the tap-count timing surprises people |
| `LM(n, mod)` | Layer n with `mod` held down | Niche |

**Choosing:** start with `MO`/`LT` on thumbs only. `TT` and `LM` are where new
layer users generate bug reports against themselves.

**Layer stacking:** holding `MO(1)` and `MO(2)` gives you layer 3 *only* if you
explicitly define layer 3 — this is "tri-layer" and is the standard way to get a
function/adjust layer out of two thumb keys. In Vial you just fill in layer 3
manually; there's no separate setting.

---

## 5. Mod-tap & one-shot

**Mod-tap** — `MT(mod, kc)`: tap sends `kc`, hold sends the modifier.

| Shorthand | Equivalent |
|---|---|
| `LCTL_T(kc)` | Tap kc, hold Control |
| `LALT_T(kc)` | Tap kc, hold Option |
| `LGUI_T(kc)` | Tap kc, hold Command |
| `LSFT_T(kc)` | Tap kc, hold Shift |
| `MEH_T(kc)` | Tap kc, hold ⌃⇧⌥ |
| `HYPR_T(kc)` | Tap kc, hold ⌃⇧⌥⌘ |
| `RALT_T(kc)` | Tap kc, hold Right Option |

**One-shot (sticky)** — press and release, applies to the *next* key only.

| Keycode | Does |
|---|---|
| `OSM(MOD_LSFT)` | Sticky Shift |
| `OSM(MOD_LGUI)` | Sticky Command |
| `OSM(MOD_LCTL)`, `OSM(MOD_LALT)` | Sticky Control / Option |
| `OSM(MOD_LCTL \| MOD_LSFT)` | Combined — type via Vial's **Any** field |
| `OSM(MOD_HYPR)` | Sticky Hyper |
| `OSM(MOD_MEH)` | Sticky Meh |

**Timing settings** — Vial → QMK Settings → Tap-Hold tab, live-adjustable:

| Setting | Guidance |
|---|---|
| Tapping Term | <cite index="14-1">Start at 250 ms and adjust; increase if you get unintended mod holds, decrease if you get taps when you wanted the mod</cite> |
| Permissive Hold | <cite index="14-1">Check it if you use home-row mods</cite> |
| Chordal Hold | <cite index="14-1">Check it for home-row mods</cite> |
| Hold On Other Key Press | <cite index="14-1">Leave unchecked for home-row mods</cite> |

> Vial's docs are explicit that <cite index="14-1">home-row mods should use mod-tap keys (`LCtl_T` etc.), not Tap Dance — Tap Dance uses a simpler tap/hold implementation that is poorly suited to home-row mods</cite>.

---

## 6. Quantum / QMK feature keycodes

| Keycode | Does | Mac note |
|---|---|---|
| `CW_TOGG` | Caps Word — capitalizes until a word-breaking key | Better than Caps Lock for `CONSTANT_NAMES` |
| `KC_CAPS` | Caps Lock | macOS adds a ~100 ms delay to Caps Lock by design |
| `QK_GESC` | Esc alone; ⌘/⇧ + it sends backtick/tilde | Configurable in Vial's QMK Settings |
| `QK_REP` | Repeat last keypress with its mods | |
| `QK_AREP` | "Alternate" repeat | |
| `QK_BOOT` | Enter bootloader for flashing | Put this on a deep layer, not layer 1 |
| `QK_RBT` | Reboot keyboard | |
| `DM_REC1` / `DM_REC2` | Start recording dynamic macro 1 / 2 | |
| `DM_PLY1` / `DM_PLY2` | Play dynamic macro | |
| `DM_RSTP` | Stop recording | |
| `AS_TOGG` | Toggle Auto Shift on/off | |
| `AS_ON` / `AS_OFF` | Force Auto Shift on/off | |
| `AS_UP` / `AS_DOWN` | Adjust Auto Shift timeout ±5 ms live | |
| `AS_RPT` | Report current timeout by typing it out | |

---

## 7. Auto Shift — the honest assessment

**How it works:** tap a key normally → unshifted char. Hold it past
`AUTO_SHIFT_TIMEOUT` → shifted char. No Shift key needed.

**The costs, from QMK's own docs:**

- <cite index="6-1">Key repeat stops working entirely — you can no longer hold `a` to emit a run of a's, because the firmware is timing your press instead of sending a held key state to the OS</cite>.
- <cite index="6-1">You will get characters shifted when you didn't intend it, and unshifted when you did — this comes down to practice</cite>.
- <cite index="6-1">By default it's disabled for any keypress accompanied by modifiers</cite>, so ⌘-chords are unaffected.

**Why it's a bad first move for your build specifically:**

1. You have 44 keys and a dedicated pinky column. Auto Shift solves key
   scarcity you don't have.
2. It's timing-based, and so are layer-taps and mod-taps. Stacking two timing
   systems while you're still learning layers makes misfires nearly impossible
   to attribute.
3. Loss of key repeat is a real cost in a terminal and in vim-style navigation.

**If you try it anyway:** Vial exposes it in QMK Settings live, so toggle it on
after your layers are stable, and start with the timeout high (~175 ms) and
Auto Shift restricted to symbols/numbers rather than alphas.

---

## 8. Vial-specific notes

- **Any key field:** anything not in the picker (nested wrappers,
  `OSM(MOD_LCTL | MOD_LSFT)`, `LT(3, KC_TAB)`) can be typed as text.
- **Tap Dance:** tap/double-tap/hold/tap-hold, four actions per slot,
  configured in GUI. Use it for punctuation variants, *not* home-row mods.
- **Combos:** press two keys simultaneously → third action. Good for
  `Esc` on QW or `Tab` on similar pairs, without spending a key.
- **Macros:** dynamically configurable in the GUI — no recompile.
- **Layer count:** <cite index="12-1">Vial defaults to 4 layers; this can be raised in `config.h` if the MCU has space, up to QMK's limit of 32</cite>.
- **Live editing:** changes apply immediately, no flashing. Iterate fast.

---

## 9. Suggested starting point for your 3 layers

Given Qwerty is fixed and you're new to layers:

- **Layer 0 (Base):** Qwerty alphas. Thumbs = `LT(1, KC_SPC)`,
  `LT(2, KC_ENT)`, plus a Shift or Backspace. Extra OLED-position keys are
  ideal for ⌘ and ⌥ since they're pinky-adjacent.
- **Layer 1 (Nav/Num):** right hand = arrows + the ⌘/⌥ movement chords from
  §3; left hand = numbers or a numpad cluster.
- **Layer 2 (Sym):** brackets, braces, operators. Mirror your most-typed
  programming symbols to the home row.
- **Layer 3 (tri-layer, both thumbs):** F-keys, media, brightness,
  Mission Control, `QK_BOOT`.

Fill in one layer at a time and live on it for a few days before adding the
next. Layer 3 can stay empty until layers 1 and 2 feel automatic.
