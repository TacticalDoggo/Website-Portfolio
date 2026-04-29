// SofaBot case study. Locked source: docs/pass2-sofabot.md.
// Four-section compressed hobbyist / club case study pattern per
// SITE_SPEC.md section 1.9.4 (first and only use on the site):
//   section 01 Project header  - 11.1 (ProjectHeader, hero mode='image',
//                                aspectRatio '1/1' override)
//   section 02 The build       - 11.2 (3 paragraphs; combines what would be
//                                Problem + Approach + My Role on the
//                                default 6-section pattern - the compression
//                                is deliberate per spec section 11.0)
//   section 03 Outcome         - 11.3 (3 paragraphs; parade beat + voltage
//                                lesson + current state)
//   section 04 Page footer     - 11.4 (ProjectPageFooter)
// Global footer (sitewide mode) is rendered by app/layout.tsx via SiteFooter.
//
// This is the only case study on the site with a non-zero wink budget. Two
// winks earned per spec section 11.5, both verbatim, well-separated, unified
// register (dry, naming-the-absurd-as-fact rather than commenting on it):
//   wink 1 - subtitle, wink-as-noun-phrase: "a free couch and a
//            stripped-for-parts go-kart"
//   wink 2 - section 03 paragraph 1 closer, wink-by-understatement:
//            "The sofa drove, in a parade."
// The "SofaBot at rest" figure caption is voice, not a third wink (spec
// section 11.1). The "We never got there" fragment in section 02 paragraph 3
// is illustrative, not a wink (spec section 11.5 voice rules).
//
// Hero source public/projects/sofabot/sofabot.png is 684x657 (~1.041,
// near-square). At the SITE_SPEC section 1.5 default 16:10 with object-cover,
// the source loses ~35% of vertical content (~17.5% off the top, ~17.5% off
// the bottom), defeating the photo. Override aspectRatio '1/1' is the second
// use of the prop on the site (HackZurich was first in step 9); the crop
// becomes ~4% horizontal only, no vertical loss. Component is unchanged;
// ProjectHeader's ASPECT_CLASS lookup map already emits aspect-[1/1] as a
// Tailwind literal. Logged as a per-page deviation in deviations.md.
//
// Spec section 02 paragraph 3 closes with "Then COVID hit in 2020, and the
// project went on hard pause" and section 03 paragraph 3 opens with "The
// project went on hard pause for COVID in 2020 and has been on slow-burner
// status since 2022...". This bookend is a deliberate framing device (close
// of the build narrative -> reopen as the current-state lede) per the locked
// spec; both halves ship verbatim, do not deduplicate.
//
// Page <title> is bare so the layout's title template (`%s - Alex Bacallao`,
// app/layout.tsx) appends the suffix once. Spec section 11.6 specifies
// `SofaBot - Alex Bacallao` exactly. openGraph.title carries the full string
// because OG metadata bypasses the title template.
//
// The root layout owns <main>; this page returns a fragment. Two JSON-LD
// blocks (BreadcrumbList + CreativeWork) ship inline at the top of the page
// body, mirroring the NASA / T&S / HackZurich / Nicular pattern.
// dateCreated is "2019-09" per spec section 11.6 schema 2.
//
// Source casing for all mono-label text (eyebrows, breadcrumb, figcaption)
// is natural; the mono-label utility's text-transform: uppercase produces
// the rendered ALL-CAPS. Section 01 eyebrow uses middot (U+00B7) separators
// (multi-component type label per spec section 1.6 conventions). Sections
// 02-03 eyebrows use hyphen-minus (U+002D) per the site-wide deviation;
// the spec writes em dash (U+2014) which the no-em-dash hard rule forbids.
// The figure caption uses the same hyphen-minus substitution.
//
// RoleBulletList is intentionally NOT imported - the compressed pattern
// has no role bullet list. No inline figure (none specced for SofaBot).

import type { Metadata } from 'next';
import { ProjectHeader } from '../../_components/ProjectHeader';
import { ProjectPageFooter } from '../../_components/ProjectPageFooter';
import { SectionDivider } from '../../_components/SectionDivider';
import { RevealOnScroll } from '../../_components/RevealOnScroll';
import { buildOgUrl } from '../../_data/ogImage';

const PAGE_DESCRIPTION =
  'A driveable sofa from a free couch and a stripped-for-parts go-kart. UNT Robotics Club, since 2019. Gas-to-electric conversion, two car batteries, Raspberry Pi.';

const OG_IMAGE_URL = buildOgUrl({
  title: 'SofaBot',
  subtitle:
    'A driveable sofa, built from a free couch and a stripped-for-parts go-kart.',
  meta: 'ROBOTICS · CLUB · SINCE 2019',
});

export const metadata: Metadata = {
  title: 'SofaBot',
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: 'https://alexbacallao.com/projects/sofabot',
  },
  openGraph: {
    title: 'SofaBot - Alex Bacallao',
    description: PAGE_DESCRIPTION,
    url: 'https://alexbacallao.com/projects/sofabot',
    type: 'article',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Alex Bacallao - SofaBot',
      },
    ],
  },
};

const SHELL = 'max-w-[880px] mx-auto px-5 md:px-8';

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://alexbacallao.com/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Projects',
      item: 'https://alexbacallao.com/projects',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'SofaBot',
    },
  ],
};

const creativeWorkJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: 'SofaBot',
  description:
    'A driveable sofa, built from a free couch and a stripped-for-parts go-kart. UNT Robotics Club project, started fall 2019. Gas-to-electric motor conversion, two car batteries, motor controllers, Raspberry Pi, Xbox controller. Drove in the UNT homecoming parade fall 2019.',
  author: {
    '@type': 'Person',
    name: 'Alejandro Bacallao',
    alternateName: 'Alex Bacallao',
  },
  contributor: {
    '@type': 'Organization',
    name: 'UNT Robotics Club',
  },
  dateCreated: '2019-09',
  keywords: [
    'robotics',
    'Arduino',
    'Raspberry Pi',
    'motor control',
    'electronics',
    'DIY',
    'hobbyist',
    'UNT Robotics Club',
  ],
  isPartOf: {
    '@type': 'WebSite',
    name: 'Alex Bacallao',
    url: 'https://alexbacallao.com',
  },
};

function TheBuildSection() {
  return (
    <section
      id="the-build"
      aria-labelledby="the-build-heading"
      className={SHELL}
    >
      <p className="mono-label text-text-muted tracking-[0.1em] mb-4">
        § 02 - The build
      </p>
      <h2 id="the-build-heading" className="mb-6">
        The build
      </h2>
      <p className="max-w-[65ch]">
        Started in fall 2019 as a UNT Robotics Club project after someone in
        the club joked about driving a couch around campus. A few of us took
        the joke seriously enough to find a free sofa on a local listing and
        a cheap go-kart, and the next day we started taking them apart.
      </p>
      <p className="max-w-[65ch] mt-4">
        The plan was simple, the execution less so. We converted the
        gas-powered go-kart&apos;s drivetrain to electric, mounted the motors
        and motor controllers on the underside of the sofa, wired in two car
        batteries for power, and ran control through a Raspberry Pi listening
        to an Xbox controller. The first few attempts cost us a Raspberry Pi
        and a couple of motor controllers as we worked out the voltage
        tolerances by trial and error. Once the electronics survived being
        powered on, the rest came together: the sofa drove, on tank controls.
      </p>
      <p className="max-w-[65ch] mt-4">
        Team of 5 at the start, settling to 4 for most of the project&apos;s
        life. I owned the electrical wiring and most of the physical labor;
        the code was largely open-source motor-control work modified to fit.
        Proper steering (front-wheel articulation rather than tank-style) was
        the aspirational next step. We never got there. Then COVID hit in
        2020, and the project went on hard pause.
      </p>
    </section>
  );
}

function OutcomeSection() {
  return (
    <section id="outcome" aria-labelledby="outcome-heading" className={SHELL}>
      <p className="mono-label text-text-muted tracking-[0.1em] mb-4">
        § 03 - Outcome
      </p>
      <h2 id="outcome-heading" className="mb-6">
        Outcome
      </h2>
      <p className="max-w-[65ch]">
        SofaBot worked. After the voltage-tolerance education, the sofa drove
        well enough that we did a test run through campus one day. Someone
        filmed it, the video reached the university, and a few weeks later we
        were invited to drive SofaBot in the UNT homecoming parade in fall
        2019. The sofa drove, in a parade.
      </p>
      <p className="max-w-[65ch] mt-4">
        What I took from the project, looking back, was the trial-and-error
        voltage education. We burned through a Raspberry Pi and a couple of
        motor controllers learning what the system could and couldn&apos;t
        tolerate. That kind of learning doesn&apos;t transfer cleanly into a
        textbook chapter, but it builds the kind of intuition you only get
        from killing components in real hardware. I think about that
        intuition when I&apos;m specifying margins on anything new.
      </p>
      <p className="max-w-[65ch] mt-4">
        The project went on hard pause for COVID in 2020 and has been on
        slow-burner status since 2022, mostly the proper-steering work. Most
        of us have other priorities now (jobs, family, the regular set), so
        SofaBot is on a roughly monthly cadence, progressing when we have the
        time.
      </p>
    </section>
  );
}

export default function SofaBotPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkJsonLd) }}
      />

      <ProjectHeader
        breadcrumb={[
          { label: 'Projects', href: '/projects' },
          { label: 'SofaBot' },
        ]}
        eyebrow="§ 01 · Robotics · Club · Since 2019"
        title="SofaBot"
        subtitle="A driveable sofa, built from a free couch and a stripped-for-parts go-kart."
        dek="UNT Robotics Club project, started fall 2019. Gas-to-electric motor conversion, two car batteries, motor controllers, Raspberry Pi, Xbox controller. Team of 5, then 4. My contribution: electrical wiring and most of the physical build."
        hero={{
          mode: 'image',
          src: '/projects/sofabot/sofabot.png',
          alt: 'SofaBot at rest, somewhere on the UNT campus.',
          width: 684,
          height: 657,
          aspectRatio: '1/1',
          caption: 'FIG. 01 - SofaBot at rest, somewhere on the UNT campus.',
        }}
      />
      <SectionDivider />
      <RevealOnScroll>
        <TheBuildSection />
      </RevealOnScroll>
      <SectionDivider />
      <RevealOnScroll>
        <OutcomeSection />
      </RevealOnScroll>
      <SectionDivider />
      <ProjectPageFooter />
    </>
  );
}
