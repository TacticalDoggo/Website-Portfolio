// Homepage WebSite JSON-LD. Mounted in app/page.tsx only. Verbatim per
// SITE_SPEC § 2.6: WebSite with `author` Person inlined. The Person object
// imports from app/_data/identity.ts (same source as PersonJsonLd) so the
// homepage's WebSite.author and the sitewide Person stay byte-identical.
// Soft duplication on the homepage (Person rendered twice: once standalone
// from layout, once embedded as WebSite.author) accepted per the verbatim
// spec lock at § 1.7 + § 2.6; logged as a Site-Wide deviation.

import { personJsonLd } from '../_data/identity';

const webSiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Alex Bacallao',
  url: 'https://alexbacallao.com',
  // Strip the @context off the embedded Person; the outer WebSite already
  // declares it. This is the standard JSON-LD nesting pattern.
  author: (() => {
    const { '@context': _ctx, ...rest } = personJsonLd;
    return rest;
  })(),
};

export function WebSiteJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
    />
  );
}
