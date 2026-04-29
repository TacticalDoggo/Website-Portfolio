// CNC software at T&S Machines case study. Locked source: docs/pass2-ts-machines.md.
// Five-section ongoing-project case study pattern per SITE_SPEC.md section 1.9.3:
//   section 01 Project header           - 7.1 (ProjectHeader component)
//   section 02 The work                  - 7.2 (replaces NASA's "Problem")
//   section 03 The Docker side-project   - 7.3 (new dedicated side-initiative section)
//   section 04 My role                   - 7.4 (uses RoleBulletList)
//   section 05 Current state             - 7.5 (replaces NASA's "Outcome")
//   section 06 Page footer               - 7.6 (ProjectPageFooter component)
// Global footer (sitewide mode) is rendered by app/layout.tsx via SiteFooter.
//
// The root layout owns <main>; this page returns a fragment so we don't
// double-wrap. Two JSON-LD blocks (BreadcrumbList + CreativeWork) ship inline
// at the top of the page body, mirroring the NASA / projects-index pattern
// (see deviations.md).
//
// Eyebrows on sections 02-05 use hyphen-minus (U+002D) per the site-wide
// deviation; the spec text uses em dash (U+2014) which the no-em-dash hard
// rule forbids. Section 01's eyebrow uses middot (U+00B7) separators
// throughout - the spec's intentional separator for multi-component type
// labels, not the same character class as the em-dash deviation.
//
// Source casing for all mono-label text (eyebrows, breadcrumb, figcaption)
// is natural; the mono-label utility's text-transform: uppercase produces
// the rendered ALL-CAPS. This matches the standing site-wide source-casing
// rule and the projects.ts typeLabel convention.
//
// Voice: zero winks (locked no-wink genre per SITE_SPEC section 1.12.2).
// The honest closing in section 02 paragraph 5 ("a math issue I didn't
// catch in testing that's faster to patch on their machine first") ships
// verbatim per spec section 7.7 - it's professional candor, not a wink.
//
// Hyphenation: "side-project" is hyphenated throughout this page only
// (compound noun, locked local exception per SITE_SPEC section 1.6 rule 12
// and spec section 7.3). Two words elsewhere on the site.

import type { Metadata } from 'next';
import { ProjectHeader } from '../../_components/ProjectHeader';
import { RoleBulletList } from '../../_components/RoleBulletList';
import { ProjectPageFooter } from '../../_components/ProjectPageFooter';
import { SectionDivider } from '../../_components/SectionDivider';
import { RevealOnScroll } from '../../_components/RevealOnScroll';

const PAGE_DESCRIPTION =
  "Four years writing the software that runs T&S Machines' Blockmaster CNC: probing routines, refactoring, screen merges against Mach4, plus a Docker side-project.";

// Page <title> uses the bare title so the layout's title template
// (`%s - Alex Bacallao`, app/layout.tsx) appends the site suffix once.
// Spec section 7.8 calls for "CNC software at T&S Machines - Alex Bacallao"
// exactly. The openGraph.title below is the full string because OG metadata
// is not run through the title template.
export const metadata: Metadata = {
  title: 'CNC software at T&S Machines',
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: 'https://alexbacallao.com/projects/ts-machines',
  },
  openGraph: {
    title: 'CNC software at T&S Machines - Alex Bacallao',
    description: PAGE_DESCRIPTION,
    url: 'https://alexbacallao.com/projects/ts-machines',
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
      name: 'CNC software at T&S Machines',
    },
  ],
};

const creativeWorkJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: 'CNC software at T&S Machines',
  description:
    "Four years writing the software that runs T&S Machines' Blockmaster CNC: machining routines, refactoring, screen merges against Mach4, customer support, and a Docker side-project for cleaner deployment.",
  author: {
    '@type': 'Person',
    name: 'Alejandro Bacallao',
    alternateName: 'Alex Bacallao',
  },
  contributor: {
    '@type': 'Organization',
    name: 'T&S Machines and Tools',
  },
  dateCreated: '2019',
  keywords: [
    'CNC software',
    'industrial automation',
    'Mach4',
    'machining routines',
    'C#',
    'WPF',
    'Docker',
    'GitLab CI',
    'refactoring',
    'Blockmaster',
  ],
  programmingLanguage: ['C#'],
  isPartOf: {
    '@type': 'WebSite',
    name: 'Alex Bacallao',
    url: 'https://alexbacallao.com',
  },
};

