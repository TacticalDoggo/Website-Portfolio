# Build Tracker

Updated by Claude Code after commits. Manual updates welcome.
Last updated: 2026-04-29 (step 7)

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
| 8 | T&S Machines | TODO | 5-section ongoing project pattern, Docker side-project |
| 9 | HackZurich Migros | TODO | 6-section, hero team photo |
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
| ProjectHeader | app/_components/ProjectHeader.tsx | NASA case study. Composes section 01 (breadcrumb + eyebrow + H1 + italic subtitle + dek + hero figure). Two hero modes: `image` (real photo via `next/image` with `priority`) and `placeholder` (typographic, for HIPAA / IP-constrained pages per § 1.10.5; first use will be Nicular in step 10). |
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

## Pending Items (Not in Build Order)

- [ ] Domain registration (alexbacallao.com or backup)
- [ ] Move reference images to /public/projects/[slug]/ paths
- [ ] Resume PDF (hand-maintained, ATS-parseable)
- [ ] GitHub presentability before launch
- [ ] Pre-launch real photo check (T&S, NASA, HackZurich, SofaBot confirmed; Nicular uses placeholder). NASA hero is now wired (step 7); T&S, HackZurich, SofaBot photos are present in `public/projects/<slug>/` but not yet wired (their pages haven't been built; ProjectCard still renders the deferred-photo placeholder).
- [ ] Skip-to-content link in masthead (a11y polish, not in spec but worth tracking)
- [ ] RevealOnScroll: elements already in viewport at mount sometimes don't fire the fade-in. Reproduces by loading the page with cards above-the-fold-ish; refresh fixes it. Likely fix: check element position on mount and reveal immediately if already intersecting. Not a launch blocker, but flag for a polish pass.

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
