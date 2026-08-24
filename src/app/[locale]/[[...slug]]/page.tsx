// src/app/[locale]/[[...slug]]/page.tsx
// Optional catch-all: /en, /en/contact, /pt/team ... all serve the SPA.
// LayoutClient reads the slug and renders the matching section, so any
// section URL is shareable/bookmarkable.
import { notFound } from 'next/navigation';
import { site } from '@/data/site';

const SECTIONS = new Set(['home', 'work', 'team', 'feed', 'solutions', 'about', 'contact']);

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug?: string[] }> }) {
  const { locale, slug } = await params;
  const siteData = site[locale as keyof typeof site];
  if (!siteData) notFound();
  return {
    title: siteData['page-title'] || siteData.title,
    description: siteData.description,
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
