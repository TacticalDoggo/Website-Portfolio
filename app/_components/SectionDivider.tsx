// Shared section divider. 1px border-rule line in the 880px content shell,
// 60px (mobile) / 80px (desktop) of vertical breathing room. Promoted from
// inline helpers that previously lived in app/page.tsx and
// app/projects/page.tsx; both pages now import from this module so any
// future tweak (e.g. a Lighthouse pass on tracking padding) lands once.

const SHELL = 'max-w-[880px] mx-auto px-5 md:px-8';
const DIVIDER = 'h-px bg-border-rule my-15 md:my-20';

export function SectionDivider() {
  return (
    <div className={SHELL}>
      <div role="separator" aria-hidden="true" className={DIVIDER} />
    </div>
  );
}
