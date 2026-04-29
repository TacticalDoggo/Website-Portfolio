// Project card. Locked structure per SITE_SPEC.md sections 1.10.1 and 2.3.
// Whole card is a single anchor wrapping the figure and content, so the
// entire surface is clickable and the keyboard tab order has one stop per
// card. Server component; hover behavior is pure CSS via Tailwind's `group`
// modifier, so no client boundary is needed.
//
// Hover (per spec):
//   - card border shifts border-hairline -> border-rule
//   - project numeral translates 2px right
//   - both 200ms ease-out
//   - no box-shadow, no scale, no background change
//
// Image: typographic placeholder (88px Fraunces project numeral on bg-alt
// with a hairline outline, 16:10 aspect) per section 1.10.5. Real photos
// land in a later build step.

import Link from 'next/link';
import type { Project } from '../_data/projects';

function ProjectImagePlaceholder({ number }: { number: string }) {
  // Non-breaking space between glyph and digits matches the design handoff
  // so the numeral never wraps inside the placeholder.
  const display = number.replace(' ', ' ');
  return (
    <div
      role="img"
      aria-label={`${number} placeholder`}
      className="relative w-full aspect-[16/10] bg-bg-alt border-[0.5px] border-border-hairline rounded grid place-items-center mb-5 overflow-hidden"
    >
      <span
        aria-hidden="true"
        className="font-serif font-medium text-[64px] md:text-[88px] leading-none tracking-[-0.02em] text-text-secondary"
      >
        {display}
      </span>
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={project.href}
      className="group block bg-bg-paper border-[0.5px] border-border-hairline hover:border-border-rule rounded-lg p-6 no-underline transition-colors duration-200 ease-out"
    >
      <div className="flex items-baseline justify-between gap-4 mb-6">
        <span className="font-mono text-[13px] leading-none text-text-primary transition-transform duration-200 ease-out group-hover:translate-x-[2px]">
          {project.number}
        </span>
        <span className="mono-label text-text-muted leading-none tracking-[0.08em]">
          {project.typeLabel}
        </span>
      </div>

      <ProjectImagePlaceholder number={project.number} />

      <h3 className="mb-2">{project.title}</h3>

      <p className="text-text-secondary mb-4">{project.problem}</p>

      <p className="mono-label text-text-muted tracking-[0.08em] leading-[1.5] mb-5">
        {project.stack.join(' · ')}
      </p>

      <span className="inline-flex items-center gap-1.5 text-accent font-medium text-sm group-hover:underline underline-offset-[3px]">
        See case study <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}
