// Global footer component. Two render modes per SITE_SPEC.md sections 1.10.6
// and 2.5: 'contact' (homepage) renders the contact section above the
// dividers; 'sitewide' (everywhere else) drops it. The outer <footer> has
// id="contact" in BOTH modes so anchor links from project pages always land.
//
// Inverted-section color overrides (locked in section 2.5, intentionally NOT
// in the section 1.2 token table since they are scoped to inverted contexts):
//   #A8A6A0  desaturated cream for mono labels on dark
//   #444341  divider color on dark

import { identity } from '../_data/identity';

type FooterMode = 'contact' | 'sitewide';

function Divider() {
  return (
    <div
      role="separator"
      aria-hidden="true"
      className="h-[0.5px] my-12 bg-[#444341]"
    />
  );
}

function ContactSection() {
  return (
    <section className="mb-12">
      <p className="mono-label text-[#A8A6A0]">§ 04 - CONTACT</p>
      <h2 className="text-text-inverse mt-6">Get in touch</h2>
      <p className="text-text-inverse mt-6 max-w-[60ch]">
        Email is the fastest way. I usually reply within a couple of days.
      </p>
      <a
        href={`mailto:${identity.email}`}
        className="inline-flex items-baseline gap-3 mt-6 font-medium text-[18px] text-accent no-underline hover:underline"
      >
        <span aria-hidden="true">→</span>
        <span>{identity.email}</span>
      </a>
    </section>
  );
}

function ElsewhereRow() {
  const linkClass =
    'text-text-inverse font-medium no-underline hover:text-accent hover:underline';
  return (
    <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8">
      <p className="mono-label text-[#A8A6A0] md:w-32">Elsewhere</p>
      <ul className="flex flex-wrap items-baseline gap-x-2 gap-y-2 text-sm">
        <li>
          <a href={identity.links.linkedin} className={linkClass}>
            LinkedIn
          </a>
        </li>
        <li aria-hidden="true" className="text-[#A8A6A0]">
          ·
        </li>
        <li>
          <a href={identity.links.github} className={linkClass}>
            GitHub
          </a>
        </li>
        <li aria-hidden="true" className="text-[#A8A6A0]">
          ·
        </li>
        <li>
          <a href={identity.links.resumePdf} className={linkClass}>
            Resume (PDF)
          </a>
        </li>
      </ul>
    </div>
  );
}

function Colophon() {
  // Source text is sentence case; the mono-label utility's text-transform:
  // uppercase produces the rendered ALL-CAPS form. The № glyph (U+2116) and
  // © (U+00A9) have no case mappings, so they render unchanged under uppercase.
  return (
    <div className="flex flex-col md:flex-row md:justify-between gap-6 md:gap-8 leading-[1.6]">
      <div className="mono-label text-[#A8A6A0] flex flex-col gap-1">
        <span>
          {identity.number} {identity.name}
        </span>
        <span>{identity.location}</span>
        <span>© 2026</span>
      </div>
      <div className="mono-label text-[#A8A6A0] flex flex-col gap-1 md:text-right">
        <span>Set in Fraunces, Inter,</span>
        <span>and JetBrains Mono.</span>
        <span>Next.js / Vercel.</span>
      </div>
    </div>
  );
}

export function Footer({ mode = 'sitewide' }: { mode?: FooterMode }) {
  return (
    <footer
      id="contact"
      role="contentinfo"
      className="bg-bg-inverse text-text-inverse px-5 py-15 md:px-8 md:py-20"
    >
      <div className="max-w-[880px] mx-auto">
        {mode === 'contact' && <ContactSection />}
        <Divider />
        <ElsewhereRow />
        <Divider />
        <Colophon />
      </div>
    </footer>
  );
}
