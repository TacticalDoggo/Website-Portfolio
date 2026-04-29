// /about. Locked source: docs/pass2-about.md (locked 2026-04-27).
//
// First content-page-pattern surface on the site (SITE_SPEC.md section 1.9.6):
// header (eyebrow + H1 + dek) -> 2-4 prose body sections (eyebrow + H2 +
// 1-3 paragraphs each) -> global footer. NOT the case study pattern.
// No ProjectHeader, no RoleBulletList, no ProjectPageFooter, no Breadcrumb,
// no inline figures.
//
// Wink budget: ONE protected wink per spec section 5.9 ("Enough to hold a
// real conversation, but not enough to write code reviews" in section 02
// paragraph 1). SITE_SPEC section 1.6 voice rule 5 lists About in the
// two-wink genre; that drift is logged in deviations.md as a Site-Wide
// Deviation - the locked pass2-about.md spec wins.
//
// Throughline: section 02 paragraph 1 ships "systems where reliability
// matters and where the work has tangible consequences" verbatim per
// pass2-about.md section 5.5. The Resume page (step 13) ships its own
// locked throughline phrase ("shipping software to non-developers who
// need it to just work") verbatim per pass2-resume.md section 6.3. The
// SITE_SPEC section 1.11 verbatim-share claim is a drift logged in
// deviations.md.
//
// Privacy carve-out (SITE_SPEC section 1.9.11): NO family-origin or
// ethnicity detail. Spanish capability is a professional fact only. Locked.
//
// Root layout owns <main>; this page returns a fragment. JSON-LD ships
// inline this step rather than waiting on build step 15 - schema is fully
// locked in spec section 5.7 and trivially serializable. See deviations.md
// for the formal entry. Email is intentionally omitted from JSON-LD per
// spec section 5.7 note (only /contact exposes email).

import type { Metadata } from 'next';
import { RevealOnScroll } from '../_components/RevealOnScroll';
import { SectionDivider } from '../_components/SectionDivider';

const PAGE_DESCRIPTION =
  'Software developer in Ft Worth, TX. UNT Computer Engineering 2023. Native Spanish and English, plus German A2/B1. Looking for backend, infra, or related work.';

export const metadata: Metadata = {
  title: 'About',
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: 'https://alexbacallao.com/about',
  },
  openGraph: {
    title: 'About - Alex Bacallao',
    description: PAGE_DESCRIPTION,
    url: 'https://alexbacallao.com/about',
    type: 'website',
  },
};

const SHELL = 'max-w-[880px] mx-auto px-5 md:px-8';

const aboutPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About',
  url: 'https://alexbacallao.com/about',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Alex Bacallao',
    url: 'https://alexbacallao.com',
  },
  mainEntity: {
    '@type': 'Person',
    name: 'Alejandro Bacallao',
    alternateName: 'Alex Bacallao',
    jobTitle: 'Software Developer',
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'University of North Texas',
    },
    knowsLanguage: [
      { '@type': 'Language', name: 'English', alternateName: 'en' },
      { '@type': 'Language', name: 'Spanish', alternateName: 'es' },
      { '@type': 'Language', name: 'German', alternateName: 'de' },
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
  },
};

function HeaderSection() {
  return (
    <section
      id="header"
      aria-labelledby="header-heading"
      className={`${SHELL} pt-12 md:pt-16`}
    >
      <p className="mono-label text-text-muted mb-6">§ 01 - About</p>
      <h1 id="header-heading" className="mb-6">
        About
      </h1>
      <p className="max-w-[60ch]">
        The longer version of who I am and how I got here.
      </p>
    </section>
  );
}

