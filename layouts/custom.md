# custom.vil — Visual Layout

Source of truth for `dist/custom.vil` — edit the sections below, then run `npm run build` to produce it. Run `npm run format` first if you've hand-edited this file and columns have drifted out of alignment.

## Layer 0

```
      0       1       2       3       4       5       6      │      6       5       4       3       2       1       0   
R3 [  ·  ] [  Q  ] [  W  ] [  E  ] [  R  ] [  T  ] [  ·  ]   │   [  ·  ] [  Y  ] [  U  ] [  I  ] [  O  ] [  P  ] [  ·  ]
R2 [  ·  ] (  A  ) (  S  ) (  D  ) (  F  ) [  G  ] [  ·  ]   │   [  ·  ] [  H  ] (  J  ) (  K  ) (  L  ) (  ·  ) [  ·  ]
R1 [  ·  ] [  Z  ] [  X  ] [  C  ] [  V  ] [  B  ]           │           [  N  ] [  M  ] [  ·  ] [  ·  ] [  ·  ] [  ·  ]

R0                         [ Sft ] ( Spc ) [MO(2)]           │           [MO(3)] ( Ent ) [ Cmd ]                        
```

## Layer 1

```
      0       1       2       3       4       5       6      │      6       5       4       3       2       1       0   
R3 [  ·  ] [  Q  ] [  Y  ] [  O  ] [  U  ] [  ·  ] [  ·  ]   │   [  ·  ] [  ·  ] [  X  ] [  L  ] [  D  ] [  P  ] [  Z  ]
R2 [  B  ] (  C  ) (  I  ) (  A  ) (  E  ) [  ·  ] [  ·  ]   │   [  ·  ] [  K  ] (  H  ) (  T  ) (  N  ) (  S  ) [  W  ]
R1 [  ·  ] [  ·  ] [  ·  ] [  ·  ] [  ·  ] [  ·  ]           │           [  R  ] [  J  ] [  M  ] [  G  ] [  F  ] [  V  ]

R0                         [ Sft ] ( Spc ) [MO(2)]           │           [MO(3)] ( Ent ) [ Cmd ]                        
```

## Layer 2

