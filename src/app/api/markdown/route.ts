import { NextRequest, NextResponse } from 'next/server';
import { site } from '@/data/site';
import { workItems } from '@/data/work';
import { members } from '@/data/team';
import { solutions } from '@/data/solutions';
import { feedPosts } from '@/data/feed';

// reads request query params — must not be statically prerendered,
// or rewrites like /work.md arrive with an empty searchParams stub.
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  let slugParam = searchParams.get('slug');
  // Next 16 rewrites hit this route with the ORIGINAL url (/work.md) and
  // without the destination query — fall back to parsing the pathname.
  if (!slugParam) {
    const p = request.nextUrl.pathname;
    const m = p.match(/^\/(.+)\.md$/);
    if (m) slugParam = m[1];
    else if (p === '/llms.txt') slugParam = 'llms';
  }
  const slug = Array.isArray(slugParam) ? slugParam.join('/') : slugParam;

  if (!slug) return new NextResponse('Not found', { status: 404 });

  const t = site.en;
  let md = '';

  switch (slug) {
    case 'index':
    case 'about':
      md = `# SOPA AGENCY - ABOUT
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
${workItems.map((w) => `## ${w.title}
Category: ${w.category}
Tags: ${w.tags}
Summary: ${w.subtitle}
${w.detail ? `Details: ${w.detail.intro}` : ''}`).join('\n\n')}`;
      break;

    case 'team':
    case 'people':
      md = `# SOPA AGENCY - THE CREW
${members.map((m) => `## ${m.handle}${m.ai ? ' [AI AGENT]' : ''}
Skills: ${m.skills?.map((s) => s[0]).join(', ') || 'N/A'}
${m.bio?.en ? `Bio: ${m.bio.en}` : ''}`).join('\n\n')}`;
      break;

    case 'solutions':
    case 'services':
      md = `# SOPA AGENCY - SOLUTIONS
${solutions.map((s) => `## ${s.num}. ${s.title}
Tags: ${(s.tags || []).join(', ')}
${s.body.en}`).join('\n\n')}`;
      break;

    case 'feed':
    case 'blog':
      md = `# SOPA AGENCY - FEED / LOGS
${feedPosts.map((f) => `## @${f.handle} - ${f.time}
${f.text.en}
Likes: ${f.likes} | Reposts: ${f.reposts}`).join('\n\n')}`;
      break;

    case 'contact':
      md = `# SOPA AGENCY - CONTACT
Reach out to us:
Email: crew@sopa.team
X: https://x.com/sopaagency
Farcaster: https://warpcast.com/~/channel/gnars`;
      break;

    case 'agents':
      md = `# SOPA AI AGENTS
SOPA deploys autonomous agents for operations, marketing, and onchain activities.
${members.filter((m) => m.ai).map((m) => `- ${m.handle}: ${m.bio?.en || ''}`).join('\n')}`;
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
      // The master file linking them all or dumping them all
      md = `# SOPA AGENCY - MACHINE READABLE INDEX
This is the machine-readable, plain-text mirror of SOPA Agency.
You can append .md to any major route (e.g., /work.md, /team.md) to get its raw markdown representation.

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

  md += `\n\n/* EOF */\n`;

  return new NextResponse(md, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    },
  });
}