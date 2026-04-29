// /projects index. Locked source: docs/pass2-projects-index.md (the
// SITE_SPEC.md section 9 INSERT marker is empty; the pass2 doc is canonical).
//
// Two content sections per docs/pass2-projects-index.md section 9.1:
//   section 01 Index header   - 9.2 (eyebrow + H1 + dek)
//   section 02 All projects   - 9.3 (5-card stack, 48px gap)
// Global footer (sitewide mode) is rendered by app/layout.tsx via SiteFooter.
//
// The root layout owns <main>; this page returns a fragment so we don't
// double-wrap. JSON-LD CollectionPage + ItemList ships inline this step
// rather than waiting on build step 15 - schema is fully locked, deferring
// is cheap to do later but adds a "remember to come back" cost. See
// deviations.md for the formal entry.

import type { Metadata } from 'next';
import { ProjectCard } from '../_components/ProjectCard';
import { RevealOnScroll } from '../_components/RevealOnScroll';
import { SectionDivider } from '../_components/SectionDivider';
import { allProjects } from '../_data/projects';

const PAGE_DESCRIPTION =
  'Five projects with case studies: CNC software at T&S Machines, HackZurich Migros (1st place), NASA Circadian Lighting, patient messaging at Nicular, SofaBot.';

export const metadata: Metadata = {
  title: 'Projects - Alex Bacallao',
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: 'https://alexbacallao.com/projects',
  },
  openGraph: {
    title: 'Projects - Alex Bacallao',
    description: PAGE_DESCRIPTION,
    url: 'https://alexbacallao.com/projects',
    type: 'website',
  },
};

const SHELL = 'max-w-[880px] mx-auto px-5 md:px-8';

const collectionPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Projects',
  url: 'https://alexbacallao.com/projects',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Alex Bacallao',
    url: 'https://alexbacallao.com',
  },
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: 5,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        url: 'https://alexbacallao.com/projects/ts-machines',
        name: 'CNC software at T&S Machines',
      },
      {
        '@type': 'ListItem',
        position: 2,
        url: 'https://alexbacallao.com/projects/hackzurich-migros',
        name: 'Supply chain rerouting at HackZurich',
      },
      {
        '@type': 'ListItem',
        position: 3,
        url: 'https://alexbacallao.com/projects/nasa-circadian-lighting',
        name: 'NASA Circadian Lighting',
      },
      {
        '@type': 'ListItem',
        position: 4,
        url: 'https://alexbacallao.com/projects/nicular',
        name: 'Patient messaging at Nicular',
      },
      {
        '@type': 'ListItem',
        position: 5,
        url: 'https://alexbacallao.com/projects/sofabot',
        name: 'SofaBot',
      },
    ],
  },
};

function HeaderSection() {
  return (
    <section
      id="header"
      aria-labelledby="header-heading"
      className={`${SHELL} pt-12 md:pt-16`}
    >
      <p className="mono-label text-text-muted mb-6">§ 01 - PROJECTS</p>
      <h1 id="header-heading" className="mb-6">
        Projects
      </h1>
      <p className="max-w-[60ch]">
        Everything I&apos;ve built that has a public case study. The three on
        the homepage are the headline picks; the rest are here.
      </p>
    </section>
  );
}

function AllProjectsSection() {
  return (
    <section
      id="all-projects"
      aria-labelledby="all-projects-heading"
      className={SHELL}
    >
      <p className="mono-label text-text-muted mb-4">§ 02 - ALL PROJECTS</p>
      <h2 id="all-projects-heading" className="mb-12">
        All projects
      </h2>
      <div className="flex flex-col gap-12">
        {allProjects.map((project) => (
          <RevealOnScroll key={project.slug}>
            <ProjectCard project={project} />
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}

export default function ProjectsIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageJsonLd),
        }}
      />
      <HeaderSection />
      <SectionDivider />
      <AllProjectsSection />
      <SectionDivider />
    </>
  );
}
