// OG image URL builder. Centralizes the query-param shape so every page
// produces correctly-encoded URLs that point at the dynamic OG route at
// app/og/route.tsx. Returns a relative URL; absolutize relies on
// metadataBase in app/layout.tsx.
//
// Locked param shape per SITE_SPEC.md section 1.10.7:
//   title    - page H1 (Fraunces 500, 64px center)
//   subtitle - optional, italic line (Fraunces 22px italic, below H1)
//   meta     - bottom-left mono line (JetBrainsMono 14px, type label /
//              identity line)

export function buildOgUrl(params: {
  title: string;
  subtitle?: string;
  meta: string;
}): string {
  const sp = new URLSearchParams();
  sp.set('title', params.title);
  if (params.subtitle) sp.set('subtitle', params.subtitle);
  sp.set('meta', params.meta);
  return `/og?${sp.toString()}`;
}
