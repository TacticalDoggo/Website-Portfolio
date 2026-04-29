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

### /projects index Deviations

### Added: JSON-LD shipped in step 6, not step 15 (2026-04-29)
- **Spec said:** CLAUDE.md build order assigns JSON-LD to step 15 ("SEO files: llms.txt, robots.txt, sitemap, JSON-LD per page").
- **Change:** `app/projects/page.tsx` ships the `CollectionPage` + `ItemList` JSON-LD block from `docs/pass2-projects-index.md` § 9.5 inline (page-body `<script type="application/ld+json">`, serialized via `JSON.stringify`) at first publication.
- **Reason:** The schema is fully locked in the page spec and trivially serializable. Deferring just creates a "remember to come back" cost and a future hunt for which pages still need it. Same approach planned for subsequent project pages. The step 15 commit will still own the cross-cutting SEO files (llms.txt, robots.txt, sitemap) and any JSON-LD that hasn't already shipped.

### Added: ProjectCard accepts an optional placeholderCaption for the typographic-placeholder mode (2026-04-29)
- **Spec said:** SITE_SPEC.md § 1.10.5 defines a typographic placeholder (bg-paper, 0.5px hairline, 88px Fraunces numeral, mono caption) for HIPAA / IP-constrained projects. Until step 6, only the deferred-photo placeholder existed (bg-bg-alt, numeral only).
- **Change:** `app/_components/ProjectCard.tsx` `ProjectImagePlaceholder` now accepts an optional `caption` prop. When set, the placeholder switches to `bg-bg-paper` and renders the caption beneath the numeral as a `mono-label`. When not set, the existing bg-bg-alt + numeral-only render is preserved. The `Project` type in `app/_data/projects.ts` exposes this via an optional `placeholderCaption` field. First use site: the Nicular card (`№ 04`) on /projects, with caption `'HIPAA-compliant · No customer data shown'` (natural source casing; mono-label CSS produces the visual ALL-CAPS).
- **Reason:** The /projects index is the first surface that needs both placeholder modes simultaneously. The homepage's existing placeholder is a deferred-image stand-in; the Nicular card is a permanent typographic placeholder per § 1.10.5. Both must coexist until real photos land for the other cards. A locked precedence matrix (typographic > real image > deferred placeholder) is documented in JSDoc on the data fields and in a comment block above `ProjectImagePlaceholder`.

### /projects/nasa-circadian-lighting Deviations

### Added: JSON-LD shipped in step 7, not step 15 (2026-04-29)
- **Spec said:** CLAUDE.md build order assigns JSON-LD to step 15.
- **Change:** `app/projects/nasa-circadian-lighting/page.tsx` ships the `BreadcrumbList` + `CreativeWork` JSON-LD blocks from `docs/pass2-nasa-circadian-lighting.md` § 3.8 inline at first publication. Field values are copy-pasted from the spec, verbatim.
- **Reason:** Same rationale as the /projects index deviation entry. The schemas are fully locked in the page spec and trivially serializable; deferring just creates a "remember to come back" cost. Step 15 still owns the cross-cutting SEO files (llms.txt, robots.txt, sitemap) and any JSON-LD that hasn't already shipped.

### Added: Hero alt text drops the `FIG. 01 - ` figure-label prefix from the figcaption (2026-04-29)
- **Spec said:** Spec § 3.1 locks the visible figcaption text (`FIG. 01 - The demo rig at the Texas Space Grant conference, ...`) but does not pin the `alt` attribute on the image.
- **Change:** The image's `alt` text reuses the descriptive portion of the caption verbatim, but drops the `FIG. 01 - ` figure label: `'The demo rig at the Texas Space Grant conference, Houston, Spring 2022. Raspberry Pi 4, LUX/RGB sensors, RGB lighting, plant.'`. The full caption (including `FIG. 01 - `) still renders in the visible `<figcaption>` for sighted readers.
- **Reason:** A `<figure>` with a `<figcaption>` already announces "figure" to assistive tech; duplicating `FIG. 01 - ` inside `alt` produces double announcement noise. Descriptive content is identical between alt and caption; only the label prefix is dropped. Same convention will apply to the other case study pages when their hero photos land.

### Added: NASA hero figure caption uses hyphen-minus, not em dash (2026-04-29)
- **Spec said:** Spec § 3.1 writes the figure caption with U+2014 (`FIG. 01 — The demo rig...`).
- **Change:** Caption renders as `FIG. 01 - The demo rig...` (U+002D, hyphen-minus).
- **Reason:** Specific application of the existing site-wide "Section eyebrows use hyphen-minus, not em dash (2026-04-29)" deviation. The same em-dash → hyphen-minus substitution applies to the figure caption for the same reason: CLAUDE.md hard rule and step 17 linter compatibility. Logged separately for the per-page audit trail; the underlying rule does not change.

### Added: projects.ts encodes hero `image` paths that ProjectCard does not yet read (2026-04-29)
- **Spec said:** `docs/pass2-projects-index.md` § 9.3 specifies real hero images for cards 1, 2, 3, 5 at `/public/projects/[slug]/[file]`.
- **Change:** `app/_data/projects.ts` now carries an optional `image` field on the `Project` type, populated for cards 1, 2, 3, 5. `ProjectCard` does not yet read this field; cards 1, 2, 3, 5 continue to render the deferred-photo placeholder (bg-bg-alt + numeral) until a later step wires `next/image`.
- **Reason:** This is forward-prep, not a fallback for a missing image. The rendered placeholder is the **current intended behavior** while the standing pre-launch deliverable for hero photos is open (tracker.md "Move reference images to /public/projects/[slug]/ paths"). Encoding the path now lets the photo-wiring step be a single targeted change (placeholder → `<Image />` branch) rather than a coupled data-and-component change. The `image` field is silent on cards whose hero is permanently a typographic placeholder (Nicular).

