// Project-page footer row. Locked structure per SITE_SPEC.md section 1.9.5
// and NASA spec section 3.6. Renders ABOVE the global footer (which is
// mounted in layout.tsx via SiteFooter and resolves to sitewide mode on
// project pages via usePathname).
//
// Layout: two columns on desktop (justify-between), stacked on mobile,
// both align left when stacked. Arrows are part of the visible link text,
// not pseudo-elements. The right link uses a plain <a href="#contact">
// because it's a same-page anchor, not a route navigation.

import Link from 'next/link';

const SHELL = 'max-w-[880px] mx-auto px-5 md:px-8';

export function ProjectPageFooter() {
  return (
    <section className={SHELL}>
      <div className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-8 py-8">
        <Link
          href="/projects"
          className="text-accent font-medium text-sm no-underline hover:underline underline-offset-[3px]"
        >
          ← Back to projects
        </Link>
        <a
          href="#contact"
          className="text-accent font-medium text-sm no-underline hover:underline underline-offset-[3px]"
        >
          See contact ↓
        </a>
      </div>
    </section>
  );
}
