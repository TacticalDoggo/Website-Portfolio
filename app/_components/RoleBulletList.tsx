// Role bullet list. Locked structure per SITE_SPEC.md section 1.10.4 and
// the NASA spec section 3.4:
//   - custom middot bullet (·) in JetBrains Mono, accent color
//   - 16px gap between bullet and text
//   - bold Inter 500 lede (with trailing period inside the bold run)
//   - regular-weight description follows immediately, no separator
//
// The visual transition from bold to regular weight does the separator's
// work. No em dash, no hyphen, no colon. The lede may optionally be a link
// (used on the contact page channel list and the resume page projects
// section); when ledeHref is set, the lede renders as a Next.js <Link>
// in accent color.
//
// Step 13: description widened from string to React.ReactNode so the
// resume's HackZurich projects bullet can carry inline bold-italic on
// '1st place, Migros challenge.' per pass2-resume.md section 6.8.
// Backwards-compatible with all 4 prior callers (NASA, T&S, HackZurich,
// Nicular My Role bullets) which pass plain strings; not a deviation.
//
// Used standalone; the closing-scope paragraph and any "Specifically:"
// transition line live at the call site, not in this component.

import type { ReactNode } from 'react';
import Link from 'next/link';

export type RoleBulletItem = {
  lede: string;
  ledeHref?: string;
  description: ReactNode;
};

export function RoleBulletList({ items }: { items: RoleBulletItem[] }) {
  return (
    <ul className="flex flex-col gap-4 max-w-[65ch] mt-6 list-none p-0">
      {items.map((item, index) => (
        <li key={`${item.lede}-${index}`} className="flex gap-4">
          <span
            aria-hidden="true"
            className="font-mono text-accent shrink-0 leading-[1.7]"
          >
            ·
          </span>
          <p className="leading-[1.7]">
            {item.ledeHref ? (
              <Link
                href={item.ledeHref}
                className="font-medium text-accent no-underline hover:underline underline-offset-[3px]"
              >
                {item.lede}
              </Link>
            ) : (
              <strong className="font-medium">{item.lede}</strong>
            )}{' '}
            {item.description}
          </p>
        </li>
      ))}
    </ul>
  );
}
