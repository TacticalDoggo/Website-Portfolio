import type { Metadata } from 'next';
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Masthead } from './_components/Masthead';
import { PersonJsonLd } from './_components/PersonJsonLd';
import { SiteFooter } from './_components/SiteFooter';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-serif',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  // Resolves relative URLs in per-page metadata (openGraph.images,
  // alternates.canonical, etc.) to absolute URLs for crawlers.
  metadataBase: new URL('https://alexbacallao.com'),
  title: {
    default: 'Alex Bacallao - Software Developer',
    template: '%s - Alex Bacallao',
  },
  description: 'Software developer in Ft Worth, Texas.',
  // Sitewide twitter card type. Per-page openGraph.images entries are picked
  // up by Twitter as the unfurl image because Next.js merges this layout-level
  // metadata with each page's metadata export. No per-page twitter blocks.
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <PersonJsonLd />
        <Masthead />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
