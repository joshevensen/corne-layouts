# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Letters & digits (§1) and Punctuation & symbols (§2) sections in `docs/mac-keycodes.md`, documenting US-ANSI position keycodes, shifted characters, and macOS Option-key glyphs.
- Keycode label entries for shifted digits (LSFT(KC_1)–LSFT(KC_0)) in `scripts/lib/keycode-labels.js` render as their resultant glyphs (!@#$%^&*()); updated `docs/mac-keycodes.md` to document this behavior.

### Changed
- Layer 1 (letters): Repositioned all 26 letters into columns 1-5; columns 0 and 6 now empty except R2 column 0 (L/C).
- Layer 2 (symbols & navigation): Shifted-digit symbols (!@#$%^&*()) display as glyphs instead of ⇧-style labels; navigation keys (PgUp/PgDn/Home/End) and arrow keys added to row 1.
- Layer 3 (punctuation & mouse): Punctuation and backtick relocated to left hand; right hand is now dedicated to mouse controls; DF layer switching and modifier keys (Ctl, Alt) removed.
- Columns 0 and 6 are now KC_NO on all layers for consistent edge-column architecture.

[Unreleased]: https://github.com/joshevensen/corne-layouts/compare/HEAD...HEAD
