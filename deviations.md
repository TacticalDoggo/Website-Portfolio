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

### SITE_SPEC § 1.11 cross-page sync constraint, throughline phrase (2026-04-29)
- **SITE_SPEC said:** § 1.11 (Cross-Page Sync Constraints) claims About and Resume "both reference the same throughline phrase: shipping software to non-developers who need it to just work."
- **What's true:** The phrase appears verbatim on Resume only (locked in pass2-resume.md § 6.3, attributed to Alex verbatim, "Don't reword without explicit re-authorization"). About uses different prose ("systems where reliability matters and where the work has tangible consequences" in § 5.5) that expresses the same throughline IDEA in narrative voice.
- **Resolution:** Both Pass 2 docs are locked. The verbatim-phrase claim in SITE_SPEC § 1.11 is incorrect; the pages share a narrative throughline (audiences where reliability matters), not a verbatim phrase. Both pages ship as locked. SITE_SPEC § 1.11 should be amended in a future consolidation pass to read "share the same throughline idea" rather than "share the same throughline phrase."
- **Reason:** Locked content overrides locked process documentation when they conflict. About's § 5.5 line is narrative prose that can't be replaced with the Resume phrase without weakening the writing; Resume's phrase is locked verbatim from Alex and can't be reworded. The two genres benefit from different phrasings.

### SITE_SPEC § 1.6 voice rule 5 wink count for About page (2026-04-29)
- **SITE_SPEC said:** § 1.6 voice rule 5 lists About as a two-wink genre ("Two-wink genre: long-form personal pages (homepage, About) and hobbyist case studies (SofaBot)").
- **What's true:** The locked pass2-about.md § 5.9 specifies one protected wink ("Enough to hold a real conversation, but not enough to write code reviews" in § 5.4 paragraph 1) and explicitly identifies it as "the page's only protected wink."
- **Resolution:** Both Pass 2 docs are locked. The pass2-about.md spec is authoritative for content; ship one wink as locked. SITE_SPEC § 1.6 voice rule 5 should be amended in a future consolidation pass to align About to a one-wink count, OR pass2-about.md should be amended (with explicit user re-authorization) to add a second wink. Not preempted in this build.
- **Reason:** Locked content overrides locked process documentation when they conflict. About's wink-economy was tuned during the lock cycle; adding a second wink without an editorial reason would dilute the existing one. The locked one wink is doing its job.

### Added: Person identity rendered in two JSON-LD schemas on the homepage (2026-04-29)
- **Spec said:** SITE_SPEC § 1.7 locks a `Person` schema "sitewide, in root layout." § 2.6 locks the homepage's `WebSite` JSON-LD with the **same Person object inlined as `author`**. The two locks are independently authored and not reconciled in the spec.
- **Change:** Both schemas ship as locked. `app/_components/PersonJsonLd.tsx` renders a standalone `Person` script in `<body>` from `app/layout.tsx` (sitewide). `app/_components/WebSiteJsonLd.tsx` renders the `WebSite` JSON-LD on the homepage only with `author` inlined verbatim per § 2.6. The result: the homepage emits the Person identity in two distinct schemas (once standalone, once nested inside `WebSite.author`). Pages that already ship their own `Person` mainEntity (`/about`, `/resume`, `/contact`) similarly carry the layout-level `Person` plus their per-page mainEntity Person.
- **Reason:** Verbatim spec on both surfaces wins over deduplication. § 1.7 and § 2.6 are both locked; refactoring either to use `@id` references would deviate from the locked JSON shape on multiple already-shipped pages and is a much larger blast radius. Search engines reconcile Person entities by `name` + `sameAs`; soft duplication is acceptable. The `WebSite.author` Person object is identical byte-for-byte to the layout `Person` (modulo the omitted nested `@context`) because both import from the same `personJsonLd` constant in `app/_data/identity.ts`.

