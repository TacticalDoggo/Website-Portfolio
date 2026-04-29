// /contact. Locked source: docs/pass2-contact.md (locked 2026-04-27).
//
// Contact page pattern (SITE_SPEC.md section 1.9.9): header (eyebrow + H1
// + dek) -> minimal mailto-first email block (24px primary action +
// sub-line) -> mono table for response-time-by-channel -> bulleted list
// with bold link + description for "elsewhere" links -> global footer in
// sitewide mode. NO contact form. NO form fields. NO submit button. The
// mailto: link is what ships.
//
// Wink budget: ONE protected wink per spec section 4.4 / 4.9 (the
// 'GITHUB · ISSUES OR PRS ONLY' row in the section 03 response-time
// table). Wink-by-understatement; voice rules allow one wink per page
// for short content pages (SITE_SPEC section 1.6 voice rule 5).
//
// identity.ts is the source of truth for email, LinkedIn, GitHub, and
// resume.pdf path. Phone is intentionally omitted from HTML and JSON-LD
// (sitewide PDF-only policy applied across step 13). Other pages
// currently hardcode some of these strings; the retrofit is a step-18
// polish item, not this commit's scope.
//
// MonoTable is imported from app/_components/ (promoted from
// app/resume/_components/ in this same commit; Resume's import path
// updated). The table uses variant='standard' (13px / 0.05em tracking)
// per spec section 4.4; Resume's four tables continue to render
// 'compact' (12px / 0.1em) by omitting the prop.
//
// RevealOnScroll is intentionally NOT used on this page. Spec section
// 4.8 explicitly overrides the sitewide IntersectionObserver fade-in:
// "the page is short enough that no fade-in animation is needed.
// Sections render in their final state on load."
//
// Root layout owns <main>; this page returns a fragment. Global footer
// is auto-selected by SiteFooter via usePathname() and falls to
// 'sitewide' mode at /contact (entire page IS the contact strip; the
// homepage's contact-mode footer would be redundant). JSON-LD ships
// inline this step rather than waiting on build step 15 - schema is
// fully locked in spec section 4.7 and trivially serializable. See
// deviations.md for the formal entry. Email is intentionally INCLUDED
// in this page's JSON-LD per spec section 4.7 note (only /contact
// exposes email in structured data; sitewide privacy pattern).

import type { Metadata } from 'next';
import { identity } from '../_data/identity';
import { MonoTable } from '../_components/MonoTable';
import { RoleBulletList, type RoleBulletItem } from '../_components/RoleBulletList';
import { SectionDivider } from '../_components/SectionDivider';

const PAGE_DESCRIPTION =
  'Get in touch with Alex Bacallao, software developer in Ft Worth, Texas. Email is the fastest way. LinkedIn, GitHub, and resume PDF also linked.';

export const metadata: Metadata = {
  title: 'Contact',
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: 'https://alexbacallao.com/contact',
  },
  openGraph: {
    title: 'Contact - Alex Bacallao',
    description: PAGE_DESCRIPTION,
    url: 'https://alexbacallao.com/contact',
    type: 'website',
  },
};

const SHELL = 'max-w-[880px] mx-auto px-5 md:px-8';

// JSON-LD ContactPage with Person mainEntity. Email and sameAs values
// mirror identity.ts but are inlined here verbatim per the spec lock
// (pass2-contact.md section 4.7).
const contactPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact',
  url: 'https://alexbacallao.com/contact',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Alex Bacallao',
    url: 'https://alexbacallao.com',
  },
  mainEntity: {
    '@type': 'Person',
    name: 'Alejandro Bacallao',
    alternateName: 'Alex Bacallao',
    email: 'alex.bacallao1996@gmail.com',
    sameAs: [
      'https://linkedin.com/in/alejandrobacallao',
      'https://github.com/TacticalDoggo',
    ],
  },
};

const elsewhereItems: RoleBulletItem[] = [
  {
    lede: 'LinkedIn →',
    ledeHref: identity.links.linkedin,
    description:
      'Work history, recommendations, the canonical version of "what I\'ve done." If you\'re a recruiter, this is the second-best place to start.',
  },
  {
    lede: 'GitHub →',
    ledeHref: identity.links.github,
    description:
      'Public repos, mostly experiments and a few utility scripts.',
  },
  {
    lede: 'Resume (PDF) →',
    ledeHref: identity.links.resumePdf,
    description:
      'One-page version, downloadable. The HTML resume page on this site has more detail.',
  },
];

const responseTimeRows: ReadonlyArray<readonly [string, string]> = [
  ['Email', '2-3 days'],
  ['LinkedIn', 'Slower'],
  ['GitHub', 'Issues or PRs only'],
];

function HeaderSection() {
  return (
    <section
      id="header"
      aria-labelledby="header-heading"
      className={`${SHELL} pt-12 md:pt-16`}
    >
      <p className="mono-label text-text-muted mb-6">§ 01 - Contact</p>
      <h1 id="header-heading" className="mb-6">
        Get in touch
      </h1>
      <p className="max-w-[60ch]">
        Email is the fastest way. I usually reply within a couple of days,
        sometimes faster. If you&apos;d rather not email, the links below all
        work.
      </p>
    </section>
  );
}

function EmailSection() {
  return (
    <section
      id="email"
      aria-labelledby="email-heading"
      className={SHELL}
    >
      <p className="mono-label text-text-muted mb-6">§ 02 - Email</p>
      <h2 id="email-heading" className="sr-only">
        Email
      </h2>
      <p>
        <a
          href={`mailto:${identity.email}`}
          className="font-medium text-[20px] md:text-[24px] leading-[1.4] text-accent no-underline hover:underline underline-offset-[3px]"
        >
          → {identity.email}
        </a>
      </p>
      <p className="mt-4 max-w-[60ch] text-text-secondary">
        Best for: questions about the work, role inquiries, anything else.
      </p>
    </section>
  );
}

function ResponseTimesSection() {
  return (
    <section
      id="response-times"
      aria-labelledby="response-times-heading"
      className={SHELL}
    >
      <p className="mono-label text-text-muted mb-6">§ 03 - Response times</p>
      <h2 id="response-times-heading" className="mb-6">
        Response times
      </h2>
      <div className="max-w-[480px]">
        <MonoTable
          rows={responseTimeRows}
          ariaLabel="Response times by channel"
          variant="standard"
        />
      </div>
    </section>
  );
}

function ElsewhereSection() {
  return (
    <section
      id="elsewhere"
      aria-labelledby="elsewhere-heading"
      className={SHELL}
    >
      <p className="mono-label text-text-muted mb-6">§ 04 - Elsewhere</p>
      <h2 id="elsewhere-heading" className="mb-6">
        Elsewhere
      </h2>
      <RoleBulletList items={elsewhereItems} />
    </section>
  );
}

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactPageJsonLd),
        }}
      />
      <HeaderSection />
      <SectionDivider />
      <EmailSection />
      <SectionDivider />
      <ResponseTimesSection />
      <SectionDivider />
      <ElsewhereSection />
      <SectionDivider />
    </>
  );
}
