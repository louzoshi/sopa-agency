// src/data/process.ts
// "How It Works" — 4-phase process content, en/pt (locale rule: both).
export type Phase = {
  num: string;
  label: { en: string; pt: string };
  title: { en: string; pt: string };
  body: { en: string; pt: string };
  points: { en: string[]; pt: string[] };
  diagram: { en: string[]; pt: string[] };
  highlight?: { en: string; pt: string }; // the inefficient step / callout
};

export const processIntro = {
  label: 'HOW IT WORKS',
  title: { en: 'From Problem to Production.', pt: 'Do problema à produção.' },
  body: {
    en: "Every solution starts with understanding how your business actually works. We identify the opportunity, design the right system, build it, and put it into production — without unnecessary complexity.",
    pt: "Toda solução começa entendendo como o seu negócio realmente funciona. Identificamos a oportunidade, desenhamos o sistema certo, construímos e colocamos em produção — sem complexidade desnecessária.",
  },
};

export const phases: Phase[] = [
  {
    num: '01',
    label: { en: '01 / DISCOVER', pt: '01 / DESCOBRIR' },
    title: { en: 'Find Where Technology Can Make a Difference', pt: 'Onde a tecnologia pode fazer a diferença' },
    body: {
      en: "We start with your existing operation, not a preconceived solution. We look at how your team works, which tools you use, where information moves, and where repetitive work or friction is costing you time.",
      pt: "Começamos pela sua operação atual, não por uma solução pré-concebida. Observamos como seu time trabalha, quais ferramentas usa, por onde a informação flui e onde trabalho repetitivo ou atrito custa tempo.",
    },
    points: {
      en: ['Process Mapping', 'Opportunity Analysis', 'Technical Feasibility'],
      pt: ['Mapeamento de Processos', 'Análise de Oportunidades', 'Viabilidade Técnica'],
    },
    diagram: { en: ['INPUT', 'HUMAN TASK', 'TOOL', 'MANUAL STEP', 'OUTPUT'], pt: ['ENTRADA', 'TAREFA HUMANA', 'FERRAMENTA', 'ETAPA MANUAL', 'SAÍDA'] },
    highlight: { en: 'MANUAL STEP', pt: 'ETAPA MANUAL' },
  },
  {
    num: '02',
    label: { en: '02 / ARCHITECT', pt: '02 / ARQUITETAR' },
    title: { en: 'Design the System Before We Build It', pt: 'Desenhamos o sistema antes de construir' },
    body: {
      en: "Once we understand the problem, we design the solution. Components connect intentionally around your operation — not assembled from random tools.",
      pt: "Entendido o problema, desenhamos a solução. Os componentes se conectam de forma intencional à sua operação — não montados de ferramentas aleatórias.",
    },
    points: {
      en: ['Clear scope. Clear architecture. Clear investment.', ''],
      pt: ['Escopo claro. Arquitetura clara. Investimento claro.', ''],
    },
    diagram: { en: ['DATA', 'LOGIC', 'AI', 'INTEGRATIONS', 'RESULT'], pt: ['DADOS', 'LÓGICA', 'IA', 'INTEGRAÇÕES', 'RESULTADO'] },
  },
  {
    num: '03',
    label: { en: '03 / ENGINEER', pt: '03 / ENGENHARIA' },
    title: { en: 'Build, Integrate, Test.', pt: 'Construir, integrar, testar.' },
    body: {
      en: "We build in a controlled environment before it touches critical production workflows. Nothing goes live simply because it works once — we test against real-world conditions first.",
      pt: "Construímos em ambiente controlado antes de tocar nos fluxos críticos de produção. Nada entra no ar só porque funcionou uma vez — testamos contra condições reais primeiro.",
    },
    points: {
      en: ['API Connected', 'Integration Verified', 'Security Check Passed', 'Edge Cases Tested', 'System Ready'],
      pt: ['API Conectada', 'Integração Verificada', 'Check de Segurança OK', 'Casos Extremos Testados', 'Sistema Pronto'],
    },
    diagram: { en: ['BUILD', 'INTEGRATE', 'TEST', 'VERIFY'], pt: ['CONSTRUIR', 'INTEGRAR', 'TESTAR', 'VERIFICAR'] },
  },
  {
    num: '04',
    label: { en: '04 / DEPLOY', pt: '04 / IMPLANTAR' },
    title: { en: 'Put It to Work.', pt: 'Colocar para trabalhar.' },
    body: {
      en: "We connect the solution to your existing environment, verify the integrations, train the people who will use it, and monitor the transition.",
      pt: "Conectamos a solução ao seu ambiente, verificamos as integrações, treinamos quem vai usar e monitoramos a transição.",
    },
    points: {
      en: ['Production Deployment', 'Team Enablement', 'Post-Launch Support'],
      pt: ['Deploy em Produção', 'Habilitação do Time', 'Suporte Pós-Lançamento'],
    },
    diagram: { en: ['OFFLINE', 'CONNECTED', 'SYSTEM ONLINE'], pt: ['OFFLINE', 'CONECTADO', 'SISTEMA ONLINE'] },
  },
];

