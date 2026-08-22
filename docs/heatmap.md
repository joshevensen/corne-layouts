# Reach Effort Heatmap

Which physical key positions on this board are easiest vs. hardest to
reach, scored 1 (easiest) upward. This isn't a measured/empirical dataset
for this exact board — no published effort grid I found covers a 46-key
Corne with 4 extra keys specifically — it's an original scale built from
well-corroborated ergonomic principles found across multiple sources (see
Methodology), reusing this repo's own render pipeline so it lines up
exactly with the layer grids in `layouts/*.md`.

## The grid

```
      0       1       2       3       4       5       6      │      6       5       4       3       2       1       0   
R3 [  5  ] [  3  ] [  3  ] [  3  ] [  3  ] [  5  ] [  6  ]   │   [  6  ] [  5  ] [  3  ] [  3  ] [  3  ] [  3  ] [  5  ]
R2 [  2  ] (  1  ) (  1  ) (  1  ) (  1  ) [  2  ] [  6  ]   │   [  6  ] [  2  ] (  1  ) (  1  ) (  1  ) (  1  ) [  2  ]
R1 [  5  ] [  4  ] [  4  ] [  4  ] [  4  ] [  5  ]           │           [  5  ] [  4  ] [  4  ] [  4  ] [  4  ] [  5  ]

R0                         [  2  ] (  1  ) [  2  ]           │           [  2  ] (  1  ) [  2  ]                        
```

Row/column conventions match `README.md`: `R3` top → `R0` thumbs, columns
outer→inner per half, `(parens)` marking the same home-position cells used
throughout `layouts/*.md`. Blank cells are physical positions that don't
exist (the thumb row's unused columns, the bottom row's missing extra
column) — there's no key there to score.

## Legend

| Score | Meaning |
|---|---|
| **1** | Home position. The 4 resting-finger columns on the home row, and the primary thumb key each thumb naturally lands on. No movement from rest. |
| **2** | One lateral stretch from home, no row change. The home row's outer (pinky) and inner (index) columns — same row, just reaching sideways — and the secondary thumb keys, which stay on the easy, strong thumb cluster. |
| **3** | Top row, core column. One row of *upward* travel, in the same 4 columns each finger already rests over on the home row. |
| **4** | Bottom row, core column. One row of *downward* travel, same core columns — scored a step above the top row, since the top row is the easier of the two directions (see Methodology). |
| **5** | Top or bottom row, outer (pinky) or inner (index) column. A row-shift *and* a lateral stretch combined — the worst reach still achievable by curling/stretching a finger without lifting the hand, in either direction. |
| **6** | The 4 extra keys. Not a stretch — a genuinely separate switch that requires lifting the hand off its resting position to reach at all, breaking touch-typing by feel. Hardest tier, by a wide margin. |

## Methodology

I looked for a published, key-by-key numeric effort grid specifically for
a Corne-shaped board (or close enough to adapt directly) before building
anything original. The closest match — the [Colemak Mod-DH project's effort
grid](https://colemakmods.github.io/mod-dh/model.html), the standard
reference tool for this kind of scoring — documents its formula (a
Fitts's-Law-style distance/finger-strength model) and shows the *results*
as rendered images, but the actual per-key numbers live in JS/image assets
I couldn't extract through a text fetch. Rather than guess at those
specific figures, I built the scale above from the same project's stated
*principles*, corroborated across several independent sources:

- **Home row is the ergonomic baseline** — the whole point of touch typing
  is resting there; every other row costs more. (Colemak Mod-DH model;
  general columnar/split ergonomics writing.)
- **Lateral reach costs less than vertical reach.** Moving to the home
  row's outer or inner column is one finger stretching sideways; moving to
  the top or bottom row is the finger leaving its resting height
  entirely — a materially bigger motion. This is why score 2 (lateral-only)
  sits below scores 3-4 (vertical-only) in this scale.
- **Upward reach costs less than downward reach.** This one's judgment-call
  territory rather than something I found stated numerically in a source —
  it's a real, commonly-reported preference (fingers curl upward toward the
  top row more naturally than they extend down toward the bottom row for
  most people), and it matches what you described. Scored as one full tier
  of difference (3 vs. 4) for the core columns. Once a lateral stretch is
  also involved (score 5), I stopped trying to further rank top-stretch vs.
  bottom-stretch against each other — both already require a diagonal
  reach, which is awkward enough in either direction that I don't think
  the direction still dominates the way it does for a straight vertical
  reach. If your experience says otherwise, this is the tier to adjust.
- **Pinky and far-index reaches carry extra cost.** Multiple sources note
  pinky movements are penalized more heavily than equivalent-distance
  moves by stronger fingers — "effectively a double penalty for pinky keys
  far out on the sides." This board's 6-column-per-hand shape puts exactly
  one such stretch column on each side of the 4 core columns (confirmed
  directly against this repo's own home-position marking in
  `scripts/lib/layout-grid.js`, which excludes columns 0 and 5 for the
  same reason).
- **Thumb keys are cheap.** Corne-specific community writing on exactly
  this board shape confirms the design intent: common keys get moved "from
  pinky positions to thumb keys" because the thumb is strong and already at
  rest nearby — consistent with scoring every thumb key at 1 or 2,
  regardless of which of the three thumb positions it is.
- **A key that isn't reachable without lifting the hand is categorically
  worse than any in-place stretch.** This is this board's own physical
  fact (per your description of the 4 extra keys), not something a generic
  effort grid — built for boards without a disconnected extra cluster —
  would even model. It's scored as its own top tier for that reason.

Sources: [Colemak Mod-DH — Keyboard effort grid](https://colemakmods.github.io/mod-dh/model.html) ·
[Keyboard Effort Grids — Colemak forum](https://forum.colemak.com/topic/2705-keyboard-effort-grids/) ·
[Mark Stosberg — Corne 3x5+1 keyboard layout](https://mark.stosberg.com/markstos-corne-3x5-1-keyboard-layout/) ·
[Getreuer — Glossary of keyboard terms](https://getreuer.info/posts/keyboards/glossary/index.html) (columnar stagger / ulnar deviation)
