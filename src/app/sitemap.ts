import { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://sopa.team';

export default function sitemap(): MetadataRoute.Sitemap {
  const sections = ['', 'work', 'team', 'feed', 'solutions', 'about', 'contact'];
  
  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const section of sections) {
    const slug = section ? `/${section}` : '';
    
    // Add EN version
    sitemapEntries.push({
      url: `${baseUrl}/en${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: section === '' ? 1 : 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/en${slug}`,
          'pt-BR': `${baseUrl}/pt${slug}`,
        }
      }
    });

    // Add PT version
    sitemapEntries.push({
      url: `${baseUrl}/pt${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: section === '' ? 1 : 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/en${slug}`,
          'pt-BR': `${baseUrl}/pt${slug}`,
        }
      }
    });
  }

  // Also push the root redirect
  sitemapEntries.push({
    url: `${baseUrl}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  });

  return sitemapEntries;
}
