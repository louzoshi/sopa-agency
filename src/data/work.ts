// src/data/work.ts
export interface WorkItem {
  title: string;
  subtitle: string;
  role: string;
  thumb: string;
  tags: string;
  category: 'events' | 'marketing' | 'production' | 'branding';
  // optional fullscreen video shown when the tile is clicked
  video?: string;
}

// SOPA service/section tiles — thumbs reused from the ported grid.
// To add a work item for devs: append an object here. That's it.
export const workItems: WorkItem[] = [
  {
    title: "Dashboards",
    subtitle: "Pioneer Studio",
    role: "Design & Development",
    thumb: "/assets/images/work/w1.jpg",
    tags: "dashboards, data viz, webdev",
    category: "production",
    video: "https://vimeo.com/1191597286?fl=pl&fe=cm",
  },
  {
    title: "SkateHive Social Media",
    subtitle: "SkateHive",
    role: "Full-stack Development",
    thumb: "/assets/images/work/w2.png",
    tags: "social media, web3, community",
    category: "marketing",
  },
  {
    title: "DAO Central",
    subtitle: "Gnars DAO",
    role: "Development",
    thumb: "/assets/images/work/w3.jpg",
    tags: "dao, web3, governance",
    category: "production",
  },
  {
    title: "DAO Treasures",
    subtitle: "Gnars DAO",
    role: "Development",
    thumb: "/assets/images/work/w4.jpg",
    tags: "dao, treasury, web3",
    category: "production",
  },
  {
    title: "AI Agents",
    subtitle: "Morpheus Infra",
    role: "AI Development",
    thumb: "/assets/images/work/w5.jpeg",
    tags: "ai, agents, infra",
    category: "production",
  },
  {
    title: "Animation Studio",
    subtitle: "SOPA Agency",
    role: "Animation & Motion",
    thumb: "/assets/images/work/w6.jpg",
    tags: "animation, motion, 3d",
    category: "branding",
  },
  {
    title: "Game Dev",
    subtitle: "Pioneer Studio",
    role: "Game Development",
    thumb: "/assets/images/work/w7.jpg",
    tags: "gamedev, webgl, threejs",
    category: "production",
  },
];

export const work = {
  en: {
    title: "Work",
    "page-title": "SOPA | Work",
    subtitle: "Featured projects with incredible teams.",
    description: "Featured <b>work</b> with some of the most incredible teams and artists on the planet.",
    list: workItems,
  },
  pt: {
    title: "Work",
    "page-title": "SOPA | Trabalho",
    subtitle: "Projetos em destaque com equipes incríveis.",
    description: "Projetos em destaque com algumas das equipes e artistas mais incríveis do planeta.",
    list: workItems,
  },
};