### Added: `personJsonLd` lives in `app/_data/identity.ts` as the single source of truth (2026-04-29)
- **Spec said:** SITE_SPEC § 1.11 (Cross-Page Sync Constraints) names "Email, LinkedIn, GitHub, location, availability" as the identity references that need a single source. The Person JSON-LD schema is locked in § 1.7 / § 2.6 but the spec does not prescribe where its TypeScript object lives in the codebase.
- **Change:** `app/_data/identity.ts` exports a `personJsonLd` constant alongside the existing `identity` and `nav` constants. `PersonJsonLd.tsx` (sitewide, in layout) and `WebSiteJsonLd.tsx` (homepage, as `author`) both import it. The values are verbatim from § 2.6's `author` Person block; email is intentionally absent per the § 1.7 / § 2.6 sitewide privacy note. The Person identity is now sourced from one place, the same way email / LinkedIn / GitHub already are.
- **Reason:** The Person object is a natural extension of the `identity.ts` source-of-truth pattern. Recording the same name, school, languages, technologies, location, and social URLs in three different files (or duplicating across two JSON-LD components) would create exactly the cross-page-sync hazard § 1.11 was written to prevent. Logged here as a sync-pattern note rather than as an abstraction-threshold extraction (the abstraction-threshold rule is about React component extraction; data constants in `_data/` are not subject to the 2-caller threshold and have always been the project's locked sync mechanism).

### Added: sitemap.xml `priority` and `changeFrequency` chosen by editorial weight (2026-04-29)
- **Spec said:** SITE_SPEC § 1.7 says only that `sitemap.xml` is "auto-generated by Next.js (App Router built-in)." It does not lock per-URL `priority` or `changeFrequency` values.
- **Change:** `app/sitemap.ts` assigns values reflecting editorial hierarchy: homepage `1.0`, `/projects` `0.9`, NASA / T&S / HackZurich `0.8` (locked top-3 quality-weighted slots in `projects.ts`), Nicular / SofaBot `0.7`, About / Resume `0.8`, `/resume.pdf` `0.7`, `/contact` `0.7`. `changeFrequency` is `monthly` for surfaces that change with each maintenance pass (homepage Now block, /projects, /about, /resume, resume.pdf) and `yearly` for finished case studies and the contact page.
- **Reason:** Sitemap weights are conventional SEO tuning, not spec content. The values rank surfaces a recruiter would land on (homepage, /projects, then case studies and identity pages) above the case study leaves and contact page. /contact is bumped to 0.7 (above the case study leaf default of 0.6 that an unweighted sitemap would suggest) to flag its conversion role for crawlers.

### Added: `/resume.pdf` included in sitemap.xml (2026-04-29)
- **Spec said:** SITE_SPEC § 1.7 lists `/resume.pdf` under "URL structure (locked)" with the note "static asset, hand-maintained." The spec does not explicitly include or exclude PDFs from the sitemap.
- **Change:** `app/sitemap.ts` emits an entry for `https://alexbacallao.com/resume.pdf` alongside the 10 HTML routes. Total entry count: 11.
- **Reason:** § 1.7's "URL structure (locked)" is the authoritative URL list for the site; including all 11 in the sitemap makes the locked URL list complete and discoverable by crawlers. PDFs are valid sitemap targets and the resume PDF is a deliberate, hand-maintained surface (not a download generated from the HTML page). Excluding it would hide an intentional page from search.

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
- **Reason:** Spec compliance favors visual consistency across project hero containers over per-page aspect overrides. Pre-approved by user during the step 8 dev-server browser pass on 2026-04-29; subject (the machine on the production floor) is preserved at the 16:10 crop. Flag for re-confirmation when the step 18 Lighthouse / browser pass runs across all five project pages. If a future page's source aspect can't tolerate 16:10 cleanly, the fallback is to add an optional `aspectRatio` prop to `ProjectHeader` (default `'16/10'`, accepts `'4/3'` or other) - not preempted in this build. *(Step 9 update: this fallback was realized in step 9 for HackZurich. See the per-`/projects/hackzurich-migros` Deviations block below.)*

### Added: Title-template double-suffix bug fix on three pre-existing pages (2026-04-29)
- **Spec said:** Per-page spec titles (e.g. spec § 7.8 "CNC software at T&S Machines - Alex Bacallao") render as a single `<title>` string in the document head. The layout-level title template is implementation-defined; the only spec contract is the rendered output.
- **Change:** Bundled with this step 8 commit: the rendered `<title>` was doubling `- Alex Bacallao` on every page that set `metadata.title` to the full spec-form (`%s - Alex Bacallao` template at `app/layout.tsx:32` was appending the suffix on top of the already-suffixed page title). Three call sites fixed:
    - `app/page.tsx` → `title: { absolute: 'Alex Bacallao - Software Developer' }` (opts out of template; spec title already contains the name).
    - `app/projects/page.tsx` → `title: 'Projects'` (template appends `- Alex Bacallao` once).
    - `app/projects/nasa-circadian-lighting/page.tsx` → `title: 'NASA Circadian Lighting'` (template appends).
    - `app/projects/ts-machines/page.tsx` was authored with the bare-title pattern from the start in this same commit, so no edit-from-broken state was needed there.
  All four rendered `<title>` tags now match their respective specs verbatim. `openGraph.title` was not affected (OG metadata bypasses the title template) and ships as the full string per spec on every page.
- **Reason:** The bug touched three already-shipped pages. Per the standing "no silent fixes during page review" rule, that ordinarily means a separate cleanup commit. This case is the rule's edge: identical typo-class root cause on every page, identical fix shape, found while building this page (T&S `<title>` doubling was the symptom that surfaced the systemic bug), and one of the four corrections (T&S itself) is squarely inside step 8 anyway. Bundling produces three correctly-titled pages instead of leaving two broken; splitting would have shipped step 8 with a known-broken NASA / homepage / projects-index title for however long the cleanup commit took to land. Logged here under T&S's per-page block because the discovery and the bundling decision are step 8 artifacts; the homepage / projects-index / NASA edits are noted in the change list above for traceability.

### /projects/hackzurich-migros Deviations

### Added: JSON-LD shipped in step 9, not step 15 (2026-04-29)
- **Spec said:** CLAUDE.md build order assigns JSON-LD to step 15.
- **Change:** `app/projects/hackzurich-migros/page.tsx` ships the `BreadcrumbList` + `CreativeWork` JSON-LD blocks from `docs/pass2-hackzurich-migros.md` § 8.8 inline at first publication. Field values copy-pasted verbatim, including the spec-locked `award: '1st place, Migros challenge, HackZurich 2022'` (first project page on the site to ship a CreativeWork `award` field).
- **Reason:** Same rationale as the /projects index, NASA, and T&S entries already logged. Step 15 still owns the cross-cutting SEO files (llms.txt, robots.txt, sitemap).

### Added: Hero alt text drops the `FIG. 01 - ` figure-label prefix (2026-04-29)
- **Spec said:** Spec § 8.1 locks the visible figcaption (`FIG. 01 - The team after winning the Migros challenge. HackZurich 2022, Zurich.`) but does not pin the `alt` attribute.
- **Change:** Image `alt` reuses the descriptive portion only and adds the team count for non-sighted readers: `'The 5-person team after winning the Migros challenge. HackZurich 2022, Zurich.'`. The full caption (with `FIG. 01 - `) renders in the visible `<figcaption>`.
- **Reason:** Two reasons combined. (1) Same convention as the NASA / T&S hero alt entries: a `<figure>` with `<figcaption>` already announces "figure" to assistive tech, so duplicating `FIG. 01 - ` inside `alt` produces double-announcement noise. (2) Adding `5-person` makes the alt communicate what a sighted viewer sees in the photo (5 people, not "a team" of unknown size). Matches the dek and JSON-LD's "5-person international team" framing.

### Added: Inline figure alt text drops the `FIG. 02 - ` figure-label prefix (2026-04-29)
- **Spec said:** Spec § 8.3 locks the visible figcaption (`FIG. 02 - The route view: original Migros routes mapped, disruption flagged, alternative paths surfaced.`) but does not pin the `alt`.
- **Change:** Image `alt` reuses the descriptive portion verbatim, drops the `FIG. 02 - ` label: `'The route view: original Migros routes mapped, disruption flagged, alternative paths surfaced.'`.
- **Reason:** Same convention as the hero alt deviation, extended to the inline figure (the first inline figure on the site).

### Added: Hero + inline-figure figcaptions use hyphen-minus, not em dash (2026-04-29)
- **Spec said:** Spec § 8.1 / § 8.3 write both figcaptions with U+2014 (`FIG. 01 — The team...`, `FIG. 02 — The route view...`).
- **Change:** Both render with U+002D (hyphen-minus): `FIG. 01 - The team after winning the Migros challenge.` and `FIG. 02 - The route view: ...`.
- **Reason:** Specific application of the existing site-wide hyphen-minus deviation. Logged separately for the per-page audit trail; the underlying rule does not change.

### Added: ProjectHeader `aspectRatio` prop introduced; HackZurich hero overrides to `'1/1'` (2026-04-29)
- **Spec said:** SITE_SPEC § 1.5 specifies a 16:10 hero container with the rationale *"lets technical screenshots breathe; less aggressive than 16:9."* The 16:10 default was chosen for technical screenshots; the same § 1.5 explicitly carves out the hero-team-photo-over-screenshot pattern for projects whose win is fundamentally a team achievement, with HackZurich Migros as the locked example.
- **Change:** Added an optional `aspectRatio` prop to `ProjectHeader`'s `HeroImage` and `HeroPlaceholder` types (`type HeroAspectRatio = '16/10' | '4/3' | '1/1'`; default `'16/10'`). HackZurich passes `'1/1'`. NASA and T&S omit the prop and continue to render `aspect-[16/10]` (verified post-build via `curl ... | grep aspect-`). The Image className is computed via a small `ASPECT_CLASS` lookup map so Tailwind's JIT emits each arbitrary value as a literal.
- **Reason:** Source `team-after-win.png` is 877×853 (~1:1, ratio 1.028). At the spec's 16:10 default with `object-cover`, the source loses ~35.7% of vertical content (8.3% off the top, 8.3% off the bottom of a much-cropped fit) — easily enough to slice through heads or feet of the 5-person team-after-win shot. That defeats the spec's stated reason for choosing the team photo over a UI screenshot in the first place. Step 8's commit explicitly anticipated this scenario: *"the fallback is to add an optional aspectRatio prop to ProjectHeader (default '16/10', accepts '4/3') in a separate commit."* Step 9 realizes that fallback. Square crop on HackZurich preserves all team members (~2.7% horizontal crop only, no vertical loss). Per the abstraction-threshold rule, the union is intentionally tight: only ratios with a real caller (`'4/5'` from the original four-option draft was trimmed before commit because no caller exists).

### Added: Inline figure pattern not extracted to a shared component (2026-04-29)
- **Spec said:** Spec § 8.3 defines an inline figure between paragraphs 1 and 2 of the Approach section (FIG. 02, 16:10 container, 0.5px hairline outline, mono-label figcaption, 32px top/bottom margins).
- **Change:** Inline figure markup is inlined at the call site as a `<figure>` + `<Image>` + `<figcaption>` block matching `ProjectHeader`'s hero figure shape (same `sizes`, same hairline, same className shape, same figcaption styling) minus the `priority` flag (lazy-loads since not above-the-fold) and with intentional differences for aspect ratio (16:10, native to the source) and wrapper margin (`my-8` = 32px top/bottom per spec, vs the hero's `mt-12`).
- **Reason:** This is the only inline figure specced across all five case studies (NASA, T&S, HackZurich, Nicular, SofaBot). Per the abstraction-threshold rule (saved to memory during step 9), one occurrence does not justify extracting a shared component — inline until the second caller arrives. If a future page adds an inline figure, extract then.

