// src/app/[locale]/layout.tsx
import LayoutClient from "./LayoutClient";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <LayoutClient locale={locale}>
      {children}
    </LayoutClient>
  );
}