export const processClosing = {
  title: { en: 'Built Around Your Business. Not the Other Way Around.', pt: 'Construído em torno do seu negócio. Não o contrário.' },
  body: {
    en: "We don't force your operation into a predefined product. We build technology around the way your business actually works — integrating what already works, replacing what doesn't, and automating the parts that shouldn't require human effort.",
    pt: "Não forçamos sua operação em um produto pré-definido. Construímos tecnologia em torno de como seu negócio realmente funciona — integrando o que já funciona, substituindo o que não funciona e automatando o que não deveria depender de esforço humano.",
  },
  cta: { en: 'Start a Conversation →', pt: 'Iniciar uma Conversa →' },
};

export const processFaq: { q: { en: string; pt: string }; a: { en: string; pt: string } }[] = [
  {
    q: { en: 'What happens before development starts?', pt: 'O que acontece antes do desenvolvimento começar?' },
    a: { en: 'We first understand the existing workflow, identify the opportunity, and determine the most effective technical approach before proposing implementation.', pt: 'Primeiro entendemos o fluxo atual, identificamos a oportunidade e determinamos a abordagem técnica mais eficaz antes de propor a implementação.' },
  },
  {
    q: { en: 'Do you replace our existing software?', pt: 'Vocês substituem nossos sistemas atuais?' },
    a: { en: 'Usually, no. Wherever possible, we integrate with the systems you already use and make them work together more effectively.', pt: 'Normalmente não. Sempre que possível, integramos com os sistemas que você já usa e fazemos eles trabalharem melhor juntos.' },
  },
  {
    q: { en: 'Can you work with our existing APIs and infrastructure?', pt: 'Vocês trabalham com nossas APIs e infraestrutura atuais?' },
    a: { en: 'Yes. Integrations are a core part of our approach. We can connect existing APIs, databases, SaaS platforms, internal systems, and AI services.', pt: 'Sim. Integrações são parte central da nossa abordagem. Conectamos APIs, bancos de dados, plataformas SaaS, sistemas internos e serviços de IA.' },
  },
  {
    q: { en: 'How long does a project take?', pt: 'Quanto tempo leva um projeto?' },
    a: { en: 'It depends on the complexity of the solution. After understanding the requirements, we provide a clear implementation scope and timeline.', pt: 'Depende da complexidade da solução. Após entender os requisitos, apresentamos escopo e prazo claros de implementação.' },
  },
  {
    q: { en: 'What happens after launch?', pt: 'O que acontece após o lançamento?' },
    a: { en: 'We can provide ongoing support, improvements, monitoring, and additional development as the system evolves.', pt: 'Oferecemos suporte contínuo, melhorias, monitoramento e desenvolvimento adicional conforme o sistema evolui.' },
  },
];