function TheWorkSection() {
  return (
    <section id="the-work" aria-labelledby="the-work-heading" className={SHELL}>
      <p className="mono-label text-text-muted tracking-[0.1em] mb-4">
        § 02 - The work
      </p>
      <h2 id="the-work-heading" className="mb-6">
        The work
      </h2>
      <p className="max-w-[65ch]">
        Most of what I do at T&amp;S is writing and maintaining the software
        that runs the Blockmaster, our flagship CNC machine. The work breaks
        roughly into three buckets: new machining routines, refactoring of
        legacy code, and screen merges against Mach4 (the upstream CNC
        software we fork our UI from).
      </p>
      <p className="max-w-[65ch] mt-4">
        The new routines are what they sound like: programs that drive the
        machine through specific operations like cutting, boring, and
        chamfering. These get written to customer specifications, alongside
        probing routines for setup. UI changes ride along, since the operator
        needs a way to invoke each new routine.
      </p>
      <p className="max-w-[65ch] mt-4">
        The refactoring work is harder to describe in one sentence because
        each piece is its own small story. The clearest example is the
        coolant toggle: the legacy implementation had a hacky branching
        solution to handle on/off state, and I replaced it with a single
        check at the top of the cutting process. That&apos;s the shape of
        most of the refactoring - finding the load-bearing condition that
        the legacy code danced around, and writing it once where it belongs.
      </p>
      <p className="max-w-[65ch] mt-4">
        Screen merging is a recurring engineering problem more than a
        one-time project. Mach4 ships UI updates, we maintain a forked
        version with our own screens and customizations, and every Mach4
        release is a merge that needs careful reconciliation. It&apos;s not
        glamorous work but it&apos;s the kind of work that has to be done
        correctly or the next release breaks for every customer.
      </p>
      <p className="max-w-[65ch] mt-4">
        Customer support is occasional. Mostly remote sessions to fix a
        unique bug on a specific customer&apos;s setup, or sometimes a math
        issue I didn&apos;t catch in testing that&apos;s faster to patch on
        their machine first and then port back to the main codebase.
      </p>
    </section>
  );
}

function DockerSideProjectSection() {
  return (
    <section
      id="docker-side-project"
      aria-labelledby="docker-side-project-heading"
      className={SHELL}
    >
      <p className="mono-label text-text-muted tracking-[0.1em] mb-4">
        § 03 - The Docker side-project
      </p>
      <h2 id="docker-side-project-heading" className="mb-6">
        The Docker side-project
      </h2>
      <p className="max-w-[65ch]">
        Separately from the main work, I containerized the application with
        Docker as a personal side-project. The motivation was practical:
        most employers are moving CI/CD toward Docker or Kubernetes, and I
        wanted real hands-on experience starting with Docker on a codebase I
        knew well. T&amp;S didn&apos;t prioritize it as a deployment path;
        the existing manual installer process works for current customers,
        and switching would be a significant operational change. So the
        Docker work has lived as my own initiative on a low-priority track.
      </p>
      <p className="max-w-[65ch] mt-4">
        What I built is mainly the base image: a Windows container with the
        application and its dependencies bundled, built through GitLab CI on
        each commit. The setup follows Docker&apos;s get-started guide
        closely; the value for me wasn&apos;t the architectural novelty but
        the experience of taking a real production codebase from &quot;ships
        as an installer&quot; to &quot;runs as a container.&quot; I&apos;d
        start a future Kubernetes effort from this foundation when
        applicable.
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
        I&apos;ve been the primary developer on the Blockmaster software
        since 2019, originally as a UNT student worker and currently as
        Digital Specialist. The work is mostly mine on the software side,
        though other developers have contributed; coordination happens with
        mechanical engineers, the customer support team, and customers
        directly when remote sessions come up.
      </p>
      <p className="max-w-[65ch] mt-4">Specifically:</p>
      <RoleBulletList
        items={[
          {
            lede: 'New machining routines.',
            description:
              'Wrote and maintain the cutting, boring, chamfering, and probing routines that drive the machine through its operations. UI changes ride along with each new routine.',
          },
          {
            lede: 'Refactoring of legacy code.',
            description:
              'Replaced hacky branching solutions with cleaner conditions at the right level of the code. The coolant toggle is the clearest example, but the pattern recurs across the codebase.',
          },
          {
            lede: 'Screen merges against Mach4.',
            description:
              "Reconcile T&S's forked UI with each upstream Mach4 release. Recurring work, has to be done correctly.",
          },
          {
            lede: 'Documentation.',
            description:
              'Authored and maintain the customer-facing technical documentation, distributed via GitLab.',
          },
          {
            lede: 'Customer support.',
            description:
              "Remote sessions to fix unique bugs and deploy patches; usually port the fix back to the main codebase after the customer's installation is stable.",
          },
          {
            lede: 'Docker side-project.',
            description:
              "Built the base image and GitLab CI pipeline for the containerized version. Personal initiative, not part of T&S's deployment process.",
          },
        ]}
      />
      <p className="max-w-[65ch] mt-6">
        The mechanical and electrical engineering on the Blockmaster is
        owned by other team members; my scope is the software that runs on
        it.
      </p>
    </section>
  );
}

