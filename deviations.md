# Build Deviations from Spec

This file tracks all changes made during the build process that deviate from SITE_SPEC.md. Claude Code MUST read this file before building or modifying any page. When a deviation is added, note the date, the page affected, and what changed.

---

## Site-Wide Deviations

### Added: Tailwind v4 utility names mirror spec category prefixes verbatim (2026-04-29)
- **Spec said:** Section 1.2 names color tokens with category prefixes (`bg-page`, `bg-paper`, `bg-inverse`, `text-primary`, `text-secondary`, `text-muted`, `text-inverse`, `border-hairline`, `border-rule`, `border-heavy`, etc.). The spec does not prescribe Tailwind utility class names.
- **Change:** The `@theme inline` layer in `app/globals.css` exposes `--color-*` aliases that mirror section 1.2 names verbatim, including category prefixes. This produces utility classNames like `bg-bg-page`, `text-text-primary`, and `border-border-hairline`. JSX uses these full names (e.g. `className="text-text-secondary"`).
- **Reason:** Keeps the spec's vocabulary load-bearing in classNames. Prefers spec fidelity over class brevity. Avoids a parallel rename system that future readers would have to translate against the spec. Raw CSS variables in `:root` (e.g. `--bg-page`, `--text-primary`) match section 1.2 exactly and are reachable via `var(--name)`.

### Added: Section eyebrows use hyphen-minus, not em dash (2026-04-29)
- **Spec said:** Section 2.5 (and analogous patterns elsewhere in the spec) writes section eyebrows as `§ 04 — CONTACT` using the em dash character (U+2014).
- **Change:** Eyebrows render as `§ 04 - CONTACT` (hyphen-minus, U+002D). First instance shipped in `app/_components/Footer.tsx`. Same convention applies to all future section eyebrows on every page.
- **Reason:** CLAUDE.md hard rule: "No em dashes. Anywhere. Ever. Use hyphens, colons, or periods." The spec text is internally inconsistent with this rule; the rule wins. The em-dash linter from build step 17 will fail on any U+2014 in copy. Visual difference between em dash and hyphen-minus is negligible at mono-label size (11px).

---

## Per-Page Deviations

(Entries will be added per page as the build progresses. Use the format below.)

<!--
### [Page Name] Deviations

### Changed/Added/Removed: [Brief title] (YYYY-MM-DD)
- **Spec said:** [What the spec defined]
- **Change:** [What actually shipped]
- **Reason:** [Why the change was made]
-->
