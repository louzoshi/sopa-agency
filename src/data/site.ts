// data/site.ts
// footerMenu: same shape as menu — edit here to change footer links.
// socials: placeholder URLs until real X/Discord links exist.
const SOCIALS = [
  { name: 'sopa.team', url: 'https://sopa.team' },
  { name: 'Farcaster /gnars', url: 'https://warpcast.com/~/channel/gnars' },
  { name: 'GitHub', url: 'https://github.com/sopa-agency' },
  { name: 'crew@sopa.team', url: 'mailto:crew@sopa.team' },
];

export const site = {
  en: {
    title: "SOPA AGENCY",
    "page-title": "SOPA | Culture that ships",
    description: "A creative + engineering studio that breaks the barrier between the old internet and the new one — brands, culture, AI agents, and onchain, built to actually ship.",
    tagline: "Culture that ships. Both worlds — classic and new tech.",
    language: "en",
    currency: "$",
    menu: [
      { title: "home", link: "/" },
      { title: "work", link: "/work" },
      { title: "team", link: "/team" },
      { title: "portfolio", link: "/portfolio" },
      { title: "solutions", link: "/solutions" },
      { title: "about", link: "/about" },
      { title: "contact", link: "/contact" },
    ],
    socials: SOCIALS,
  },
  pt: {
    title: "SOPA AGENCY",
    "page-title": "SOPA | Cultura que entrega",
    description: "Um estúdio criativo e de engenharia que quebra a barreira entre a velha internet e a nova — marcas, cultura, agentes de IA e onchain, feitos para realmente entregar.",
    tagline: "Cultura que entrega. Os dois mundos — tech clássica e nova.",
    language: "pt-BR",
    currency: "R$",
    menu: [
      { title: "início", link: "/" },
      { title: "work", link: "/work" },
      { title: "team", link: "/team" },
      { title: "portfolio", link: "/portfolio" },
      { title: "soluções", link: "/solutions" },
      { title: "sobre", link: "/about" },
      { title: "contato", link: "/contact" },
    ],
    socials: SOCIALS,
  },
};