function CurrentStateSection() {
  return (
    <section
      id="current-state"
      aria-labelledby="current-state-heading"
      className={SHELL}
    >
      <p className="mono-label text-text-muted tracking-[0.1em] mb-4">
        § 05 - Current state
      </p>
      <h2 id="current-state-heading" className="mb-6">
        Current state
      </h2>
      <p className="max-w-[65ch]">
        The Blockmaster software is feature-complete and stable in
        production. Most of the active work now is small additions: a new
        routine when a customer needs a specific operation, a UI tweak, a
        Mach4 merge when an upstream release lands. The cadence is
        &quot;occasional requests&quot; rather than &quot;constant feature
        work,&quot; which is the right shape for a mature codebase running
        on real machines.
      </p>
      <p className="max-w-[65ch] mt-4">
        The Docker side-project is also feature-complete in its own scope.
        The base image works, the GitLab CI pipeline builds cleanly, and I
        keep it current as the application evolves. Whether T&amp;S adopts
        containerized deployment as a real path is a leadership decision
        that&apos;s outside my scope; the technical groundwork exists either
        way.
      </p>
      <p className="max-w-[65ch] mt-4">
        What I&apos;m thinking about next is Kubernetes. Most of the
        deployment patterns I&apos;d want to learn from in industry are
        using Kubernetes for orchestration, and a future Kubernetes effort
        would build naturally on the Docker work. Not a current T&amp;S
        priority, but a logical next step for me personally.
      </p>
    </section>
  );
}

export default function TsMachinesPage() {
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
          { label: 'CNC software at T&S Machines' },
        ]}
        eyebrow="§ 01 · Industrial · Software · Since 2019"
        title="CNC software at T&S Machines"
        subtitle="Four years of writing the software that runs the Blockmaster."
        dek="Probing routines, cutting and boring and chamfering operations, screen merges against Mach4, refactoring legacy work for efficiency, customer support, and a Docker side-project for cleaner deployment. Started as a UNT student worker in 2019; the role became Digital Specialist in late 2023."
        hero={{
          mode: 'image',
          src: '/projects/ts-machines/machine-in-action.jpg',
          alt: 'A Blockmaster on the floor running T&S software.',
          width: 1280,
          height: 800,
          caption: 'FIG. 01 - A Blockmaster on the floor running T&S software.',
        }}
      />
      <SectionDivider />
      <RevealOnScroll>
        <TheWorkSection />
      </RevealOnScroll>
      <SectionDivider />
      <RevealOnScroll>
        <DockerSideProjectSection />
      </RevealOnScroll>
      <SectionDivider />
      <RevealOnScroll>
        <MyRoleSection />
      </RevealOnScroll>
      <SectionDivider />
      <RevealOnScroll>
        <CurrentStateSection />
      </RevealOnScroll>
      <SectionDivider />
      <ProjectPageFooter />
    </>
  );
}
