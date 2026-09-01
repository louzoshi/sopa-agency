// Plain route (not the metadata convention) so robots.txt can carry a comment
// pointing crawlers at the LLM-friendly markdown mirror — MetadataRoute.Robots
// has no field for that.
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://sopa.team';

export const dynamic = 'force-static';

export function GET() {
  const body = `User-Agent: *
Allow: /
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml

# Plain-text / markdown mirror for AI agents and crawlers:
# ${baseUrl}/llms.txt   (append .md to any route, or send Accept: text/markdown)
`;
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
