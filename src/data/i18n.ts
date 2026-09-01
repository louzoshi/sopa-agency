// data/i18n.ts

// Ordered inner-page set for the folio index header (home excluded — it's the hero).
// Labels come from i18n[locale].menu[key], so this list stays locale-agnostic.
export const folioOrder = ['work', 'team', 'feed', 'solutions', 'about', 'contact'] as const;
export type FolioSection = (typeof folioOrder)[number];

export const i18n = {
  en: {
    menu: {
      home: "home",
      work: "work",
      team: "team",
      feed: "feed",
      solutions: "solutions",
      about: "about",
      contact: "contact",
    },
    // Common UI strings
    footer: {
      madeWith: "Made with",
      by: "by",
    },
  },
  pt: {
    menu: {
      home: "início",
      work: "work",
      team: "team",
      feed: "feed",
      solutions: "soluções",
      about: "sobre",
      contact: "contato",
    },
    // Common UI strings
    footer: {
      madeWith: "Feito com",
      by: "por",
    },
  },
};