// Sitewide Person JSON-LD. Mounted once in app/layout.tsx so every page emits
// the locked Person identity per SITE_SPEC § 1.7 ("Person schema, sitewide,
// in root layout"). Values import from app/_data/identity.ts (single source
// of truth). Email is intentionally absent - sitewide privacy pattern; only
// /contact's ContactPage JSON-LD exposes email.

import { personJsonLd } from '../_data/identity';

export function PersonJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
    />
  );
}
