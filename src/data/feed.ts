// data/feed.ts
// Placeholder social feed (X/Instagram style) — mixes work + solutions visuals.
// ponytail: static placeholder; swap for real X API / RSS when accounts are live.
export type FeedPost = {
  handle: string;
  text: { en: string; pt: string };
  image?: string;
  likes: number;
  reposts: number;
  time: string;
};

const posts: FeedPost[] = [
  {
    handle: 'sopaagency',
    text: {
      en: 'New AI agent just shipped for Morpheus Infra. It writes, posts, and never sleeps. ⚡',
      pt: 'Novo agente de IA entregue para a Morpheus Infra. Escreve, posta e nunca dorme. ⚡',
    },
    image: '/assets/images/work/w5.jpeg',
    likes: 214,
    reposts: 38,
    time: '2h',
  },
  {
    handle: 'sopaagency',
    text: {
      en: 'Campaign engineering in motion: one brief → multi-channel launch → receipts. 🎯',
      pt: 'Engenharia de campanha em movimento: um brief → lançamento multicanal → comprovantes. 🎯',
    },
    image: '/assets/images/solutions/camp-eng.jpeg',
    likes: 156,
    reposts: 27,
    time: '5h',
  },
  {
    handle: 'sopaagency',
    text: {
      en: 'Gnars DAO treasury dashboard is live. Onchain revenue, auditable — not aspirational.',
      pt: 'Dashboard de tesouraria do Gnars DAO no ar. Receita onchain, auditável — não aspiracional.',
    },
    image: '/assets/images/work/gnars.png',
    likes: 189,
    reposts: 41,
    time: '8h',
  },
  {
    handle: 'sopaagency',
    text: {
      en: 'Portals & tooling: content studio, analytics, payroll — a brand\'s whole ops in one place.',
      pt: 'Portais e ferramentas: estúdio de conteúdo, analytics, folha — toda a operação num lugar só.',
    },
    image: '/assets/images/solutions/portals-tooling.jpeg',
    likes: 98,
    reposts: 15,
    time: '1d',
  },
  {
    handle: 'sopaagency',
    text: {
      en: 'Culture that ships. Skate, BMX, surf — from mainstream to onchain and back. 🛹',
      pt: 'Cultura que entrega. Skate, BMX, surf — do mainstream ao onchain e de volta. 🛹',
    },
    image: '/assets/images/solutions/culture.jpeg',
    likes: 342,
    reposts: 76,
    time: '2d',
  },
  {
    handle: 'sopaagency',
    text: {
      en: 'KeepKey × SOPA: self-custody hardware wallets meet agentic marketing.',
      pt: 'KeepKey × SOPA: carteiras hardware autocustodiais encontram marketing agêntico.',
    },
    image: '/assets/images/work/keepkey.png',
    likes: 127,
    reposts: 19,
    time: '3d',
  },
];

// locale-aware text resolved at render; structure shared
export const feedPosts = posts;

export const feed = {
  en: {
    title: "Feed",
    "page-title": "SOPA | Feed",
    subtitle: "What we're posting on X.",
    list: [],
    follow: "Follow @sopaagency",
    placeholderNote: "Placeholder feed — live X integration coming soon.",
  },
  pt: {
    title: "Feed",
    "page-title": "SOPA | Feed",
    subtitle: "O que estamos postando no X.",
    list: [],
    follow: "Seguir @sopaagency",
    placeholderNote: "Feed de exemplo — integração real com X em breve.",
  },
};
