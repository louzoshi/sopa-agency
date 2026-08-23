// src/app/page.tsx
import { redirect } from 'next/navigation';

// Single-page site: everything lives under /[locale] (LayoutClient). / redirects to /en.
export default function RootPage() {
  redirect('/en');
}
