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
  // optional detail page shown in a modal when the tile is clicked (no video)
  detail?: {
    url?: string;
    intro: string;
    sections: { heading: string; body: string }[];
    quote?: string;
  };
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
    detail: {
      url: "https://skatehive.app",
      intro:
        "A decentralized magazine by skaters, for skaters. No corporate overlords, no algorithm bs — every skater owns Skatehive. When you post, you're writing a page in Infinity Mag, our collective digital zine: your tricks, your spots, your voice. Forever.",
      sections: [
        {
          heading: "Why It Matters",
          body:
            "Skateboarding media has been controlled by corporations and Big Tech platforms that take your content, control the narrative and keep the rewards. Skatehive changes this: you own your content, you earn from your posts, and the community decides what's valuable.",
        },
        {
          heading: "How It Works",
          body:
            "Post & earn — share clips, photos and stories and get rewarded directly by the community through upvotes, no middlemen. Built on the Hive blockchain: open-source, decentralized — anyone can fork it, build on it, or create their own skateboard frontend. Every post becomes a page in Infinity Mag, a living magazine curated by skaters, read by skaters, owned by skaters.",
        },
        {
          heading: "A Legacy of Tech + Skateboarding",
          body:
            "Technology has always pushed skateboarding forward: the VX1000 brought cinema to the streets, DVDs distributed skate videos globally, mIRC servers let us share rare clips, Web 2.0 gave us the share button. Skatehive is the next evolution — own your content, earn from your creativity, build with your crew.",
        },
        {
          heading: "Open-Source Network",
          body:
            "Any skate shop, crew or community can clone the code, build their own frontend and join the network. All posts broadcast across the network: more visibility, more support, more opportunities.",
        },
        {
          heading: "Join the Movement",
          body:
            "Skatehive isn't just a platform — it's skaters taking control of their own media. Create an account, download the mobile app, make your first post.",
        },
      ],
      quote: '"Skateboarding is art. Make your post your page."',
    },
  },
  {
    title: "DAO Central",
    subtitle: "Gnars DAO",
    role: "Development",
    thumb: "/assets/images/work/gnars.png",
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
  {
    title: "Swap",
    subtitle: "Swaps.pro",
    role: "Multichain Swap",
    thumb: "/assets/images/work/swaps.pro.png",
    tags: "blockchain, defi, web3",
    category: "production",
  },
  {
    title: "Blockchain",
    subtitle: "KeepKey",
    role: "Hardware Wallet",
    thumb: "/assets/images/work/keepkey.png",
    tags: "blockchain, defi, web3",
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
