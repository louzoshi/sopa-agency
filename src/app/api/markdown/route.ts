import { NextRequest, NextResponse } from 'next/server';
import { site } from '@/data/site';
import { workItems } from '@/data/work';
import { members } from '@/data/team';
import { solutions } from '@/data/solutions';
import { feedPosts } from '@/data/feed';

// reads request query params — must not be statically prerendered,
// or rewrites like /work.md arrive with an empty searchParams stub.
export const dynamic = 'force-dynamic';

type Locale = 'en' | 'pt';
const pick = (o: { en: string; pt: string } | undefined, l: Locale) => (o ? o[l] : '');

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  // Accept: text/markdown negotiation routes through proxy.ts, which passes the
  // target as request headers (a rewrite strips the destination query).
  const hdrSlug = request.headers.get('x-md-slug');
  const negotiated = !!hdrSlug;

  let slugParam = hdrSlug || searchParams.get('slug');
  // Next 16 rewrites hit this route with the ORIGINAL url (/work.md, /pt/team.md)
  // and without the destination query — fall back to parsing the pathname.
  if (!slugParam) {
    const p = request.nextUrl.pathname;
    const m = p.match(/^\/(.+)\.md$/);
    if (m) slugParam = m[1];
    else if (p === '/llms.txt') slugParam = 'llms';
  }
  let slug = Array.isArray(slugParam) ? slugParam.join('/') : slugParam;

  if (!slug) return new NextResponse('Not found', { status: 404 });

  // locale from proxy header, ?lang=, or a /en/ | /pt/ prefix on the slug
  let locale: Locale =
    request.headers.get('x-md-lang') === 'pt' || searchParams.get('lang') === 'pt' ? 'pt' : 'en';
  const prefixed = slug.match(/^(en|pt)\/(.+)$/);
  if (prefixed) {
    locale = prefixed[1] as Locale;
    slug = prefixed[2];
  }

  const t = site[locale];
  const langNote =
    locale === 'pt'
      ? 'Idioma: pt-BR. Versão em inglês: troque o prefixo /pt/ por /en/ (ou remova).'
      : 'Language: en. Portuguese version: prefix the path with /pt/ (e.g. /pt/work.md).';
  let md = '';

  switch (slug) {
    case 'index':
    case 'about':
      md = `# SOPA AGENCY - ${locale === 'pt' ? 'SOBRE' : 'ABOUT'}
name: ${t.title}
tagline: ${t.tagline}
description: ${t.description}
founded: 2024
location: Global / Decentralized
services: Creative engineering, AI agents, Onchain, Web3/Base, Campaign architecture
links:
${t.socials.map((s) => `- ${s.name}: ${s.url}`).join('\n')}
`;
      break;

    case 'work':
    case 'showcase':
      md = `# SOPA AGENCY - WORK & CASE STUDIES
${workItems
  .map(
    (w) => `## ${w.title}
Category: ${w.category}
Tags: ${w.tags}
Summary: ${w.subtitle}
${w.detail ? `Details: ${w.detail.intro}` : ''}`,
  )
  .join('\n\n')}`;
      break;

    case 'team':
    case 'people':
      md = `# SOPA AGENCY - ${locale === 'pt' ? 'O TIME' : 'THE CREW'}
${members
  .map(
    (m) => `## ${m.handle}${m.ai ? ' [AI AGENT]' : ''}
Disciplines: ${m.skills?.join(', ') || 'N/A'}
${m.bio ? `Bio: ${pick(m.bio, locale)}` : ''}`,
  )
  .join('\n\n')}`;
      break;

    case 'solutions':
    case 'services':
      md = `# SOPA AGENCY - ${locale === 'pt' ? 'SOLUÇÕES' : 'SOLUTIONS'}
${solutions
  .map(
    (s) => `## ${s.num}. ${s.title}
Tags: ${(s.tags || []).join(', ')}
${pick(s.body, locale)}`,
  )
  .join('\n\n')}`;
      break;

    case 'feed':
    case 'blog':
      md = `# SOPA AGENCY - FEED / LOGS
${feedPosts
  .map(
    (f) => `## @${f.handle} - ${f.time}
${pick(f.text, locale)}
Likes: ${f.likes} | Reposts: ${f.reposts}`,
  )
  .join('\n\n')}`;
      break;

    case 'contact':
      md = `# SOPA AGENCY - ${locale === 'pt' ? 'CONTATO' : 'CONTACT'}
${locale === 'pt' ? 'Fale com a gente:' : 'Reach out to us:'}
Email: crew@sopa.team
X: https://x.com/sopaagency
Farcaster: https://warpcast.com/~/channel/gnars`;
      break;

    case 'agents':
      md = `# SOPA AI AGENTS
SOPA deploys autonomous agents for operations, marketing, and onchain activities.
${members
  .filter((m) => m.ai)
  .map((m) => `- ${m.handle}: ${pick(m.bio, locale)}`)
  .join('\n')}`;
      break;

    case 'sitemap':
      md = `# SITEMAP
/index.md
/work.md
/team.md
/solutions.md
/feed.md
/contact.md
/agents.md`;
      break;

    case 'llms':
      md = `# SOPA AGENCY - MACHINE READABLE INDEX
Plain-text mirror of sopa.team for AI agents, crawlers, and humans who prefer it raw.

Usage:
- Append .md to any major route: /work.md, /team.md, /solutions.md ...
- Portuguese: prefix with /pt/ (e.g. /pt/work.md) or send ?lang=pt
- Content negotiation: request a normal route with "Accept: text/markdown"

Sitemap:
/index.md
/work.md
/team.md
/solutions.md
/feed.md
/contact.md
/agents.md
`;
      break;

    default:
      return new NextResponse('Markdown file not found for this route.', { status: 404 });
  }

  md += `\n\n${langNote}\n/* EOF */\n`;

  // Negotiated responses live at a real page URL — keep them out of shared caches
  // so a browser never gets served the markdown.
  return new NextResponse(md, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': negotiated ? 'private, no-store' : 'public, max-age=3600, s-maxage=3600',
      'Content-Language': locale === 'pt' ? 'pt-BR' : 'en',
      Vary: 'Accept, Accept-Language',
    },
  });
}
