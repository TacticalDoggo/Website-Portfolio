// Project header (section 01 of every case study page). Locked structure
// per docs/pass2-nasa-circadian-lighting.md section 3.1; established here
// as the canonical case-study header that subsequent project pages reuse.
//
// Two hero modes:
//   image       - real photo via next/image with priority loading
//   placeholder - typographic placeholder (16:10, bg-paper, 88px Fraunces
//                 numeral) for HIPAA / IP-constrained projects; spec section 1.10.5
//
// Hero aspect ratio defaults to 16:10 per SITE_SPEC section 1.5 ("lets
// technical screenshots breathe"). Pages whose hero source can't tolerate
// the 16:10 crop override via aspectRatio (e.g. HackZurich's near-square
// 877x853 team photo uses '1/1' to preserve all 5 team members). The union
// is intentionally tight - only ratios with a real caller. Add a value
// when the second caller arrives, not before.
//
// The 880px shell is mounted at the section level. Eyebrow uses 0.1em
// tracking per spec; the breadcrumb component owns its own 0.08em.

import Image from 'next/image';
import { Breadcrumb, type BreadcrumbItem } from './Breadcrumb';

const SHELL = 'max-w-[880px] mx-auto px-5 md:px-8';

type HeroAspectRatio = '16/10' | '4/3' | '1/1';

// Tailwind v4's JIT needs each arbitrary aspect-* class as a literal so
// it gets emitted into the final CSS. A small lookup map handles that.
const ASPECT_CLASS: Record<HeroAspectRatio, string> = {
  '16/10': 'aspect-[16/10]',
  '4/3':   'aspect-[4/3]',
  '1/1':   'aspect-[1/1]',
};

type HeroImage = {
  mode: 'image';
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  aspectRatio?: HeroAspectRatio;
};

type HeroPlaceholder = {
  mode: 'placeholder';
  numeral: string;
  placeholderCaption: string;
  figureCaption: string;
  aspectRatio?: HeroAspectRatio;
};

export type ProjectHeaderProps = {
  breadcrumb: BreadcrumbItem[];
  eyebrow: string;
  title: string;
  subtitle: string;
  dek: string;
  hero: HeroImage | HeroPlaceholder;
};

export function ProjectHeader({
  breadcrumb,
  eyebrow,
  title,
  subtitle,
  dek,
  hero,
}: ProjectHeaderProps) {
  return (
    <section
      id="header"
      aria-labelledby="header-heading"
      className={`${SHELL} pt-12 md:pt-16`}
    >
      <div className="mb-6">
        <Breadcrumb items={breadcrumb} />
      </div>

      <p className="mono-label text-text-muted tracking-[0.1em] mb-6">{eyebrow}</p>

      <h1 id="header-heading" className="mb-3">
        {title}
      </h1>

      <p className="font-serif italic text-[22px] leading-[1.3] text-text-secondary max-w-[60ch] mb-6">
        {subtitle}
      </p>

      <p className="max-w-[65ch]">{dek}</p>

      <figure className="mt-12">
        {hero.mode === 'image' ? (
          <Image
            src={hero.src}
            alt={hero.alt}
            width={hero.width}
            height={hero.height}
            sizes="(min-width: 880px) 880px, calc(100vw - 40px)"
            priority
            className={`${ASPECT_CLASS[hero.aspectRatio ?? '16/10']} w-full object-cover border-[0.5px] border-border-hairline`}
          />
        ) : (
          <div
            role="img"
            aria-label={`${hero.numeral} placeholder, ${hero.placeholderCaption}`}
            className={`w-full ${ASPECT_CLASS[hero.aspectRatio ?? '16/10']} bg-bg-paper border-[0.5px] border-border-hairline grid place-items-center`}
          >
            <div className="flex flex-col items-center gap-3">
              <span
                aria-hidden="true"
                className="font-serif font-medium text-[64px] md:text-[88px] leading-none tracking-[-0.02em] text-text-primary"
              >
                {hero.numeral}
              </span>
              <span
                aria-hidden="true"
                className="mono-label text-text-muted tracking-[0.1em]"
              >
                {hero.placeholderCaption}
              </span>
            </div>
          </div>
        )}
        <figcaption className="mono-label text-text-secondary tracking-[0.05em] mt-3">
          {hero.mode === 'image' ? hero.caption : hero.figureCaption}
        </figcaption>
      </figure>
    </section>
  );
}
