# Character Usage Frequency

Reference data for keymap design decisions (which keys deserve the easiest
positions, and which key pairs are worth pairing up for combos). Four
sections: English letters, common letter combinations (bigrams/trigrams),
English punctuation/symbols, and programming symbols for JS/TS and PHP.
Confidence varies by section — see each section's methodology note.

---

## 1. English letters (most → least used)

**Confidence: high.** Peter Norvig's analysis of the Google Books corpus
(~3 trillion letters, 743 billion word occurrences across 97,565 distinct
words). This is the most-cited modern letter-frequency source and matches
independent 19th-century print-shop counts closely.

| Rank | Letter |
|------|--------|
| 1    | E      |
| 2    | T      |
| 3    | A      |
| 4    | O      |
| 5    | I      |
| 6    | N      |
| 7    | S      |
| 8    | R      |
| 9    | H      |
| 10   | L      |
| 11   | D      |
| 12   | C      |
| 13   | U      |
| 14   | M      |
| 15   | F      |
| 16   | P      |
| 17   | G      |
| 18   | W      |
| 19   | Y      |
| 20   | B      |
| 21   | V      |
| 22   | K      |
| 23   | X      |
| 24   | J      |
| 25   | Q      |
| 26   | Z      |

Mnemonic for the top 12: **ETAOIN SRHLDC** (the classic typesetters'
"ETAOIN SHRDLU" reordered slightly — R, L, and C turned out more common
than the 19th-century count had them).

