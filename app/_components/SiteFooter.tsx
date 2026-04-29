'use client';

// Tiny client wrapper that picks the Footer's render mode by current path.
// SITE_SPEC.md section 2.5: homepage renders the contact-mode footer;
// every other page renders the sitewide footer. Keeping this in a small
// client component lets app/layout.tsx stay a Server Component and removes
// the per-page burden of remembering to render the footer.

import { usePathname } from 'next/navigation';
import { Footer } from './Footer';

export function SiteFooter() {
  const pathname = usePathname() ?? '/';
  const mode = pathname === '/' ? 'contact' : 'sitewide';
  return <Footer mode={mode} />;
}
