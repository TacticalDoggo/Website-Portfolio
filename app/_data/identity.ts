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

// Sitewide Person JSON-LD object. Verbatim values from SITE_SPEC § 2.6 (the
// `author` Person block of the homepage WebSite schema) and § 1.7 (Person
// schema fields list). Email is deliberately omitted from sitewide structured
// data per § 1.7 / § 2.6 note - only /contact exposes email in JSON-LD.
// Imported by both PersonJsonLd (mounted sitewide in layout) and
// WebSiteJsonLd (mounted on homepage as `author`).
export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Alejandro Bacallao',
  alternateName: 'Alex Bacallao',
  jobTitle: 'Software Developer',
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'University of North Texas',
  },
  knowsLanguage: ['en', 'es', 'de'],
  knowsAbout: [
    'Docker',
    'Python',
    'C',
    'C++',
    'Embedded Systems',
    'Industrial Automation',
    'Software Development',
  ],
  homeLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ft Worth',
      addressRegion: 'TX',
      addressCountry: 'US',
    },
  },
  sameAs: [
    'https://linkedin.com/in/alejandrobacallao',
    'https://github.com/TacticalDoggo',
  ],
} as const;

export const nav = [
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '/contact' },
] as const;
