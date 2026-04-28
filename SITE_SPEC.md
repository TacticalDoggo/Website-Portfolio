# SITE_SPEC.md — Alex Bacallao Portfolio Site

**Project:** Alex Bacallao — portfolio site
**Assembled:** 2026-04-28
**Status:** CANONICAL. This is the single source of truth for the build.
**Source files:** `pass1-brand-lock.md` + 10 Pass 2 page specs, all locked 2026-04-27 through 2026-04-28.

This document is the consolidated reference for the coding agent. It combines Pass 1 (brand, voice, SEO, patterns) with all 10 Pass 2 page specs. The amendment history from Pass 1's lock cycle is retained at the bottom as a change log.

For coding-agent-specific instructions (tech stack, build deliverables, repo structure, deployment), see `CLAUDE.md`.

---

# Table of contents

## Part 1 — Brand, voice, and patterns (from Pass 1)

- § 1.1 Site Strategy & Positioning
- § 1.2 Color Palette
- § 1.3 Typography
- § 1.4 Logo & Mark
- § 1.5 Photography & Image Style
- § 1.6 Voice & Tone
- § 1.7 SEO Framework
- § 1.8 Content Writing Rules
- § 1.9 Page Patterns
- § 1.10 Component Patterns
- § 1.11 Cross-Page Sync Constraints
- § 1.12 Editorial Discipline

## Part 2 — Page specifications (from Pass 2)

- § 2 Homepage (`/`)
- § 3 NASA Circadian Lighting (`/projects/nasa-circadian-lighting`)
- § 4 Contact (`/contact`)
- § 5 About (`/about`)
- § 6 Resume (`/resume` and `/resume.pdf`)
- § 7 CNC software at T&S Machines (`/projects/ts-machines`)
- § 8 Supply chain rerouting at HackZurich (`/projects/hackzurich-migros`)
- § 9 Projects index (`/projects`)
- § 10 Patient messaging at Nicular (`/projects/nicular`)
- § 11 SofaBot (`/projects/sofabot`)

## Part 3 — Identity, deliverables, and change log

- Identity references (single source of truth)
- Open items
- Standing deliverables for Pass 3 build
- Change log (Pass 2 amendments)

---

# Part 1 — Brand, voice, and patterns

## 1.1 Site Strategy & Positioning

- **Goal:** Land a full-time software engineering role.
- **Audience:** Recruiters and hiring managers at tech companies.
- **Aesthetic:** Personality-forward, editorial. A typeset essay by a developer who takes their craft seriously and themselves less so.
- **Positioning:** Hybrid generalist. Embedded/systems work shown first; breadth supports. Quality-led ("software for systems where reliability matters") not niche-led. Avoids "embedded developer" framing because it closes doors; uses a quality (reliability, things-have-to-work) that's true of CNC, NASA, HIPAA, *and* a Next.js production app.
- **Pages:** Home, Projects (index), individual project case studies, About, Contact, Resume (HTML page + downloadable PDF).
- **Stack:** Next.js (App Router) + Vercel. Plausible analytics.
- **Domain:** Target `alexbacallao.com`. Backups: `alejandrobacallao.com`, `bacallao.dev`, `alexbacallao.dev`. **Pending — user to confirm at registrar.**
- **Trilingual:** Mention briefly in About; not load-bearing in hero copy.
- **Role-scope layering:** the homepage funnels narrowly (Docker / infra / backend, the headline credentials); the About page funnels wider (software dev, system testing, robotics, possible sysadmin transition). This is deliberate. A recruiter scanning the homepage gets the sharpest version of the candidate; a recruiter who clicks About gets the fuller picture.

## 1.2 Color Palette (light mode only — no dark mode)

### Surfaces
| Token | Hex | Use |
|---|---|---|
| `bg-page` | `#FAF8F3` | Page background |
| `bg-paper` | `#FFFEFB` | Cards, raised surfaces |
| `bg-alt` | `#F1EFE8` | Section alternate, mono pill backgrounds |
| `bg-inverse` | `#2C2C2A` | Footer, dark sections |

### Text
| Token | Hex | Use |
|---|---|---|
| `text-primary` | `#2C2C2A` | Body, headings (not pure black — black on cream looks dirty) |
| `text-secondary` | `#5F5E5A` | Captions, secondary metadata |
| `text-muted` | `#888780` | Mono labels, deep metadata |
| `text-inverse` | `#FAF8F3` | Text on dark backgrounds |

### Accent (single, used surgically)
| Token | Hex | Use |
|---|---|---|
| `accent` | `#C2410C` | Primary CTAs, active link state, pull quote rule, "currently/available" mono labels, chosen-state on filters. **Nothing else.** |
| `accent-tint` | `#FCE7D9` | Subtle highlights, "available" pill background. Not full backgrounds. |

### Status
| Token | Hex | Use |
|---|---|---|
| `success` | `#15803D` | Form success states, "available" indicators |
| `warning` | `#B45309` | Form warnings |
| `error` | `#B91C1C` | Form errors |

### Borders / Rules
| Token | Hex | Use |
|---|---|---|
| `border-hairline` | `#E5E0D3` | Default 0.5px borders, card outlines |
| `border-rule` | `#D3D1C7` | Section dividers |
| `border-heavy` | `#2C2C2A` | Used sparingly — footer divider, masthead underline |

## 1.3 Typography

### Stack
- **Serif (headlines + pull quotes):** Fraunces. Weights: 400 italic, 500.
- **Sans (body + UI):** Inter. Weights: 400, 500.
- **Mono (labels, metadata, code):** JetBrains Mono. Weight: 400.
- **Loading:** `next/font/google`. Self-hosted at build time. Zero CLS, no extra DNS lookup.

### Scale (locked)

| Use | Font | Desktop | Mobile | Weight |
|---|---|---|---|---|
| H1 (display) | Fraunces | 56px / 1.02 / -0.02em tracking | 36px / 1.05 | 500 |
| H2 (section) | Fraunces | 32px / 1.15 / -0.01em | 26px / 1.2 | 500 |
| H3 (subsection) | Fraunces | 22px / 1.25 | 20px / 1.3 | 500 |
| Body | Inter | 16px / 1.7 / `text-primary` | 16px / 1.7 | 400 |
| Small | Inter | 14px / 1.55 | 14px / 1.55 | 400 |
| Pull quote | Fraunces italic | 24px / 1.35 | 20px / 1.4 | 400 |
| Mono label | JetBrains Mono | 11px / 1.4, uppercase, +0.1em tracking | 11px | 400 |
| Mono body | JetBrains Mono | 13px / 1.5 | 13px | 400 |

