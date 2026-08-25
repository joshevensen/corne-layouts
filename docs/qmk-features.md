# QMK / Vial Features — Triage for Corne V4.1 (46-key, macOS, Vial)

Companion to `corne-mac-keycode-reference.md`.

QMK's docs have no curated overview — the sidebar "Features" section is an
alphabetical dump with no indication of which features matter. This is that
overview, filtered for **your** hardware and constraints:

- **46 keys** (3×6 + 3 thumbs + 2 extra per half) — you are *not* key-starved
- **Vial** — GUI configuration, live editing, no recompile
- **macOS** — ⌘-heavy shortcut usage
- **Qwerty locked** — you switch between keyboards
- **New to layers** — this is the variable that should drive sequencing

---

## The short version

| Feature | Verdict | Vial? | When |
|---|---|---|---|
| **Layers** | Essential | GUI | Now |
| **Mod-Tap** | Essential | GUI | Now |
| **Layer Lock** | Strongly recommended | GUI (0.7.4+) | Now |
| **Combos** | Strongly recommended | GUI | Phase 2 |
| **Caps Word** | Strongly recommended | GUI | Phase 2 |
| **One-Shot Mods** | Recommended | GUI | Phase 2 |
| **Macros** | Recommended | GUI | Phase 2 |
| **Mouse Keys** | Worth trying | GUI + settings | Phase 3 |
| **Repeat Key** | Optional | GUI | Phase 3 |
| **Tap Dance** | Use sparingly | GUI | Phase 3 |
| **Dynamic Macros** | Optional | GUI | Phase 3 |
| **Grave Escape** | **Skip** | GUI | — |
| **Space Cadet** | **Skip** | Uncertain | — |
| **Auto Shift** | **Skip (for now)** | GUI settings | — |
| **Autocorrect** | Needs recompile | No GUI | — |
| **Key Overrides** | Needs recompile | No GUI | — |
| **Leader Key** | Needs recompile | No GUI | — |

**Sequencing principle:** every feature below that depends on *timing*
(mod-tap, tap dance, auto shift) makes misfires harder to attribute. Add at
most one timing-based feature at a time, and live with it for a week.

---

## Tier 1 — Build on these now

### Layers
*docs.qmk.fm/feature_layers*

Not a toggleable feature; it's the core model. Layers stack — higher layers sit
on top of lower ones, and a key that's transparent on layer 2 falls through to
whatever layer 1 or 0 has there.

**The one rule that prevents self-inflicted wounds:**
<cite index="44-1">it's possible to lock yourself into a layer with no way out short of unplugging the keyboard</cite>.
A layer switch on layer *n* should activate layer *n+1* or higher. If you need
to drop downward, use `TO()`.

With Vial this is much less scary than in compiled QMK — you can always plug in
and fix the keymap live. But the principle still saves you confusion.

**Note on `LT()` limits:** the layer argument only works for layers 0–15, and
the tap keycode must be a *basic* keycode. `LT(1, LGUI(KC_C))` will not work.
For a modified tap, you need Tap Dance.

### Mod-Tap
*docs.qmk.fm/mod_tap*

Tap for a character, hold for a modifier. The highest value-per-key feature on
a split. See §7 of the keycode reference for the full keycode list and the four
Vial tap-hold settings that govern it.

**Your decision point:** home-row mods vs. thumb/outer-column mods.

Home-row mods (⌃⌥⌘⇧ on `ASDF`/`JKL;`) are the enthusiast default, but they are
timing-dependent on every single home-row keystroke, and they interact badly
with ⌘-drag, fast rollover, and gaming. Given you have **46 keys and 4 spare
positions**, you can put real modifiers on dedicated keys and skip the whole
problem class. I'd start there and only try home-row mods if you find yourself
wanting them.

### Layer Lock
*docs.qmk.fm/features/layer_lock* — keycode `QK_LLCK`

<cite index="42-1">Available in Vial 0.7.4 and later, assignable from the Layers keycode tab</cite>.

<cite index="43-1">Locks the current layer on — provided you got there via `MO`, `LT`, `OSL`, or `TT` — and pressing it again unlocks</cite>.
<cite index="41-1">Locking the base layer has no effect, so this key belongs on layers above the base</cite>.

**Why it matters for you:** it's the clean answer to "I need to type 30 numbers
in a row and don't want to hold the thumb key." It replaces the need for `TG()`
duplicates and for `TT()`'s confusing tap-count behavior. Put one on each of
your nav and symbol layers.

---

## Tier 2 — Add once layers feel automatic

### Combos
*Vial GUI: Combos tab*

Press two keys simultaneously → a third action. Cheap keys with **no timing
penalty on the individual keys** (unlike mod-tap), which is what makes them
attractive as a first addition.

Good candidates: `Esc`, `Tab`, `(` `)`, `Caps Word`. Use horizontally adjacent
pairs on the same hand; avoid pairs you'd hit in normal rolls.

### Caps Word
*Keycode `CW_TOGG`*

Capitalizes until a word-breaking character, then turns itself off. Strictly
better than Caps Lock for `MAX_RETRY_COUNT`, `AWS_REGION`, `SCREAMING_CASE`.
Especially relevant given how much env-var and constant naming shows up in
backend and infra work. Also note macOS deliberately adds a delay to real Caps
Lock, which Caps Word sidesteps entirely.

### One-Shot Mods
*Keycodes `OSM(MOD_LSFT)` etc.*

