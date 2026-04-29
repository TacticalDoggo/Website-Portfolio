// Dynamic OG image route. Emits 1200x630 PNGs per SITE_SPEC.md section
// 1.10.7. Single template across all pages, content swap via query
// params: ?title=...&subtitle=...&meta=...
//
// Edge runtime (next/og default). Fonts are bundled in /public/fonts and
// loaded at module scope via fetch(new URL(...)) which next/og handles
// statically; no CDN fetch at request time. Both faces (Fraunces and
// JetBrains Mono) are SIL Open Font License - bundling permitted.
//
// Color tokens resolved from SITE_SPEC.md section 1.2:
//   bg-page         -> #FAF8F3
//   text-primary    -> #2C2C2A
//   text-muted      -> #888780
//   accent          -> #C2410C
//   border-hairline -> #E5E0D3

import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';
export const contentType = 'image/png';

const COLOR_PAGE = '#FAF8F3';
const COLOR_PRIMARY = '#2C2C2A';
const COLOR_MUTED = '#888780';
const COLOR_ACCENT = '#C2410C';
const COLOR_HAIRLINE = '#E5E0D3';

const FALLBACK_TITLE = 'Alex Bacallao';
const FALLBACK_META = 'SOFTWARE DEVELOPER · FT WORTH, TX';
const MASTHEAD = '№ 01 ALEX BACALLAO';
const AVAILABILITY = 'PASSIVELY OPEN';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get('title') ?? FALLBACK_TITLE).slice(0, 200);
  const subtitle = searchParams.get('subtitle')?.slice(0, 200) ?? null;
  const meta = (searchParams.get('meta') ?? FALLBACK_META).slice(0, 120);

  const [fraunces, frauncesItalic, jetbrainsMono] = await Promise.all([
    fetch(new URL('../../public/fonts/Fraunces-500.ttf', import.meta.url)).then((r) => r.arrayBuffer()),
    fetch(new URL('../../public/fonts/Fraunces-500-italic.ttf', import.meta.url)).then((r) => r.arrayBuffer()),
    fetch(new URL('../../public/fonts/JetBrainsMono-Regular.ttf', import.meta.url)).then((r) => r.arrayBuffer()),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: COLOR_PAGE,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 32,
            right: 32,
            bottom: 32,
            left: 32,
            border: `0.5px solid ${COLOR_HAIRLINE}`,
            display: 'flex',
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: 64,
            left: 64,
            fontFamily: 'JetBrainsMono',
            fontSize: 18,
            color: COLOR_PRIMARY,
            letterSpacing: '0.08em',
            display: 'flex',
          }}
        >
          {MASTHEAD}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '80%',
            gap: 24,
          }}
        >
          <div
            style={{
              fontFamily: 'Fraunces',
              fontWeight: 500,
              fontSize: 64,
              color: COLOR_PRIMARY,
              lineHeight: 1.05,
              textAlign: 'center',
              display: 'flex',
            }}
          >
            {title}
          </div>

          {subtitle && (
            <div
              style={{
                fontFamily: 'Fraunces',
                fontWeight: 500,
                fontStyle: 'italic',
                fontSize: 22,
                color: COLOR_MUTED,
                lineHeight: 1.35,
                textAlign: 'center',
                display: 'flex',
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 64,
            left: 64,
            fontFamily: 'JetBrainsMono',
            fontSize: 14,
            color: COLOR_MUTED,
            letterSpacing: '0.08em',
            display: 'flex',
          }}
        >
          {meta}
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 64,
            right: 64,
            fontFamily: 'JetBrainsMono',
            fontSize: 14,
            color: COLOR_ACCENT,
            letterSpacing: '0.08em',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span>●</span>
          <span>{AVAILABILITY}</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Fraunces', data: fraunces, weight: 500, style: 'normal' },
        { name: 'Fraunces', data: frauncesItalic, weight: 500, style: 'italic' },
        { name: 'JetBrainsMono', data: jetbrainsMono, weight: 400, style: 'normal' },
      ],
    },
  );
}
