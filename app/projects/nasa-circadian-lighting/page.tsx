// NASA Circadian Lighting case study. Locked source: docs/pass2-nasa-circadian-lighting.md.
// Six-section default case study pattern per SITE_SPEC.md section 1.9.2:
//   section 01 Project header  - 3.1 (ProjectHeader component)
//   section 02 Problem          - 3.2
//   section 03 Approach         - 3.3
//   section 04 My role          - 3.4 (uses RoleBulletList)
//   section 05 Outcome          - 3.5
//   section 06 Page footer      - 3.6 (ProjectPageFooter component)
// Global footer (sitewide mode) is rendered by app/layout.tsx via SiteFooter.
//
// The root layout owns <main>; this page returns a fragment so we don't
// double-wrap. Two JSON-LD blocks (BreadcrumbList + CreativeWork) ship
// inline at the top of the page body, mirroring the /projects index pattern
// (see deviations.md).
//
// Eyebrows on sections 02-05 use hyphen-minus (U+002D) per the site-wide
// deviation; the spec text uses em dash (U+2014) which the no-em-dash hard
// rule forbids. Section 01's eyebrow uses middot (U+00B7) separators
// throughout - the spec's intentional separator for multi-component type
// labels, not the same character class as the em-dash deviation.
//
// Voice protected asides (spec section 3.7, two winks earned for this page):
//   1. dek: "...being the human data source for the circadian baseline."
//   2. outcome: "...trying to convince the plant to look alive."
// Both ship verbatim. Do not soften.

import type { Metadata } from 'next';
import { ProjectHeader } from '../../_components/ProjectHeader';
import { RoleBulletList } from '../../_components/RoleBulletList';
import { ProjectPageFooter } from '../../_components/ProjectPageFooter';
import { SectionDivider } from '../../_components/SectionDivider';
import { RevealOnScroll } from '../../_components/RevealOnScroll';

const PAGE_DESCRIPTION =
  'A closed-loop lighting controller for spacecraft cabin and plant growth. Senior design, NASA / Texas Space Grant, Spring 2022. Embedded systems case study.';

// Page <title> is bare so the layout's title template (`%s - Alex Bacallao`,
// app/layout.tsx) appends the site suffix once. Spec calls for
// "NASA Circadian Lighting - Alex Bacallao" exactly.
export const metadata: Metadata = {
  title: 'NASA Circadian Lighting',
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: 'https://alexbacallao.com/projects/nasa-circadian-lighting',
  },
  openGraph: {
    title: 'NASA Circadian Lighting - Alex Bacallao',
    description: PAGE_DESCRIPTION,
    url: 'https://alexbacallao.com/projects/nasa-circadian-lighting',
    type: 'article',
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
      name: 'NASA Circadian Lighting',
    },
  ],
};

const creativeWorkJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: 'NASA Circadian Lighting',
  alternateName: 'Advanced Dynamic Lighting Control System',
  description:
    'A closed-loop controller for spacecraft cabin and plant-growth lighting. Reads ambient light via LUX and RGB sensors and drives RGB output over OLA / DMX-512 to match dual circadian and horticultural schedules.',
  author: {
    '@type': 'Person',
    name: 'Alejandro Bacallao',
    alternateName: 'Alex Bacallao',
  },
  contributor: [
    { '@type': 'Organization', name: 'Texas Space Grant Consortium' },
    { '@type': 'Organization', name: 'NASA' },
    { '@type': 'CollegeOrUniversity', name: 'University of North Texas' },
  ],
  dateCreated: '2022-05',
  keywords: [
    'embedded systems',
    'Raspberry Pi',
    'Open Lighting Architecture',
    'DMX-512',
    'circadian rhythm',
    'closed-loop control',
    'Python',
    'sensor integration',
  ],
  programmingLanguage: ['Python'],
  isPartOf: {
    '@type': 'WebSite',
    name: 'Alex Bacallao',
    url: 'https://alexbacallao.com',
  },
};

function ProblemSection() {
  return (
    <section id="problem" aria-labelledby="problem-heading" className={SHELL}>
      <p className="mono-label text-text-muted tracking-[0.1em] mb-4">
        § 02 - PROBLEM
      </p>
      <h2 id="problem-heading" className="mb-6">
        The problem
      </h2>
      <p className="max-w-[65ch]">
        Long-duration space missions don&apos;t have natural sunlight, and the
        absence of the sun&apos;s daily cycle is a known problem for human
        crews: circadian rhythms drift, sleep quality drops, cognitive
        performance suffers. Plants grown on board have their own version of
        the same problem, with different mechanisms; they need the right
        amounts of red and blue light at the right times to grow.
      </p>
      <p className="max-w-[65ch] mt-4">
        So a spacecraft cabin needs lighting that does two things at once:
        entrain the crew&apos;s circadian rhythm, and grow plants on a separate
        schedule. The constraint for our senior design project was that the
        controller had to do both in real time, in a physical setup we could
        ship to a conference. That meant a Raspberry Pi running Python over
        Open Lighting Architecture, LUX and RGB sensors on the bus, and a
        closed loop that read the actual delivered light and corrected back to
        setpoint. We also noticed bulbs and sensors drift over time, so we
        bolted on compensation logic that did the job, mostly.
      </p>
    </section>
  );
}