Sticky modifiers — tap, then the next key gets the mod. For ⌘-heavy macOS work
these are often more comfortable than either reaching for a modifier or using
home-row mods, and critically they are **not timing-dependent**, so they're a
safe thing to learn while you're still adjusting to layers.

### Macros
*Vial GUI: Macros tab*

Dynamically editable in the GUI, no recompile. Practical uses given your work:
frequently-typed CLI invocations, your email address, common prompt scaffolding,
git command prefixes, long import paths.

Keep them few. Macros you forget about are worse than no macros.

---

## Tier 3 — Try when you're bored, not before

### Mouse Keys
*docs.qmk.fm/features/mouse_keys*

Cursor and click emulation from the keyboard. Costs one layer's right hand and
carries **no timing risk**, which makes it low-consequence to experiment with.

**Why most people abandon it:** the default acceleration curve feels terrible.
Vial exposes the mouse timing parameters in QMK Settings and lets you tune them
live, which is the difference between "unusable" and "fine for closing a modal
without leaving home row." If you try it, budget an evening on the settings.

Realistically: useful for small corrections, not a trackpad replacement.

### Repeat Key
*Keycode `QK_REP`*

Repeats the previous keypress along with the mods that were held. Reduces
same-finger bigrams. Minor gain on Qwerty; more valuable on alt layouts.
`QK_AREP` sends an "alternate" repeat.

### Tap Dance
*Vial GUI: Tap Dance tab*

Tap / double-tap / hold / tap-then-hold — four actions per key, configured in
the GUI.

**Use it for:** punctuation variants (`.` → `.` , `..` → `:`), and for tap keys
that need a *modified* keycode, which `LT()` can't do.

**Do not use it for:** home-row mods. Vial's own docs are explicit that
<cite index="14-1">mod-tap keys should be used for home-row mods rather than Tap Dance, because Tap Dance uses a separate, simpler tap/hold implementation poorly suited to it</cite>.

Every Tap Dance adds latency to the single tap while the firmware waits to see
if a second tap is coming. That cost is real and cumulative.

### Dynamic Macros
*Keycodes `DM_REC1`, `DM_PLY1`, `DM_RSTP`*

Record a keystroke sequence on the fly, play it back. Vim-register-like. Useful
for ad-hoc repetitive edits. Distinct from Vial's persistent Macros.

---

## Skip these — and why

### Grave Escape (`QK_GESC`)
*docs.qmk.fm/features/grave_esc*

Sends `Esc` alone; sends `` ` ``/`~` when ⌘ or ⇧ is held. It exists to solve
"my 60% board has no room for both Esc and backtick."

**You have 46 keys.** Give Esc a dedicated key and put `` ` `` on your symbol
layer. Adding conditional behavior to a key you press constantly, to save a key
you don't need to save, is a bad trade.

*Mac-specific note:* the ⌘-held behavior does at least preserve ⌘` for
window-cycling within an app, so it's not actively broken on macOS — just
pointless here.

### Space Cadet
*docs.qmk.fm/features/space_cadet*

Tap Shift → `(`; hold Shift → Shift. Same for other modifier/bracket pairs.

Two problems: it puts timing-dependent behavior on your **pinkies**, the
fingers with the worst tap/hold precision, and it's solving a key-scarcity
problem you don't have. Parens belong on a symbol layer under a strong finger.

Largely superseded by mod-taps and layers generally.

### Auto Shift
*docs.qmk.fm/features/auto_shift*

Full analysis in §9 of the keycode reference. Summary:
<cite index="6-1">key repeat stops working entirely</cite>, and
<cite index="6-1">you'll get unintended shifts until you retrain</cite>.
It's a key-scarcity feature. You have 4 spare keys.

Not permanently off the table — <cite index="13-1">Vial exposes it in QMK Settings so you can toggle it live</cite> —
but adding a second timing system while learning layers makes every misfire
ambiguous.

---

## Needs a recompile — not available in Vial's GUI

These are genuinely good features that you can't reach from the Vial GUI. If
one becomes compelling enough, you'd build custom Vial firmware for your board.

| Feature | What it does |
|---|---|
| **Autocorrect** | Fixes common typos in firmware, before they reach the OS |
| **Key Overrides** | Remap arbitrary mod+key combos (e.g. ⇧`.` → something custom) |
| **Leader Key** | Vim-style prefix sequences: leader, then `w`, `q` → an action |
| **Achordion** | getreuer's library for smarter tap-hold decisions — the standard fix if home-row mods misfire |

Not worth leaving Vial for at the start. The live-edit loop is more valuable to
you right now than any of these.

---

## Hardware note — Corne V4.1

<cite index="36-1">foostan has documented an EMI bug in v4.x where one or both halves can stop responding, commonly triggered by a nearby mobile phone; the fix is to move the offending device 30cm+ away and reconnect USB</cite>.

If a half goes dead, check this before assuming your keymap or firmware broke.

---

## Suggested sequence

1. **Week 1–2:** Base layer + nav layer. `MO`/`LT` on thumbs only. Real
   modifiers on the spare outer keys. No timing features beyond layer-tap.
2. **Week 3:** Add symbol layer. Add Layer Lock to both nav and symbol.
3. **Week 4+:** Add Combos and Caps Word. Both are low-risk.
4. **Later:** Tri-layer for F-keys/media. Then Mouse Keys or Tap Dance if the
   itch persists.
5. **Only if you want it:** home-row mods. Expect two weeks of adjustment and
   be ready to tune tapping term.
