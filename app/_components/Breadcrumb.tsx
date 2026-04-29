// Breadcrumb component. Locked structure per docs/pass2-nasa-circadian-lighting.md
// section 3.1:
//   - <nav aria-label="breadcrumb"> wrapping a real <ol>
//   - " / " separator is text content, not a CSS pseudo-element, so screen
//     readers read it as part of the navigation
//   - items with href use Next.js <Link>; the final item is plain text
//
// Reused on every project case study page (NASA, T&S, HackZurich, Nicular,
// SofaBot). The visible UI breadcrumb may be shorter than the BreadcrumbList
// JSON-LD hierarchy by spec choice; that's intentional and lives at the call
// site, not here.

import Link from 'next/link';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="mono-label text-text-muted tracking-[0.08em] flex flex-wrap items-center">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="inline-flex items-center">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-text-muted no-underline hover:text-text-primary"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? 'page' : undefined}>{item.label}</span>
              )}
              {!isLast ? <span aria-hidden="true">{' / '}</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
