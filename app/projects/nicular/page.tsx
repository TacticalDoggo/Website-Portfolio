// Patient messaging at Nicular case study. Locked source:
// docs/pass2-nicular.md.
// Six-section default case study pattern per SITE_SPEC.md section 1.9.2:
//   section 01 Project header  - 10.1 (ProjectHeader component, typographic
//                                placeholder hero per SITE_SPEC section 1.10.5)
//   section 02 The problem      - 10.2 (2 paragraphs)
//   section 03 The approach     - 10.3 (2 paragraphs, no inline figure)
//   section 04 My role          - 10.4 (uses RoleBulletList; 4 items)
//   section 05 Outcome          - 10.5 (2 paragraphs)
//   section 06 Page footer      - 10.6 (ProjectPageFooter component)
// Global footer (sitewide mode) is rendered by app/layout.tsx via SiteFooter.
//
// First page on the site to use the placeholder hero branch on
// ProjectHeader. The placeholder branch was added speculatively in step 7
// alongside the image branch; this page is its first real caller. No real
// hero photo - HIPAA limits what can be shown publicly (no customer data,
// no message examples, no UI screenshots that would reveal clinic-specific
// workflows). The typographic placeholder + figcaption naming the absence
// is the page's honest answer to the constraint per SITE_SPEC section 1.5
// "honest hero-absence framing."
//
// Page <title> is bare so the layout's title template (`%s - Alex Bacallao`,
// app/layout.tsx) appends the site suffix once. Spec section 10.8 calls for
// "Patient messaging at Nicular - Alex Bacallao" exactly.
// openGraph.title carries the full string because OG metadata bypasses the
// title template.
//
// The root layout owns <main>; this page returns a fragment so we don't
// double-wrap. Two JSON-LD blocks (BreadcrumbList + CreativeWork) ship
// inline at the top of the page body, mirroring the NASA / T&S / HackZurich
// pattern. dateCreated is "2022-11" per spec section 10.8 schema 2 (the
// eyebrow text reads "Late 2022" but the JSON-LD uses the spec value
// verbatim).
//
// Source casing for all mono-label text (eyebrows, breadcrumb, placeholder
// caption, figcaption) is natural; the mono-label utility's text-transform:
// uppercase produces the rendered ALL-CAPS. Section eyebrows on sections
// 02-05 use hyphen-minus (U+002D) per the site-wide deviation; spec text
// uses em dash (U+2014) which the no-em-dash hard rule forbids. Section 01's
// eyebrow uses middot (U+00B7) separators throughout - the spec's
// intentional separator for multi-component type labels.
//
// Voice: zero winks (locked no-wink genre per SITE_SPEC section 1.12.2).
// The mixed-depth disclaimer sentence in section 03 paragraph 2 ("Some of
// that was real configuration work for the integrations I owned; some was
// just calling the right framework methods correctly.") ships verbatim per
// spec section 10.3 voice notes and SITE_SPEC section 1.12.4 - that is
// professional honesty about scope, not a wink. The "Two months total
// tenure" line in section 04 and the "I came back to T&S after two months"
// line in section 05 paragraph 2 are the only mentions of the transition;
// no "why I left" framing per SITE_SPEC section 1.12.3.

import type { Metadata } from 'next';
import { ProjectHeader } from '../../_components/ProjectHeader';
import { RoleBulletList } from '../../_components/RoleBulletList';
import { ProjectPageFooter } from '../../_components/ProjectPageFooter';
import { SectionDivider } from '../../_components/SectionDivider';
import { RevealOnScroll } from '../../_components/RevealOnScroll';
import { buildOgUrl } from '../../_data/ogImage';

const PAGE_DESCRIPTION =
  'Two-month role at a healthcare startup building HIPAA-compliant SMS and email reminders for clinician workflows. Vonage, GSuite, per-client SQL schemas. Late 2022.';

const OG_IMAGE_URL = buildOgUrl({
  title: 'Patient messaging at Nicular',
  subtitle:
    'A two-month full-time role building HIPAA-compliant SMS and email reminders for clinician workflows.',
  meta: 'HEALTHCARE · FULL-TIME · LATE 2022',
});

export const metadata: Metadata = {
  title: 'Patient messaging at Nicular',
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: 'https://alexbacallao.com/projects/nicular',
  },
  openGraph: {
    title: 'Patient messaging at Nicular - Alex Bacallao',
    description: PAGE_DESCRIPTION,
    url: 'https://alexbacallao.com/projects/nicular',
    type: 'article',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Alex Bacallao - Patient messaging at Nicular',
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
      name: 'Patient messaging at Nicular',
    },
  ],
};

const creativeWorkJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: 'Patient messaging at Nicular',
  description:
    'Two-month full-time role building HIPAA-compliant SMS and email reminder system for clinician workflows. Integrated Vonage and GSuite, contributed to per-client database schemas and communications framework.',
  author: {
    '@type': 'Person',
    name: 'Alejandro Bacallao',
    alternateName: 'Alex Bacallao',
  },
  contributor: {
    '@type': 'Organization',
    name: 'Nicular',
  },
  dateCreated: '2022-11',
  keywords: [
    'HIPAA',
    'healthcare software',
    'patient messaging',
    'Vonage',
    'GSuite',
    'SMS integration',
    'email integration',
    'SQL schema design',
    'communications framework',
  ],
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
        Clinics talk to their patients constantly: appointment reminders,
        refill notifications, follow-up communications. The work is
        high-volume, low-margin, and unforgiving of mistakes. A wrong
        message to a wrong patient is not just an embarrassment; under
        HIPAA, it&apos;s a reportable incident with real legal consequences.
      </p>
      <p className="max-w-[65ch] mt-4">
        Nicular built and operated patient-messaging infrastructure for
        clinic customers. Each clinic provided their own patient roster and
        contact preferences (SMS, email, or both); Nicular&apos;s system
        handled the delivery, the templating, the audit trail, and the
        compliance posture. My team&apos;s work was on the messaging
        delivery layer specifically: the part that takes a clinic-defined
        reminder schedule and turns it into actual sent messages, reliably,
        to the correct recipients.
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
        The integration split was clean: Vonage for SMS, GSuite for email.
        Each clinic&apos;s patient roster lived in its own dedicated
        database, populated with the contact information the clinic
        provided and structured around their specific workflow needs. The
        communications framework that I contributed to was the layer above
        this: a reusable set of messaging primitives that different
        reminder workflows (appointments, refills, follow-ups) could share
        without each one re-implementing the basics.
      </p>
      <p className="max-w-[65ch] mt-4">
        The HIPAA-specific work I touched was on the encryption side:
        making sure data in transit and at rest matched the framework&apos;s
        standards. Some of that was real configuration work for the
        integrations I owned; some was just calling the right framework
        methods correctly. The deeper compliance design (recipient
        verification, audit trail integrity, the architectural decisions
        about what gets logged where) was owned by senior engineers on the
        team. I learned about that side of HIPAA by working alongside the
        patterns they&apos;d established, not by designing them.
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
        Joined as a software developer on the existing team. The role was
        fully remote. Two months total tenure.
      </p>
      <p className="max-w-[65ch] mt-4">Specifically:</p>
      <RoleBulletList
        items={[
          {
            lede: 'Vonage and GSuite integration.',
            description:
              'Wrote and maintained the code paths that handed off composed messages to the SMS and email providers and processed the delivery responses.',
          },
          {
            lede: 'Per-client database schema work.',
            description:
              "Designed schema additions for new clinic onboardings and contributed to existing clinics' schemas as their workflows evolved.",
          },
          {
            lede: 'Communications framework contributions.',
            description:
              'Worked within the messaging primitives layer; not the primary author, but added pieces that other reminder workflows reused.',
          },
          {
            lede: 'HIPAA encryption work.',
            description:
              'Configured the encryption framework for the integrations I owned, working within the patterns the senior engineers had established for compliance.',
          },
        ]}
      />
      <p className="max-w-[65ch] mt-6">
        The architecture and overall direction of the messaging system were
        owned by senior engineers on the team. My contributions sat in the
        implementation and maintenance layer.
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
        The work I contributed went into production. The bug fixes shipped,
        the new integrations worked, the schemas onboarded their clinics.
        Nothing I shipped went wrong in a way I&apos;m aware of, which for
        HIPAA-adjacent code is the only outcome that matters.
      </p>
      <p className="max-w-[65ch] mt-4">
        What I took from the role was the rigor. HIPAA compliance forces a
        specific kind of attention: the audit trail is not optional, the
        failure modes are different, and the question &quot;what happens if
        this message goes to the wrong person&quot; has a real answer that
        has to be designed for, not bolted on. I came back to T&amp;S after
        two months, but the rigor stuck. I think about logging, error
        handling, and recipient-state validation differently because of
        those two months.
      </p>
    </section>
  );
}

export default function NicularPage() {
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
          { label: 'Patient messaging at Nicular' },
        ]}
        eyebrow="§ 01 · Healthcare · Full-time · Late 2022"
        title="Patient messaging at Nicular"
        subtitle="A two-month full-time role building HIPAA-compliant SMS and email reminders for clinician workflows."
        dek="Joined a small team at Nicular, a healthcare startup in Dallas, to contribute to the patient-messaging system in production at their clinic customers. My contribution: SMS and email integration through Vonage and GSuite, schema work for per-client communication data, and the HIPAA encryption work for the integrations I owned."
        hero={{
          mode: 'placeholder',
          numeral: '№ 04',
          placeholderCaption: 'HIPAA-compliant · No customer data shown',
          figureCaption:
            'FIG. 01 - No image. The work was patient communication under HIPAA; nothing displayable was ours to show.',
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
