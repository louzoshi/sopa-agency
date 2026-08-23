// src/data/team.ts
export type Member = { handle: string; github?: string; skills?: [string, number][]; bio?: { en: string; pt: string }; ai?: boolean };

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

// ponytail: static snapshot of sopa.team profile skills (top 3) — re-harvest when it changes
export const members: Member[] = [
  { handle: "bielcx", github: "Bielcx", skills: [["skateboarding", 99], ["dev", 44], ["design", 33]] },
  { handle: "xvlad", github: "sktbrd", skills: [["skateboarding", 82], ["community", 55], ["marketing", 55]] },
  { handle: "vaipraonde", github: "rferrari" },
  { handle: "mengao", github: "bgrana75" },
  { handle: "louzoshi", github: "mtlouzada", skills: [["dev", 100], ["writing", 100], ["skateboarding", 100]] },
  { handle: "willdias", github: "charlesgrovv", skills: [["videoEditing", 100], ["skateboarding", 100], ["music", 82]] },
  { handle: "reelflip", github: "ernatogalvao", skills: [["writing", 100], ["marketing", 100], ["music", 90]] },
  { handle: "joaoparmagnani", github: "zimardrp", skills: [["writing", 80], ["community", 70], ["design", 60]] },
  { handle: "keepkey", github: "BitHighlander", skills: [["dev", 100], ["community", 71]] },
  { handle: "illithics" },
  { handle: "humbertoperes", github: "humbertoperes", skills: [["skateboarding", 100], ["videoEditing", 58], ["marketing", 39]] },
  { handle: "r4topunk", github: "r4topunk", skills: [["dev", 100], ["marketing", 54]] },
  { handle: "nogenta", github: "yancontato1994-ship-it", skills: [["skateboarding", 85], ["videoEditing", 82], ["photography", 80]] },
  { handle: "bithighlander22" },
  { handle: "sopa-agent", ai: true, skills: [["dev", 100], ["writing", 95], ["design", 80]] },
  { handle: "sopa-orb", ai: true, skills: [["dev", 100], ["music", 90], ["videoEditing", 85]] },
  { handle: "sopa-scout", ai: true, skills: [["marketing", 95], ["community", 90], ["writing", 85]] },
];

export const team = {
  en: {
    title: "Team",
    "page-title": "SOPA | Team",
    subtitle: "Our core team of specialists.",
    description: "Meet the people behind SOPA Agency.",
    skills: "skills",
  },
  pt: {
    title: "Equipe",
    "page-title": "SOPA | Equipe",
    subtitle: "Nossa equipe principal de especialistas.",
    description: "Conheça as pessoas por trás da SOPA Agency.",
    skills: "skills",
  },
};