Source: [Norvig, "English Letter Frequency Counts: Mayzner Revisited"](https://www.norvig.com/mayzner.html)

---

## 2. Common letter combinations (most → least used)

**Confidence: high for bigrams (measured frequency data, same corpus as
section 1 — percentages omitted from the table below, but the ranking
reflects them). Rank-order only for trigrams** — Norvig's page lists the
top 50 three-letter sequences by rank but doesn't publish percentages for
them on the page itself (they're available as a separate downloadable
dataset it links to, which I didn't fetch).

### Bigrams (two-letter sequences)

| Rank | Bigram |
|------|--------|
| 1    | TH     |
| 2    | HE     |
| 3    | IN     |
| 4    | ER     |
| 5    | AN     |
| 6    | RE     |
| 7    | ON     |
| 8    | AT     |
| 9    | EN     |
| 10   | ND     |
| 11   | TI     |
| 12   | ES     |
| 13   | OR     |
| 14   | TE     |
| 15   | OF     |
| 16   | ED     |
| 17   | IS     |
| 18   | IT     |
| 19   | AL     |
| 20   | AR     |
| 21   | ST     |
| 22   | TO     |
| 23   | NT     |
| 24   | NG     |
| 25   | SE     |
| 26   | HA     |
| 27   | AS     |
| 28   | OU     |
| 29   | IO     |
| 30   | LE     |

### Trigrams (three-letter sequences)

Rank order only — no published percentages from this source. Top 30 of
the 50 listed.

| Rank | Trigram |
|------|---------|
| 1    | THE     |
| 2    | AND     |
| 3    | ING     |
| 4    | ION     |
| 5    | TIO     |
| 6    | ENT     |
| 7    | ATI     |
| 8    | FOR     |
| 9    | HER     |
| 10   | TER     |
| 11   | HAT     |
| 12   | THA     |
| 13   | ERE     |
| 14   | ATE     |
| 15   | HIS     |
| 16   | CON     |
| 17   | RES     |
| 18   | VER     |
| 19   | ALL     |
| 20   | ONS     |
| 21   | NCE     |
| 22   | MEN     |
| 23   | ITH     |
| 24   | TED     |
| 25   | ERS     |
| 26   | PRO     |
| 27   | THI     |
| 28   | WIT     |
| 29   | ARE     |
| 30   | ESS     |

Source: [Norvig, "English Letter Frequency Counts: Mayzner Revisited"](https://www.norvig.com/mayzner.html)

---

## 3. English punctuation and symbols (most → least used)

**Confidence: high**, for relative ordering — absolute percentages weren't
available from this source, only rank order. From a character-frequency
study of general English prose (email and plain text, not code), which is
the relevant corpus for this section since programming symbols get their
own section below.

| Rank | Symbol  | Common role                          |
|------|---------|--------------------------------------|
| 1    | `,`     | comma                                |
| 2    | `.`     | period                               |
| 3    | `'`     | apostrophe                           |
| 4    | `"`     | quotation mark                       |
| 5    | `-`     | hyphen/dash                          |
| 6    | `)`     | closing parenthesis                  |
| 7    | `(`     | opening parenthesis                  |
| 8    | `:`     | colon                                |
| 9    | `!`     | exclamation mark                     |
| 10   | `?`     | question mark                        |
| 11   | `;`     | semicolon                            |
| 12   | `/`     | slash                                |
| 13   | `[`     | opening bracket                      |
| 14   | `]`     | closing bracket                      |
| 15   | `%`     | percent                              |
| 16   | `$`     | dollar                               |
| 17   | `\|`    | pipe                                 |
| 18   | `*`     | asterisk                             |
| 19   | `=`     | equals                               |
| 20   | `_`     | underscore                           |
| 21   | `+`     | plus                                 |
| 22   | `>`     | greater-than                         |
| 23   | `\`     | backslash                            |
| 24   | `<`     | less-than                            |
| 25   | `&`     | ampersand                            |
| 26   | `^`     | caret                                |
| 27   | `#`     | hash/pound                           |
| 28   | `@`     | at sign                              |
| 29   | `` ` `` | backtick                             |
| 30   | `~`     | tilde                                |
| —    | `{` `}` | curly braces (tied for least common) |

Two supporting data points worth noting: in a large sample of the Brown
Corpus, the comma alone accounted for roughly **45%** of all punctuation
marks — by far the single dominant symbol in English prose, consistent
with its #1 rank here. And corpus studies comparing 20 English-speaking
countries found period and question-mark usage varies the *least* between
regional varieties of English, while parentheses, exclamation marks,
apostrophes, and hyphens vary the *most* — worth keeping in mind if this
data needs to generalize across dialects/regions.

Sources:
[M. Dickens, "Letter Frequency"](https://mdickens.me/typing/letter_frequency.html) (punctuation-frequency table, prose-only variant) ·
[Frequency distributions of punctuation marks in English: evidence from large-scale corpora](https://www.researchgate.net/publication/328512136_Frequency_distributions_of_punctuation_marks_in_English_Evidence_from_large-scale_corpora)

---

## 4. Programming symbols — JS/TS and PHP

**Confidence: moderate — this section is a reasoned estimate, not measured
corpus data, and should be read differently from sections 1-2 above.**

### Methodology note

The one study I found that specifically measures character frequency
*per programming language* (including JavaScript and PHP by name) is
[xahlee.info's "Computer Languages Characters Frequency"](http://xahlee.info/comp/computer_language_char_distribution.html).
It was unreachable — HTTP 503 — across 7 attempts spanning both its
`.info` and `.org` domains, so I could not quote its actual JS/PHP numbers
directly, and I'm not willing to present remembered or inferred figures
from it as if they were verified.

What I have instead, and what this section is actually built from:

1. **Real, cited, verified data** — [Pascal Getreuer's "Designing a Symbol Layer"](https://getreuer.info/posts/keyboards/symbol-layer/index.html)
   measured character frequency (≥40K characters per corpus) for C/C++,
   Python, and Shell. C/C++ is a reasonable structural proxy for JS/TS/PHP
   — all are C-family, brace-and-semicolon languages — and its top ranks
   (`_ * , ) ( . / 0 ; - 1 = 2 3 :`) anchor the ordering below.
2. **Documented language syntax facts**, not opinions — e.g. PHP requires
   a `$` sigil on literally every variable reference, TypeScript requires
   `:` for type annotations, JS/TS arrow functions use `=>` pervasively.
   These are true regardless of corpus, and they're why the two lists
   below diverge from plain C/C++ and from each other.

Treat the *rough grouping* (top ~10 vs. middle vs. rare) as reasonably
trustworthy; treat the *exact rank within a group* as a judgment call, not
a measurement. If exact figures matter, the xahlee.info page is worth
retrying directly.

### JavaScript / TypeScript

| Rank | Symbol  | Why                                                                                            |
|------|---------|------------------------------------------------------------------------------------------------|
| 1    | `.`     | property/method access, chaining (`.then()`, `.map().filter()`)                                |
| 2    | `(` `)` | calls, grouping, conditionals                                                                  |
| 3    | `{` `}` | blocks, object literals, destructuring                                                         |
| 4    | `,`     | argument/element separators                                                                    |
| 5    | `;`     | statement terminator (near-universal in practice, ASI aside)                                   |
| 6    | `'`     | string literals (single-quote is the more common style-guide default)                          |
| 7    | `=`     | assignment, `==`/`===`, part of `=>`                                                           |
| 8    | `"`     | string literals (double-quote, JSX attributes)                                                 |
| 9    | `[` `]` | arrays, indexing, destructuring                                                                |
| 10   | `:`     | object literal keys, ternaries — and in TS, type annotations (pushes this well above plain JS) |
| 11   | `` ` `` | template literals                                                                              |
| 12   | `>`     | comparisons, part of `=>`, JSX/generics                                                        |
| 13   | `<`     | comparisons, generics, JSX                                                                     |
| 14   | `!`     | negation, TS non-null assertion (`x!`)                                                         |
| 15   | `?`     | ternary, optional chaining (`?.`), TS optional/nullable                                        |
| 16   | `&`     | logical/bitwise AND                                                                            |
| 17   | `\|`    | logical/bitwise OR — TS union types (`string \| number`) push this up vs. plain JS             |
| 18   | `+`     | addition, string concatenation                                                                 |
| 19   | `-`     | subtraction, negative numbers                                                                  |
| 20   | `_`     | naming (less common than in Python/PHP — camelCase dominates JS/TS)                            |
| 21   | `*`     | multiplication, generators (`function*`)                                                       |
| 22   | `/`     | division, regex delimiters, comments                                                           |
| 23   | `%`     | modulo                                                                                         |
| 24   | `^`     | bitwise XOR                                                                                    |
| 25   | `~`     | bitwise NOT                                                                                    |
| 26   | `@`     | decorators (TS/Angular-style)                                                                  |
| 27   | `#`     | private class fields (modern JS/TS)                                                            |
| 28   | `\`     | escape sequences, regex                                                                        |
| 29   | `$`     | template-literal interpolation marker (`${}`), jQuery-convention naming                        |

### PHP

| Rank | Symbol  | Why                                                                                                   |
|------|---------|-------------------------------------------------------------------------------------------------------|
| 1    | `$`     | mandatory sigil on **every** variable reference — PHP's single most distinctive high-frequency symbol |
| 2    | `(` `)` | calls, conditionals                                                                                   |
| 3    | `;`     | statement terminator, mandatory (unlike JS)                                                           |
| 4    | `.`     | string concatenation — very common, distinct from JS's property-access-dominant usage                 |
| 5    | `,`     | separators                                                                                            |
| 6    | `'`     | string literals (single-quote preferred for non-interpolated strings)                                 |
| 7    | `=`     | assignment, comparison                                                                                |
| 8    | `-` `>` | object member access (`->`) — ubiquitous in OOP PHP                                                   |
| 9    | `{` `}` | blocks                                                                                                |
| 10   | `"`     | string literals (double-quote, for interpolation)                                                     |
| 11   | `[` `]` | arrays (short array syntax `[]` is now idiomatic), indexing                                           |
| 12   | `:`     | ternary, return-type declarations, `switch`/`case`, named arguments (PHP 8)                           |
| 13   | `_`     | snake_case — the traditional PHP/WordPress naming convention, notably more common than in JS          |
| 14   | `!`     | negation                                                                                              |
| 15   | `&`     | references (`&$var`), bitwise/logical AND                                                             |
| 16   | `?`     | ternary, nullable types (`?string`), null coalescing (`??`)                                           |
| 17   | `\|`    | bitwise/logical OR, union types (PHP 8)                                                               |
| 18   | `\`     | namespace separator (`\App\Models\User`) — notably more frequent than in JS, which has no equivalent  |
| 19   | `+`     | addition                                                                                              |
| 20   | `*`     | multiplication                                                                                        |
| 21   | `/`     | division, comments                                                                                    |
| 22   | `%`     | modulo                                                                                                |
| 23   | `^`     | bitwise XOR                                                                                           |
| 24   | `~`     | bitwise NOT, error suppression (rare/deprecated)                                                      |
| 25   | `@`     | error-suppression operator, PHP 8 attributes                                                          |
| 26   | `#`     | PHP 8 attributes (`#[...]`), single-line comments                                                     |
| 27   | `` ` `` | shell_exec backticks (rare, discouraged)                                                              |

Source (verified baseline data): [Getreuer, "Designing a Symbol Layer"](https://getreuer.info/posts/keyboards/symbol-layer/index.html)