### Rules
- Body line-height is **1.7** (warmer than typical 1.6).
- Body color is **`text-primary` (#2C2C2A)** — `text-secondary` is reserved for captions and metadata.
- Headlines use `text-primary`, not pure black.
- Sentence case for all headings. Never Title Case in headings.
- ALL CAPS only appears in JetBrains Mono labels with letterspacing.

## 1.4 Logo & Mark

- **Full wordmark:** "Alex Bacallao" in Fraunces 500, prefixed with "№ 01" in JetBrains Mono.
- **Optional sub-line:** `SOFTWARE DEVELOPER · GAINESVILLE TX` in JetBrains Mono small caps.
- **Compact (header / mobile):** "№ 01 Alex Bacallao" — same components, smaller scale.
- **Favicon:** "№01" in JetBrains Mono on a 32×32 square. Three variants:
  - Cream (`#FFFEFB` bg, `#2C2C2A` text)
  - Charcoal (`#2C2C2A` bg, `#FAF8F3` text)
  - Accent (`#C2410C` bg, `#FFFEFB` text)
- **Conceit:** The "№ 01" masthead carries through the entire site. Sections use numbered prefixes (§ 02, § 03). Project entries use numbered IDs (№ 01, № 02, № 03). The site reads as "issue №01 of an ongoing publication."
- **No designed logo file needed.** Wordmark is rendered live in Fraunces. Favicons get generated in Pass 2 implementation.

## 1.5 Photography & Image Style

### Strategy: minimal, real, technical
- **No stock photography. Ever.** No "diverse team collaborating," no laptops on desks, no abstract code-on-screen photos. Stock kills the editorial direction instantly.
- **Real artifacts where they exist.** Project hero images use real screenshots, hardware photos, or architecture diagrams.
- **Hero photo over hero screenshot when the project is fundamentally a team achievement.** A team photo at the moment of winning grounds credibility in collaboration rather than artifact. Per-page choice; HackZurich Migros locked an example. Most case studies use a screenshot or hardware photo as default; team photos are reserved for genuinely team-defined wins.
- **Typographic placeholder for HIPAA, IP-constrained, or otherwise un-showable projects.** When real imagery cannot be shown for compliance or confidentiality reasons, generate a typographic placeholder card: cream `bg-paper`, 0.5px hairline border, 88px Fraunces project numeral centered, JetBrains Mono caption underneath. The text *is* the image.
- **Honest hero-absence framing for placeholder pages.** When a placeholder is used, pair it with a caption that explicitly names the absence and the reason (e.g., `HIPAA-COMPLIANT · NO CUSTOMER DATA SHOWN` for the placeholder caption, plus a figure caption like `FIG. 01 — No image. The work was patient communication under HIPAA; nothing displayable was ours to show.`). Don't pretend the absence isn't there. Don't apologize for it. Just name it. Locked example: Nicular project page (§ 10).
- **OG images:** Dynamically generated via `@vercel/og`. One template across all pages. Typography-only on cream. Masthead in corner ("№ 01 Alex Bacallao"), page title in Fraunces, page meta in JetBrains Mono. Renders at build time.

### Aspect ratios
- Project hero: **16:10** (lets technical screenshots breathe; less aggressive than 16:9)
- Project card thumbnail: **4:3** (closer to a print contact-sheet feel)
- OG image: **1200×630** (standard for Twitter/LinkedIn)
- Inline figure: variable, max-width matches text column

### Treatment
- All images sit on `bg-paper` with a `0.5px solid border-hairline` outline.
- No drop shadows. No rounded corners over 8px. No gradients on images.
- No parallax. No zoom on hover. Subtle opacity fade-in on scroll is the only motion.
- Captions: JetBrains Mono 11px, `text-secondary`, below the image (figure-style, not overlay). Format: `FIG. 0N — Caption text. Stack notes.`

### Pre-launch deliverable
**User commits to capturing 2+ real photos before launch.** As of Pass 2 lock, multiple real images have been provided in `reference/`: T&S CNC machine in action, NASA senior-design hardware (4 photos), HackZurich team photo + UI screenshots, SofaBot. Nicular intentionally uses a typographic placeholder.

## 1.6 Voice & Tone

### One-sentence aesthetic
A typeset essay by a developer who takes their craft seriously and themselves less so. Slightly dry, with occasional warmth.

### Voice rules (locked)

1. **First person, plain English.** "I" not "we" (except when describing genuinely shared work). No "I'm passionate," no "I love," no "I thrive."

2. **Specific over abstract.** Numbers, proper nouns, named places, named technologies. "3 countries" not "various international markets." "Cut deployment from 4 hours to 12 minutes" not "improved performance."

3. **Numerals over spelled numbers, with one exception.** "4 years" not "four years." **Exception: when "one" functions as a *determiner* in an enumeration** ("one Swiss, one German, one Italian"), spell it out — the noun does the enumeration work and the digit would read as a count column. This applies only to determiner usage; quantities still use numerals.

4. **Name the human on the other end.** CNC operator, clinician, spacecraft crew. Not "users" or "customers."

5. **Wink budget — by gag density, not absolute count.** The original "one wink per page" rule is about *gag density*, not absolute count. Two well-separated, tonally consistent asides on a long-form page (~500+ words apart, same self-aware register) are acceptable. The rule continues to forbid gag-stacking (multiple jokes within the same paragraph or section, or asides in different registers piled together). **Wink budget is also a per-page genre decision:**
   - **Zero-wink genre:** Resume, professional case studies (T&S, HackZurich, Nicular). The voice still applies (no LinkedIn-speak, sentence case, specific over abstract, no em dashes), but humor is reserved for pages where it earns its place. Voice is not the same as humor.
   - **One-wink genre:** Short content pages (Contact, /projects index). One protected wink, ceiling reached.
   - **Two-wink genre:** Long-form personal pages (homepage, About) and hobbyist case studies (SofaBot). Two protected winks, well-separated, unified register.
   - **NASA project page** is the exception across professional case studies — earned two winks because the project's nature (a parking-lot-repaired demo rig at a NASA conference) generated naturally absurd material that the prose cannot suppress without going stiff.

6. **Wink craft — winks don't have to be sentence-level jokes.** Two locked patterns:
   - **Wink-as-noun-phrase.** A noun phrase that names the absurd directly can land the wink — see SofaBot's *"a free couch and a stripped-for-parts go-kart"* in the subtitle.
   - **Wink-by-understatement.** A flat factual statement reads as a wink because its content is absurd — see SofaBot's *"The sofa drove, in a parade."* Commenting on absurdity often weakens it.

7. **Confidence by demonstration, not assertion.** Show the work, name the constraints, skip the adjectives.

8. **No em dashes.** Hyphens (`-`), colons, periods only. This rule applies everywhere in copy — body, headings, captions, mono labels, JSON-LD descriptions. Repeated em-dash violations during Pass 2 drafting motivate a build-time linter as a Pass 3 deliverable.

9. **Sentence case for headings.** Never Title Case. Never ALL CAPS in body text.

10. **Sentence fragments are permitted illustratively.** Fragments are allowed when they do *illustrative* work (clarifying or expanding a prior sentence) and add rhythm. Three parallel-structure fragments + one recovery sentence is a locked cadence, demonstrated in the About page § 5.4 (German-fluency aside) and the HackZurich Migros § 8.5 (cross-cultural takeaway). Fragments used as gags are still subject to the wink-count rule.

11. **Date format:** `YYYY` for years, `Mon YYYY` for months. "Dec 2023," "Nov 2022 - Jan 2023." Never "12/23" or "Dec '23." For ongoing date ranges, prefer `SINCE [year]` over hyphenated ranges to avoid em-dash temptation. When a range is required, use hyphen-minus (`-`), never em dash.

12. **Hyphenation conventions.** "Side project" is two words sitewide. **Local exception:** in the T&S Machines case study § 7.3, "side-project" is hyphenated as a compound noun in the section title and immediate references on that page. Two words elsewhere on the site.

### Forbidden words (locked)
`passionate · thrive · leverage · synergy · cutting-edge · innovative · world-class · rockstar · ninja · guru · excited · thrilled · journey`

Plus em dashes (`—`) anywhere in copy.

### What it is NOT
- Not LinkedIn voice ("Excited to announce...", "Thrilled to share...")
- Not startup voice ("We're building the future of...")
- Not academic voice ("This research demonstrates...")
- Not bro voice ("Shipping fast and breaking things")
- Not sycophantic ("Reach out if you want to chat!")

### Reference voices
- *Stripe Press* book pages — confident, dry, well-typeset
- *Cabinet* magazine front matter — playful but rigorous
- Patrick Collison's personal site — "here's what I'm doing, here's what I think, that's it"
- Maggie Appleton's notes — illustrated essays with footnotes and asides

### Project description template
*Problem (1-2 sentences) → Approach (2-3 sentences naming the stack) → Outcome (1 sentence with a concrete result).* 350 words minimum per project case study. See § 1.9 for the full case study pattern variants.

### Footnotes & asides
Encouraged but limited to one per section. Implemented as a small superscript marker that scrolls/expands inline (not a popover). Mono font for the footnote body.

### Links
Inline and bare. `accent` color, no underline by default, underline on hover. No "click here," no "read more here." The link text describes the destination.

### Inline code
Mono font. Backtick-style. Never italicize code.

### Type label conventions (mono labels in eyebrows and cards)

Project type labels follow the structure `[CATEGORY] · [ROLE-TYPE OR TIMING] · [DATE]`. Examples:
- `INDUSTRIAL · SOFTWARE · SINCE 2019` (T&S Machines)
- `WEB · HACKATHON · 2022` (HackZurich)
- `EMBEDDED · SENIOR DESIGN · SPRING 2022` (NASA)
- `HEALTHCARE · FULL-TIME · LATE 2022` (Nicular)
- `ROBOTICS · CLUB · SINCE 2019` (SofaBot)

The third slot uses `SINCE [year]` for ongoing work, `SPRING [year]` / `LATE [year]` / etc. for time-bounded work, or just `[year]` for single-year projects. Never em dashes in date ranges.

## 1.7 SEO Framework

### Reality check
This is a portfolio. Recruiters don't Google "embedded developer Texas." They find Alex on LinkedIn, GitHub, or referral, then visit the site. The site's job is to convert, not to rank. Two SEO priorities only:

1. **Own the name keyword.** When a recruiter Googles "Alex Bacallao" or "Alejandro Bacallao", the site should outrank LinkedIn and GitHub.
2. **AI search readiness.** When a recruiter (or their tool) asks an AI assistant about Alex, the site should be the canonical, well-structured source it pulls from.

### Keyword strategy

| Cluster | Pages | Notes |
|---|---|---|
| Name (primary) | All | Alex Bacallao, Alejandro Bacallao, Alex Bacallao software developer, Alex Bacallao portfolio |
| Name + tech (secondary) | About, Projects | Alex Bacallao Python developer, Alex Bacallao embedded systems, Alex Bacallao Docker |
| Project names (long-tail) | Each project page | NASA circadian lighting Texas Space Grant, HackZurich Migros supply chain, T&S Machines software |

**We do NOT chase generic terms** like "best software developer Texas." Losing game; not why a recruiter visits.

### Per-page SEO requirements (applied in Pass 2)
Every page must define:
- **Title tag** (max 60 chars)
- **Meta description** (150-160 chars)
- **H1** (exactly one per page, exact text specified)
- **OG title + description + image** (auto-generated from page metadata)
- **JSON-LD structured data** (per-page schema)
- **Word count minimum** (per the table below)
- **Canonical URL**

### Content depth minimums

| Page | Min word count | Why |
|---|---|---|
| Homepage | 250 | Enough for AI to summarize who you are |
| About | 500 | Real biographical depth, not a stub |
| Each project case study | 350 | Problem, approach, stack, outcome — not just a card |
| Resume page | 600 | Full work history with detail |
| Contact | 100 | Minimal, but more than a form |
| /projects index | (no minimum) | Directory page; ~280 words is fine |

### Schema markup (JSON-LD, locked)
Required in `<script type="application/ld+json">`:

- **Person schema** (sitewide, in root layout): `name`, `jobTitle`, `alumniOf` (UNT), `knowsLanguage` (en, es, de), `knowsAbout` (technologies), `sameAs` (LinkedIn, GitHub), `homeLocation` (Ft Worth, TX). Email deliberately omitted from sitewide schema; only the contact page exposes email in structured data.
- **WebSite schema** (homepage): `name`, `url`, `author`
- **CreativeWork / SoftwareApplication schema** (each project case study page): `name`, `author`, `programmingLanguage`, `dateCreated`, `description`, `keywords`. Add `award` field where applicable (HackZurich Migros).
- **BreadcrumbList schema** (project case study pages and /projects index)
- **CollectionPage + ItemList schema** (/projects index)
- **ProfilePage with Person mainEntity** (resume page)

### Technical SEO checklist
- [ ] `sitemap.xml` auto-generated by Next.js (App Router built-in)
- [ ] `robots.txt` with explicit allow for major search and AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, anthropic-ai)
- [ ] `llms.txt` at root (see template below)
- [ ] All pages submitted to Google Search Console, Bing Webmaster Tools
- [ ] Plausible analytics (privacy-friendly, no cookie banner needed)
- [ ] Core Web Vitals targets: **LCP < 1.5s, CLS 0, INP < 200ms**
- [ ] All images use `next/image` with explicit width/height (zero CLS)
- [ ] Semantic HTML throughout: `<article>`, `<section>`, `<nav>`, `<header>`, `<main>`