```
      0       1       2       3       4       5       6      │      6       5       4       3       2       1       0   
R3 [  `  ] [  -  ] [  =  ] [  [  ] [  ]  ] [  \  ] [  ·  ]   │   [  ·  ] [  ·  ] [  /  ] [  .  ] [  ,  ] [  '  ] [  ;  ]
R2 [  ·  ] (  1  ) (  2  ) (  3  ) (  4  ) [  5  ] [  ·  ]   │   [  ·  ] [  0  ] (  9  ) (  8  ) (  7  ) (  6  ) [  ·  ]
R1 [  ·  ] [  ·  ] [  ·  ] [  ·  ] [  ·  ] [  ·  ]           │           [  ·  ] [  ·  ] [  ·  ] [  ·  ] [  ·  ] [  ·  ]

R0                         [ Sft ] ( Spc ) [MO(2)]           │           [MO(3)] ( Ent ) [ Cmd ]                        
```

## Layer 3

```
      0       1       2       3       4       5       6      │      6       5       4       3       2       1       0   
R3 [ Ctl ] [ Alt ] [ Cmd ] [ Sft ] [  ·  ] [  ·  ] [  ·  ]   │   [  ·  ] [  ·  ] [ Clk ] [RClk ] [MClk ] [ Wh↑ ] [ Wh↓ ]
R2 [DF(0)] (DF(1)) (DF(4)) (DF(5)) (  ·  ) [  ·  ] [  ·  ]   │   [  ·  ] [  ·  ] ( M←  ) ( M↓  ) ( M↑  ) ( M→  ) [  ·  ]
R1 [ CW  ] [Caps ] [LLCK ] [  ·  ] [  ·  ] [  ·  ]           │           [  ←  ] [  ↓  ] [  ↑  ] [  →  ] [PgUp ] [PgDn ]

R0                         [ Sft ] ( Spc ) [MO(2)]           │           [MO(3)] ( Ent ) [ Cmd ]                        
```

## Layer 4

```
      0       1       2       3       4       5       6      │      6       5       4       3       2       1       0   
R3 [  ·  ] [  Q  ] [  W  ] [  F  ] [  P  ] [  B  ] [  ·  ]   │   [  ·  ] [  J  ] [  L  ] [  U  ] [  Y  ] [  ·  ] [  ·  ]
R2 [  ·  ] (  A  ) (  R  ) (  S  ) (  T  ) [  G  ] [  ·  ]   │   [  ·  ] [  M  ] (  N  ) (  E  ) (  I  ) (  O  ) [  ·  ]
R1 [  ·  ] [  Z  ] [  X  ] [  C  ] [  D  ] [  V  ]           │           [  K  ] [  H  ] [  ·  ] [  ·  ] [  ·  ] [  ·  ]

R0                         [ Sft ] ( Spc ) [MO(2)]           │           [MO(3)] ( Ent ) [ Cmd ]                        
```

## Layer 5

```
      0       1       2       3       4       5       6      │      6       5       4       3       2       1       0   
R3 [  ·  ] [  ·  ] [  ·  ] [  ·  ] [  P  ] [  Y  ] [  ·  ]   │   [  ·  ] [  F  ] [  G  ] [  C  ] [  R  ] [  L  ] [  ·  ]
R2 [  ·  ] (  A  ) (  O  ) (  E  ) (  U  ) [  I  ] [  ·  ]   │   [  ·  ] [  D  ] (  H  ) (  T  ) (  N  ) (  S  ) [  ·  ]
R1 [  ·  ] [  ·  ] [  Q  ] [  J  ] [  K  ] [  X  ]           │           [  B  ] [  M  ] [  W  ] [  V  ] [  Z  ] [  ·  ]

R0                         [ Sft ] ( Spc ) [MO(2)]           │           [MO(3)] ( Ent ) [ Cmd ]                        
```

## Combos

Two (or more) keys pressed together trigger a third action, with no timing penalty on either key by itself (unlike mod-tap) — see `docs/qmk-features.md` for good candidates (adjacent same-hand pairs you would not otherwise roll through, e.g. `Esc` on `Q`+`W`).

List 1-4 trigger keycodes per row (comma-separated) and the output keycode they produce, using full keycode names — not the short labels in the layer grids above. Up to 32 combos total; leave the table with no data rows for none.

| Trigger Keys | Output |
|--------------|--------|

## Macros

A macro plays back a recorded sequence of keystrokes from a single key — good candidates: your email address, CLI invocations, git command prefixes, long import paths.

One `### Macro N` subsection per macro you want (N is 0-15, matching the `M0`-`M15` keycode you'd put on a key in a layer grid to trigger it). Each line is one action: `- text: "literal string"` types text as-is; `- tap: KC_A` / `- down: KC_A` / `- up: KC_A` take a comma-separated list of keycodes tapped/pressed/released together; `- delay: 100` waits that many milliseconds. Up to 16 macros total; omit a subsection for one you don't use.

_No macros are currently defined._

## Settings

QMK Settings values from this file, in Vial's numeric QSID form. See `scripts/lib/settings-catalog.js` for where these names/descriptions come from and how confident they are (ID 8 is unidentified).

| ID | Setting                 | Value | Description                                                                                                                |
|----|-------------------------|-------|----------------------------------------------------------------------------------------------------------------------------|
| 1  | Grave Escape Override   | 0     | Whether QK_GESC sends ` / ~ instead of Esc when Shift/Cmd is held.                                                         |
| 2  | Combo Term              | 50    | Max time (ms) between two combo keys to still count as one combo.                                                          |
| 3  | Auto Shift Enabled      | 0     | Master on/off switch for Auto Shift (0 = disabled).                                                                        |
| 4  | Auto Shift Timeout      | 175   | Hold duration (ms) past which Auto Shift sends the shifted character.                                                      |
| 5  | One-Shot Tap Toggle     | 5     | Number of taps on a one-shot mod/layer key that locks it on.                                                               |
| 6  | One-Shot Timeout        | 5000  | Time (ms) a one-shot modifier/layer stays armed if unused.                                                                 |
| 7  | Tapping Term            | 200   | Hold duration (ms) that turns a mod-tap/layer-tap key into its hold action.                                                |
| 8  | Unidentified            | 0     | Not found in quantum/qmk_settings.c — likely declared in a per-feature file this lookup didn’t reach. Meaning unconfirmed. |
| 9  | Mouse Key Delay         | 10    | Delay (ms) before cursor movement starts after a mouse key is held.                                                        |
| 10 | Mouse Key Interval      | 20    | Time (ms) between cursor movement steps while a mouse key is held.                                                         |
| 11 | Mouse Key Move Delta    | 8     | Pixels the cursor moves per movement step.                                                                                 |
| 12 | Mouse Key Max Speed     | 10    | Top speed multiplier the cursor accelerates to while held.                                                                 |
| 13 | Mouse Key Time To Max   | 30    | Time (ms) to reach max cursor speed from a standstill.                                                                     |
| 14 | Mouse Wheel Delay       | 10    | Delay (ms) before scroll-wheel movement starts after a wheel key is held.                                                  |
| 15 | Mouse Wheel Interval    | 80    | Time (ms) between scroll-wheel steps while a wheel key is held.                                                            |
| 16 | Mouse Wheel Max Speed   | 8     | Top speed multiplier the scroll wheel accelerates to.                                                                      |
| 17 | Mouse Wheel Time To Max | 40    | Time (ms) to reach max scroll speed from a standstill.                                                                     |
| 18 | Tap Code Delay          | 0     | Delay (ms) QMK inserts between the press and release of any sent keystroke.                                                |
| 19 | Tap-Hold Caps Delay     | 80    | Extra delay (ms) added after tapping Caps Lock, to cover the OS caps-lock lag.                                             |
| 20 | Tapping Toggle          | 5     | Number of taps on a TT() layer key that locks the layer on.                                                                |
| 21 | Magic Settings          | 0     | Bitmask of legacy QMK 'Magic' key remaps (e.g. swap Ctrl/Caps) — 0 means none active.                                      |
