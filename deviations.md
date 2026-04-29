# Build Deviations from Spec

This file tracks all changes made during the build process that deviate from SITE_SPEC.md. Claude Code MUST read this file before building or modifying any page. When a deviation is added, note the date, the page affected, and what changed.

---

## Site-Wide Deviations

### Added: Tailwind v4 utility names mirror spec category prefixes verbatim (2026-04-29)
- **Spec said:** Section 1.2 names color tokens with category prefixes (`bg-page`, `bg-paper`, `bg-inverse`, `text-primary`, `text-secondary`, `text-muted`, `text-inverse`, `border-hairline`, `border-rule`, `border-heavy`, etc.). The spec does not prescribe Tailwind utility class names.
- **Change:** The `@theme inline` layer in `app/globals.css` exposes `--color-*` aliases that mirror section 1.2 names verbatim, including category prefixes. This produces utility classNames like `bg-bg-page`, `text-text-primary`, and `border-border-hairline`. JSX uses these full names (e.g. `className="text-text-secondary"`).
- **Reason:** Keeps the spec's vocabulary load-bearing in classNames. Prefers spec fidelity over class brevity. Avoids a parallel rename system that future readers would have to translate against the spec. Raw CSS variables in `:root` (e.g. `--bg-page`, `--text-primary`) match section 1.2 exactly and are reachable via `var(--name)`.

### Added: Section eyebrows use hyphen-minus, not em dash (2026-04-29)
- **Spec said:** Section 2.5 (and analogous patterns elsewhere in the spec) writes section eyebrows with an em dash character (U+2014) between the section number and the label, e.g. the contact eyebrow rendered with U+2014 instead of a hyphen.
- **Change:** Eyebrows render as `§ 04 - CONTACT` (hyphen-minus, U+002D). First instance shipped in `app/_components/Footer.tsx`. Same convention applies to all future section eyebrows on every page.
- **Reason:** CLAUDE.md hard rule: "No em dashes. Anywhere. Ever. Use hyphens, colons, or periods." The spec text is internally inconsistent with this rule; the rule wins. The em-dash linter from build step 17 will fail on any U+2014 in copy. Visual difference between em dash and hyphen-minus is negligible at mono-label size (11px).

### Added: Masthead and Footer inner shell width set to 880px (2026-04-29)
- **Spec said:** Sections 2.1 and 2.5 specify masthead padding (16px / 32px desktop) and footer padding (80px / 32px desktop) but do not pin a content max-width.
- **Change:** Both components keep their outer element at full viewport width so the masthead's sticky background and scroll-driven hairline border span the full viewport, and the footer's inverted dark background full-bleeds. Only the inner content row is wrapped in `max-w-[880px] mx-auto`. Footer's previous `max-w-[1200px]` is now `max-w-[880px]`.
- **Reason:** The Claude Design handoff for the homepage (locked in conversation with the design tool) renders the masthead, hero, cards, and footer interior all aligned to an 880px editorial column so the wordmark sits directly above the hero H1. This matches the typeset-essay aesthetic; 1200px would let the footer drift wider than the body. The full-width outer chrome (sticky bg, scroll hairline, full-bleed inverted footer) is preserved. Applies sitewide.

### Added: Footer mode selected by client wrapper that reads usePathname (2026-04-29)
- **Spec said:** Section 2.5 specifies the Footer renders in `'contact'` mode on the homepage and `'sitewide'` mode on every other page. It does not prescribe how the mode is selected.
- **Change:** A small client component `app/_components/SiteFooter.tsx` calls `usePathname()` and passes the right mode to `<Footer />`. The wrapper is mounted once in `app/layout.tsx` so every page gets the correct footer without per-page wiring.
- **Reason:** Keeps `app/layout.tsx` a Server Component (so future pages can use server features inside the layout subtree) while centralizing the mode decision. Alternative considered: per-page `<Footer />` rendering. Rejected because every page would need to remember to render the footer with the right mode, which is exactly the kind of mistake a single global wiring prevents.

### Added: Root layout owns the single `<main>` element (2026-04-29)
- **Spec said:** Spec does not prescribe where `<main>` lives.
- **Change:** `app/layout.tsx` wraps `{children}` in a `<main>` element. Pages MUST NOT render their own `<main>`; page bodies use a top-level fragment. Homepage at `app/page.tsx` follows this convention.
- **Reason:** Exactly one `<main>` per document is the WAI-ARIA expectation. Putting it in the layout removes a per-page boilerplate and a per-page failure mode (forgetting `<main>`, or double-wrapping). All future pages inherit this rule.

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
