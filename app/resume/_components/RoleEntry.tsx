// Resume work-history role entry. Locked structure per SITE_SPEC.md
// section 1.9.10 and pass2-resume.md section 6.4:
//
//   [Company] - [Role italic]                       [DATE RANGE]
//   [Location]
//   [Body paragraph(s)]
//   [Optional: Case study: [Project name -> link]]
//
// Header line layout:
//   - Line 1, flex row: company-role on the left (Fraunces 22px), date
//     range on the right (JetBrains Mono 11px, mono-label utility,
//     text-text-muted). Stacks below 768px so the dates move under the
//     company-role line on mobile.
//   - Line 2: location (Inter 14px, text-text-secondary).
//   - Separator between company and role is hyphen-minus (' - ', U+002D)
//     per the standing site-wide deviation; spec writes em dash but ships
//     as hyphen.
//
// Co-located under app/resume/_components/ because no other page on the
// site uses this work-history-specific shape today. If a future page
// adopts the pattern, promote to app/_components/RoleEntry.tsx then.
//
// Body prose passes as children so each role's paragraph(s) read as plain
// JSX at the call site (verbatim copy is visually obvious in source).

import Link from 'next/link';
import type { ReactNode } from 'react';

export type RoleEntryProps = {
  company: string;
  role: string;
  dates: string;
  location: string;
  caseStudy?: { label: string; href: string };
  children: ReactNode;
};

export function RoleEntry({
  company,
  role,
  dates,
  location,
  caseStudy,
  children,
}: RoleEntryProps) {
  return (
    <article className="flex flex-col gap-3">
      <header className="flex flex-col gap-1">
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between md:gap-6">
          <p className="font-serif text-[22px] leading-[1.25] text-text-primary">
            {company} - <em className="italic">{role}</em>
          </p>
          <p className="mono-label text-text-muted shrink-0">{dates}</p>
        </div>
        <p className="text-[14px] leading-[1.55] text-text-secondary">
          {location}
        </p>
      </header>
      <div className="max-w-[65ch] flex flex-col gap-4">{children}</div>
      {caseStudy ? (
        <p className="text-[14px] leading-[1.55]">
          <span className="text-text-secondary">Case study: </span>
          <Link
            href={caseStudy.href}
            className="font-medium text-accent no-underline hover:underline underline-offset-[3px]"
          >
            {caseStudy.label} →
          </Link>
        </p>
      ) : null}
    </article>
  );
}
