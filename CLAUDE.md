# CLAUDE.md - Alex Bacallao Portfolio Site

## Project

Personal portfolio site for Alex Bacallao, a software developer targeting full-time engineering roles. The site is a typeset editorial publication, not a marketing site. Every design choice serves that conceit: Fraunces serif headlines, JetBrains Mono labels, cream paper tones, numbered sections ("No 01"), no stock photos, no gradients, no parallax.

Build quality is the portfolio. If this site doesn't ship clean, nothing else on it matters.

## Spec

The site was fully specified before the build. `SITE_SPEC.md` is the single source of truth. It contains Part 1 (brand, voice, patterns, components, editorial discipline) and Part 2 (all 10 page specs). Read the relevant page spec before writing any code.

**But read `deviations.md` first.** Always. Deviations override the spec wherever they conflict.

## Tech Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Fonts: Fraunces (serif headlines), Inter (body/UI), JetBrains Mono (labels/code). Self-hosted via `next/font/google`.
- Hosting: Vercel
- Analytics: Plausible (privacy-friendly, no cookie banner)
- No jQuery. No animation libraries. CSS transitions + opacity fade-in on scroll only.

## Dev Server

Use the default port unless told otherwise.

## Build Order

1. Project scaffold (Next.js, Tailwind, fonts, globals, layout)
2. Design tokens (CSS variables from SITE_SPEC.md Section 1.2-1.3)
3. Masthead and global footer (used on every page)
4. Homepage (hero, selected work cards, Now block, contact footer mode)
5. Project card component + shared data file (`projects.ts`)
6. /projects index
7. NASA Circadian Lighting case study
8. T&S Machines case study
9. HackZurich Migros case study
10. Nicular case study (typographic placeholder hero)
11. SofaBot case study
12. About page
13. Resume page (HTML) + resume.pdf static asset
14. Contact page
15. SEO files (llms.txt, robots.txt, sitemap, JSON-LD per page)
16. OG image generation (@vercel/og)
17. Em-dash linter (build-time check, fail on U+2014)
18. Lighthouse optimization pass
19. Deploy

## Hard Rules

- No em dashes. Anywhere. Ever. Use hyphens, colons, or periods.
- No stock photography. Real artifacts, typographic placeholders, or nothing.
- Sentence case for all headings. Never Title Case.
- No "passionate," "thrive," "leverage," "synergy," "cutting-edge," "innovative," "world-class," "rockstar," "ninja," "guru," "excited," "thrilled," or "journey" in any copy.
- Every page ships with: title tag, meta description, canonical URL, OG tags, JSON-LD schema.
- Every image has alt text. 100% coverage.
- Lighthouse mobile target: LCP < 1.5s, CLS 0, INP < 200ms.
- Project cards on homepage and /projects render from the same data source. Never duplicate card content.
- No fabrication. If a technical claim isn't in the spec, don't invent it.
- Wink budget is per-page genre. Zero winks on Resume, T&S, HackZurich, Nicular. See SITE_SPEC.md Section 1.6 for the full breakdown.

## Key Colors

- Page background: #FAF8F3 (cream)
- Card/raised surfaces: #FFFEFB (paper)
- Section alternate: #F1EFE8
- Dark sections/footer: #2C2C2A (charcoal)
- Text primary: #2C2C2A
- Text secondary: #5F5E5A
- Accent (single, surgical): #C2410C (burnt orange)
- Hairline borders: #E5E0D3
- Section dividers: #D3D1C7

Full token table in SITE_SPEC.md Section 1.2.

## Deviations File

`deviations.md` tracks every change made during the build that differs from the spec. **Read it before building or modifying any page.**

When you deviate from the spec during a build:
1. Make the change in code
2. Log it in `deviations.md` with the date, the page affected, what the spec said, what changed, and why
3. Use the same format as existing entries

Deviations are not mistakes. They're decisions made during implementation that the spec didn't anticipate. The file exists so the next session doesn't undo them.

## Build Tracker

`tracker.md` tracks what's done, what's in progress, components built, pages live, and pending items. **Update it after every commit that changes the build state.**

The tracker has four tables:
- **Build Order Status** (task, status, notes)
- **Components Built** (component, path, used on)
- **Pages Live** (page, route, Lighthouse score, last tested)
- **Pending Items** (open issues not in the build order)

## Planning Mode Workflow

Use Planning mode for every new page or major component. The workflow:

1. Claude Code generates a plan (Planning mode)
2. Alex sends the plan to his build consultant (separate Claude.ai project) for review
3. Consultant checks the plan against the spec + deviations and flags issues
4. Alex kicks off the build with any corrections applied

This catches spec misreads before code gets written. Don't skip it.

## Post-Commit Hooks

A hook in `.claude/hooks/post-commit-deviations.sh` fires after every `git commit`. It inspects the changed files and triggers one of three levels:

- **Level 1 (any commit):** Reminder to update tracker.md.
- **Level 2 (page or component changes):** Update tracker + check deviations against the spec.
- **Level 3 (new page built):** Update tracker + check deviations + run the full review checklist (content, SEO, accessibility, code quality, build, Lighthouse). Do NOT fix anything during review. Report issues only. Log them in tracker.md under Review Findings.

The hook is configured in `.claude/settings.json`. Don't modify the hook without Alex's approval.

## Cross-Page Sync

These content items appear on multiple pages. They must stay consistent:

- **Project cards:** Homepage and /projects render from the same `projects.ts` data file.
- **Identity references:** Email, LinkedIn, GitHub, location, availability. Single source in SITE_SPEC.md Part 3 "Identity references." All pages reference from there.
- **Resume and About:** Share narrative beats. Changes to one should be checked against the other.
- **Resume HTML and PDF:** Shared date stamp. Both update together.

See SITE_SPEC.md Section 1.11 for the full list.

## What NOT To Do

- Don't add animation libraries. CSS transitions only.
- Don't create separate CSS/JS files for components. Single-file components.
- Don't skip SEO elements to "add later." Every page launches complete.
- Don't apply spec copy without checking deviations.md first.
- Don't invent content the spec doesn't contain. If a technical claim or project detail isn't in the spec, ask rather than fabricate.
- Don't use Title Case in headings. Sentence case always.
- Don't use rounded corners over 8px on images. No drop shadows on images. No gradients on images.
- Don't use em dashes. The build-time linter will catch them, but don't create the problem.
