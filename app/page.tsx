// Homepage. Four content sections per SITE_SPEC.md section 2.0:
//   § 01 Introduction (hero) - section 2.2
//   § 02 Selected work       - section 2.3
//   § 03 Now                 - section 2.4
//   § 04 Contact             - rendered by app/layout.tsx via SiteFooter
//                              in 'contact' mode (section 2.5)
//
// The root layout owns <main>; this page returns a fragment so we don't
// double-wrap. Each numbered section is its own <section> inside an
// 880px content shell to align with the masthead's wordmark column.

import type { Metadata } from 'next';
import Link from 'next/link';
import { ProjectCard } from './_components/ProjectCard';
import { RevealOnScroll } from './_components/RevealOnScroll';
import { homepageProjects } from './_data/projects';

export const metadata: Metadata = {
  title: 'Alex Bacallao - Software Developer',
  description:
    'Software developer in Ft Worth, Texas. 4 years across embedded systems, healthcare, and industrial automation. Selected work: Docker for CNC, NASA, HackZurich.',
  alternates: {
    canonical: 'https://alexbacallao.com/',
  },
  openGraph: {
    title: 'Alex Bacallao - Software Developer',
    description:
      'Software developer in Ft Worth, Texas. 4 years across embedded systems, healthcare, and industrial automation. Selected work: Docker for CNC, NASA, HackZurich.',
    url: 'https://alexbacallao.com/',
    type: 'website',
  },
};

const SHELL = 'max-w-[880px] mx-auto px-5 md:px-8';
const DIVIDER = 'h-px bg-border-rule my-15 md:my-20';

function SectionDivider() {
  return (
    <div className={SHELL}>
      <div role="separator" aria-hidden="true" className={DIVIDER} />
    </div>
  );
}

function HeroSection() {
  return (
    <section
      id="introduction"
      aria-labelledby="hero-heading"
      className={`${SHELL} flex flex-col justify-start min-h-[80vh] pt-24 md:pt-32 pb-12`}
    >
      <p className="mono-label text-text-muted mb-6">§ 01 - INTRODUCTION</p>
      <h1 id="hero-heading" className="max-w-[18ch] mb-6">
        Software for systems where reliability matters.
      </h1>
      <p className="max-w-[60ch] mb-8">
        I&apos;m Alex Bacallao, a software developer in Ft Worth, Texas. 4
        years across embedded systems, healthcare, and industrial automation.
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 bg-accent text-text-inverse font-medium text-sm px-6 py-3 rounded-lg no-underline transition-colors duration-150 ease-out hover:bg-[#A9380A]"
        >
          See selected work <span aria-hidden="true">→</span>
        </Link>
        <Link
          href="/contact"
          className="text-text-primary font-medium text-sm no-underline px-1 py-3 hover:underline underline-offset-4"
        >
          Get in touch
        </Link>
        <span
          aria-label="Availability: passively open"
          className="inline-flex items-center gap-1.5 bg-accent-tint text-accent mono-label tracking-[0.08em] px-2.5 py-1 rounded-full"
        >
          <span
            aria-hidden="true"
            className="inline-block w-1.5 h-1.5 rounded-full bg-accent"
          />
          <span>Passively open</span>
        </span>
      </div>
    </section>
  );
}

function SelectedWorkSection() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className={SHELL}
    >
      <p className="mono-label text-text-muted mb-4">§ 02 - SELECTED WORK</p>
      <h2 id="work-heading" className="mb-12">
        Selected work
      </h2>
      <div className="flex flex-col gap-12">
        {homepageProjects.map((project) => (
          <RevealOnScroll key={project.slug}>
            <ProjectCard project={project} />
          </RevealOnScroll>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Link
          href="/projects"
          className="text-accent font-medium text-sm no-underline hover:underline underline-offset-[3px]"
        >
          See all projects <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}

function NowSection() {
  return (
    <section
      id="now"
      aria-labelledby="now-heading"
      className={SHELL}
    >
      <RevealOnScroll>
        <div className="flex justify-between items-baseline gap-4 mb-4">
          <p className="mono-label text-text-muted">§ 03 - NOW</p>
          <p className="mono-label text-text-muted tracking-[0.08em]">
            Updated Apr 2026
          </p>
        </div>
        <h2 id="now-heading" className="mb-6">
          Now
        </h2>
        <div className="max-w-[60ch]">
          <p className="mb-4">
            Working as a Digital Specialist at T&amp;S Machines, mostly the
            Docker and deployment side of things. Looking for what&apos;s
            next: Docker, infra, or backend work, full-time. Remote
            preferred, but open to relocating for the right team.
          </p>
          <p>
            Outside of work I&apos;ve been trying to get less bad at guitar.
            Slow progress. Also building a slot machine game in PixiJS for
            fun, which is going about as well as you&apos;d expect for a
            project with the words &quot;slot machine&quot; and &quot;for
            fun&quot; in the same sentence.
          </p>
        </div>
      </RevealOnScroll>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SectionDivider />
      <SelectedWorkSection />
      <SectionDivider />
      <NowSection />
      <SectionDivider />
    </>
  );
}
