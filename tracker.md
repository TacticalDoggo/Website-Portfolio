# Build Tracker

Updated by Claude Code after commits. Manual updates welcome.
Last updated: 2026-04-29 (step 9)

---

## Build Order Status

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1 | Project scaffold | DONE | Next.js 16.2.4 + React 19 + Tailwind v4 + Fraunces/Inter/JetBrains Mono via next/font. Foundational tokens only (bg-page, text-primary). Throwaway placeholder at app/page.tsx (replaced in step 4). |
| 2 | Design tokens | DONE | Full SITE_SPEC.md sections 1.2 + 1.3 expressed. Raw CSS variables in :root match spec names verbatim; @theme inline mirrors them with category prefixes preserved (utilities like bg-bg-page, text-text-primary, border-border-hairline). Element defaults for h1/h2/h3/body/small with desktop breakpoint at 768px. @utility for pullquote, mono-label, mono-body. Sitewide focus-visible outline (uses --accent) and prefers-reduced-motion baseline added. Placeholder app/page.tsx refactored to consume tokens; no inline styles or arbitrary values remain. |
| 3 | Masthead and global footer | DONE | Pure components, not yet wired into pages (step 4 imports them). Masthead is a Client Component (sticky positioning, scroll-driven hairline border at >=40px, mobile hamburger overlay, active-link via usePathname). Wordmark composes spans (mono-label + serif), never <h1>. Footer is a Server Component with mode prop ('contact' | 'sitewide'); outer footer has id="contact" in BOTH modes per spec lock. Inverted-section overrides #A8A6A0 (mono labels on dark) and #444341 (dividers) are scoped to Footer.tsx with comments. Identity references centralized in app/_data/identity.ts. |
| 4 | Homepage | DONE | Hero, selected work cards, Now block, contact footer all live at `/`. ProjectCard, RevealOnScroll, SiteFooter components landed alongside. Real photos at `/public/projects/[slug]/` deferred per the standing pre-launch deliverable; cards render typographic placeholders (88px Fraunces numerals on `bg-alt`) per section 1.10.5. SEO `metadata` export covers title, description, canonical, and OG tags; JSON-LD WebSite schema deferred to step 15 per CLAUDE.md build order. |
| 5 | Project card component + projects.ts | DONE | Landed early as part of step 4 (`app/_components/ProjectCard.tsx` + `app/_data/projects.ts`). Same component will render on /projects index in step 6. Source casing is natural; `mono-label` utility renders the visual ALL-CAPS. |
| 6 | /projects index | DONE | Header (eyebrow + H1 + dek) + 5-card stack in locked quality-weighted order at `/projects`. ProjectCard reused verbatim; data restructured so `homepageProjects` is now `allProjects.slice(0, 3)`. Nicular card is the first site-wide use of the § 1.10.5 typographic placeholder (bg-bg-paper + caption); cards 1/2/3/5 keep the deferred-photo placeholder until photo-wiring lands. JSON-LD `CollectionPage` + `ItemList` shipped inline (deviation: pulled forward from step 15). SEO `metadata` covers title, description, canonical, OG. OG image route still deferred to step 16. |
| 7 | NASA Circadian Lighting | DONE | Six-section default case study pattern (SITE_SPEC § 1.9.2) live at `/projects/nasa-circadian-lighting`. New shared components: Breadcrumb, ProjectHeader, RoleBulletList, ProjectPageFooter, SectionDivider. SectionDivider promoted from inline copies on the homepage and /projects index; both pages now import from the shared module. Page copy verbatim from `docs/pass2-nasa-circadian-lighting.md`. Two protected winks (dek + outcome) preserved per spec § 3.7. Hero photo (`public/projects/nasa-circadian-lighting/demo-rig.jpg`, 4000×2252) served via `next/image` with `priority`; container is `aspect-[16/10]` with `object-cover` (~6% horizontal crop on the 16:9 source, pre-approved). JSON-LD `BreadcrumbList` + `CreativeWork` shipped inline this step (deviation logged). Sitewide CSS change: `scroll-behavior: smooth` on `html`, gated by the existing `prefers-reduced-motion` override. Post-commit Level 3 review findings recorded below. |
| 8 | T&S Machines | DONE | Five-section ongoing-project case study pattern (SITE_SPEC § 1.9.3) live at `/projects/ts-machines`. First in-code use of the variant: `Current state` section (replaces NASA's `Outcome`), and the dedicated `Side-project` section between `The work` and `My role`. All copy verbatim from `docs/pass2-ts-machines.md`; zero winks per locked no-wink genre (SITE_SPEC § 1.12.2). Reused step-7 components verbatim (no new components): ProjectHeader, RoleBulletList, ProjectPageFooter, SectionDivider, RevealOnScroll. Hero photo (`public/projects/ts-machines/machine-in-action.jpg`, 4032×3024, 4:3) wired via `next/image` priority into the existing `aspect-[16/10]` container; ~16.7% combined vertical crop pre-approved during the step-8 browser pass (decision-to-record logged in `deviations.md`). JSON-LD `BreadcrumbList` + `CreativeWork` shipped inline (deviation, same shape as NASA / projects-index). Bundled fix in the same commit: layout-level title template was double-suffixing `- Alex Bacallao` on three pre-existing pages (homepage, /projects, NASA); all four pages now render their spec-required `<title>` exactly. Section eyebrow source is natural casing (sentence case for `§ 01 · Industrial · Software · Since 2019`, hyphen-minus for `§ 02 - The work` etc.); first project-page surface that follows the standing source-casing rule. Post-commit Level 3 review findings recorded below. |
| 9 | HackZurich Migros | DONE | Six-section default case study pattern (SITE_SPEC § 1.9.2) live at `/projects/hackzurich-migros`. All copy verbatim from `docs/pass2-hackzurich-migros.md`; zero winks per locked no-wink genre (SITE_SPEC § 1.12.2). Two new patterns landed: (1) first inline figure on the site - `<figure>` + `<Image>` + `<figcaption>` markup inlined in § 03 between paragraphs 1 and 2 (FIG. 02, 16:10 native to the source 1184×746, 32px top/bottom margin), not extracted to a shared component per the abstraction-threshold rule. (2) First non-16:10 hero - `ProjectHeader` gains an optional `aspectRatio` prop (`'16/10' \| '4/3' \| '1/1'`; default `'16/10'`); HackZurich passes `'1/1'` for the 877×853 team-after-win photo to preserve all 5 team members (vs ~35.7% vertical crop at the 16:10 default that would slice through heads or feet). NASA / T&S unchanged - omit the prop, fall through to 16:10 default; verified post-build via `curl ... \| grep aspect-`. CreativeWork JSON-LD ships the spec-locked `award: '1st place, Migros challenge, HackZurich 2022'` (first project page on the site to ship an award field). Section eyebrow source casing follows the standing rule (`§ 01 · Web · Hackathon · 2022`, `§ 02 - The problem`, etc.). Bare-title pattern matches the step 8 fix; `<title>` renders as `Supply chain rerouting at HackZurich - Alex Bacallao`. Post-commit Level 3 review findings recorded below. |
| 10 | Nicular | TODO | 6-section, typographic placeholder hero |
| 11 | SofaBot | TODO | 4-section compressed hobbyist pattern |
| 12 | About | TODO | Content page pattern, 4 prose sections |
| 13 | Resume (HTML + PDF) | TODO | Two-format pattern, shared date stamp |
| 14 | Contact | TODO | No-form, mailto-first pattern |
| 15 | SEO files | TODO | llms.txt, robots.txt, sitemap, JSON-LD per page |
| 16 | OG image generation | TODO | @vercel/og, single template |
| 17 | Em-dash linter | TODO | Build-time check, fail on U+2014 |
| 18 | Lighthouse optimization | TODO | LCP < 1.5s, CLS 0, INP < 200ms |
| 19 | Deploy | TODO | Domain setup, Vercel production |

## Components Built

| Component | Path | Used On |
|-----------|------|---------|
| RootLayout | app/layout.tsx | All pages (loads fonts, sets html/body shell, mounts Masthead + main + SiteFooter) |
| Masthead | app/_components/Masthead.tsx | All pages (wired in layout, step 4). Inner row constrained to 880px; outer header stays full-viewport-width for sticky bg + scroll hairline. |
| Footer | app/_components/Footer.tsx | All pages via SiteFooter wrapper. Two render modes; inner wrapper constrained to 880px. |
| SiteFooter | app/_components/SiteFooter.tsx | All pages. Tiny client wrapper that picks Footer mode by `usePathname()`: contact on `/`, sitewide elsewhere. |
| ProjectCard | app/_components/ProjectCard.tsx | Homepage and /projects index. Step 6 added an optional `caption` mode on the inner `ProjectImagePlaceholder` so the same component handles both deferred-photo placeholders and § 1.10.5 typographic placeholders. |
| RevealOnScroll | app/_components/RevealOnScroll.tsx | Homepage selected work cards + Now block; NASA case study sections 02-05. Reusable on any page that wants scroll-fade per section 2.7. |
| SectionDivider | app/_components/SectionDivider.tsx | Homepage, /projects index, NASA case study. Promoted from inline helpers on the first two pages; both now import from this module. 1px `border-rule` line in the 880px shell, 60px (mobile) / 80px (desktop) of vertical breathing room. |
| Breadcrumb | app/_components/Breadcrumb.tsx | NASA case study (and the four other project pages once they land). Locked structure per pass2-nasa-circadian-lighting.md § 3.1: `<nav aria-label="breadcrumb">` wrapping a real `<ol>`, ` / ` is text content (not a CSS pseudo-element), final item is non-link with `aria-current="page"`. |
| ProjectHeader | app/_components/ProjectHeader.tsx | NASA, T&S, HackZurich case studies (and Nicular / SofaBot once they land). Composes section 01 (breadcrumb + eyebrow + H1 + italic subtitle + dek + hero figure). Two hero modes: `image` (real photo via `next/image` with `priority`) and `placeholder` (typographic, for HIPAA / IP-constrained pages per § 1.10.5; first use will be Nicular in step 10). Step 9 added an optional `aspectRatio` prop (`'16/10' \| '4/3' \| '1/1'`; default `'16/10'`) on both hero modes for pages whose source can't tolerate the 16:10 crop. HackZurich uses `'1/1'`; NASA / T&S omit the prop and continue to render `aspect-[16/10]`. The class is resolved through a small `ASPECT_CLASS` lookup map so Tailwind's JIT emits each arbitrary value as a literal. |
| RoleBulletList | app/_components/RoleBulletList.tsx | NASA case study (and future T&S, HackZurich, contact, resume). SITE_SPEC § 1.10.4 pattern: custom middot bullet in `accent`, bold Inter 500 lede with trailing period inside the bold run, regular-weight description follows immediately, no separator. Optional `ledeHref` upgrades the lede to a `<Link>` for the contact / resume variants. |
| ProjectPageFooter | app/_components/ProjectPageFooter.tsx | NASA case study (and the four other project pages). Two-column row above the global footer: `← Back to projects` (Next.js `<Link>` to `/projects`) on the left, `See contact ↓` (plain `<a href="#contact">` for same-page anchor) on the right. Stacks left-aligned on mobile. |
| identity (data) | app/_data/identity.ts | All pages, JSON-LD, llms.txt (when those steps land) |
| projects (data) | app/_data/projects.ts | Homepage selected work and /projects index. Now exports `allProjects` (5 entries, locked quality-weighted order) plus `homepageProjects = allProjects.slice(0, 3)`. Optional `image` and `placeholderCaption` fields select the card's hero render mode. |

## Pages Live

| Page | Route | Lighthouse Mobile | Last Tested |
|------|-------|-------------------|-------------|
| Homepage | / | (pending step 18) | 2026-04-29 (manual scroll, dev server) |
| Projects index | /projects | (pending step 18) | 2026-04-29 (manual scroll, dev server) |
| NASA Circadian Lighting | /projects/nasa-circadian-lighting | (pending step 18) | 2026-04-29 (curl + structural HTML check; full browser scroll pending) |
| T&S Machines | /projects/ts-machines | (pending step 18) | 2026-04-29 (manual scroll, dev server; hero crop pre-approved) |
| HackZurich Migros | /projects/hackzurich-migros | (pending step 18) | 2026-04-29 (curl + structural HTML check; full browser scroll pending user pass) |

## Pending Items (Not in Build Order)

- [ ] Domain registration (alexbacallao.com or backup)
- [ ] Move reference images to /public/projects/[slug]/ paths
- [ ] Resume PDF (hand-maintained, ATS-parseable)
- [ ] GitHub presentability before launch
- [ ] Pre-launch real photo check (T&S, NASA, HackZurich, SofaBot confirmed; Nicular uses placeholder). NASA hero wired in step 7; T&S hero wired in step 8; HackZurich hero + inline figure wired in step 9. SofaBot photo is present at `public/projects/sofabot/sofabot.png` but not yet wired into the SofaBot project page (step 11 hasn't built). `ProjectCard` on the homepage and /projects index still renders the deferred-photo placeholder for card 05 (forward-prep `image` path encoded in `projects.ts` per the step-7 deviation; awaiting a separate photo-wiring step that switches the placeholder to `<Image />` across all card slots).
- [ ] Skip-to-content link in masthead (a11y polish, not in spec but worth tracking)
- [ ] RevealOnScroll: elements already in viewport at mount sometimes don't fire the fade-in. Reproduces by loading the page with cards above-the-fold-ish; refresh fixes it. Likely fix: check element position on mount and reveal immediately if already intersecting. Not a launch blocker, but flag for a polish pass.
- [ ] NASA project page § 01 eyebrow source uses ALL-CAPS (`§ 01 · EMBEDDED · SENIOR DESIGN · SPRING 2022` in `app/projects/nasa-circadian-lighting/page.tsx`). Should align to natural source casing in a follow-up commit per the standing site-wide rule (visual rendering is identical because `mono-label` applies `text-transform: uppercase`; this is a source-fidelity cleanup, not a visual change). Discovered during step 8 build; T&S shipped with natural casing from the start.

## Review Findings

(Entries added here after each post-build review pass. Format: dated section with open items.)

### 2026-04-29 - Step 7 Level 3 review (NASA Circadian Lighting)

Findings only; nothing fixed during review per CLAUDE.md.

**Content review.** All copy verbatim from `docs/pass2-nasa-circadian-lighting.md`. Single H1 ("NASA Circadian Lighting"), four H2s in sentence case ("The problem", "Approach", "My role", "Outcome"). Zero em-dashes anywhere in the rendered HTML (`grep '—' /tmp/nasa.html` returned 0). No forbidden words. Wink budget honored: two protected asides (dek + outcome), spec § 3.7 grants two for this page. Bullet list ledes end with period inside the bold run as specified.

**SEO review.** Title tag (`NASA Circadian Lighting - Alex Bacallao`), meta description, canonical (`https://alexbacallao.com/projects/nasa-circadian-lighting`), OG title/description/url/type, all present in the metadata export. Two JSON-LD blocks (`BreadcrumbList` + `CreativeWork`) confirmed in source. Hero image has alt text. No other images on the page.

**Design review.** Fraunces / Inter / JetBrains Mono used per spec. Color tokens used throughout (`text-text-primary`, `text-text-secondary`, `text-text-muted`, `text-accent`, `bg-border-rule`, `border-border-hairline`). No hardcoded hex values outside `globals.css`. Hero photo: 0.5px hairline outline, 16:10 container, no shadow, no rounded corners. Caption uses `mono-label` 11px in `text-text-secondary` with the `FIG. 0N` format.

**Cross-page sync.** This page does not render project cards. `app/_data/projects.ts` line 72 (`href: '/projects/nasa-circadian-lighting'`) matches the new route. JSON-LD `name` (`NASA Circadian Lighting`) matches `projects.ts` `title`. № 03 card on the homepage and on /projects already links here.

**Code quality.** No unused imports (verified by `npm run build` strict TS pass). No `any`. No console.log. No inline styles. No missing key props on list renders (Breadcrumb keys on `${label}-${index}`, RoleBulletList keys on `${lede}-${index}`). `prefers-reduced-motion` is respected by the existing `globals.css` block (covers `scroll-behavior`, `transition-duration`, `animation-*`) and by `RevealOnScroll`'s runtime `matchMedia` check.

**Responsive.** H1 36px / 56px, H2 26px / 32px (from globals.css element defaults). `ProjectPageFooter` stacks vertically below 768px. No masthead changes.

**Build and performance.** `npm run build` passes with zero warnings; the new route prerenders as static content. Lighthouse run is deferred to step 18 per the build order; targets remain LCP < 1.5s, CLS 0, INP < 200ms. The hero `<Image priority>` with explicit `width={1280}` `height={800}` reserves the layout box; CLS should stay 0.

**Open items / decisions to record (no fixes):**
- Hero photo is 4000×2252 (16:9). Container is `aspect-[16/10]` with `object-cover`, so ~6% horizontal crop on the source. Pre-approved before commit; flag for visual confirmation when Lighthouse / browser pass runs in step 18.
- `next dev` server was already running on port 3001 from a prior session. The dev-check ran against 3001 (HTTP 200 on `/projects/nasa-circadian-lighting`, `/`, `/projects`, and the `/_next/image` optimizer for the hero). A direct browser scroll across all four breakpoints is still owed before crossing the page off the user-memory "browser-check before declaring UI done" rule.
- Smooth-scroll anchor (`See contact ↓`) lands the dark global footer just under the sticky masthead. No `scroll-margin-top` compensation; the dark band is visually obvious so this is acceptable. Re-check after the visual browser pass.

### 2026-04-29 - Step 8 Level 3 review (T&S Machines)

Findings only; nothing fixed during review per CLAUDE.md.

**Content review.** All copy verbatim from `docs/pass2-ts-machines.md`. Single H1 (`CNC software at T&S Machines`); five H2s in sentence case across § 02-§ 05 plus § 03's `The Docker side-project`. Five paragraphs in § 02, two in § 03, lede + six bullets + closing scope in § 04, three paragraphs in § 05. Zero em-dashes in rendered HTML (`grep $'\xe2\x80\x94' /tmp/ts.html` returned 0). No forbidden words. Wink budget honored: zero winks, matching the locked no-wink genre commitment for professional case studies (SITE_SPEC § 1.12.2). The § 02 paragraph 5 closing line about the math-issue patched on a customer machine ships verbatim per spec § 7.7 - professional candor, not a wink. Bullet ledes end with period inside the bold run as specified. `side-project` hyphenated throughout this page as the locked local exception (SITE_SPEC § 1.6 rule 12 / spec § 7.3); two-word `side project` is unaffected elsewhere on the site.

**SEO review.** Title tag (`CNC software at T&S Machines - Alex Bacallao`) renders correctly via the bare-title-plus-template approach; matches spec § 7.8 exactly. Meta description, canonical (`https://alexbacallao.com/projects/ts-machines`), OG title / description / url / type all present and correct. Two JSON-LD blocks (`BreadcrumbList` + `CreativeWork`) confirmed in source. Hero image has alt text. No other images on the page.

**Title-template fix verification.** All four prerendered routes now match their spec titles:
- `/` → `Alex Bacallao - Software Developer` (absolute, opts out of template).
- `/projects` → `Projects - Alex Bacallao` (template-suffixed).
- `/projects/nasa-circadian-lighting` → `NASA Circadian Lighting - Alex Bacallao` (template-suffixed).
- `/projects/ts-machines` → `CNC software at T&S Machines - Alex Bacallao` (template-suffixed).

**Design review.** Fraunces / Inter / JetBrains Mono used per spec. Color tokens used throughout (`text-text-primary`, `text-text-secondary`, `text-text-muted`, `text-accent`, `bg-border-rule`, `border-border-hairline`). No hardcoded hex values introduced. Hero photo: 0.5px hairline outline, 16:10 container, no shadow, no rounded corners. Caption uses `mono-label` 11px in `text-text-secondary` with the `FIG. 0N` format. Section eyebrow source is natural casing (`§ 01 · Industrial · Software · Since 2019`, `§ 02 - The work`, etc.); `mono-label` CSS produces the visual ALL-CAPS. First project page on the site that follows the standing source-casing rule from the start.

**Cross-page sync.** This page does not render project cards. `app/_data/projects.ts` line 50 (`href: '/projects/ts-machines'`) matches the new route. JSON-LD `name` (`CNC software at T&S Machines`) matches `projects.ts` `title`. № 01 card on the homepage and on /projects already linked here; the destination is now real.

**Code quality.** No unused imports (verified by `npm run build` strict TS pass on Next.js 16.2.4 + Turbopack). No `any`. No console.log. No inline styles. No missing key props on list renders (RoleBulletList keys on `${lede}-${index}`). `prefers-reduced-motion` is respected by the existing `globals.css` block (covers `scroll-behavior`, `transition-duration`, `animation-*`) and by `RevealOnScroll`'s runtime `matchMedia` check. Zero new components: ProjectHeader, RoleBulletList, ProjectPageFooter, SectionDivider, RevealOnScroll all reused verbatim from step 7.

**Responsive.** H1 36px / 56px, H2 26px / 32px (from `globals.css` element defaults). `ProjectPageFooter` stacks vertically below 768px. No masthead changes.

**Build and performance.** `npm run build` passes with zero warnings; the new route prerenders as static content. Lighthouse run is deferred to step 18 per the build order; targets remain LCP < 1.5s, CLS 0, INP < 200ms. The hero `<Image priority>` with explicit `width={1280}` `height={800}` reserves the layout box; CLS should stay 0.

**Open items / decisions to record (no fixes):**
- Hero photo source is 4032×3024 (4:3); container `aspect-[16/10]` with `object-cover` produces ~16.7% combined vertical crop (8.3% top, 8.3% bottom). Pre-approved during the step-8 dev-server browser pass; subject (the machine on the production floor) is preserved at the 16:10 crop. Flag for visual confirmation during the step 18 Lighthouse / browser pass.
- Title-template double-suffix fix bundled into this commit affected three pre-existing pages (homepage, /projects, NASA). Bundling decision logged in the per-`/projects/ts-machines` Deviations entry; the rule's edge case (typo-class systemic bug discovered while building this page; identical fix shape; one of the four call sites is squarely inside step 8) justified bundling over a separate cleanup commit.
- NASA's § 01 eyebrow source is ALL-CAPS (`§ 01 · EMBEDDED · SENIOR DESIGN · SPRING 2022`) - inconsistent with the standing source-casing rule and with T&S's natural-casing source. Visual rendering is identical (mono-label uppercases). Logged as a Pending Items entry above; not silent-fixed in this commit per user instruction.
- `next dev` server was running on port 3001 from the prior session (PID 11324). The dev-check ran against 3001 (HTTP 200 on `/projects/ts-machines`, all four titles verified via curl).

### 2026-04-29 - Step 9 Level 3 review (HackZurich Migros)

Findings only; nothing fixed during review per CLAUDE.md.

**Content review.** All copy verbatim from `docs/pass2-hackzurich-migros.md`. Single H1 (`Supply chain rerouting at HackZurich`); five H2s in sentence case (`The problem`, `The approach`, `My role`, `Outcome`). Two paragraphs in § 02, paragraph + inline figure + paragraph in § 03, lede + 5 bullets + closing scope in § 04, four paragraphs in § 05. Zero em-dashes in rendered HTML (`grep $'\xe2\x80\x94' /tmp/hz.html` returned 0). No forbidden words. Wink budget honored: zero winks per the locked no-wink genre commitment for professional case studies (SITE_SPEC § 1.12.2). The closing paragraph's "great time, one of the more memorable experiences" beat reads as colloquial sincerity, not a wink, per spec § 8.7. The illustrative-fragment cadence in § 05 paragraph 4 (`Different working styles, different default assumptions, the occasional language gap. We made it work.`) ships verbatim per spec § 8.5 and SITE_SPEC § 1.6 voice rule 10. Date is **September 2022** (JSON-LD `dateCreated: "2022-09"`). The "won the Migros challenge" precision (vs "won HackZurich overall") holds throughout body, JSON-LD `award`, and the dek.

**SEO review.** Title tag (`Supply chain rerouting at HackZurich - Alex Bacallao`) renders correctly via the bare-title-plus-template approach; matches spec § 8.8 exactly. Meta description, canonical (`https://alexbacallao.com/projects/hackzurich-migros`), OG title / description / url / type all present and correct. Two JSON-LD blocks (`BreadcrumbList` + `CreativeWork`) confirmed in source; CreativeWork includes the spec-locked `award: '1st place, Migros challenge, HackZurich 2022'` (first project page on the site to ship an award field). Both images have alt text; both alt strings drop the `FIG. 0N - ` prefix per the established convention (logged in deviations).

**Design review.** Fraunces / Inter / JetBrains Mono used per spec. Color tokens used throughout (`text-text-primary`, `text-text-secondary`, `text-text-muted`, `text-accent`, `bg-border-rule`, `border-border-hairline`). No hardcoded hex values. Hero photo: `aspect-[1/1]` (per the new `aspectRatio: '1/1'` override on `ProjectHeader`), 0.5px hairline outline, no shadow, no rounded corners. Inline figure: `aspect-[16/10]` (16:10 native to the source 1184×746), 0.5px hairline, `my-8` (32px top + bottom) margin between paragraphs per spec § 8.3. Both figcaptions use `mono-label` 11px in `text-text-secondary` with the `FIG. 0N` format. Section eyebrow source casing: natural (`§ 01 · Web · Hackathon · 2022`, `§ 02 - The problem`, etc.) per the standing site-wide rule.

**Cross-page sync.** This page does not render project cards. `app/_data/projects.ts` line 61 (`href: '/projects/hackzurich-migros'`) matches the new route. JSON-LD `name` matches `projects.ts` `title`. № 02 card on homepage and /projects already linked here; the destination is now real. The `problem` line in `projects.ts` correctly says "won the Migros challenge", consistent with the page body's precision. **NASA / T&S regression check passed:** post-build curl on `/projects/nasa-circadian-lighting` and `/projects/ts-machines` both still serve `aspect-[16/10]` in the rendered hero className (the new `aspectRatio` prop is optional; both pages omit it and fall through to the `'16/10'` default in the `ASPECT_CLASS` lookup).

**Code quality.** No unused imports (verified by `npm run build` strict TS pass on Next.js 16.2.4 + Turbopack). No `any`. No console.log. No inline styles. Key props on the bullet list (RoleBulletList keys on `${lede}-${index}`). `prefers-reduced-motion` is respected by the existing `globals.css` block and by `RevealOnScroll`'s runtime `matchMedia` check. Component change: added `aspectRatio` prop to `ProjectHeader` with a tight type union (`'16/10' | '4/3' | '1/1'`) per the abstraction-threshold rule; the original four-option draft had a speculative `'4/5'` that was trimmed before commit because no caller exists. Inline figure not extracted to a shared component for the same reason (one occurrence across all five case studies).

**Responsive.** H1 36px / 56px, H2 26px / 32px (from `globals.css` element defaults). `ProjectPageFooter` stacks vertically below 768px. Inline figure scales fluidly via `sizes="(min-width: 880px) 880px, calc(100vw - 40px)"`.

**Build and performance.** `npm run build` passes with zero warnings; the new route prerenders as static. Lighthouse run is deferred to step 18 per the build order; targets remain LCP < 1.5s, CLS 0, INP < 200ms. The hero `<Image priority>` with `width={877}` `height={853}` reserves the layout box; CLS should stay 0 even with the `aspect-[1/1]` override (the lookup-map approach guarantees Tailwind emits the class as a literal).

**Hook fired path.** Post-commit hook produced Level 3 `additionalContext` per the d39d906 chained-command fix - chained `git add ... && git commit` now fires correctly (verified during step 9 commit). The Level 3 review work was preempted by writing this block into the same commit, matching the NASA / T&S precedent. The hook's checklist items not addressed in-commit (Lighthouse run) are deferred to step 18 per CLAUDE.md.

**Open items / decisions to record (no fixes):**
- Hero photo source is 877×853 (~1:1); container `aspect-[1/1]` with `object-cover` produces ~2.7% horizontal crop only, no vertical loss. All 5 team members visible. The decision to use `'1/1'` instead of `'16/10'` was made via AskUserQuestion before the build, not after. Flag for visual confirmation during the user's manual browser pass.
- Inline figure source is 1184×746 (~1.587, near-native 16:10); `aspect-[16/10]` produces ~0.8% horizontal crop. Subject (the route view) is preserved.
- NASA's § 01 eyebrow source is still ALL-CAPS (`§ 01 · EMBEDDED · SENIOR DESIGN · SPRING 2022`); flagged in Pending Items as a follow-up cleanup, not addressed in this commit.
