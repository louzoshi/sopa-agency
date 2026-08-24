// src/components/About.tsx
'use client';

export default function About({ locale }: { locale: string }) {
  const t = locale === 'pt' ? pt : en;

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 space-y-24">
      {/* Hero / Intro */}
      <div className="page-anim space-y-6">
        {/* <div className="font-mono text-xs text-amber-300 uppercase tracking-widest">{t.hero.badge}</div> */}
        <h2 className="text-3xl sm:text-4xl font-bold page-title-anim">{t.hero.title}</h2>
        <p className="max-w-3xl text-xl font-medium text-white/90 leading-relaxed page-title-anim page-title-anim-d1">{t.hero.tagline}</p>
        <p className="max-w-3xl text-base opacity-75 leading-relaxed">{t.hero.body}</p>
        <div className="inline-block rounded-xl border border-amber-300/30 bg-amber-300/10 px-4 py-2 font-mono text-xs text-amber-200">
          {t.hero.highlight}
        </div>
      </div>

      {/* How We're Different */}
      <div className="page-anim page-anim-d1 space-y-8">
        <div>
          <h3 className="text-2xl font-semibold mb-2">{t.different.title}</h3>
          <p className="max-w-2xl text-sm opacity-70">{t.different.subtitle}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {t.different.items.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/15 bg-black/70 p-6 backdrop-blur-md hover:border-amber-300/50 transition-colors">
              <div className="text-2xl mb-3">{item.icon}</div>
              <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
              <p className="text-sm opacity-70 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Who We Build With */}
      <div className="page-anim page-anim-d1 space-y-8">
        <div>
          <h3 className="text-2xl font-semibold mb-2">{t.partners.title}</h3>
          <p className="max-w-2xl text-sm opacity-70">{t.partners.subtitle}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {t.partners.items.map((p) => (
            <div key={p.name} className="rounded-xl border border-white/15 bg-black/60 p-5 backdrop-blur-md">
              <div className="font-semibold text-base text-amber-300 mb-1">{p.name}</div>
              <p className="text-xs opacity-70 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* The Stack */}
      <div className="page-anim page-anim-d1 space-y-6">
        <h3 className="text-2xl font-semibold">{t.stack.title}</h3>
        <div className="flex flex-wrap gap-2">
          {t.stack.items.map((tech) => (
            <span
              key={tech}
              className="rounded-lg border border-white/20 bg-white/5 px-3.5 py-1.5 font-mono text-xs text-white/85"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* The Model */}
      <div className="page-anim page-anim-d1 space-y-12">
        <div>
          <h3 className="text-2xl font-semibold mb-2">{t.model.title}</h3>
          <p className="max-w-2xl opacity-70">{t.model.body}</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          {t.model.tiers.map((tier) => (
            <div key={tier.id} className="rounded-2xl border border-white/15 bg-black/70 p-6 backdrop-blur-md">
              <div className="font-mono text-sm text-white/60 mb-2">{tier.label}</div>
              <h4 className="text-xl font-semibold mb-2">{tier.name}</h4>
              <p className="text-sm opacity-70 mb-4">{tier.desc}</p>
              <div className="space-y-1 text-sm font-mono">
                <div className="flex justify-between">
                  <span className="opacity-60">{tier.referralLabel}</span>
                  <span>{tier.referral}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">{tier.agencyLabel}</span>
                  <span>{tier.agency}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="max-w-2xl text-sm opacity-60">{t.model.note}</p>
      </div>

      {/* Structure */}
      <div className="page-anim page-anim-d1 space-y-12">
        <div>
          <h3 className="text-2xl font-semibold mb-2">{t.structure.title}</h3>
          <p className="max-w-2xl opacity-70">{t.structure.body}</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          {t.structure.items.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/15 bg-black/70 p-6 backdrop-blur-md">
              <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
              <p className="text-sm opacity-70">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const en = {
  hero: {
    // badge: '◢◤ SOPA',
    title: 'Culture that ships',
    tagline: 'A creative + engineering studio that breaks the barrier between the old internet and the new one — brands, culture, AI agents, and onchain, built to actually ship.',
    body: 'We work both worlds: the legacy brand that needs reach, and the protocol that needs a soul. We turn culture into product — campaigns across every channel, autonomous AI agents that run them.',
    highlight: '⚡ Builders bringing an audience the new tech doesn\'t have, and the tooling the old one is missing.'
  },
  different: {
    title: '🧭 How We\'re Different',
    subtitle: 'From classic brand playbooks to onchain/AI mechanics.',
    items: [
      {
        icon: '🌐',
        title: 'Both Worlds',
        desc: 'Classic brand playbooks and onchain/AI-native mechanics. We don\'t pick a side.'
      },
      {
        icon: '🤖',
        title: 'Agentic by Default',
        desc: 'AI agents do the repetitive work; humans bring the taste.'
      },
      {
        icon: '⛓️',
        title: 'Verifiable, Not Vibes',
        desc: 'Splits, revenue, payroll: on-chain and checkable.'
      },
      {
        icon: '🛹',
        title: 'Culture-First',
        desc: 'We\'re the crew, not a growth-hacking sweatshop. We ship what we\'d actually use.'
      }
    ]
  },
  partners: {
    title: '🤝 Who We Build With',
    subtitle: 'Communities, DAOs, and protocols shaping the decentralized web.',
    items: [
      { name: 'Gnars', desc: 'Onchain, community-owned action-sports DAO' },
      { name: 'SkateHive', desc: 'The skateboarding community, onchain on Hive' },
      { name: 'Morpheus', desc: 'Decentralized AI — open, permissionless inference' },
      { name: 'Venice', desc: 'Private, uncensored AI' },
      { name: 'Base', desc: 'The onchain home we build on' },
      { name: 'Nouns', desc: 'CC0 culture funding the open internet' },
      { name: 'KeepKey', desc: 'Self-custody hardware wallet for crypto assets' },
    ]
  },
  stack: {
    title: '🧱 The Stack',
    items: [
      'TypeScript', 'Next.js', 'React', 'Anthropic', 'AI Agents', 'viem', 'Safe', 'Base', 'Farcaster', 'Hive', 'Supabase', 'Vercel'
    ]
  },
  model: {
    title: 'The Model',
    body: 'Service + participation + referral.',
    tiers: [
      {
        id: 'oneoff',
        label: '01',
        name: 'One-off',
        desc: 'One closed vertical — dev OR marketing — on a defined scope. Direct demand or referral.',
        referral: '20%',
        agency: '15%',
        referralLabel: 'Referral',
        agencyLabel: 'Agency'
      },
      {
        id: 'operation',
        label: '02',
        name: 'Operation',
        desc: 'Dev + marketing running continuously, with a dedicated team. Relationship, recurring project.',
        referral: '30%',
        agency: '22.5%',
        referralLabel: 'Referral',
        agencyLabel: 'Agency'
      },
      {
        id: 'engine',
        label: '03',
        name: 'Engine',
        desc: 'SOPA runs the project end to end — it is the main engine. Co-building / incubation.',
        referral: '40%',
        agency: '30%',
        referralLabel: 'Referral',
        agencyLabel: 'Agency'
      }
    ],
    note: 'Fixed at the proportion ¼ referral · ¾ agency — it scales with the tier as involvement deepens.'
  },
  structure: {
    title: 'Structure',
    body: 'Organised operation, separate books.',
    items: [
      {
        title: 'LTDA',
        desc: 'A company for operating and invoicing — predictable contracts and invoices.'
      },
      {
        title: 'Accounting',
        desc: 'The agency\'s cash accounted for and organised month by month.'
      },
      {
        title: 'Separation',
        desc: 'SOPA\'s cash is distinct from the treasuries it operates for the projects.'
      }
    ]
  }
};

const pt = {
  hero: {
    // badge: '◢◤ SOPA',
    title: 'Cultura que entrega',
    tagline: 'Um estúdio criativo e de engenharia que quebra a barreira entre a velha internet e a nova — marcas, cultura, agentes de IA e onchain, feitos para realmente entregar.',
    body: 'Trabalhamos os dois mundos: a marca tradicional que precisa de alcance e o protocolo que precisa de alma. Transformamos cultura em produto — campanhas em todos os canais e agentes autônomos de IA que as operam.',
    highlight: '⚡ Builders trazendo o público que a nova tecnologia não tem, e as ferramentas que faltam na antiga.'
  },
  different: {
    title: '🧭 Como Somos Diferentes',
    subtitle: 'De playbooks de marcas clássicas a mecânicas nativas de IA e onchain.',
    items: [
      {
        icon: '🌐',
        title: 'Dois Mundos',
        desc: 'Playbooks de marcas clássicas e mecânicas nativas de onchain/IA. Não escolhemos um lado.'
      },
      {
        icon: '🤖',
        title: 'Agêntico por Padrão',
        desc: 'Agentes de IA fazem o trabalho repetitivo; os humanos trazem o gosto e a direção.'
      },
      {
        icon: '⛓️',
        title: 'Verificável, Não Vibes',
        desc: 'Splits, receita, folha de pagamento: tudo on-chain e auditável.'
      },
      {
        icon: '🛹',
        title: 'Cultura em Primeiro Lugar',
        desc: 'Somos a crew, não uma sweatshop de growth hacking. Entregamos o que realmente usaríamos.'
      }
    ]
  },
  partners: {
    title: '🤝 Com Quem Construímos',
    subtitle: 'Comunidades, DAOs e protocolos moldando a web descentralizada.',
    items: [
      { name: 'Gnars', desc: 'DAO de action-sports onchain de propriedade comunitária' },
      { name: 'SkateHive', desc: 'A comunidade de skate, onchain na Hive' },
      { name: 'Morpheus', desc: 'IA descentralizada — inferência aberta e sem permissão' },
      { name: 'Venice', desc: 'IA privada e sem censura' },
      { name: 'Base', desc: 'A casa onchain onde construímos' },
      { name: 'Nouns', desc: 'Cultura CC0 financiando a internet aberta' },
      { name: 'KeepKey', desc: 'Carteira de hardware autocustodial para ativos cripto' },
    ]
  },
  stack: {
    title: '🧱 A Stack',
    items: [
      'TypeScript', 'Next.js', 'React', 'Anthropic', 'AI Agents', 'viem', 'Safe', 'Base', 'Farcaster', 'Hive', 'Supabase', 'Vercel'
    ]
  },
  model: {
    title: 'O Modelo',
    body: 'Serviço + participação + indicação.',
    tiers: [
      {
        id: 'oneoff',
        label: '01',
        name: 'Ponta a ponta',
        desc: 'Uma vertical fechada — dev OU marketing — em escopo definido. Demanda direta ou indicação.',
        referral: '20%',
        agency: '15%',
        referralLabel: 'Indicação',
        agencyLabel: 'Agência'
      },
      {
        id: 'operation',
        label: '02',
        name: 'Operação',
        desc: 'Dev + marketing rodando continuamente, com time dedicado. Relacionamento, projeto recorrente.',
        referral: '30%',
        agency: '22.5%',
        referralLabel: 'Indicação',
        agencyLabel: 'Agência'
      },
      {
        id: 'engine',
        label: '03',
        name: 'Motor',
        desc: 'A SOPA roda o projeto ponta a ponta — é o motor principal. Co-building / incubação.',
        referral: '40%',
        agency: '30%',
        referralLabel: 'Indicação',
        agencyLabel: 'Agência'
      }
    ],
    note: 'Fixado na proporção ¼ indicação · ¾ agência — escala com o tier conforme o envolvimento se aprofunda.'
  },
  structure: {
    title: 'Estrutura',
    body: 'Operação organizada, livros separados.',
    items: [
      {
        title: 'LTDA',
        desc: 'Uma empresa para operar e faturar — contratos e faturas previsíveis.'
      },
      {
        title: 'Contabilidade',
        desc: 'O caixa da agência contabilizado e organizado mês a mês.'
      },
      {
        title: 'Separação',
        desc: 'O caixa da SOPA é distinto dos tesourarias que ela opera para os projetos.'
      }
    ]
  }
};