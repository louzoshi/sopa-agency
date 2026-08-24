// src/app/layout.tsx
import type { Metadata } from "next";
import Script from "next/script";
import {
  Space_Grotesk,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
  Syne,
  Outfit,
  Inter,
} from "next/font/google";
import "@/globals.css";

const GA_ID = "G-HWM0ZNJJVF";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://sopa.team"),
  title: "SOPA AGENCY",
  description: "A creative + engineering studio that breaks the barrier between the old internet and the new one — brands, culture, AI agents, and onchain, built to actually ship.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} ${syne.variable} ${outfit.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {/* Google tag (gtag.js) — server-rendered so Google's tag check finds it in HTML */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