### /projects/nicular Deviations

### Added: JSON-LD shipped in step 10, not step 15 (2026-04-29)
- **Spec said:** CLAUDE.md build order assigns JSON-LD to step 15 ("SEO files: llms.txt, robots.txt, sitemap, JSON-LD per page").
- **Change:** `app/projects/nicular/page.tsx` ships the `BreadcrumbList` + `CreativeWork` JSON-LD blocks from `docs/pass2-nicular.md` § 10.8 inline at first publication. Field values copy-pasted verbatim, including `dateCreated: "2022-11"` (the eyebrow text reads "Late 2022" but the JSON-LD uses the spec's literal value).
- **Reason:** Same rationale as the /projects index, NASA, T&S, and HackZurich entries already logged. Schemas are fully locked in the page spec and trivially serializable; deferring just creates a "remember to come back" cost. Step 15 still owns the cross-cutting SEO files (llms.txt, robots.txt, sitemap) and any JSON-LD that hasn't already shipped.

### Added: Nicular hero figure caption uses hyphen-minus, not em dash (2026-04-29)
- **Spec said:** Spec § 10.1 writes the figure caption with U+2014 (`FIG. 01 — No image. The work was patient communication under HIPAA; nothing displayable was ours to show.`).
- **Change:** Caption renders as `FIG. 01 - No image. The work was patient communication under HIPAA; nothing displayable was ours to show.` (U+002D, hyphen-minus).
- **Reason:** Specific application of the existing site-wide hyphen-minus deviation. CLAUDE.md hard rule and step 17 linter compatibility. Logged separately for the per-page audit trail; the underlying rule does not change. Note: this is the first project page on the site to use the typographic placeholder hero (no `next/image` `alt` attribute applies — the placeholder is a styled `<div role="img">` with an auto-constructed `aria-label`); only the figcaption beneath the placeholder needs the em-dash → hyphen-minus substitution.

### /projects/sofabot Deviations

### Added: JSON-LD shipped in step 11, not step 15 (2026-04-29)
- **Spec said:** CLAUDE.md build order assigns JSON-LD to step 15 ("SEO files: llms.txt, robots.txt, sitemap, JSON-LD per page").
- **Change:** `app/projects/sofabot/page.tsx` ships the `BreadcrumbList` + `CreativeWork` JSON-LD blocks from `docs/pass2-sofabot.md` § 11.6 inline at first publication. Field values copy-pasted verbatim, including `dateCreated: "2019-09"` and the `contributor: { '@type': 'Organization', name: 'UNT Robotics Club' }` shape.
- **Reason:** Same rationale as the prior four case-study entries (/projects index, NASA, T&S, HackZurich, Nicular). Schemas are fully locked in the page spec and trivially serializable; deferring just creates a "remember to come back" cost. Step 15 still owns the cross-cutting SEO files (llms.txt, robots.txt, sitemap) and any JSON-LD that hasn't already shipped.

### Added: Hero alt text drops the `FIG. 01 - ` figure-label prefix (2026-04-29)
- **Spec said:** Spec § 11.1 locks the visible figcaption (`FIG. 01 — SofaBot at rest, somewhere on the UNT campus.`) but does not pin the `alt` attribute on the image.
- **Change:** Image `alt` reuses the descriptive portion verbatim, drops the `FIG. 01 - ` figure label: `'SofaBot at rest, somewhere on the UNT campus.'`. The full caption (with `FIG. 01 - `) renders in the visible `<figcaption>`.
- **Reason:** Same convention as the NASA / T&S / HackZurich hero alt entries; logged separately for the per-page audit trail. A `<figure>` with a `<figcaption>` already announces "figure" to assistive tech, so duplicating `FIG. 01 - ` inside `alt` produces double-announcement noise.

### Added: SofaBot hero figure caption uses hyphen-minus, not em dash (2026-04-29)
- **Spec said:** Spec § 11.1 writes the figure caption with U+2014 (`FIG. 01 — SofaBot at rest, somewhere on the UNT campus.`).
- **Change:** Caption renders as `FIG. 01 - SofaBot at rest, somewhere on the UNT campus.` (U+002D, hyphen-minus).
- **Reason:** Specific application of the existing site-wide hyphen-minus deviation. CLAUDE.md hard rule and step 17 linter compatibility. Logged separately for the per-page audit trail; the underlying rule does not change.

### Added: ProjectHeader `aspectRatio: '1/1'` override on SofaBot hero (2026-04-29)
- **Spec said:** SITE_SPEC § 1.5 specifies a 16:10 hero container as the default. Spec § 11.1 lists the SofaBot hero as 16:10. The `aspectRatio` prop on `ProjectHeader` (introduced step 9 for HackZurich) accepts `'16/10' | '4/3' | '1/1'`; default `'16/10'`.
- **Change:** SofaBot passes `aspectRatio: '1/1'`. Source `public/projects/sofabot/sofabot.png` is 684×657 (PNG IHDR-verified, ~1.041 ratio, near-square). At the spec's 16:10 default with `object-cover`, the source loses ~35% of vertical content (~17.5% off the top, ~17.5% off the bottom of a much-cropped fit) — defeating the photo, since the sofa subject occupies the full vertical range of the source. With `'1/1'`, the crop is ~4% horizontal only, no vertical loss; the sofa is preserved. NASA, T&S, Nicular continue to omit the prop and render `aspect-[16/10]` (verified post-build); HackZurich continues to render `aspect-[1/1]`.
- **Reason:** Same justification shape as the HackZurich step-9 entry: the source aspect is near-square and the 16:10 default would cut subject content. This is the second use of the `aspectRatio` prop on the site, both at `'1/1'`. The component is unchanged; the existing `ASPECT_CLASS` lookup map already emits `aspect-[1/1]` as a Tailwind literal.

### /about Deviations

### Added: JSON-LD shipped in step 12, not step 15 (2026-04-29)
- **Spec said:** CLAUDE.md build order assigns JSON-LD to step 15 ("SEO files: llms.txt, robots.txt, sitemap, JSON-LD per page").
- **Change:** `app/about/page.tsx` ships the `AboutPage` JSON-LD block from `docs/pass2-about.md` § 5.7 inline at first publication. Field values copy-pasted verbatim. Email is intentionally omitted per spec § 5.7 note (privacy: only the contact page's JSON-LD exposes email).
- **Reason:** Same rationale as the /projects index, NASA, T&S, HackZurich, Nicular, and SofaBot entries already logged. Schema is fully locked in the page spec and trivially serializable; deferring just creates a "remember to come back" cost. Step 15 still owns the cross-cutting SEO files (llms.txt, robots.txt, sitemap) and any JSON-LD that hasn't already shipped.

### /contact Deviations

### Added: JSON-LD shipped in step 14, not step 15 (2026-04-29)
- **Spec said:** CLAUDE.md build order assigns JSON-LD to step 15 ("SEO files: llms.txt, robots.txt, sitemap, JSON-LD per page").
- **Change:** `app/contact/page.tsx` ships the `ContactPage` JSON-LD block from `docs/pass2-contact.md` § 4.7 inline at first publication. Field values copy-pasted verbatim, including `mainEntity.email: "alex.bacallao1996@gmail.com"` and `mainEntity.sameAs: ["https://linkedin.com/in/alejandrobacallao", "https://github.com/TacticalDoggo"]`. **This is the only page on the site whose JSON-LD includes the `email` field** (sitewide privacy pattern: every other page omits email from structured data; locked exception per spec § 4.7 note "the contact page is a different context, its entire purpose is to expose the email"). `telephone` is intentionally absent (PDF-only sitewide policy from step 13). The `mainEntity` Person carries `email` and `sameAs` only; no `contactPoint`, no `homeLocation`, no `jobTitle`, no `knowsLanguage` - the contact page's JSON-LD is intentionally minimal versus the resume page's `ProfilePage` or the about page's `AboutPage` Person mainEntity (which carry richer biographical fields). Hardcoded verbatim per the spec lock; values mirror `app/_data/identity.ts` and a code comment in the page module names that mirroring.
- **Reason:** Same rationale as the eight prior entries (/projects index, NASA, T&S, HackZurich, Nicular, SofaBot, About, Resume). Schema is fully locked in the page spec and trivially serializable; deferring just creates a "remember to come back" cost. Step 15 still owns the cross-cutting SEO files (llms.txt, robots.txt, sitemap) and any JSON-LD that hasn't already shipped (none expected - every page that ships in steps 4-14 has shipped its JSON-LD inline at first publication).

### Added: Elsewhere bullet row gap shipped at 16px, not 20px (2026-04-29)
- **Spec said:** § 4.5 specifies "20px row gap between items" for the Elsewhere bulleted list.
- **Change:** RoleBulletList renders gap-4 (16px) sitewide; /contact uses the shared component verbatim. Cumulative 4px difference across three list items deemed below the threshold for adding a `gap` prop to a five-caller component.
- **Reason:** Abstraction-threshold rule - the other four callers (NASA, T&S, HackZurich, Nicular My Role bullets) ship at 16px. Adding a per-page gap variant for a single 4px delta would be over-engineering. If a future page specs a meaningfully different gap (>=8px delta), revisit and add a tight union prop. Not a content or voice issue; pure pixel pedantry.

### /resume Deviations

### Added: JSON-LD shipped in step 13, not step 15 (2026-04-29)
- **Spec said:** CLAUDE.md build order assigns JSON-LD to step 15 ("SEO files: llms.txt, robots.txt, sitemap, JSON-LD per page").
- **Change:** `app/resume/page.tsx` ships the `ProfilePage` JSON-LD block from `docs/pass2-resume.md` § 6.11 inline at first publication. Field values copy-pasted verbatim, including the locked 3-entry `award` array (`"1st place, Migros challenge, HackZurich 2022"`, `"1st place, UNT Robotics Competition 2020"`, `"3rd place, UNT Robotics Competition 2019"`), the 12-entry `knowsAbout`, the 3-entry `knowsLanguage` with ISO codes, and the `mainEntity.@type: Person` with `worksFor` (T&S Machines and Tools / Gainesville TX) + `alumniOf` (UNT) + `homeLocation` (Ft Worth TX) + `sameAs` (LinkedIn + GitHub). **Email and `telephone` are both intentionally omitted** per spec § 6.11 note: email is sitewide privacy pattern (only `/contact` exposes email in structured data), and phone is PDF-only (HTML and JSON-LD both omit phone per spec § 6.0 / docs/CLAUDE.md privacy rule).
- **Reason:** Same rationale as the seven prior entries (/projects index, NASA, T&S, HackZurich, Nicular, SofaBot, About). Schema is fully locked in the page spec and trivially serializable; deferring just creates a "remember to come back" cost. Step 15 still owns the cross-cutting SEO files (llms.txt, robots.txt, sitemap) and any JSON-LD that hasn't already shipped (none expected — every page that ships in steps 4-13 has shipped its JSON-LD inline at first publication).