function ApproachSection() {
  return (
    <section id="approach" aria-labelledby="approach-heading" className={SHELL}>
      <p className="mono-label text-text-muted tracking-[0.1em] mb-4">
        § 03 - APPROACH
      </p>
      <h2 id="approach-heading" className="mb-6">
        Approach
      </h2>
      <p className="max-w-[65ch]">
        The system runs on a Raspberry Pi 4 in Python, talking to the lighting
        hardware over Open Lighting Architecture (OLA) on a DMX-512 bus. Two
        sensor streams come back the other way: LUX sensors measure overall
        illuminance in the cabin, RGB sensors measure the spectral mix at the
        canopy. Both feed into a closed loop that compares the delivered light
        against the schedule&apos;s current setpoint and adjusts RGB output
        until the readings match.
      </p>
      <p className="max-w-[65ch] mt-4">
        Two schedules run in parallel. The crew schedule is a 24-hour curve
        that ramps cool-blue light at simulated dawn, holds bright daytime
        levels through the work hours, warms toward amber in the evening, and
        cuts to a low-blue night mode. I built the schedule by tracking my own
        sleep and wake times for two weeks and using the average as a baseline
        circadian rhythm, so the controller had a real human&apos;s rhythm to
        match instead of a synthetic curve. The plant schedule is simpler: red
        and blue at the intensities and durations the crops need, on their own
        clock independent of the crew.
      </p>
    </section>
  );
}

function MyRoleSection() {
  return (
    <section id="my-role" aria-labelledby="my-role-heading" className={SHELL}>
      <p className="mono-label text-text-muted tracking-[0.1em] mb-4">
        § 04 - MY ROLE
      </p>
      <h2 id="my-role-heading" className="mb-6">
        My role
      </h2>
      <p className="max-w-[65ch]">
        Three-person team for senior design at UNT, with a faculty advisor at
        NASA via Texas Space Grant Consortium. I owned the hardware integration
        end of the project, shared the schedule logic, and handled the
        team&apos;s documentation and external communication.
      </p>
      <p className="max-w-[65ch] mt-4">Specifically:</p>
      <RoleBulletList
        items={[
          {
            lede: 'Hardware setup and sensor integration.',
            description:
              'Specced and procured the Raspberry Pi units, LUX sensors, RGB sensors, and the bus components. Built the physical demo rig, including the breadboard layout, the wiring, and the transport-friendly enclosure.',
          },
          {
            lede: 'Schedule logic, on the human side.',
            description:
              'Tracked my own sleep/wake times for two weeks and used the average as the baseline circadian rhythm the controller ran against. Wrote the day-curve schedule that the controller follows.',
          },
          {
            lede: 'Team documentation.',
            description:
              "Wrote the project documentation, design records, and final report. Distributed builds and notes via the team's repo.",
          },
          {
            lede: 'NASA advisor liaison.',
            description:
              'Primary point of contact with the Texas Space Grant advisor.',
          },
        ]}
      />
      <p className="max-w-[65ch] mt-6">
        The lighting hardware design and the plant schedule were owned by
        teammates; I supported their integration into the closed-loop
        controller.
      </p>
    </section>
  );
}

function OutcomeSection() {
  return (
    <section id="outcome" aria-labelledby="outcome-heading" className={SHELL}>
      <p className="mono-label text-text-muted tracking-[0.1em] mb-4">
        § 05 - OUTCOME
      </p>
      <h2 id="outcome-heading" className="mb-6">
        Outcome
      </h2>
      <p className="max-w-[65ch]">
        The system was demonstrated at a Texas Space Grant Consortium
        conference in Houston in Spring 2022. Attendees included NASA
        representatives, astronauts, research scientists, and teams from other
        Texas universities showing their own NASA-sponsored projects. We
        didn&apos;t win an award, but the booth saw steady traffic all day and
        the questions we got suggested the work was being taken seriously. The
        same setup served as the senior design demo for UNT later that
        semester.
      </p>
      <p className="max-w-[65ch] mt-4">
        The detail I remember most is from the morning of the conference. Some
        of our wiring, sensors, and the plant itself had taken damage in
        transport. We spent the hour before the doors opened doing repairs in
        the parking lot of the conference center: re-soldering connections,
        rewiring sensors, and trying to convince the plant to look alive. The
        rig worked all day after that.
      </p>
      <p className="max-w-[65ch] mt-4">
        The lesson I took from that morning is one everyone who ships hardware
        learns eventually. The system you should optimize for is not the one
        that arrives intact, it&apos;s the one that can be repaired by the
        people standing next to it. I think about that one a lot when I&apos;m
        writing software too.
      </p>
    </section>
  );
}

export default function NasaCircadianLightingPage() {
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
          { label: 'NASA Circadian Lighting' },
        ]}
        eyebrow="§ 01 · EMBEDDED · SENIOR DESIGN · SPRING 2022"
        title="NASA Circadian Lighting"
        subtitle="A closed-loop controller for spacecraft cabin and plant-growth lighting."
        dek="Built with a 3-person team for Texas Space Grant Consortium. Demonstrated at a NASA-attended conference in Houston, Spring 2022. My contribution: sensor integration, hardware setup, schedule logic, team documentation, and being the human data source for the circadian baseline."
        hero={{
          mode: 'image',
          src: '/projects/nasa-circadian-lighting/demo-rig.jpg',
          alt: 'The demo rig at the Texas Space Grant conference, Houston, Spring 2022. Raspberry Pi 4, LUX/RGB sensors, RGB lighting, plant.',
          width: 1280,
          height: 800,
          caption:
            'FIG. 01 - The demo rig at the Texas Space Grant conference, Houston, Spring 2022. Raspberry Pi 4, LUX/RGB sensors, RGB lighting, plant.',
        }}
      />
      <SectionDivider />
      <RevealOnScroll>
        <ProblemSection />
      </RevealOnScroll>
      <SectionDivider />
      <RevealOnScroll>
        <ApproachSection />
      </RevealOnScroll>
      <SectionDivider />
      <RevealOnScroll>
        <MyRoleSection />
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
