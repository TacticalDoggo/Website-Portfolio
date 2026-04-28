# Build Deviations from Spec

This file tracks all changes made during the build process that deviate from SITE_SPEC.md. Claude Code MUST read this file before building or modifying any page. When a deviation is added, note the date, the page affected, and what changed.

---

## Site-Wide Deviations

### Added: Tailwind v4 utility names mirror spec category prefixes verbatim (2026-04-29)
- **Spec said:** Section 1.2 names color tokens with category prefixes (`bg-page`, `bg-paper`, `bg-inverse`, `text-primary`, `text-secondary`, `text-muted`, `text-inverse`, `border-hairline`, `border-rule`, `border-heavy`, etc.). The spec does not prescribe Tailwind utility class names.
- **Change:** The `@theme inline` layer in `app/globals.css` exposes `--color-*` aliases that mirror section 1.2 names verbatim, including category prefixes. This produces utility classNames like `bg-bg-page`, `text-text-primary`, and `border-border-hairline`. JSX uses these full names (e.g. `className="text-text-secondary"`).
- **Reason:** Keeps the spec's vocabulary load-bearing in classNames. Prefers spec fidelity over class brevity. Avoids a parallel rename system that future readers would have to translate against the spec. Raw CSS variables in `:root` (e.g. `--bg-page`, `--text-primary`) match section 1.2 exactly and are reachable via `var(--name)`.

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
