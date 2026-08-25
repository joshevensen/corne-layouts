# QMK / Vial Keycode Reference — macOS, Corne 44-key

Scope: the full set of keycodes for building a layout — letters, digits,
punctuation and symbols — plus the macOS-relevant, layer, and mod-tap
keycodes. Written for Vial (GUI assignment), so where a keycode isn't in the
picker, use the **Any** key field and type the keycode text exactly as shown.

---

## 1. Letters & digits

These are US-ANSI *position* keycodes — the name refers to the physical key,
not a fixed glyph. What glyph a key actually types depends on the macOS
input source, though this table assumes the default US layout.

| Keycode | Types | Shifted |
|---|---|---|
| `KC_A` | a | A |
| `KC_B` | b | B |
| `KC_C` | c | C |
| `KC_D` | d | D |
| `KC_E` | e | E |
| `KC_F` | f | F |
| `KC_G` | g | G |
| `KC_H` | h | H |
| `KC_I` | i | I |
| `KC_J` | j | J |
| `KC_K` | k | K |
| `KC_L` | l | L |
| `KC_M` | m | M |
| `KC_N` | n | N |
| `KC_O` | o | O |
| `KC_P` | p | P |
| `KC_Q` | q | Q |
| `KC_R` | r | R |
| `KC_S` | s | S |
| `KC_T` | t | T |
| `KC_U` | u | U |
| `KC_V` | v | V |
| `KC_W` | w | W |
| `KC_X` | x | X |
| `KC_Y` | y | Y |
| `KC_Z` | z | Z |

| Keycode | Types | Shifted (US ANSI) | Shifted keycode |
|---|---|---|---|
| `KC_1` | 1 | ! | `LSFT(KC_1)` |
| `KC_2` | 2 | @ | `LSFT(KC_2)` |
| `KC_3` | 3 | # | `LSFT(KC_3)` |
| `KC_4` | 4 | $ | `LSFT(KC_4)` |
| `KC_5` | 5 | % | `LSFT(KC_5)` |
| `KC_6` | 6 | ^ | `LSFT(KC_6)` |
| `KC_7` | 7 | & | `LSFT(KC_7)` |
| `KC_8` | 8 | * | `LSFT(KC_8)` |
| `KC_9` | 9 | ( | `LSFT(KC_9)` |
| `KC_0` | 0 | ) | `LSFT(KC_0)` |

`LSFT(kc)` is the same wrapper documented in §3 — this repo's layout files
render it as `⇧` + the label (e.g. `LSFT(KC_8)` shows as `⇧8` in
`layouts/custom.md`). On macOS, `SGUI(KC_3)`/`SGUI(KC_4)`/`SGUI(KC_5)` are
screenshot shortcuts (see §4) — unrelated to typing shifted digits on a
symbol layer.

---

## 2. Punctuation & symbols

| Keycode | Types | Shifted | Shifted keycode |
|---|---|---|---|
| `KC_MINUS` | - | _ | `LSFT(KC_MINUS)` |
| `KC_EQUAL` | = | + | `LSFT(KC_EQUAL)` |
| `KC_LBRACKET` | [ | { | `LSFT(KC_LBRACKET)` |
| `KC_RBRACKET` | ] | } | `LSFT(KC_RBRACKET)` |
| `KC_BSLASH` | \ | \| | `LSFT(KC_BSLASH)` |
| `KC_SCOLON` | ; | : | `LSFT(KC_SCOLON)` |
| `KC_QUOTE` | ' | " | `LSFT(KC_QUOTE)` |
| `KC_GRAVE` | `` ` `` | ~ | `LSFT(KC_GRAVE)` |
| `KC_COMMA` | , | < | `LSFT(KC_COMMA)` |
| `KC_DOT` | . | > | `LSFT(KC_DOT)` |
| `KC_SLASH` | / | ? | `LSFT(KC_SLASH)` |

> These are the spellings this repo's tooling accepts
> (`scripts/lib/keycode-labels.js`). QMK's newer aliases — `KC_SEMICOLON`,
> `KC_BACKSLASH`, `KC_LBRC`/`KC_RBRC`, `KC_GRV`, `KC_QUOT` — are **not**
> recognized by `npm run build`; use the names above verbatim in
> `layouts/*.md`.

(§5 Navigation below still uses the short forms `KC_BSPC`, `KC_DEL`, `KC_GRV`
for historical reasons — those rows are unchanged. The names above are the
ones to use for new layout work.)

macOS Option-key glyphs built from these same base keycodes:

| Chord | Keycode | Produces |
|---|---|---|
| ⌥- | `LALT(KC_MINUS)` | – (en dash) |
| ⇧⌥- | `LSA(KC_MINUS)` | — (em dash) |
| ⌥[ / ⇧⌥[ | `LALT(KC_LBRACKET)` / `LSA(KC_LBRACKET)` | " / " |
| ⌥] / ⇧⌥] | `LALT(KC_RBRACKET)` / `LSA(KC_RBRACKET)` | ' / ' |
| ⌥; | `LALT(KC_SCOLON)` | … |
| ⌥= | `LALT(KC_EQUAL)` | ≠ |
| ⌥, / ⌥. | `LALT(KC_COMMA)` / `LALT(KC_DOT)` | ≤ / ≥ |
| ⌥/ | `LALT(KC_SLASH)` | ÷ |
| ⌥\ / ⇧⌥\ | `LALT(KC_BSLASH)` / `LSA(KC_BSLASH)` | « / » |

These are US input-source glyphs; `LALT`/`LSA` are the same wrappers from
§3. Note that macOS "Smart quotes" substitution in Notes/Pages/TextEdit can
override the straight `KC_QUOTE` output in some apps.

---

## 3. Modifiers — what the Mac actually sees

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

## 4. macOS system & media keycodes

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

## 5. Navigation & editing — what to actually put on your nav layer

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

## 6. Layer keycodes

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

## 7. Mod-tap & one-shot

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

## 8. Quantum / QMK feature keycodes

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

## 9. Auto Shift — the honest assessment

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

## 10. Vial-specific notes

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

## 11. Suggested starting point for your 3 layers

Given Qwerty is fixed and you're new to layers:

- **Layer 0 (Base):** Qwerty alphas. Thumbs = `LT(1, KC_SPC)`,
  `LT(2, KC_ENT)`, plus a Shift or Backspace. Extra OLED-position keys are
  ideal for ⌘ and ⌥ since they're pinky-adjacent.
- **Layer 1 (Nav/Num):** right hand = arrows + the ⌘/⌥ movement chords from
  §5; left hand = numbers or a numpad cluster.
- **Layer 2 (Sym):** brackets, braces, operators. Mirror your most-typed
  programming symbols to the home row.
- **Layer 3 (tri-layer, both thumbs):** F-keys, media, brightness,
  Mission Control, `QK_BOOT`.

Fill in one layer at a time and live on it for a few days before adding the
next. Layer 3 can stay empty until layers 1 and 2 feel automatic.
