// src/data/solutions.ts
export type Solution = {
  num: string;
  icon: string;
  title: string;
  tags?: string[];
  body: { en: string; pt: string };
};

export const solutions: Solution[] = [
  {
    num: "01",
    icon: "🤖",
    title: "AI Agents & Automation",
    tags: ["autonomous agents", "transcoding", "ops automation", "agentic marketing"],
    body: {
      en: "Autonomous agents that write, publish, transcode, track revenue, and run ops. Agentic marketing that works while you sleep.",
      pt: "Agentes autônomos que escrevem, publicam, transcodificam, rastreiam receita e operam. Marketing agêntico que trabalha enquanto você dorme.",
    },
  },
  {
    num: "02",
    icon: "🎯",
    title: "Campaign Engineering",
    tags: ["Farcaster", "X / Twitter", "Hive", "Discord", "Instagram", "email"],
    body: {
      en: "Multi-channel launches — Farcaster · X · Hive · Discord · Instagram · email — from one brief, with the copy, the calendar, and the receipts.",
      pt: "Lançamentos multicanal — Farcaster · X · Hive · Discord · Instagram · email — a partir de um único brief, com copy, calendário e comprovantes.",
    },
  },
  {
    num: "03",
    icon: "🛠️",
    title: "Portals & Tooling",
    tags: ["dashboards", "content studio", "analytics", "treasury", "payroll"],
    body: {
      en: "Multi-tenant dashboards: content studio, analytics, treasury, payroll, revenue tracking. A brand's marketing and its ops, all in one place.",
      pt: "Dashboards multi-inquilino: estúdio de conteúdo, analytics, tesouraria, folha de pagamento e rastreamento de receita. O marketing e as operações da marca em um só lugar.",
    },
  },
  {
    num: "04",
    icon: "⛓️",
    title: "Onchain Revenue & Treasury",
    tags: ["0xSplits", "Superfluid payroll", "swappers", "staking pipelines"],
    body: {
      en: "Live revenue streams, 0xSplits, swappers, Superfluid payroll, staking pipelines. Auditable, not aspirational.",
      pt: "Fluxos de receita em tempo real, 0xSplits, swappers, folha de pagamento Superfluid, pipelines de staking. Auditável, não aspiracional.",
    },
  },
  {
    num: "05",
    icon: "🎬",
    title: "Content & Culture",
    tags: ["Skate", "BMX", "Surf", "DAO communities", "mainstream to onchain"],
    body: {
      en: "Skate, BMX, surf and the communities around them. Reach that crosses from mainstream to onchain and back.",
      pt: "Skate, BMX, surf e as comunidades ao redor. Alcance que transita do mainstream para o onchain e vice-versa.",
    },
  },
];