function CareerSection() {
  return (
    <section
      id="career"
      aria-labelledby="career-heading"
      className={SHELL}
    >
      <p className="mono-label text-text-muted mb-6">§ 02 - The career</p>
      <h2 id="career-heading" className="mb-6">
        The career
      </h2>
      <div className="max-w-[65ch] flex flex-col gap-4">
        <p>
          I met someone from T&amp;S Machines at a UNT career fair, and a few
          weeks later I got a message asking if I wanted to write software for
          CNC machines. That was the start. The first version of the role was
          probing and milling routines for global customers, with documentation
          and remote support layered on as the customers multiplied.
        </p>
        <p>
          I left briefly in late 2022 to join Nicular, a healthcare startup in
          Dallas, where I built an SMS and email reminder system for clinician
          workflows under HIPAA. The two months were useful: HIPAA compliance
          forces a specific rigor about logging, error handling, and the
          question of who sees what. I came back to T&amp;S because the work
          was more interesting and the work-from-home policy let me focus, but
          the rigor stuck.
        </p>
        <p>
          Since then the role has kept evolving. The probing routines became a
          set of subroutines I refactored for stability. The work expanded into
          customer-facing documentation, remote support for production issues,
          and a Docker side project I built to explore better deployment than
          the existing manual installer process. The job title became
          &quot;Digital Specialist&quot; along the way.
        </p>
      </div>
    </section>
  );
}

function LifeExperienceSection() {
  return (
    <section
      id="life-experience"
      aria-labelledby="life-experience-heading"
      className={SHELL}
    >
      <p className="mono-label text-text-muted mb-6">
        § 03 - A pinch of life experience
      </p>
      <h2 id="life-experience-heading" className="mb-6">
        A pinch of life experience
      </h2>
      <div className="max-w-[65ch] flex flex-col gap-4">
        <p>
          I speak Spanish and English natively, plus German at A2/B1 from three
          years of school. Enough to hold a real conversation, but not enough
          to write code reviews. I picked German over French because it sounded
          more interesting at the time. The German paid off later than I
          expected. At HackZurich in 2022, our team was a mix of one Swiss, one
          German, one Italian, one Egyptian, and me. The working language was
          English, but German surfaced often enough that the school years paid
          off. Quick asides between the two German speakers, the occasional
          clarification. I caught more than I would have without them, which
          mattered because hackathon decisions move fast and small comprehension
          gaps add up.
        </p>
        <p>
          I went to UNT for Computer Engineering with a math minor and
          graduated December 2023. The senior design project was the NASA
          Circadian Lighting work that has its own page on this site.
        </p>
      </div>
    </section>
  );
}

function LookingForSection() {
  return (
    <section
      id="looking-for"
      aria-labelledby="looking-for-heading"
      className={SHELL}
    >
      <p className="mono-label text-text-muted mb-6">
        § 04 - What I&apos;m looking for
      </p>
      <h2 id="looking-for-heading" className="mb-6">
        What I&apos;m looking for
      </h2>
      <div className="max-w-[65ch] flex flex-col gap-4">
        <p>
          The homepage says Docker, infra, and backend, and that&apos;s the
          shortlist. The longer answer is wider: I&apos;m open to software
          development generally, system testing and integration, robotics, and
          a possible transition into IT or sysadmin work. The throughline
          across all of those is systems where reliability matters and where
          the work has tangible consequences, which has been true of CNC
          software, healthcare reminders, and lighting controllers alike.
        </p>
        <p>
          I&apos;d prefer remote, but I&apos;m open to relocating for the right
          team. Full-time. Open on company size, industry, and stack. I&apos;ve
          worked in industrial automation, healthcare, NASA-research-adjacent
          senior design, and a hackathon for a Swiss grocery chain, and
          I&apos;ve enjoyed all of them for different reasons.
        </p>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutPageJsonLd),
        }}
      />
      <HeaderSection />
      <SectionDivider />
      <RevealOnScroll>
        <CareerSection />
      </RevealOnScroll>
      <SectionDivider />
      <RevealOnScroll>
        <LifeExperienceSection />
      </RevealOnScroll>
      <SectionDivider />
      <RevealOnScroll>
        <LookingForSection />
      </RevealOnScroll>
      <SectionDivider />
    </>
  );
}
