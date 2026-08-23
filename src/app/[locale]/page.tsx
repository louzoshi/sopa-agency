// src/app/[locale]/page.tsx
import { notFound } from 'next/navigation';
import { site } from '@/data/site';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const siteData = site[locale as keyof typeof site];
  if (!siteData) notFound();
  return {
    title: siteData['page-title'] || siteData.title,
    description: siteData.description,
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!site[locale as keyof typeof site]) notFound();
  return null; // LayoutClient renders everything
}
