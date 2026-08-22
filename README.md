# corne-layouts

Vial layouts for a 46-key Corne V4.1 (3×6 + 3 thumbs + 4 extra), managed as
plain-text Markdown instead of hand-edited JSON.

## The one rule

**Only edit files in `layouts/*.md`.** Everything under `dist/` is
generated — running `npm run build` overwrites it completely, so any
hand-edit made there is lost on the next build. `dist/default.vil` is the
one exception on both counts: it's the vendor's factory dump, it's
read-only (enforced by `.github/workflows/protect-default-layout.yml`),
and it isn't edited via this pipeline at all — it's not shown in
`layouts/`, and `npm run build`/`npm run format` both skip it by name.

## Workflow

1. Edit a layer grid, the Settings table, Combos, or Macros in a
   `layouts/<name>.md` file.
2. Run `npm run build`. It reads every `layouts/*.md` (except `default`)
   and writes the matching `dist/<name>.vil` — the file Vial actually
   imports.
3. Import `dist/<name>.vil` into Vial (Design tab → Import Keymap).

If you've hand-edited a `layouts/*.md` file and its columns have drifted
out of alignment (e.g. after typing a longer keycode into a cell), run
`npm run format` first — it re-renders the file from its own content,
fixing alignment without changing any value. `npm run build` doesn't care
about alignment either way; `format` is purely for readability.

## Scripts

| Command | Does |
|---|---|
| `npm run build` | `layouts/*.md` → `dist/*.vil` |
| `npm run format` | Re-aligns a `layouts/*.md` file in place, no value changes |
| `npm run new` | Creates a new blank `layouts/<name>.md` |

### `npm run new` — creating a new layout

```sh
npm run new -- my-layout
```

This creates `layouts/my-layout.md` with every real key set to `KC_NO`
(nothing assigned), the same layer count and Settings values as
`dist/default.vil`, and no Combos or Macros. Edit it, then run
`npm run build` to produce `dist/my-layout.vil`.

Run it with no name and it defaults to `layouts/blank.md`:

```sh
npm run new
```

**About that `--`:** this is npm's own syntax, not specific to this repo —
`npm run <script> -- <args>` is how you pass arguments through to the
script behind an npm script. Without the `--`, npm tries to interpret
`my-layout` as an npm flag instead of forwarding it, which doesn't work.
`npm run new my-layout` (no `--`) will not do what you want.

The name must be letters, digits, and hyphens only, and can't be
`default` (reserved) or an existing file.

## Reading a layer grid

Each layer in a `layouts/*.md` file looks like this:

```
      0       1       2       3       4       5       6      │      6       5       4       3       2       1       0   
R3 [ Tab ] [  Q  ] [  W  ] [  E  ] [  R  ] [  T  ] [ Cmd ]   │   [  ·  ] [  Y  ] [  U  ] [  I  ] [  O  ] [  P  ] [Bspc ]
R2 [ Esc ] (  A  ) (  S  ) (  D  ) (  F  ) [  G  ] [ Alt ]   │   [  ·  ] [  H  ] (  J  ) (  K  ) (  L  ) (  ;  ) [  '  ]
R1 [ CW  ] [  Z  ] [  X  ] [  C  ] [  V  ] [  B  ]           │           [  N  ] [  M  ] [  ,  ] [  .  ] [  /  ] [ Del ]

R0                         [ Sft ] ( Spc ) [ MO1 ]           │           [ Cmd ] ( Ent ) [ MO2 ]                        
```

- **Row labels** `R3`→`R0`: `R3` is the top row, `R1` the bottom row, `R0`
  the thumb row. `R2` is the home row.
- **Column numbers** (the header line) are the actual index into that
  row's array in the `.vil` JSON — useful for cross-referencing the raw
  file. The left half reads outer→inner left-to-right; the right half is
  mirrored, so both halves' outer edges sit at the page edges and the
  center gap lands in the middle.
- **`[brackets]`** hold a real keycode, short-labeled (`Cmd` = `KC_LGUI`,
  `⌘C` = `LGUI(KC_C)`, `MO1` = a layer-momentary key, etc).
- **`(parens)`** are the same thing as brackets — a real keycode, same
  short labels — except they mark a **home-position** key: the 4 columns
  each hand naturally rests on (R2, columns 1-4) and the thumb key a
  resting thumb lands on (R0, column 4). Same 10 coordinates on every
  layer, regardless of what's assigned there. Purely a visual anchor; it
  doesn't change what the key does. `format` always puts parens/brackets
  at the position-correct spot regardless of which one you typed.
- **`·`** is `KC_NO` — a real, physical key that's deliberately unbound
  (does nothing when pressed).
- **Blank space** (no brackets at all) means there's no physical key at
  that position — e.g. the thumb row's unused columns, or the bottom
  row's missing "extra" column. Nothing to assign there.

Type either a short label from an existing cell, or any full QMK/Vial
keycode (`KC_LEFT_CTRL`, `LSFT(KC_9)`, `MO(2)`, `TD(1)`, ...) — anything
not in the short-label table is used as-is.

## Settings, Combos, and Macros

Below the layer grids, each `layouts/*.md` has:

- **Settings** — QMK Settings (tap term, mouse key speed, etc), one row
  per numeric ID with a name and description. See
  `scripts/lib/settings-catalog.js` for where those descriptions come
  from — every row must stay present (even unchanged) for `build` to
  accept the file.
- **Combos** — up to 32 rows of `1-4 trigger keycodes → 1 output keycode`.
  Leave the table empty for none.
- **Macros** — one `### Macro N` (N 0-15) subsection per macro, each line
  one action (`text`, `tap`, `down`, `up`, `delay`). Omit a subsection for
  a macro you don't use. Combo/macro cells use full keycode names, not the
  layer grids' short labels — see the note at the top of
  `scripts/lib/parse-layout-md.js`.

## Repo layout

| Path | What |
|---|---|
| `layouts/*.md` | **Source of truth.** Edit these. |
| `dist/*.vil` | Generated by `npm run build`. Import into Vial. Don't hand-edit. |
| `dist/default.vil` | Vendor factory dump. Read-only, not part of this pipeline. |
| `scripts/` | `build.js`, `format.js`, `new-layout.js`, and shared logic in `scripts/lib/`. |
| `docs/` | Keycode reference and QMK/Vial feature notes. |
| `firmware/` | Firmware images (`.uf2`), unrelated to the keymap pipeline. |