### `llms.txt` template (locked structure)

```
# Alex Bacallao
> Software developer. 4 years across embedded systems,
> healthcare, and industrial automation. Based in Ft Worth, Texas.
> Currently a Digital Specialist at T&S Machines; passively open
> to backend, infra, and Docker-heavy roles.

## Quick facts
- Trilingual: English, Spanish, German
- B.S. Computer Engineering, University of North Texas, 2023
- Languages: C, C++, Python, JavaScript, TypeScript, Java
- Recent: 4 years of CNC software at T&S Machines; Docker side project
- Notable: NASA-sponsored spacecraft lighting controller (Texas Space Grant)
- Award: 1st place, Migros challenge, HackZurich 2022

## Site map
- /                    Homepage and brief intro
- /projects            List of selected work
- /projects/[slug]     Per-project case studies
- /about               Background, languages, what I'm looking for
- /resume              Full work history
- /contact             How to reach me

## Contact
- Email: alex.bacallao1996@gmail.com
- LinkedIn: linkedin.com/in/alejandrobacallao
- GitHub: github.com/TacticalDoggo
```

### URL structure (locked)

```
/
/projects
/projects/ts-machines
/projects/nasa-circadian-lighting
/projects/hackzurich-migros
/projects/nicular
/projects/sofabot
/about
/resume
/resume.pdf            (static asset, hand-maintained)
/contact
```

Lowercase, hyphenated. No trailing slashes. No `.html` extensions. No query parameters in canonical URLs.

## 1.8 Content Writing Rules

(Most of these are voice-locked above. The implementation rules:)

- Voice rules apply to all copy.
- Sentence case for all headings.
- Numerals over spelled numbers (with the determiner exception in § 1.6).
- Date format: `YYYY` or `Mon YYYY`. `SINCE [year]` for ongoing ranges.
- Project case study descriptions follow the patterns in § 1.9, 350+ words each.
- Inline links are bare with `accent` color, underline on hover only.
- Mono font for inline code, file paths, and version numbers.
- Footnotes max one per section.
- **No-fabrication discipline.** When the user can't verify a technical or scope claim during substance-finding, cut the claim rather than fabricate. Multiple paragraphs across the spec were walked back during Pass 2 when the user couldn't verify the depth of the claim being made (T&S algorithmic specifics, HackZurich algorithmic depth, Nicular HIPAA recipient-verification scope). The pages are more credible because of those walk-backs, not less. **Future page drafts must apply the same discipline.**

## 1.9 Page Patterns

This section consolidates the page-structure patterns established during Pass 2. Each pattern is reusable for future pages of the same kind.

### 1.9.1 Hero pattern (homepage)
Eyebrow → H1 (Fraunces 56px) → sub-line → CTA row (primary button + secondary text + availability pill `● PASSIVELY OPEN`).

### 1.9.2 Case study pattern (default, 6-section)
For finished, bounded projects with a problem-solution arc. Locked example: NASA Circadian Lighting (§ 3); reused on HackZurich Migros (§ 8), Nicular (§ 10).

```
Header (breadcrumb, eyebrow, H1, italic subtitle, dek, hero image)
→ Problem (~140-200 words)
→ Approach (~140-200 words; may include inline figure)
→ My Role (lede + bullet list + closing scope statement)
→ Outcome (~150-250 words; closing reflection bridges to current work)
→ Page Footer (back to projects + contact anchor)
→ Global footer in footer mode
```

### 1.9.3 Case study pattern variant — ongoing project (5-section)
For mid-stream professional work that doesn't fit the problem-solution arc. Locked example: T&S Machines (§ 7).

```
Header
→ The Work (replaces "Problem"; describes the body of work organized by category)
→ [optional] Side-project (dedicated section for substantive sub-initiative)
→ My Role
→ Current State (replaces "Outcome"; names what's shipping, what's in flight, what's next)
→ Page Footer
→ Global footer
```

**"Current state" instead of "Outcome"** signals to readers that the work is mid-stream rather than finished. Names what's currently shipping, what's still being built, what's the next horizon.

**Side-project section pattern** is a dedicated section between "The Work" and "My Role" when a substantive sub-initiative warrants treatment but isn't the headline. Honest framing about scope, motivation, and adoption status. Locked example: T&S § 7.3 "The Docker side-project."

### 1.9.4 Case study pattern variant — hobbyist / club (4-section compressed)
For projects without a traditional problem-solution arc and lighter weight. Locked example: SofaBot (§ 11).

```
Header
→ The Build (combines what would be Problem + Approach + My Role into one prose section)
→ Outcome
→ Page Footer
→ Global footer
```

The compression is deliberate: hobbyist projects don't have a problem to identify, an approach to invent, and a role to defend in three separate sections. Collapsing those into a single prose narrative reads more naturally.

### 1.9.5 Project page footer
Standard across all case study patterns:

```
← Back to projects                              See contact ↓
```

