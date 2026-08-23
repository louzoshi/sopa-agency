// src/components/About.tsx
'use client';

export default function About({ locale }: { locale: string }) {
  const t = locale === 'pt' ? pt : en;

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 space-y-24">
      {/* Hero / Intro */}
      <div className="page-anim">
        <h2 className="text-3xl font-bold mb-2 page-title-anim">{t.hero.title}</h2>
        <p className="max-w-2xl text-lg opacity-70 page-title-anim page-title-anim-d1">{t.hero.body}</p>
      </div>

      {/* The Model */}
      <div className="page-anim page-anim-d1 space-y-12">
        <h3 className="text-2xl font-semibold">{t.model.title}</h3>
        <p className="max-w-2xl opacity-70">{t.model.body}</p>
        
        <div className="grid gap-6 md:grid-cols-3">
          {t.model.tiers.map((tier, i) => (
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
        <h3 className="text-2xl font-semibold">{t.structure.title}</h3>
        <p className="max-w-2xl opacity-70">{t.structure.body}</p>
        
        <div className="grid gap-6 md:grid-cols-3">
          {t.structure.items.map((item, i) => (
            <div key={item.title} className="rounded-2xl border border-white/15 bg-black/70 p-6 backdrop-blur-md">
              <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
              <p className="text-sm opacity-70">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="page-anim page-anim-d1 space-y-12">
        <h3 className="text-2xl font-semibold">{t.team.title}</h3>
        <p className="max-w-2xl opacity-70">{t.team.body}</p>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.team.roles.map((role, i) => (
            <div key={role.title} className="rounded-2xl border border-white/15 bg-black/70 p-6 backdrop-blur-md">
              <h4 className="text-lg font-semibold mb-2">{role.title}</h4>
              <p className="text-sm opacity-70">{role.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const en = {
  hero: {
    title: 'About SOPA',
    body: 'A dev + marketing agency operating across portals. Every soup starts with ingredients that, on their own, don\'t make a meal. SOPA is the pot: projects, people and skills go in loose and come out as something that feeds the whole team. A collective kitchen for building and growing together — warm, simple, made to share.'
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
  },
  team: {
    title: 'Team',
    body: 'One owner per front.',
    roles: [
      { title: 'Dev Lead', desc: 'Architecture, infra and technical delivery across portals.' },
      { title: 'Marketing Lead', desc: 'Strategy, content and cadence for each project.' },
      { title: 'Design / Creative', desc: 'Visual identity, assets and narrative.' },
      { title: 'Community / Social', desc: 'Daily presence and relationship with the base.' },
      { title: 'Ops / Finance', desc: 'Invoicing, accounting and contracts.' },
      { title: 'Business Development', desc: 'Capture, referrals and new projects.' }
    ]
  }
};

const pt = {
  hero: {
    title: 'Sobre a SOPA',
    body: 'Uma agência de dev + marketing operando entre portais. Toda sopa começa com ingredientes que, sozinhos, não fazem uma refeição. A SOPA é a panela: projetos, pessoas e skills entram soltos e saem como algo que alimenta o time todo. Uma cozinha coletiva para construir e crescer junto — quente, simples, feita para compartilhar.'
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
  },
  team: {
    title: 'Time',
    body: 'Um dono por frente.',
    roles: [
      { title: 'Dev Lead', desc: 'Arquitetura, infra e entrega técnica entre portais.' },
      { title: 'Marketing Lead', desc: 'Estratégia, conteúdo e cadência para cada projeto.' },
      { title: 'Design / Criativo', desc: 'Identidade visual, assets e narrativa.' },
      { title: 'Comunidade / Social', desc: 'Presença diária e relacionamento com a base.' },
      { title: 'Ops / Finance', desc: 'Faturamento, contabilidade e contratos.' },
      { title: 'Business Development', desc: 'Captação, indicações e novos projetos.' }
    ]
  }
};