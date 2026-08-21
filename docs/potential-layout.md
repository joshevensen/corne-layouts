# Corne V4.1 Keymap — Current Design

46-key Corne (3x6 + 3 thumbs + 4 extra), macOS, Vial. Qwerty locked.
Column order runs outer (pinky) → inner (index) → extra, on both halves,
with thumbs and extra keys toward the center.

Legend: `_` = transparent (falls through to a lower layer) · **bold** = this
layer's own content.

---

## Layer 0 — Base (Qwerty)

**Left half**

| | outer C6 | C5 | C4 | C3 | C2 | inner C1 |
|---|---|---|---|---|---|---|
| R1 | Tab | Q | W | E | R | T |
| R2 | Esc | A | S | D | F | G |
| R3 | CapsWord | Z | X | C | V | B |

Extra col (R1–R2 only): ⌘ / ⌥

**Right half**

| inner C1 | C2 | C3 | C4 | C5 | outer C6 |
|---|---|---|---|---|---|
| Y | U | I | O | P | Bspc |
| H | J | K | L | ; | ' |
| N | M | , | . | / | Del |

Extra col (R1–R2 only): ⌘ / ⌥

**Thumbs** (outer → inner)
- Left: Shift, Enter, **Layer 1**
- Right: **Layer 2**, Space, ⌘

---

## Layer 1 — Nav / Mouse (hold left thumb `L1`)

**Left half** — line/word editing + clipboard

| | outer C6 | C5 | C4 | C3 | C2 | inner C1 |
|---|---|---|---|---|---|---|
| R1 | **Lock** | ⌘→ | ⌥→ | ⌥← | ⌘← | ⌘⌫ |
| R2 | ⌘Z | ⌘⇧Z | ⌘X | ⌘C | ⌘V | _ |
| R3 | _ | ⌃→ | ⌃← | ⌘⇥ | ⌘Space | _ |

Extra col: _ / _

**Right half** — mouse on top two rows, arrows preserved on bottom

| inner C1 | C2 | C3 | C4 | C5 | outer C6 |
|---|---|---|---|---|---|
| _ | Click | Right-click | Middle-click | Wheel ↑ | Wheel ↓ |
| _ | Mouse ← | Mouse ↓ | Mouse ↑ | Mouse → | _ |
| ← | ↓ | ↑ | → | PgUp | PgDn |

Extra col: _ / _

**Thumbs** (fixed, same as layer 0)
- Left: Shift, Enter, (L1 — held)
- Right: Layer 2, Space, ⌘

---

## Layer 2 — Numbers / Symbols (hold right thumb `L2`)

**Left half** — numbers on home row, shifted symbols above

| | outer C6 | C5 | C4 | C3 | C2 | inner C1 |
|---|---|---|---|---|---|---|
| R1 | **Lock** | % | $ | # | @ | ! |
| R2 | 5 | 4 | 3 | 2 | 1 | _ |
| R3 | _ | - | _ | = | + | _ |

Extra col: _ / _

> Note: symbols sit one column inward from the number they modify, since
> Lock occupies the top-left pinky slot on this half.

**Right half** — numbers on home row, shifted symbols above, brackets below

| inner C1 | C2 | C3 | C4 | C5 | outer C6 |
|---|---|---|---|---|---|
| ^ | & | * | ( | ) | _ |
| 6 | 7 | 8 | 9 | 0 | _ |
| [ | ] | { | } | \ | \| |

Extra col: _ / _

**Thumbs** (fixed, same as layer 0)
- Left: Shift, Enter, Layer 1
- Right: (L2 — held), Space, ⌘

---

## Open items / not yet decided

- Right half's extra column (top two rows) is unused on layers 1 and 2 — four idle keys.
- Mouse acceleration/speed keys (`KC_MS_ACCEL0`–`2`) have no home yet.
- Layer 2's left bottom row has three empty cells for remaining punctuation.
- Redo (`⌘⇧Z`) is a two-modifier chord on one key — confirm your firmware/config handles this as expected.
- Numbers/symbols column alignment is exact on the right half, offset by one on the left (see note above).
