// Project card data. Single source of truth for the homepage's
// Selected work section (SITE_SPEC.md section 2.3) and the future
// /projects index (section 1.11 cross-page-sync constraint).
//
// Source casing is natural (sentence case for plain words; proper nouns
// and acronyms preserved). The mono-label utility's text-transform:
// uppercase produces the rendered ALL-CAPS for type labels and stack tags.
//
// Real hero photos at /public/projects/[slug]/ are deferred to a later
// build step per the standing pre-launch deliverable; until then, the
// ProjectCard component renders a typographic placeholder
// (section 1.10.5).

export type Project = {
  slug: string;
  number: string;
  typeLabel: string;
  title: string;
  problem: string;
  stack: readonly string[];
  href: string;
};

export const homepageProjects: readonly Project[] = [
  {
    slug: 'ts-machines',
    number: '№ 01',
    typeLabel: 'Industrial · Software · Since 2019',
    title: 'CNC software at T&S Machines',
    problem:
      "For four years, I've been writing the software that runs T&S Machines' CNC controllers across a global customer base: probing routines, refactoring for stability, documentation, plus a Docker project on the side.",
    stack: ['C#', 'WPF', 'Docker', 'GitLab CI'],
    href: '/projects/ts-machines',
  },
  {
    slug: 'hackzurich-migros',
    number: '№ 02',
    typeLabel: 'Web · Hackathon · 2022',
    title: 'Supply chain rerouting at HackZurich',
    problem:
      'Migros wanted to know which shipping routes to switch to when ports get disrupted. We built it in 36 hours and won the Migros challenge.',
    stack: ['React', 'Python', 'Jupyter'],
    href: '/projects/hackzurich-migros',
  },
  {
    slug: 'nasa-circadian-lighting',
    number: '№ 03',
    typeLabel: 'Embedded · Senior design · Spring 2022',
    title: 'NASA Circadian Lighting',
    problem:
      'Spacecraft crews on long missions need lighting that tracks human circadian rhythms; plants need their own profiles. I built the controller.',
    stack: ['Python', 'Raspberry Pi', 'OLA', 'Lux/RGB sensors'],
    href: '/projects/nasa-circadian-lighting',
  },
] as const;
