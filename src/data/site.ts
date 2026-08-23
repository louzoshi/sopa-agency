// data/site.ts
// footerMenu: same shape as menu — edit here to change footer links.
// socials: placeholder URLs until real X/Discord links exist.
const SOCIALS = [
  { name: 'X / Twitter', url: 'https://x.com/' },
  { name: 'Discord', url: 'https://discord.gg/' },
  { name: 'GitHub', url: 'https://github.com/sopa-agency' },
];

export const site = {
  en: {
    title: "SOPA AGENCY",
    "page-title": "SOPA | Creative Agency",
    description: "SOPA is a creative technology and game development agency.",
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
    "page-title": "SOPA | Agência Criativa",
    description: "SOPA é uma agência de tecnologia criativa e desenvolvimento de jogos.",
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