Left link → `/projects`. Right link → `#contact` anchor on the global footer (the global footer's outer container has `id="contact"` in both render modes).

### 1.9.6 Content page pattern (About)
Header (eyebrow + H1 + short dek) → 2-4 prose body sections (eyebrow + H2 + 1-3 paragraphs each) → Global footer. No bullets, figures, or CTAs in the body. Used when the page is essentially a single piece of writing with a few breathers.

### 1.9.7 Two-format page pattern (Resume)
HTML page + hand-maintained static asset (PDF), kept in sync via a shared date stamp visible on both. The PDF is hand-maintained, NOT auto-generated by the build pipeline (over-engineering for a 1-2x/year update cadence). The HTML and PDF have related but different content: HTML uses the editorial conceit, PDF uses traditional resume conventions for ATS parseability. PDF includes phone number, HTML omits it.

### 1.9.8 Index page pattern (/projects)
Header (eyebrow + H1 + short orienting dek) → vertical stack of cards (same component as homepage) → Global footer. No filter or sort affordances at five-projects-or-fewer scale.

**No-claimed-order dek pattern** — when the actual ordering is editorial-judgment-based rather than strictly date- or alphabetical-based, the dek can describe what the page contains without claiming an ordering principle. The order is visible on screen; no need to articulate it.

**Quality-weighted ordering for project listings** — when a project's date inversely correlates with its case-study weight, order by quality not strict reverse-chrono. Example: Nicular's late-2022 timing would otherwise place it ahead of HackZurich's September 2022 win, inverting project hierarchy. Quality-weighted order keeps the homepage's headline-picks-first logic continuing into the index.

### 1.9.9 Contact page pattern
Header → minimal mailto-first contact (one prominent email link, response time line) → mono table for response-time and channel preferences → bulleted list with bold link + description for "elsewhere" links (LinkedIn, GitHub, etc.) → Global footer. No contact form. Email exposed in the contact page's JSON-LD only; sitewide schema omits it.

### 1.9.10 Resume role entry pattern
For work history entries: two-line structured header (company-role / location-dates), prose body, optional case-study link. Format:

```
[Company] - [Role title in italic]                 [DATE RANGE]
[Location]
[Body paragraph]
[Optional: Case study: [Project name →](/projects/[slug])]
```

Separator between company and role is hyphen-minus, not em dash, per § 1.6 voice rule 8.

### 1.9.11 Privacy carve-out pattern
When a biographical detail is excluded from a page for privacy or anti-discrimination reasons, document the exclusion explicitly in the page spec. The spec records what was cut and why. Locked example: About page omits family-origin / ethnicity detail per user preference; Spanish-language capability is retained as a professional fact without the heritage framing. Privacy carve-outs should not be reversed without explicit user re-authorization.

## 1.10 Component Patterns

This section consolidates the reusable components established during Pass 2.

### 1.10.1 Project card
Locked structure:

```
┌─────────────────────────────────────────────────────────┐
│  № 0X                          [TYPE LABEL]              │
│                                                          │
│  [Hero image, 16:10, full card width]                    │
│                                                          │
│  Project title in Fraunces 22px                          │
│  1-sentence problem in Inter 16px, text-secondary.       │
│                                                          │
│  STACK · TAGS · IN · MONO                                │
│                                                          │
│  See case study →                                        │
└─────────────────────────────────────────────────────────┘
```

- Whole card is clickable (anchor wrapping the entire figure + content).
- Hover: border color shifts from `border-hairline` to `border-rule`; project numeral translates 2px right; both 200ms ease-out.
- No box-shadow, no scale, no background change.

**Stack tag count varies by project density.** The right count is "what the project actually had," not a fixed slot count. Locked examples: SofaBot (2 tags), Nicular (3 tags), most others (4 tags). Padding to a fixed count would overclaim depth.

**Card pattern reuse across pages.** The homepage card and /projects index card use the same component verbatim. Pass 3 build should make this a single component with content sourced from a shared data file; updates propagate automatically. **Cross-page sync constraint:** if a card's copy or metadata changes, both pages must update.

### 1.10.2 Mono table
Two-column, JetBrains Mono uppercase, hairline rows. Two variants:
- **No visible header** when columns are symmetric (e.g., contact page's response-time-by-channel table where both columns are values).
- **Visible header column** when columns have asymmetric meaning (e.g., resume's spoken-languages table with Language / Level columns).

### 1.10.3 Skills wall
Two-column mono tables grouped by category, JetBrains Mono uppercase. Useful any time a long list of items needs to be scannable without prose. Locked example: Resume § 6.6 (Programming languages, Web & markup, Tools & platforms, Spoken languages).

### 1.10.4 Bulleted list with bold link + description
Custom middot bullet `·` in `accent` color, bold Inter 500 link with arrow as the lead, regular-weight description as the body. Used on the contact page (channel list), resume page (projects section), and case study "My Role" sections.

**No separator between the bold link name and the description.** The visual transition from bold to regular weight does the separator's work; no em dash, no hyphen, no colon. Description sentences start with capital letters since the bold-to-regular transition functions as an implicit period.

### 1.10.5 Typographic placeholder for HIPAA / IP-constrained projects
- Container: 16:10 aspect ratio matching all other heroes
- Background: `bg-paper`
- 0.5px `border-hairline` outline
- Centered: 88px Fraunces project numeral
- Below: JetBrains Mono caption explaining the absence (e.g., `HIPAA-COMPLIANT · NO CUSTOMER DATA SHOWN`)
- Pair with a figure caption that explicitly names the absence and the reason (see § 1.5 honest hero-absence framing)

### 1.10.6 Global footer
Cream-on-charcoal inverted (text-inverse on bg-inverse). Two render modes:
- **Homepage contact mode:** carries the contact strip (mailto, social links) and acts as the homepage's contact section.
- **Sitewide footer mode:** simpler footer with masthead, navigation echo, and copyright.

`id="contact"` is set on the global footer's outer container in *both* render modes, so anchor links from project pages (`See contact ↓`) work on every page.

Full layout specification in § 2.5 (homepage contact mode is locked there as the canonical render).

### 1.10.7 OG image template
Auto-generated via `@vercel/og`. Single template across all pages, content swap only:
- Background: `bg-page` (#FAF8F3)
- Top-left: `№ 01 ALEX BACALLAO` in JetBrains Mono 18px
- Center: page H1 in Fraunces 500, 64px
- Below center (italic): page-specific subtitle or dek line in Fraunces 22px italic
- Bottom-left: page meta line (type label, location, etc.) in JetBrains Mono 14px
- Bottom-right: `● PASSIVELY OPEN` in JetBrains Mono 14px, accent color
- 0.5px hairline border inset 32px from all four edges

## 1.11 Cross-Page Sync Constraints

Some content appears on multiple pages and must stay consistent. The Pass 3 build should treat these as single sources of truth.

### Homepage cards ↔ /projects index cards
The three project cards on the homepage (T&S, HackZurich, NASA) and the corresponding cards on /projects must be identical. Same title, problem statement, type label, stack tags, hero image, slug. Implementation: extract card data into a `projects.ts` (or similar) data file; both pages render from it. Updates propagate automatically.

### Resume ↔ About narrative consistency
The resume summary and the About page career section share narrative beats: T&S career arc, Nicular interlude, NASA senior design, HackZurich win, language capabilities. When one updates, the other should be reviewed for consistency. Both reference the same throughline phrase: *"shipping software to non-developers who need it to just work."*

### Resume ↔ Resume PDF date stamp
The HTML resume page displays an `UPDATED [Mon YYYY]` stamp in the PDF download affordance. The PDF itself displays the same stamp. When the PDF is updated, both stamps update at the same time. Drift between the two is the maintenance hazard for this two-format pattern.

### Project case study ↔ /projects card
A project's case study page and its card on /projects (and homepage, if featured) must have consistent type labels and titles. Slug changes propagate. Locked example: T&S project page reframe required updates to homepage card + /projects card slug.

### Sitewide identity references
Email, LinkedIn, GitHub, location, availability all appear in multiple places (footer, contact page, JSON-LD, llms.txt). Single source of truth: § "Identity references" at the bottom of this document. All pages reference from there.

## 1.12 Editorial Discipline

This section consolidates the editorial principles established during Pass 2 — the disciplines that govern *how* content gets written, not *what* it says.

### 1.12.1 No-fabrication discipline
When a technical or scope claim cannot be verified by the user during substance-finding, **cut the claim rather than fabricate.** Multiple paragraphs across the spec were walked back during Pass 2 when the user couldn't verify the depth of a claim:
- T&S Docker reframed from "headline ship process" to "personal side project" (cascaded across 5 specs)
- HackZurich algorithmic-depth claim cut (§ 8.3)
- HackZurich "supply chains across Europe and beyond" softened to "large supply chains"
- Nicular HIPAA recipient-verification scope walked back to encryption-only with explicit credit to senior engineers
- SofaBot outreach mention dropped from resume (user wasn't personally at the elementary school visit)

The pages are more credible because of these walk-backs, not less. **Future page drafts must apply the same discipline.** When writing copy from a resume markdown or other source document, ask explicitly: *"What would I get wrong if I just wrote from this?"*

### 1.12.2 No-wink genre commitment
Some pages spend zero winks for genre reasons. The voice still applies (no LinkedIn-speak, sentence case, specific over abstract, no em dashes), but humor is reserved for pages where it earns its place. Locked zero-wink pages: Resume, T&S Machines, HackZurich Migros, Nicular. Genre choice, not page-length choice. See § 1.6 wink budget for the full per-genre breakdown.

### 1.12.3 "Why I left" treatment
Case studies report what was done, not why someone moved on. The Resume page's date range tells the recruiter the role was short; that's all the explanation expected. Locked example: Nicular page does not address why the user left, despite the role being short. Internal motivations stay internal.

### 1.12.4 Mixed-depth disclaimer pattern
When a contribution had real depth in some places and shallow scope in others, name the gradient honestly rather than picking one framing. Locked example: Nicular HIPAA work — *"Some of that was real configuration work for the integrations I owned; some was just calling the right framework methods correctly."* This is more credible than choosing a single framing for both halves.

### 1.12.5 Awards section threshold rule
3+ awards earn a dedicated section (locked example: Resume § 6.7). 1-2 awards fold inline within an existing section. Single award would not justify a section header.

### 1.12.6 Outreach / volunteering as one-line addition
When only one outreach or volunteering item exists, add it as a one-line addition to an existing project mention rather than carving out a dedicated section. Note: this rule was applied during the SofaBot lock and then walked back when the user clarified they were not personally at the elementary school outreach. Pattern remains valid for future use; the SofaBot specific case was a factual correction, not a pattern reversal.

---

# Part 2 — Page specifications

## § 2 Homepage (`/`)

Min word count: 250 (per § 1.7). Locked at ~250 words.

### 2.0 Information architecture

Four content sections + sitewide masthead, top to bottom:

1. **Masthead** (sitewide component, not a page section per se)
2. **§ 2.2 — Introduction** (hero)
3. **§ 2.3 — Selected work** (three project cards)
4. **§ 2.4 — Now** (personality block, updated quarterly)
5. **§ 2.5 — Contact** (also serves as global footer)

### 2.1 Masthead (sitewide)

This is a global component, not homepage-specific. Locked here because the homepage is the first place it renders.

**Structure:**

```
[№ 01 ALEX BACALLAO]                    PROJECTS · ABOUT · RESUME · CONTACT
```

- Left: wordmark — `№ 01` in JetBrains Mono 11px uppercase + `Alex Bacallao` in Fraunces 500, 18px. Links to `/`.
- Right: nav — Inter 14px, `text-primary`, separated by `·` middots (using `&middot;` or `\u00B7`).
- Active page link gets `accent` color, no underline.
- Inactive links: `text-primary`, underline on hover only.

**Behavior:**
- Sticky on desktop (≥768px). `position: sticky; top: 0;` with a 0.5px `border-hairline` bottom border that fades in once the user has scrolled ≥40px.
- Mobile (<768px): hamburger icon replaces the right nav. On tap, the menu expands inline (full-page overlay below the masthead, not a slide-in drawer). Background `bg-page`, links stacked vertically with 24px row gap.
- Background: `bg-page` (#FAF8F3) at all times. No frosted-glass effect.
- Padding: 16px vertical / 32px horizontal on desktop, 12px / 20px on mobile.

### 2.2 § 01 — Introduction (hero)

**Eyebrow:** `§ 01 — INTRODUCTION` (JetBrains Mono 11px, `text-muted`, +0.1em tracking)

**H1** (Fraunces 500, 56px desktop / 36px mobile, -0.02em tracking, color `text-primary`):

> Software for systems where reliability matters.

**Sub-line** (Inter 400, 16px, line-height 1.7, color `text-primary`, max-width 60ch):

> I'm Alex Bacallao, a software developer in Ft Worth, Texas. 4 years across embedded systems, healthcare, and industrial automation.

**CTA row** (16px gap between elements, vertical-align center):

- **Primary:** `[See selected work →]`
  - Background `accent` (#C2410C), text `text-inverse` (#FAF8F3)
  - Inter 500, 14px
  - Padding 12px / 24px
  - Border-radius 8px
  - No shadow
  - Anchor element (`<a href="/projects">`), not a button
  - Hover: bg darkens 8% (~`#A9380A`), no transform

- **Secondary:** `[Get in touch]`
  - Text-only, `text-primary`, no background, no border
  - Inter 500, 14px
  - Hover: 0.5px hairline underline appears (`text-decoration: underline; text-underline-offset: 4px;`)
  - Anchor (`<a href="/contact">`)

- **Availability pill:** `● PASSIVELY OPEN`
  - Background `accent-tint` (#FCE7D9), text `accent` (#C2410C)
  - Bullet character `●` colored `accent`
  - JetBrains Mono 400, 11px uppercase, +0.08em tracking
  - Padding 4px / 10px
  - Fully rounded (border-radius 999px)
  - Not clickable

**Layout:**
- Vertical rhythm: eyebrow → 24px → H1 → 24px → sub-line → 32px → CTA row
- Hero takes ~80vh on desktop. On mobile, content height is natural; no forced viewport sizing.
- Section divider (1px `border-rule`) below the CTA row, full content-width, with 80px top margin and 80px bottom margin before § 02.

**Hero CTA routing note:** the `[Get in touch]` secondary CTA routes to `/contact` (full navigation), NOT to `#contact`. The on-page anchor is reserved for body-link/footer-link affordances. This keeps the hero CTA distinct from the in-page scroll affordance.

### 2.3 § 02 — Selected work

**Eyebrow:** `§ 02 — SELECTED WORK` (JetBrains Mono 11px, `text-muted`, +0.1em tracking)

**Section H2** (Fraunces 500, 32px desktop / 26px mobile, -0.01em tracking):

> Selected work

**Layout:** vertical stack of three project cards. 48px gap between cards.

#### Card structure (locked pattern, reused on /projects index)

```
┌────────────────────────────────────────────────────────┐
│  № 01                          INDUSTRIAL · SOFTWARE · SINCE 2019  │
│                                                          │
│  [Project hero image, 16:10, full card width]            │
│                                                          │
│  Project title in Fraunces 22px, text-primary            │
│  1-sentence problem in Inter 16px, text-secondary.       │
│                                                          │
│  C# · WPF · DOCKER · GITLAB CI                            │
│                                                          │
│  See case study →                                        │
└──────────────────────────────────────────────────────────┘
```

**Card styling:**
- Background: `bg-paper` (#FFFEFB)
- Border: 0.5px `border-hairline` (#E5E0D3) on all four sides
- Border-radius: 8px
- Padding: 24px
- Internal vertical rhythm: numeral row → 24px → image → 20px → title → 8px → problem → 16px → stack tags → 20px → CTA

**Numeral row (top):**
- Left: project numeral in JetBrains Mono 13px, `text-primary` (e.g., `№ 01`)
- Right: project type label in JetBrains Mono 11px uppercase, `text-muted`, +0.08em tracking (e.g., `INDUSTRIAL · SOFTWARE · SINCE 2019`)
- Justified left/right within the card content area

**Image:**
- Aspect ratio 16:10 (locked in § 1.5)
- Real screenshot, hardware photo, or architecture diagram preferred
- Typographic placeholder fallback (cream bg, hairline border, 88px Fraunces project numeral, mono caption) when no real image exists
- 0.5px `border-hairline` outline on the image itself
- `next/image` with explicit width/height
- First card: `loading="eager"` (above-the-fold for tall viewports)
- Cards 2 and 3: `loading="lazy"`

**Title:** Fraunces 500, 22px, `text-primary`. Sentence case.

**Problem statement:** Inter 400, 16px, `text-secondary` (#5F5E5A), line-height 1.7.

**Stack tags:** JetBrains Mono 11px uppercase, `text-muted`, +0.08em tracking, separated by ` · `. Maximum 4 tags per card. No background pill — just text.

**Case study link:** `See case study →` in Inter 500, 14px, `accent` color, no underline by default. Underline on hover (`text-underline-offset: 3px`).

**Hover state (whole card):**
- Border color shifts from `border-hairline` (#E5E0D3) to `border-rule` (#D3D1C7)
- Project numeral (`№ 0X`) translates 2px to the right
- Both transitions: 200ms ease-out
- No box-shadow, no scale, no background change
- Cursor pointer; whole card is wrapped in a single `<a>` linking to `/projects/[slug]`

#### The three cards (final copy)

##### № 01 — CNC software at T&S Machines

- **Project numeral:** `№ 01`
- **Type label:** `INDUSTRIAL · SOFTWARE · SINCE 2019`
- **Title:** `CNC software at T&S Machines`
- **Problem statement:** `For four years, I've been writing the software that runs T&S Machines' CNC controllers across a global customer base: probing routines, refactoring for stability, documentation, plus a Docker project on the side.`
- **Stack tags:** `C# · WPF · DOCKER · GITLAB CI`
- **Case study link:** `/projects/ts-machines`
- **Image:** real photo of a Blockmaster CNC machine running T&S software (deliverable: user has provided `reference/TNS machine in action.jpg`)

##### № 02 — Supply chain rerouting at HackZurich

- **Project numeral:** `№ 02`
- **Type label:** `WEB · HACKATHON · 2022`
- **Title:** `Supply chain rerouting at HackZurich`
- **Problem statement:** `Migros wanted to know which shipping routes to switch to when ports get disrupted. We built it in 36 hours and won the Migros challenge.`
- **Stack tags:** `REACT · PYTHON · JUPYTER`
- **Case study link:** `/projects/hackzurich-migros`
- **Image:** team photo (deliverable: user has provided `reference/HackZurich2022GroupPicture.png`)

##### № 03 — NASA Circadian Lighting

- **Project numeral:** `№ 03`
- **Type label:** `EMBEDDED · SENIOR DESIGN · SPRING 2022`
- **Title:** `NASA Circadian Lighting`
- **Problem statement:** `Spacecraft crews on long missions need lighting that tracks human circadian rhythms; plants need their own profiles. I built the controller.`
- **Stack tags:** `PYTHON · RASPBERRY PI · OLA · LUX/RGB SENSORS`
- **Case study link:** `/projects/nasa-circadian-lighting`
- **Image:** real photo of demo rig (deliverable: user has provided 4 senior-design photos in `reference/`)

#### Below the card stack

`See all projects →` link, centered, 32px top margin from card stack:
- Inter 500, 14px, `accent` color
- Underline on hover, 3px offset
- Links to `/projects`

Section divider (1px `border-rule`) below the link, with 80px top margin and 80px bottom margin before § 03.

### 2.4 § 03 — Now

**Eyebrow row** (justified left/right):
- Left: `§ 03 — NOW` (JetBrains Mono 11px, `text-muted`, +0.1em tracking)
- Right: `UPDATED APR 2026` (JetBrains Mono 11px, `text-muted`, +0.08em tracking) — date stamp; updated on each quarterly content refresh

**Section H2:**

> Now

(Fraunces 500, 32px desktop / 26px mobile)

**Body** (Inter 400, 16px, line-height 1.7, max-width 60ch, two paragraphs):

> Working as a Digital Specialist at T&S Machines, mostly the Docker and deployment side of things. Looking for what's next: Docker, infra, or backend work, full-time. Remote preferred, but open to relocating for the right team.
>
> Outside of work I've been trying to get less bad at guitar. Slow progress. Also building a slot machine game in PixiJS for fun, which is going about as well as you'd expect for a project with the words "slot machine" and "for fun" in the same sentence.

**Paragraph spacing:** 16px between paragraphs (`<p>` margin).

**No CTA in this section.** It's prose; let it sit.

Section divider (1px `border-rule`) below, 80px top margin and 80px bottom margin before § 04.

**Maintenance note:** This section is the only one on the homepage that's *expected* to drift. Update quarterly. Update the date stamp (`UPDATED APR 2026`) and the body copy together. Voice rules apply to all updates.

### 2.5 § 04 — Contact (also global footer)

**Inverted section.** Background `bg-inverse` (#2C2C2A), text `text-inverse` (#FAF8F3). All sub-text colors invert proportionally:
- Body text: `text-inverse` (#FAF8F3)
- Mono labels: a desaturated cream — use `#A8A6A0` (slightly muted from full inverse)
- Accent stays `accent` (#C2410C) — pops against dark, no change
- Borders: `#444341` (a charcoal lighter than bg-inverse, equivalent visual weight to `border-hairline` on cream)

**Padding:** 80px vertical / 32px horizontal on desktop, 60px / 20px on mobile. Full-bleed background (extends to viewport edges).

**Anchor target:** the outermost `<footer>` (or `<section>`) element of this component MUST have `id="contact"` in both render modes (homepage contact mode and sitewide footer mode). This is the destination for `See contact ↓` anchor links from project pages and any other body-link contact affordances on the site.

**Conditional rendering:** This component renders in two modes:
- **Homepage mode:** includes the `§ 04 — CONTACT` eyebrow, "Get in touch" H2, and the email-fastest-way line.
- **Sitewide footer mode:** drops the eyebrow + H2 + email line. Only renders the dividers, "Elsewhere" row, and colophon.

The masthead and other pages render footer mode. The homepage renders contact mode. The `id="contact"` is present in both modes.

#### Layout (homepage / contact mode)

**Eyebrow:** `§ 04 — CONTACT` (JetBrains Mono 11px, +0.1em tracking, color `#A8A6A0`)

**Section H2:** `Get in touch` (Fraunces 500, 32px, color `text-inverse`)

**Body line** (Inter 400, 16px, line-height 1.7, color `text-inverse`):

> Email is the fastest way. I usually reply within a couple of days.

**Email link** (Inter 500, 18px, `accent` color, with arrow prefix):

> → alex.bacallao1996@gmail.com

- `mailto:` link
- No underline by default; underline on hover
- The arrow `→` is part of the visible text, sits 12px to the left of the email

#### Divider 1

Full-width 0.5px line in `#444341`. 48px above, 48px below.

#### "Elsewhere" row

Two columns on desktop, stacked on mobile.

- **Left column:** `ELSEWHERE` label in JetBrains Mono 11px uppercase, color `#A8A6A0`, +0.1em tracking
- **Right column:** three links separated by ` · ` middots:
  - `LinkedIn` → `https://linkedin.com/in/alejandrobacallao`
  - `GitHub` → `https://github.com/TacticalDoggo`
  - `Resume (PDF)` → `/resume.pdf`
- Link styling: Inter 500, 14px, `text-inverse` color
- Hover: color shifts to `accent`, underline appears
- External links open in same tab (no `target="_blank"` per general accessibility preference)

#### Divider 2

Same as Divider 1.

#### Colophon row

Two columns on desktop, stacked on mobile.

- **Left column** (3 lines, JetBrains Mono 11px uppercase, color `#A8A6A0`, line-height 1.6):

  ```
  № 01 ALEX BACALLAO
  FT WORTH, TX
  © 2026
  ```

- **Right column** (3 lines, JetBrains Mono 11px uppercase, color `#A8A6A0`, line-height 1.6, right-aligned on desktop / left-aligned on mobile):

  ```
  SET IN FRAUNCES, INTER,
  AND JETBRAINS MONO.
  NEXT.JS / VERCEL.
  ```

- The `© 2026` year is hardcoded for this issue. When the copyright year rolls over, it gets manually updated as part of the quarterly maintenance pass (along with § 03). Do not auto-generate the year; that's anti-conceit.

### 2.6 SEO metadata (homepage)

| Field | Value |
|---|---|
| **Title tag** | `Alex Bacallao - Software Developer` (34 chars) |
| **Meta description** | `Software developer in Ft Worth, Texas. 4 years across embedded systems, healthcare, and industrial automation. Selected work: Docker for CNC, NASA, HackZurich.` (159 chars) |
| **H1** | `Software for systems where reliability matters.` |
| **Canonical URL** | `https://alexbacallao.com/` |
| **Word count** | ~250 ✓ |
| **OG title** | `Alex Bacallao - Software Developer` |
| **OG description** | (same as meta description) |
| **OG image** | Auto-generated via `@vercel/og` (template below) |
| **Twitter card** | `summary_large_image` |

#### OG image template (1200×630, auto-generated)

- Background: `bg-page` (#FAF8F3)
- Top-left: `№ 01 ALEX BACALLAO` in JetBrains Mono 18px, color `text-primary`, +0.08em tracking
- Center: `Software for systems where reliability matters.` in Fraunces 500, 64px, color `text-primary`, max-width 80% of canvas, line-height 1.05
- Bottom-left: `SOFTWARE DEVELOPER · FT WORTH, TX` in JetBrains Mono 14px, color `text-muted`, +0.08em tracking
- Bottom-right: `● PASSIVELY OPEN` in JetBrains Mono 14px, color `accent`, +0.08em tracking (bullet `●` colored `accent`)
- 0.5px hairline border (`border-hairline` color) inset 32px from all four edges
- No images, no logos, typography only

This template generalizes: every page's OG image swaps the H1 and the meta line below. Same masthead, same border, same composition.

#### JSON-LD schema (in `<script type="application/ld+json">`)

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Alex Bacallao",
  "url": "https://alexbacallao.com",
  "author": {
    "@type": "Person",
    "name": "Alejandro Bacallao",
    "alternateName": "Alex Bacallao",
    "jobTitle": "Software Developer",
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "University of North Texas"
    },
    "knowsLanguage": ["en", "es", "de"],
    "knowsAbout": [
      "Docker",
      "Python",
      "C",
      "C++",
      "Embedded Systems",
      "Industrial Automation",
      "Software Development"
    ],
    "homeLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Ft Worth",
        "addressRegion": "TX",
        "addressCountry": "US"
      }
    },
    "sameAs": [
      "https://linkedin.com/in/alejandrobacallao",
      "https://github.com/TacticalDoggo"
    ]
  }
}
```

**Note:** email deliberately omitted from JSON-LD. Putting it in structured data invites scraping. Email lives in the contact strip where humans see it.

### 2.7 Interactions (homepage-specific)

- **Sticky masthead:** as specified in § 2.1.
- **Project card hover:** as specified in § 2.3 (border color shift + numeral 2px translate, 200ms).
- **Scroll fade-in:** project cards (§ 2.3) and Now section (§ 2.4) fade in on scroll using IntersectionObserver. Opacity 0 → 1 over 400ms with a 50px Y-offset translate. Hero (§ 2.2) loads at full opacity; no fade. Users with `prefers-reduced-motion: reduce` skip the fade entirely.
- **No parallax. No image zoom. No cursor effects. No animated background.**
- **Smooth-scroll for anchor links** (none on homepage but inherits sitewide preference).
- **Focus states:** all interactive elements get a 2px `accent` outline with 2px offset on `:focus-visible`. No default browser focus rings.

---

## § 3 NASA Circadian Lighting (`/projects/nasa-circadian-lighting`)

<!-- INSERT: pass2-nasa-circadian-lighting.md content here, with cleanup rules applied:
     - Drop the metadata header (Project / Page / Locked / Status / Depends on / Establishes the case study pattern)
     - Drop § 3.11 Lock criteria checklist
     - Drop § 3.12 Pattern decisions established here (already consolidated in § 1.9-1.12)
     - Rewrite cross-doc refs: "pass2-homepage.md § 2.X" → "§ 2.X"
     - Renumber subsections to use § 3.X scheme (already aligned)
-->

---

## § 4 Contact (`/contact`)

<!-- INSERT: pass2-contact.md content here, with cleanup rules applied:
     - Drop the metadata header
     - Drop § 4.11 Lock criteria checklist
     - Drop § 4.12 Pattern decisions established here
     - Rewrite cross-doc refs: "pass2-homepage.md § 2.5" → "§ 2.5"
     - Renumber subsections to use § 4.X scheme (already aligned)
-->

---

## § 5 About (`/about`)

<!-- INSERT: pass2-about.md content here, with cleanup rules applied:
     - Drop the metadata header
     - Drop § 5.10 Pass 1 voice rule clarifications established here (already in § 1.6)
     - Drop § 5.12 Lock criteria checklist
     - Drop § 5.13 Pattern decisions established here (already in § 1.9-1.12)
     - Rewrite cross-doc refs: "pass2-homepage.md § 2.5" → "§ 2.5"
     - Renumber subsections to use § 5.X scheme (already aligned)
-->

---

## § 6 Resume (`/resume` and `/resume.pdf`)

<!-- INSERT: pass2-resume.md content here, with cleanup rules applied:
     - Drop the metadata header
     - Drop § 6.14 Cross-page implications (handled in change log)
     - Drop § 6.16 Lock criteria checklist
     - Drop § 6.17 Pattern decisions established here (already in § 1.9-1.12)
     - Rewrite cross-doc refs: "pass2-homepage.md § 2.X" → "§ 2.X"; "pass2-contact.md § 4.X" → "§ 4.X"
     - Renumber subsections to use § 6.X scheme (already aligned)
-->

---

## § 7 CNC software at T&S Machines (`/projects/ts-machines`)

<!-- INSERT: pass2-ts-machines.md content here, with cleanup rules applied:
     - Drop the metadata header (including "Important framing context" block — context preserved in change log)
     - Drop § 7.11 Lock criteria checklist
     - Drop § 7.12 Cross-page implications (handled in change log)
     - Drop § 7.13 Pattern decisions established here (already in § 1.9-1.12)
     - Rewrite cross-doc refs: "pass2-homepage.md § 2.X" → "§ 2.X"; "pass2-nasa-circadian-lighting.md § 3.X" → "§ 3.X"
     - Renumber subsections to use § 7.X scheme (already aligned)
-->

---

## § 8 Supply chain rerouting at HackZurich (`/projects/hackzurich-migros`)

<!-- INSERT: pass2-hackzurich-migros.md content here, with cleanup rules applied:
     - Drop the metadata header
     - Drop § 8.11 Lock criteria checklist
     - Drop § 8.12 Cross-page implications (handled in change log)
     - Drop § 8.13 Pattern decisions reinforced (not new) (already in § 1.9-1.12)
     - Rewrite cross-doc refs: "pass2-homepage.md § 2.X" → "§ 2.X"; "pass2-nasa-circadian-lighting.md § 3.X" → "§ 3.X"
     - Renumber subsections to use § 8.X scheme (already aligned)
-->

---

## § 9 Projects index (`/projects`)

<!-- INSERT: pass2-projects-index.md content here, with cleanup rules applied:
     - Drop the metadata header
     - Drop § 9.9 Lock criteria checklist
     - Drop § 9.10 Cross-page implications (handled in change log)
     - Drop § 9.11 Pattern decisions reinforced (not new) (already in § 1.9-1.12)
     - Drop § 9.12 Pattern decisions established here (already in § 1.9-1.12)
     - Rewrite cross-doc refs: "pass2-homepage.md § 2.X" → "§ 2.X"; "pass2-nasa-circadian-lighting.md § 3.X" → "§ 3.X"
     - Renumber subsections to use § 9.X scheme (already aligned)
-->

---

## § 10 Patient messaging at Nicular (`/projects/nicular`)

<!-- INSERT: pass2-nicular.md content here, with cleanup rules applied:
     - Drop the metadata header (including "Important framing context" block — context preserved in change log)
     - Drop § 10.11 Lock criteria checklist
     - Drop § 10.12 Cross-page implications applied (handled in change log)
     - Drop § 10.13 Pattern decisions reinforced (not new) (already in § 1.9-1.12)
     - Drop § 10.14 Pattern decisions established here (already in § 1.9-1.12)
     - Rewrite cross-doc refs: "pass2-homepage.md § 2.X" → "§ 2.X"; "pass2-nasa-circadian-lighting.md § 3.X" → "§ 3.X"; "pass2-projects-index.md" → "§ 9"
     - Renumber subsections to use § 10.X scheme (already aligned)
-->

---

## § 11 SofaBot (`/projects/sofabot`)

<!-- INSERT: pass2-sofabot.md content here, with cleanup rules applied:
     - Drop the metadata header (including "Important framing context" block — context preserved in change log)
     - Drop § 11.9 Lock criteria checklist
     - Drop § 11.10 Cross-page implications applied (handled in change log)
     - Drop § 11.11 Pattern decisions established here (already in § 1.9-1.12)
     - Rewrite cross-doc refs: "pass2-homepage.md § 2.X" → "§ 2.X"; "pass2-nasa-circadian-lighting.md § 3.X" → "§ 3.X"; "pass2-projects-index.md" → "§ 9"
     - Renumber subsections to use § 11.X scheme (already aligned)
-->

---

# Part 3 — Identity, deliverables, and change log

## Identity references (locked, used in JSON-LD and elsewhere)

- **Full name:** Alejandro (Alex) Bacallao
- **Email:** alex.bacallao1996@gmail.com
- **Phone:** 817-319-0274 (PDF only; HTML and JSON-LD omit)
- **LinkedIn:** linkedin.com/in/alejandrobacallao
- **GitHub:** github.com/TacticalDoggo
- **Location:** Ft Worth, TX (residence); past T&S work in Gainesville, TX
- **Education:** B.S. Computer Engineering, Minor in Mathematics, University of North Texas, Dec 2023
- **Current role:** Digital Specialist at T&S Machines (since Dec 2023). Previously Software Developer at T&S (Nov 2019 - Mar 2023, student worker through graduation).
- **Brief stint:** Software Developer at Nicular (Nov 2022 - Jan 2023, full-time, fully remote, healthcare startup based in Dallas).
- **Languages spoken:** English (native), Spanish (native), German (A2 / B1)
- **Awards:** 1st place Migros challenge HackZurich 2022; 1st place UNT Robotics Competition 2020; 3rd place UNT Robotics Competition 2019.
- **Availability:** Passively open. Currently a Digital Specialist at T&S Machines.

---

## Open items resolved at lock

1. **GitHub handle:** ✓ `TacticalDoggo`
2. **Domain availability:** Pending user check at registrar. Target `alexbacallao.com`; backups `alejandrobacallao.com`, `bacallao.dev`, `alexbacallao.dev`. Spec is not blocked on this — does not need to be locked until deploy.
3. **Pre-launch real photos:** Largely received as of 2026-04-28 in `reference/`. T&S, NASA, HackZurich, SofaBot all have photos. Nicular intentionally uses a typographic placeholder.

---

## Standing deliverables for Pass 3 build

1. **Domain registration** (target: `alexbacallao.com`).
2. **Move reference images** to `/public/projects/[slug]/` paths during build.
3. **Resume PDF** at `/resume.pdf`. User maintains. ATS-parseable, one-page, includes phone number, date stamp synced with HTML.
4. **GitHub presentability before launch.** Push the PixiJS slot-machine and any other shareable code. The contact page's "mostly experiments and a few utility scripts" line should be honest at launch.
5. **Em-dash linter** as a build-time check. Roughly 8 em-dash violations were caught during Pass 2 drafting; tooling will catch them faster than human review. Lint U+2014 across all copy files; fail the build on violation.
6. **OG image generation** wired via `@vercel/og`.
7. **JSON-LD blocks** in `<head>` per page, per § 1.7 schema list.
8. **Card data extraction** to a single source of truth (`projects.ts` or similar) so homepage and /projects index render from the same data.
9. **Resume markdown date correction** — the source `reference/AlejandroBacallaoResume.md` likely still has HackZurich as 2023; out of scope for spec edits but worth fixing on the next resume update.
10. **Typographic placeholder component** built once, reusable for any future HIPAA / IP-constrained project page.

---

# Change log (Pass 2 amendments)

The amendment blocks below are the historical record of when each decision was added during Pass 2. The body of this document above (§ 1.1 through § 11.X) is the canonical source of truth as of consolidation; the entries here exist for traceability about *when* and *why* each rule emerged.

## Pass 2 amendments — Homepage lock (2026-04-27)

Applied while locking the homepage:

- **Location** changed from `Gainesville, Texas (currently)` to `Ft Worth, TX (residence); past work in Gainesville, TX`. Reason: user lives in Ft Worth; Gainesville is the T&S work location. Affects JSON-LD `homeLocation`, `llms.txt`, About page, contact strip.
- **Availability** changed from `Q2 2026` to `Passively open, currently at T&S Machines`. Reason: user is currently employed and passively open, not on a hard end date. Affects hero CTA pill (now `● PASSIVELY OPEN`), `llms.txt`, About page.
- **Spain (Rota) flag** removed. Trip / temporary; not relevant to the site.
- **Title (current role):** user is now `Digital Specialist` at T&S, not `Software Developer Consultant` per the original resume.

## Pass 2 amendments — NASA project page lock (2026-04-27)

- **Voice rule clarification — "one wink per page":** the rule from § 1.6 is about gag density, not absolute count. Two well-separated, tonally consistent asides on a long-form page (~500+ words apart, same self-aware register) are acceptable. Pages locked under this clarification: homepage (§ 2.4 guitar + slot-machine pairing), NASA project page (dek + parking-lot pairing).
- **Date correction:** NASA Circadian Lighting project ran Spring 2022, not 2023. Affected the homepage № 03 card type label, the NASA project page header, and the JSON-LD `dateCreated`.

## Pass 2 amendments — Contact page lock (2026-04-27)

- **No-form contact pattern** established: mailto first, response-time mono table, "elsewhere" links as bulleted list with bold link + description.
- **Email exposed in JSON-LD only on contact page**, not in sitewide Person schema.
- **Phone number deliberately omitted** from contact page (email-only preference for web context).

## Pass 2 amendments — About page lock (2026-04-27)

- **Voice rule clarification — numerals vs. determiners:** "numerals over spelled numbers" applies to *quantities* ("4 years"). When "one" functions as a *determiner* in an enumeration ("one Swiss, one German"), spelling out is permitted. Use spelled determiners in lists where digits would be visually awkward.
- **Voice rule clarification — sentence fragments:** permitted when they do *illustrative* work and add rhythm. Example: About § 5.4 line *"Quick asides between the two German speakers, the occasional clarification."*
- **Privacy carve-out:** About page deliberately omits family-origin / ethnicity detail per user preference. Should not be reversed without explicit user re-authorization.

## Pass 2 amendments — Resume page lock (2026-04-27)

- **Two-format page pattern** established: HTML page + hand-maintained PDF, kept in sync via shared date stamp. PDF is hand-maintained, NOT auto-generated.
- **Awards section threshold rule** established: 3+ awards earn a dedicated section; 1-2 fold inline.
- **No-wink genre commitment** established: some pages spend zero winks for genre reasons. Resume locked first; T&S, HackZurich, Nicular extended.
- **Phone number policy** established: omitted from HTML and sitewide JSON-LD; included on PDF only.
- **Role entry pattern** established for work history (two-line structured header, prose body, optional case-study link).
- **Skills wall pattern** established (two-column mono tables grouped by category).
- **Outreach / volunteering as one-line addition** pattern established.

## Pass 2 amendments — HackZurich year correction (2026-04-27)

- **HackZurich year corrected** from 2023 to 2022 (Sep 2022). Mistake originated in the source resume markdown and propagated through 8 references across homepage, About, resume in three places, and homepage № 02 card type label. All references corrected.

## Pass 2 amendments — T&S project page lock (2026-04-28)

Largest single amendment cycle in Pass 2:

- **Project framing reframe.** Page originally specced as `Docker for industrial CNC` with Docker as headline. User clarified Docker is a personal side-project, not the actual T&S ship process. Page reframed to broader 4-year T&S work, with Docker as one section. Cascading walk-backs applied to homepage № 01 card, three resume sections, and About § 5.3.
- **New section pattern: "Current state"** instead of "Outcome" for ongoing projects.
- **New section pattern: side-project section** for substantive sub-initiatives.
- **Five-section flow variant** established for ongoing-work-with-side-project projects.
- **No-wink genre extension** to professional consulting work in case study form.
- **Date range convention:** prefer `SINCE 2019` over hyphenated ranges. When a range is required, use hyphen-minus, never em dash.
- **Hyphenation exception** for the T&S § 7.3 section title "side-project" (compound noun); two words elsewhere on the site.

## Pass 2 amendments — HackZurich Migros project page lock (2026-04-28)

- **Hero photo over hero screenshot** pattern established for team-achievement projects.
- **No-fabrication discipline** explicitly recorded as a pattern (multiple walks-back during this lock: algorithmic depth, supply-chain scope, team-name fabrication caught and removed).
- **Illustrative-fragment pattern** demonstrated in case study prose (§ 8.5 closing, three parallel fragments + recovery sentence).
- **Algorithm credit balanced** with presentation-craft framing (project-specific decision, recorded for context).

## Pass 2 amendments — /projects index page lock (2026-04-28)

- **Card pattern reuse across pages** established as cross-page sync constraint.
- **Quality-weighted ordering** established for project listings when date inversely correlates with case-study weight.
- **No-claimed-order dek pattern** established for directory pages.
- **Stack tag count varies by project density** clarified — not a fixed slot count.
- **Typographic placeholder pattern** first used (Nicular card, before Nicular case study lock).

## Pass 2 amendments — Nicular project page lock (2026-04-28)

- **Honest hero-absence framing** pattern established (typographic placeholder + caption explaining absence and reason).
- **Mixed-depth disclaimer pattern** established for contributions with real depth in some places and shallow scope in others.
- **Contract-vs-full-time correction at Nicular.** Role was full-time employment, not contract. Cascading walk-backs applied across resume § 6.3 and § 6.4, About § 5.3, /projects index card 4. Identity references updated.
- **"Why I left" treatment** established as editorial discipline. Case studies report what was done, not why someone moved on.

## Pass 2 amendments — SofaBot project page lock (2026-04-28)

- **4-section compressed case study pattern** established for hobbyist/club projects.
- **Wink-budget per genre, not just per page-length** clarified. Hobbyist/club projects can earn 2 winks even on short pages; professional case studies earn zero winks even on long pages. Per-page genre commitment.
- **Wink-as-noun-phrase pattern** established (winks don't have to be sentence-level jokes).
- **Wink-by-understatement pattern** established (flat factual statements that read as winks because their content is absurd).
- **SofaBot date label correction** to `SINCE 2019` (project sparingly active since 2022 with monthly cadence; "2019-2020" framing was inaccurate).
- **Resume § 6.8 outreach mention dropped** — user clarified they weren't personally at the elementary school outreach.

---

## Consolidation amendments (2026-04-28)

- **Pass 1 amendment consolidation.** Heavy rewrite of Pass 1 incorporating all 23 audit findings into the body. New sections § 1.9 Page Patterns, § 1.10 Component Patterns, § 1.11 Cross-Page Sync Constraints, § 1.12 Editorial Discipline added. Original amendment blocks retained as historical change log (above).
- **Final consistency audit.** 20 findings across 3 tiers; all fixes applied:
  - Tier 1 (critical): Resume role entry headers em dashes → hyphen-minus; resume date ranges em dashes → hyphen-minus; resume awards bullet em dash → comma; resume Education header em dash → hyphen-minus; resume HackZurich prize 100 CHF → 200 CHF; resume PDF spec slug `/ts-docker-cnc` → `/ts-machines`; NASA spec stale `T&S Docker` references → `T&S Machines`; About § 5.4 wink restored to prose.
  - Tier 2 (important): Homepage § 2.3 ASCII illustration card example updated to current T&S framing; homepage T&S amendment block em dash → hyphen-minus; homepage standing deliverables tightened; contact § 4.5 drafting commentary cleaned; resume § 6.2 dek drafting commentary removed; resume § 6.13 em-dash debate parenthetical cleaned; resume § 6.8 stale outreach annotation updated.
  - Tier 3 (cosmetic): /projects § 9.7 stale annotations updated; NASA § 3.1 placeholder note extended with honest hero-absence framing reference; notes.md status updated; Nicular § 10.0 IA labeling corrected.
- **SITE_SPEC.md assembly (in progress).** This document, started 2026-04-28. Pass 1 (§ 1.1-1.12) consolidated; § 2 Homepage merged. Sections § 3-§ 11 pending; insert markers in place with per-section cleanup rules. Continue in next session.

