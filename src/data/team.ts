// src/data/team.ts
// social handles are bare usernames — the card builds the full URL:
//   github → github.com/<github>   x → x.com/<x>   linkedin → linkedin.com/in/<linkedin>
// `skills` is ordered — lead discipline first, then supporting. No proficiency scores.
export type Member = { handle: string; github?: string; x?: string; linkedin?: string; skills?: string[]; bio?: { en: string; pt: string }; ai?: boolean };

// skill key → display labels
export const skillLabels: Record<string, { en: string; pt: string }> = {
  skateboarding: { en: "skate", pt: "skate" },
  dev: { en: "dev", pt: "dev" },
  design: { en: "design", pt: "design" },
  photography: { en: "photo", pt: "foto" },
  marketing: { en: "marketing", pt: "marketing" },
  community: { en: "community", pt: "comunidade" },
  videoEditing: { en: "video editing", pt: "edição de vídeo" },
  eventProducing: { en: "events", pt: "eventos" },
  writing: { en: "writing", pt: "escrita" },
  music: { en: "music", pt: "música" },
};

// ponytail: static snapshot of sopa.team profile disciplines (top 3, in order) — re-harvest when it changes
export const members: Member[] = [
  { handle: "bielcx", github: "Bielcx", skills: ["skateboarding", "dev", "design"] },
  { handle: "xvlad", github: "sktbrd", skills: ["skateboarding", "community", "marketing"] },
  { handle: "vaipraonde", github: "rferrari" },
  { handle: "mengao", github: "bgrana75" },
  { handle: "louzoshi", github: "mtlouzada", skills: ["dev", "writing", "skateboarding"] },
  { handle: "willdias", github: "charlesgrovv", skills: ["videoEditing", "skateboarding", "music"] },
  { handle: "reelflip", github: "ernatogalvao", skills: ["writing", "marketing", "music"] },
  { handle: "joaoparmagnani", github: "zimardrp", skills: ["writing", "community", "design"] },
  { handle: "keepkey", github: "BitHighlander", skills: ["dev", "community"] },
  { handle: "illithics" },
  { handle: "humbertoperes", github: "humbertoperes", skills: ["skateboarding", "videoEditing", "marketing"] },
  { handle: "r4topunk", github: "r4topunk", skills: ["dev", "marketing"] },
  { handle: "nogenta", github: "yancontato1994-ship-it", skills: ["skateboarding", "videoEditing", "photography"] },
  { handle: "bithighlander22" },
  { handle: "sopa-agent", ai: true, skills: ["dev", "writing", "design"] },
  { handle: "sopa-orb", ai: true, skills: ["dev", "music", "videoEditing"] },
  { handle: "sopa-scout", ai: true, skills: ["marketing", "community", "writing"] },
];

export const team = {
  en: {
    title: "The Crew",
    "page-title": "SOPA | Crew",
    subtitle: "Builders who post, and posters who build.",
    description: "Meet the crew behind SOPA Agency.",
    disciplines: "disciplines",
  },
  pt: {
    title: "A Crew",
    "page-title": "SOPA | Crew",
    subtitle: "Builders que postam, e posters que constroem.",
    description: "Conheça a crew por trás da SOPA Agency.",
    disciplines: "disciplinas",
  },
};
