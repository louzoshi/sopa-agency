// src/app/[locale]/[[...slug]]/page.tsx
// Optional catch-all: /en, /en/contact, /pt/team ... all serve the SPA.
// LayoutClient reads the slug and renders the matching section, so any
// section URL is shareable/bookmarkable.
import { notFound } from 'next/navigation';
import { site } from '@/data/site';

const SECTIONS = new Set(['home', 'work', 'team', 'feed', 'solutions', 'about', 'contact']);

import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug?: string[] }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const siteData = site[locale as keyof typeof site];
  if (!siteData) notFound();

  const section = slug?.[0];
  const sectionTitle = section 
    ? section.charAt(0).toUpperCase() + section.slice(1) 
    : '';

  const title = sectionTitle 
    ? `${sectionTitle} | ${siteData.title}` 
    : siteData['page-title'] || siteData.title;

  const currentPath = slug ? `/${locale}/${slug.join('/')}` : `/${locale}`;
  const enPath = slug ? `/en/${slug.join('/')}` : '/en';
  const ptPath = slug ? `/pt/${slug.join('/')}` : '/pt';

  // Machine-readable mirror for this route (see /llms.txt). home → index.md
  const mdSection = !section || section === 'home' ? 'index' : SECTIONS.has(section) ? section : null;
  const mdPath = mdSection ? `/${locale}/${mdSection}.md` : null;

  return {
    title,
    description: siteData.description,
    alternates: {
      canonical: currentPath,
      languages: {
        'en': enPath,
        'pt-BR': ptPath,
      },
      ...(mdPath ? { types: { 'text/markdown': mdPath } } : {}),
    },
    openGraph: {
      title,
      description: siteData.description,
      url: currentPath,
      siteName: siteData.title,
      locale: locale === 'en' ? 'en_US' : 'pt_BR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: siteData.description,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string; slug?: string[] }> }) {
  const { locale, slug } = await params;
  if (!site[locale as keyof typeof site]) notFound();
  // unknown section paths still 404
  const section = slug?.[0];
  if (section && !SECTIONS.has(section)) notFound();
  if (section === 'home' && slug?.length) notFound();
  return null; // LayoutClient renders everything
}
