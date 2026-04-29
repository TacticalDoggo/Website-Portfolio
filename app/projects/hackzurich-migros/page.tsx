// Supply chain rerouting at HackZurich case study. Locked source:
// docs/pass2-hackzurich-migros.md.
// Six-section default case study pattern per SITE_SPEC.md section 1.9.2:
//   section 01 Project header  - 8.1 (ProjectHeader component, hero photo)
//   section 02 The problem      - 8.2
//   section 03 The approach     - 8.3 (paragraph 1 + inline figure + paragraph 2)
//   section 04 My role          - 8.4 (uses RoleBulletList; 5 items)
//   section 05 Outcome          - 8.5 (4 paragraphs, illustrative-fragment cadence)
//   section 06 Page footer      - 8.6 (ProjectPageFooter component)
// Global footer (sitewide mode) is rendered by app/layout.tsx via SiteFooter.
//
// Page <title> is bare so the layout's title template (`%s - Alex Bacallao`,
// app/layout.tsx) appends the site suffix once. Spec section 8.8 calls for
// "Supply chain rerouting at HackZurich - Alex Bacallao" exactly.
// openGraph.title carries the full string because OG metadata bypasses the
// title template.
//
// The root layout owns <main>; this page returns a fragment so we don't
// double-wrap. Two JSON-LD blocks (BreadcrumbList + CreativeWork) ship inline
// at the top of the page body, mirroring the NASA / T&S / projects-index
// pattern. CreativeWork includes the spec-locked `award` field
// ("1st place, Migros challenge, HackZurich 2022") - first project page on
// the site to ship an award field.
//
// Source casing for all mono-label text (eyebrows, breadcrumb, figcaptions)
// is natural; the mono-label utility's text-transform: uppercase produces
// the rendered ALL-CAPS. Section eyebrows on sections 02-05 use hyphen-minus
// (U+002D) per the site-wide deviation; spec text uses em dash (U+2014)
// which the no-em-dash hard rule forbids. Section 01's eyebrow uses middot
// (U+00B7) separators throughout - the spec's intentional separator for
// multi-component type labels.
//
// Voice: zero winks (locked no-wink genre per SITE_SPEC section 1.12.2).
// The closing paragraph of section 05 ("It was a great time, and one of
// the more memorable experiences I've had") is colloquial sincerity, not a
// wink. The illustrative-fragment cadence in the same paragraph
// ("Different working styles, different default assumptions, the
// occasional language gap. We made it work.") is locked per spec section 8.5
// and SITE_SPEC section 1.6 voice rule 10.
//
// Hero is the team-after-win photo per SITE_SPEC section 1.5
// (hero-team-photo-over-screenshot for genuinely team-defined wins). Source
// is 877x853 (near-square); ProjectHeader's new aspectRatio prop overrides
// the 16:10 default to '1/1' here - preserves all 5 team members; ~2.7%
// horizontal crop. NASA / T&S omit the prop and fall through to 16:10.
//
// Inline figure (route-view.png) sits between paragraphs 1 and 2 of
// section 03 with FIG. 02 caption. First inline figure on the site;
// markup is inlined here at the call site rather than extracted to a
// shared component (one occurrence across all five case studies; the
// abstraction-threshold rule says inline until 2+ callers exist).

import type { Metadata } from 'next';
import Image from 'next/image';
import { ProjectHeader } from '../../_components/ProjectHeader';
import { RoleBulletList } from '../../_components/RoleBulletList';
import { ProjectPageFooter } from '../../_components/ProjectPageFooter';
import { SectionDivider } from '../../_components/SectionDivider';
import { RevealOnScroll } from '../../_components/RevealOnScroll';
import { buildOgUrl } from '../../_data/ogImage';

const PAGE_DESCRIPTION =
  '36-hour Migros challenge winner at HackZurich 2022. A web tool for route recommendations when shipping is disrupted. React, Python, Jupyter. Team of 5.';

const OG_IMAGE_URL = buildOgUrl({
  title: 'Supply chain rerouting at HackZurich',
  subtitle: 'A 36-hour win for the Migros supply-chain challenge.',
  meta: 'WEB · HACKATHON · 2022',
});

