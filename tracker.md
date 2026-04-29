# Build Tracker

Updated by Claude Code after commits. Manual updates welcome.
Last updated: 2026-04-29 (step 4)

---

## Build Order Status

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1 | Project scaffold | DONE | Next.js 16.2.4 + React 19 + Tailwind v4 + Fraunces/Inter/JetBrains Mono via next/font. Foundational tokens only (bg-page, text-primary). Throwaway placeholder at app/page.tsx (replaced in step 4). |
| 2 | Design tokens | DONE | Full SITE_SPEC.md sections 1.2 + 1.3 expressed. Raw CSS variables in :root match spec names verbatim; @theme inline mirrors them with category prefixes preserved (utilities like bg-bg-page, text-text-primary, border-border-hairline). Element defaults for h1/h2/h3/body/small with desktop breakpoint at 768px. @utility for pullquote, mono-label, mono-body. Sitewide focus-visible outline (uses --accent) and prefers-reduced-motion baseline added. Placeholder app/page.tsx refactored to consume tokens; no inline styles or arbitrary values remain. |
| 3 | Masthead and global footer | DONE | Pure components, not yet wired into pages (step 4 imports them). Masthead is a Client Component (sticky positioning, scroll-driven hairline border at >=40px, mobile hamburger overlay, active-link via usePathname). Wordmark composes spans (mono-label + serif), never <h1>. Footer is a Server Component with mode prop ('contact' | 'sitewide'); outer footer has id="contact" in BOTH modes per spec lock. Inverted-section overrides #A8A6A0 (mono labels on dark) and #444341 (dividers) are scoped to Footer.tsx with comments. Identity references centralized in app/_data/identity.ts. |
| 4 | Homepage | DONE | Hero, selected work cards, Now block, contact footer all live at `/`. ProjectCard, RevealOnScroll, SiteFooter components landed alongside. Real photos at `/public/projects/[slug]/` deferred per the standing pre-launch deliverable; cards render typographic placeholders (88px Fraunces numerals on `bg-alt`) per section 1.10.5. SEO `metadata` export covers title, description, canonical, and OG tags; JSON-LD WebSite schema deferred to step 15 per CLAUDE.md build order. |
| 5 | Project card component + projects.ts | DONE | Landed early as part of step 4 (`app/_components/ProjectCard.tsx` + `app/_data/projects.ts`). Same component will render on /projects index in step 6. Source casing is natural; `mono-label` utility renders the visual ALL-CAPS. |
| 6 | /projects index | TODO | Card stack, quality-weighted ordering |
| 7 | NASA Circadian Lighting | TODO | 6-section case study pattern |
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
| ProjectCard | app/_components/ProjectCard.tsx | Homepage now; /projects index (step 6) and any "featured project" affordances later. |
| RevealOnScroll | app/_components/RevealOnScroll.tsx | Homepage selected work cards + Now block. Reusable on any page that wants scroll-fade per section 2.7. |
| identity (data) | app/_data/identity.ts | All pages, JSON-LD, llms.txt (when those steps land) |
| projects (data) | app/_data/projects.ts | Homepage selected work; /projects index in step 6 will render from the same source. |

## Pages Live

| Page | Route | Lighthouse Mobile | Last Tested |
|------|-------|-------------------|-------------|
| Homepage | / | (pending step 18) | 2026-04-29 (manual scroll, dev server) |

## Pending Items (Not in Build Order)

- [ ] Domain registration (alexbacallao.com or backup)
- [ ] Move reference images to /public/projects/[slug]/ paths
- [ ] Resume PDF (hand-maintained, ATS-parseable)
- [ ] GitHub presentability before launch
- [ ] Pre-launch real photo check (T&S, NASA, HackZurich, SofaBot confirmed; Nicular uses placeholder)
- [ ] Skip-to-content link in masthead (a11y polish, not in spec but worth tracking)
- [ ] RevealOnScroll: elements already in viewport at mount sometimes don't fire the fade-in. Reproduces by loading the page with cards above-the-fold-ish; refresh fixes it. Likely fix: check element position on mount and reveal immediately if already intersecting. Not a launch blocker, but flag for a polish pass.

## Review Findings

(Entries added here after each post-build review pass. Format: dated section with open items.)