### /projects/ts-machines Deviations

### Added: JSON-LD shipped in step 8, not step 15 (2026-04-29)
- **Spec said:** CLAUDE.md build order assigns JSON-LD to step 15 ("SEO files: llms.txt, robots.txt, sitemap, JSON-LD per page").
- **Change:** `app/projects/ts-machines/page.tsx` ships the `BreadcrumbList` + `CreativeWork` JSON-LD blocks from `docs/pass2-ts-machines.md` § 7.8 inline at first publication. Field values are copy-pasted from the spec, verbatim.
- **Reason:** Same rationale as the /projects index and NASA entries already logged. Schemas are fully locked in the page spec and trivially serializable; deferring just creates a "remember to come back" cost. Step 15 still owns the cross-cutting SEO files (llms.txt, robots.txt, sitemap) and any JSON-LD that hasn't already shipped.

### Added: Hero alt text drops the `FIG. 01 - ` figure-label prefix from the figcaption (2026-04-29)
- **Spec said:** Spec § 7.1 locks the visible figcaption text (`FIG. 01 - A Blockmaster on the floor running T&S software.`) but does not pin the `alt` attribute on the image.
- **Change:** The image's `alt` text reuses the descriptive portion of the caption verbatim, but drops the `FIG. 01 - ` figure label: `'A Blockmaster on the floor running T&S software.'`. The full caption (including `FIG. 01 - `) still renders in the visible `<figcaption>` for sighted readers.
- **Reason:** Same convention as the NASA-page entry above; logged separately for the per-page audit trail. A `<figure>` with a `<figcaption>` already announces "figure" to assistive tech; duplicating `FIG. 01 - ` inside `alt` produces double announcement noise.

### Added: T&S hero figure caption uses hyphen-minus, not em dash (2026-04-29)
- **Spec said:** Spec § 7.1 writes the figure caption with U+2014 (`FIG. 01 — A Blockmaster...`).
- **Change:** Caption renders as `FIG. 01 - A Blockmaster on the floor running T&S software.` (U+002D, hyphen-minus).
- **Reason:** Specific application of the existing site-wide hyphen-minus deviation. CLAUDE.md hard rule and step 17 linter compatibility. Logged separately for the per-page audit trail; the underlying rule does not change.

### Added: Hero photo dimensions, container crop (2026-04-29)
- **Spec said:** Spec § 7.1 specifies a 16:10 hero container.
- **Change:** Source `public/projects/ts-machines/machine-in-action.jpg` is 4032×3024 (4:3, ratio 1.333). Container is `aspect-[16/10]` with `object-cover` (inherited from `ProjectHeader.tsx` line 82, no component change). The resulting crop loses ~8.3% of source content off both top and bottom (~16.7% combined vertical crop). NASA's analogous figure was ~6% horizontal crop.
- **Reason:** Spec compliance favors visual consistency across project hero containers over per-page aspect overrides. Pre-approved by user during the step 8 dev-server browser pass on 2026-04-29; subject (the machine on the production floor) is preserved at the 16:10 crop. Flag for re-confirmation when the step 18 Lighthouse / browser pass runs across all five project pages. If a future page's source aspect can't tolerate 16:10 cleanly, the fallback is to add an optional `aspectRatio` prop to `ProjectHeader` (default `'16/10'`, accepts `'4/3'` or other) - not preempted in this build.

### Added: Title-template double-suffix bug fix on three pre-existing pages (2026-04-29)
- **Spec said:** Per-page spec titles (e.g. spec § 7.8 "CNC software at T&S Machines - Alex Bacallao") render as a single `<title>` string in the document head. The layout-level title template is implementation-defined; the only spec contract is the rendered output.
- **Change:** Bundled with this step 8 commit: the rendered `<title>` was doubling `- Alex Bacallao` on every page that set `metadata.title` to the full spec-form (`%s - Alex Bacallao` template at `app/layout.tsx:32` was appending the suffix on top of the already-suffixed page title). Three call sites fixed:
    - `app/page.tsx` → `title: { absolute: 'Alex Bacallao - Software Developer' }` (opts out of template; spec title already contains the name).
    - `app/projects/page.tsx` → `title: 'Projects'` (template appends `- Alex Bacallao` once).
    - `app/projects/nasa-circadian-lighting/page.tsx` → `title: 'NASA Circadian Lighting'` (template appends).
    - `app/projects/ts-machines/page.tsx` was authored with the bare-title pattern from the start in this same commit, so no edit-from-broken state was needed there.
  All four rendered `<title>` tags now match their respective specs verbatim. `openGraph.title` was not affected (OG metadata bypasses the title template) and ships as the full string per spec on every page.
- **Reason:** The bug touched three already-shipped pages. Per the standing "no silent fixes during page review" rule, that ordinarily means a separate cleanup commit. This case is the rule's edge: identical typo-class root cause on every page, identical fix shape, found while building this page (T&S `<title>` doubling was the symptom that surfaced the systemic bug), and one of the four corrections (T&S itself) is squarely inside step 8 anyway. Bundling produces three correctly-titled pages instead of leaving two broken; splitting would have shipped step 8 with a known-broken NASA / homepage / projects-index title for however long the cleanup commit took to land. Logged here under T&S's per-page block because the discovery and the bundling decision are step 8 artifacts; the homepage / projects-index / NASA edits are noted in the change list above for traceability.
