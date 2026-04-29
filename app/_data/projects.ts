// Project card data. Single source of truth per SITE_SPEC.md section 1.11
// (Cross-Page Sync Constraints). Both the homepage's Selected work section
// (section 2.3) and the /projects index (docs/pass2-projects-index.md § 9)
// render from this file.
//
// Source casing is natural (sentence case for plain words; proper nouns and
// acronyms preserved). The mono-label utility's text-transform: uppercase
// produces the rendered ALL-CAPS for type labels and stack tags.
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
  /**
   * Public path to the hero photo (e.g. '/projects/sofabot/sofabot.png').
   * Forward-prep for the future photo-wiring step; ProjectCard does NOT
   * yet read this. While `image` is set with no `placeholderCaption`, the
   * card renders the deferred-photo placeholder (bg-bg-alt + numeral).
   * This is the current intended behavior, not a fallback for a missing
   * image.
   */
  image?: string;
  /**
   * When set, the card renders the section 1.10.5 typographic placeholder
   * (bg-bg-paper + numeral + caption beneath). Used for projects whose
   * heroes can't ever show real customer data (Nicular, HIPAA). Wins
   * over `image` if both happen to be set.
   */
  placeholderCaption?: string;
};

export const allProjects: readonly Project[] = [
  {
    slug: 'ts-machines',
    number: '№ 01',
    typeLabel: 'Industrial · Software · Since 2019',
    title: 'CNC software at T&S Machines',
    problem:
      "For four years, I've been writing the software that runs T&S Machines' CNC controllers across a global customer base: probing routines, refactoring for stability, documentation, plus a Docker project on the side.",
    stack: ['C#', 'WPF', 'Docker', 'GitLab CI'],
    href: '/projects/ts-machines',
    image: '/projects/ts-machines/machine-in-action.jpg',
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
    image: '/projects/hackzurich-migros/team-after-win.png',
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
    image: '/projects/nasa-circadian-lighting/demo-rig.jpg',
  },
  {
    slug: 'nicular',
    number: '№ 04',
    typeLabel: 'Healthcare · Full-time · Late 2022',
    title: 'Patient messaging at Nicular',
    problem:
      'Two-month role building an SMS and email reminder system for clinician workflows under HIPAA compliance.',
    stack: ['Vonage', 'GSuite', 'SQL'],
    href: '/projects/nicular',
    placeholderCaption: 'HIPAA-compliant · No customer data shown',
  },
  {
    slug: 'sofabot',
    number: '№ 05',
    typeLabel: 'Robotics · Club · Since 2019',
    title: 'SofaBot',
    problem:
      'Mobile sofa robot for the UNT Robotics Club. Programming, electronics, assembly. Yes, it actually moved.',
    stack: ['Arduino', 'Electronics'],
    href: '/projects/sofabot',
    image: '/projects/sofabot/sofabot.png',
  },
] as const;

export const homepageProjects: readonly Project[] = allProjects.slice(0, 3);
