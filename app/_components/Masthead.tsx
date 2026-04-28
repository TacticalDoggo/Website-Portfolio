'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useEffect, useRef, useState } from 'react';
import { identity, nav } from '../_data/identity';

function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(href + '/');
}

export function Masthead() {
  const pathname = usePathname() ?? '/';
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    firstMobileLinkRef.current?.focus();
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const headerClass = [
    'sticky top-0 z-40 bg-bg-page',
    'px-5 py-3 md:px-8 md:py-4',
    'border-b-[0.5px] transition-colors duration-200',
    scrolled ? 'border-b-border-hairline' : 'border-b-transparent',
  ].join(' ');

  return (
    <header role="banner" className={headerClass}>
      <div className="flex items-center justify-between">
        <Link
          href="/"
          aria-label={`${identity.name}, home`}
          className="flex items-baseline gap-2 no-underline"
        >
          <span className="mono-label text-text-primary">{identity.number}</span>
          <span className="font-serif font-medium text-lg text-text-primary">
            {identity.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-3 text-sm">
          {nav.map((item, i) => {
            const active = isActive(pathname, item.href);
            return (
              <Fragment key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={
                    active
                      ? 'text-accent no-underline'
                      : 'text-text-primary no-underline hover:underline underline-offset-4'
                  }
                >
                  {item.label}
                </Link>
                {i < nav.length - 1 && (
                  <span aria-hidden="true" className="text-text-muted">
                    ·
                  </span>
                )}
              </Fragment>
            );
          })}
        </nav>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="masthead-mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
        >
          <span
            aria-hidden="true"
            className={`block h-[1.5px] w-6 bg-text-primary transition-transform duration-200 ${
              menuOpen ? 'translate-y-[7px] rotate-45' : ''
            }`}
          />
          <span
            aria-hidden="true"
            className={`block h-[1.5px] w-6 bg-text-primary transition-opacity duration-200 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            aria-hidden="true"
            className={`block h-[1.5px] w-6 bg-text-primary transition-transform duration-200 ${
              menuOpen ? '-translate-y-[7px] -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {menuOpen && (
        <div
          id="masthead-mobile-menu"
          role="menu"
          className="md:hidden absolute left-0 right-0 top-full bg-bg-page px-5 py-6 flex flex-col gap-6 text-sm"
        >
          {nav.map((item, i) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                ref={i === 0 ? firstMobileLinkRef : undefined}
                href={item.href}
                role="menuitem"
                aria-current={active ? 'page' : undefined}
                onClick={() => setMenuOpen(false)}
                className={
                  active
                    ? 'text-accent no-underline'
                    : 'text-text-primary no-underline hover:underline underline-offset-4'
                }
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