export const metadata: Metadata = {
  title: 'Supply chain rerouting at HackZurich',
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: 'https://alexbacallao.com/projects/hackzurich-migros',
  },
  openGraph: {
    title: 'Supply chain rerouting at HackZurich - Alex Bacallao',
    description: PAGE_DESCRIPTION,
    url: 'https://alexbacallao.com/projects/hackzurich-migros',
    type: 'article',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Alex Bacallao - Supply chain rerouting at HackZurich',
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
      name: 'Supply chain rerouting at HackZurich',
    },
  ],
};

const creativeWorkJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: 'Supply chain rerouting at HackZurich',
  alternateName: 'Supply Chain Resilience',
  description:
    'A 36-hour Migros challenge winner at HackZurich 2022. Web tool for shipping route recommendations when the default routes are disrupted by port strikes, weather, or geopolitical events. Built by a 5-person international team.',
  author: {
    '@type': 'Person',
    name: 'Alejandro Bacallao',
    alternateName: 'Alex Bacallao',
  },
  contributor: [
    { '@type': 'Organization', name: 'HackZurich' },
    { '@type': 'Organization', name: 'Migros' },
  ],
  dateCreated: '2022-09',
  keywords: [
    'hackathon',
    'supply chain',
    'route optimization',
    'React',
    'Python',
    'Jupyter',
    'data visualization',
    'Migros',
    'HackZurich',
  ],
  programmingLanguage: ['JavaScript', 'Python'],
  award: '1st place, Migros challenge, HackZurich 2022',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Alex Bacallao',
    url: 'https://alexbacallao.com',
  },
};

function TheProblemSection() {
  return (
    <section
      id="the-problem"
      aria-labelledby="the-problem-heading"
      className={SHELL}
    >
      <p className="mono-label text-text-muted tracking-[0.1em] mb-4">
        § 02 - The problem
      </p>
      <h2 id="the-problem-heading" className="mb-6">
        The problem
      </h2>
      <p className="max-w-[65ch]">
        Migros runs large supply chains. When a port strike, weather event,
        or geopolitical issue disrupts a shipping route, the delays and
        costs ripple through the rest of the network. Their challenge to
        HackZurich teams was open-ended: build something that helps Migros
        think about alternatives when the default routes break.
      </p>
      <p className="max-w-[65ch] mt-4">
        They provided their shipping route data along with pointers to
        weather and geopolitical news feeds, and left the output to
        interpretation. We named our project Supply Chain Resilience and
        built a web tool that recommended alternative routes given a
        disruption, with the data presented in a way that a non-technical
        Migros operator could read at a glance.
      </p>
    </section>
  );
}

function TheApproachSection() {
  return (
    <section
      id="the-approach"
      aria-labelledby="the-approach-heading"
      className={SHELL}
    >
      <p className="mono-label text-text-muted tracking-[0.1em] mb-4">
        § 03 - The approach
      </p>
      <h2 id="the-approach-heading" className="mb-6">
        The approach
      </h2>
      <p className="max-w-[65ch]">
        The team split into two halves by skill set. The data-analytics
        members worked in Jupyter against Migros&apos;s route data and the
        supplemental weather and news feeds, building the logic that
        decided which alternate routes to recommend given a disruption. The
        UI side, where I worked with another teammate, built the React
        frontend that surfaced those recommendations: route maps with the
        disruption flagged, alternative paths laid out, and the relevant
        trade-offs visible at a glance.
      </p>
      <figure className="my-8">
        <Image
          src="/projects/hackzurich-migros/route-view.png"
          alt="The route view: original Migros routes mapped, disruption flagged, alternative paths surfaced."
          width={1184}
          height={746}
          sizes="(min-width: 880px) 880px, calc(100vw - 40px)"
          className="aspect-[16/10] w-full object-cover border-[0.5px] border-border-hairline"
        />
        <figcaption className="mono-label text-text-secondary tracking-[0.05em] mt-3">
          FIG. 02 - The route view: original Migros routes mapped,
          disruption flagged, alternative paths surfaced.
        </figcaption>
      </figure>
      <p className="max-w-[65ch]">
        A small Python backend connected the two halves, serving the
        analysts&apos; route logic to the frontend through a simple API.
        The architecture was deliberately simple. A hackathon weekend
        doesn&apos;t reward over-engineering, and the value of the project
        was in showing Migros what their data could look like in an
        operator&apos;s hands.
      </p>
    </section>
  );
}

