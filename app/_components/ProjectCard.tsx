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

import Link from 'next/link';
import type { Project } from '../_data/projects';

// Hero render selection (locked matrix; mirrors JSDoc on Project.image
// and Project.placeholderCaption in app/_data/projects.ts):
//
//   placeholderCaption present     -> typographic placeholder
//                                     bg-bg-paper, numeral + caption (1.10.5)
//   image present, no caption      -> real <Image /> (FUTURE STATE,
//                                     not yet wired this step)
//   neither present                -> deferred-photo placeholder
//                                     bg-bg-alt, numeral only
//
// placeholderCaption wins over image if both are set: explicit
// "this project will never show real photos" intent overrides a
// would-be photo path.
function ProjectImagePlaceholder({
  number,
  caption,
}: {
  number: string;
  caption?: string;
}) {
  // Non-breaking space between glyph and digits matches the design handoff
  // so the numeral never wraps inside the placeholder.
  const display = number.replace(' ', ' ');
  const isTypographic = Boolean(caption);
  const containerBg = isTypographic ? 'bg-bg-paper' : 'bg-bg-alt';
  const ariaLabel = caption
    ? `${number} placeholder, ${caption}`
    : `${number} placeholder`;

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className={`relative w-full aspect-[16/10] ${containerBg} border-[0.5px] border-border-hairline rounded grid place-items-center mb-5 overflow-hidden`}
    >
      <div className="flex flex-col items-center gap-3">
        <span
          aria-hidden="true"
          className="font-serif font-medium text-[64px] md:text-[88px] leading-none tracking-[-0.02em] text-text-secondary"
        >
          {display}
        </span>
        {caption ? (
          <span
            aria-hidden="true"
            className="mono-label text-text-muted tracking-[0.1em]"
          >
            {caption}
          </span>
        ) : null}
      </div>
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

      <ProjectImagePlaceholder
        number={project.number}
        caption={project.placeholderCaption}
      />

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
