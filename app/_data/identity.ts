// Single source of truth for identity references. Cross-page-sync constraint
// per CLAUDE.md and SITE_SPEC.md sections 1.11 and Part 3 "Identity references".
// All values verbatim from Part 3. Phone is intentionally omitted (PDF only).

export const identity = {
  name: 'Alex Bacallao',
  fullName: 'Alejandro Bacallao',
  number: '№ 01',
  role: 'Software Developer',
  email: 'alex.bacallao1996@gmail.com',
  location: 'Ft Worth, TX',
  availability: 'PASSIVELY OPEN',
  links: {
    linkedin: 'https://linkedin.com/in/alejandrobacallao',
    github: 'https://github.com/TacticalDoggo',
    resumePdf: '/resume.pdf',
  },
} as const;

export const nav = [
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '/contact' },
] as const;