function MyRoleSection() {
  return (
    <section id="my-role" aria-labelledby="my-role-heading" className={SHELL}>
      <p className="mono-label text-text-muted tracking-[0.1em] mb-4">
        § 04 - My role
      </p>
      <h2 id="my-role-heading" className="mb-6">
        My role
      </h2>
      <p className="max-w-[65ch]">
        Five-person team, found through the HackZurich participant Discord
        in the days before the event. Wide range of experience across the
        group: data analytics, frontend, and full-stack/backend. We
        delegated roles by fit, with one teammate taking team lead.
      </p>
      <p className="max-w-[65ch] mt-4">Specifically:</p>
      <RoleBulletList
        items={[
          {
            lede: 'UI / frontend co-development.',
            description:
              "Worked with another teammate on the React frontend, building out the views that surfaced the analysts' route recommendations.",
          },
          {
            lede: 'Team record keeping.',
            description:
              "Documented decisions, progress, and open questions through the 36 hours, so the team could pick up after sleep breaks without re-deriving where we'd left off.",
          },
          {
            lede: 'Sponsor liaison.',
            description:
              'Primary point of contact with the Migros sponsor representative, surfacing clarifying questions about the data and the prompt as they came up.',
          },
          {
            lede: 'Demo video.',
            description:
              'Wrote, filmed, and edited the 2-minute finalist demo video that played at the final round of judging.',
          },
          {
            lede: 'Time keeping.',
            description:
              "Tracked the clock against the team's plan; flagged when scope decisions had to be made to ship by the deadline.",
          },
        ]}
      />
      <p className="max-w-[65ch] mt-6">
        The data-analytics work and the route-recommendation logic were
        owned by two teammates with that background; my contribution to
        the data side was making the analysts&apos; work legible in the UI.
      </p>
    </section>
  );
}

function OutcomeSection() {
  return (
    <section id="outcome" aria-labelledby="outcome-heading" className={SHELL}>
      <p className="mono-label text-text-muted tracking-[0.1em] mb-4">
        § 05 - Outcome
      </p>
      <h2 id="outcome-heading" className="mb-6">
        Outcome
      </h2>
      <p className="max-w-[65ch]">
        We made the finalist round, which is where the demo video plays
        for the room before the live presentation. Judging was a mix of
        HackZurich panelists and Migros representatives. The team
        presented in English for consistency, walked through the
        route-recommendation flow, and answered questions about the data
        choices.
      </p>
      <p className="max-w-[65ch] mt-4">
        We won 1st place in the Migros challenge. The judges had positive
        things to say about the routing logic, but what set the project
        apart was the presentation craft: a UI clean enough to read at a
        glance, data laid out so the project&apos;s logic was legible to
        non-technical observers, and a demo that flowed cleanly under time
        pressure.
      </p>
      <p className="max-w-[65ch] mt-4">
        The prize was 200 Swiss francs and Migros merchandise. There was
        an employment-track recognition associated with the win, but it
        required EU residency, which I don&apos;t have. The other
        teammates did.
      </p>
      <p className="max-w-[65ch] mt-4">
        What I actually took away from the weekend was less about the win
        itself and more about working alongside people from completely
        different backgrounds toward a single goal in 36 hours. Different
        working styles, different default assumptions, the occasional
        language gap. We made it work. It was a great time, and one of
        the more memorable experiences I&apos;ve had.
      </p>
    </section>
  );
}

export default function HackZurichMigrosPage() {
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
          { label: 'Supply chain rerouting at HackZurich' },
        ]}
        eyebrow="§ 01 · Web · Hackathon · 2022"
        title="Supply chain rerouting at HackZurich"
        subtitle="A 36-hour win for the Migros supply-chain challenge."
        dek="Five-person team for the Migros challenge at HackZurich 2022, Zurich. We won 1st place. My contribution: co-development of the UI/website, team record keeping, sponsor communication with Migros, and producing the 2-minute finalist demo video."
        hero={{
          mode: 'image',
          src: '/projects/hackzurich-migros/team-after-win.png',
          alt: 'The 5-person team after winning the Migros challenge. HackZurich 2022, Zurich.',
          width: 877,
          height: 853,
          caption:
            'FIG. 01 - The team after winning the Migros challenge. HackZurich 2022, Zurich.',
          aspectRatio: '1/1',
        }}
      />
      <SectionDivider />
      <RevealOnScroll>
        <TheProblemSection />
      </RevealOnScroll>
      <SectionDivider />
      <RevealOnScroll>
        <TheApproachSection />
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
