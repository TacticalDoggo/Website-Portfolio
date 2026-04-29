'use client';

// One-shot scroll fade-in for project cards and the Now section
// (SITE_SPEC.md section 2.7). Opacity 0 -> 1 plus a 50px Y translate over
// 400ms when the element enters the viewport. Hero is rendered without
// this wrapper and stays at full opacity per spec.
//
// `prefers-reduced-motion: reduce` short-circuits the observer and renders
// the children at their final state from the first paint.

import { useEffect, useRef, useState } from 'react';

export function RevealOnScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  // Start visible to avoid hidden content for users without JS or with
  // reduced motion. The effect below toggles to opacity-0 + translate
  // before the first IntersectionObserver tick when motion is allowed.
  const [visible, setVisible] = useState(true);
  const [primed, setPrimed] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (reduceMotion) return;

    const node = ref.current;
    if (!node) return;

    setVisible(false);
    setPrimed(true);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const baseClass =
    'transition-[opacity,transform] duration-[400ms] ease-out';
  const stateClass = primed && !visible
    ? 'opacity-0 translate-y-[50px]'
    : 'opacity-100 translate-y-0';

  return (
    <div ref={ref} className={`${baseClass} ${stateClass}`}>
      {children}
    </div>
  );
}
