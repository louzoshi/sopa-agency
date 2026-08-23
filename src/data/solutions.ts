// src/data/solutions.ts
export type Solution = {
  num: string;
  title: string;
  body: { en: string; pt: string };
};

export const solutions: Solution[] = [
  {
    num: "01",
    title: "Experiences",
    body: {
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. SOPA crafts innovative event concepts aligned with brand positioning, delivering end-to-end planning and execution — from strategy to stage, every detail managed for a unique brand experience.",
      pt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. A SOPA cria conceitos inovadores de eventos alinhados ao posicionamento da marca, com planejamento e execução ponta a ponta — da estratégia ao palco, cada detalhe gerado para uma experiência única.",
    },
  },
  {
    num: "02",
    title: "Integrated Marketing",
    body: {
      en: "Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt. Our IMC approach aligns communication strategies with growth objectives, delivering consistent messaging across every touchpoint to maximize impact and build stronger audience connections.",
      pt: "Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt. Nossa abordagem de IMC alinha estratégias de comunicação aos objetivos de crescimento, com mensagens consistentes em todos os pontos de contato para maximizar o impacto.",
    },
  },
  {
    num: "03",
    title: "Creative Design",
    body: {
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. We develop brand identities and creative concepts that bring brand stories to life — consistent and memorable across every touchpoint, helping brands stand out with a distinctive presence.",
      pt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Desenvolvemos identidades de marca e conceitos criativos que dão vida às histórias — consistentes e memoráveis em cada ponto de contato, com uma presença distinta.",
    },
  },
  {
    num: "04",
    title: "Production",
    body: {
      en: "Lorem ipsum dolor sit amet, sed do eiusmod tempor. We produce films, shows, and game content with a creative and distinctive approach that meets international standards — polished, impactful, and infused with a unique brand signature.",
      pt: "Lorem ipsum dolor sit amet, sed do eiusmod tempor. Produzimos filmes, shows e conteúdo de games com uma abordagem criativa e distinta que atende padrões internacionais — polido, impactante e com assinatura única.",
    },
  },
  {
    num: "05",
    title: "Media Network",
    body: {
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Through media booking, sponsorship partnerships, and earned coverage, we expand reach, strengthen visibility, and amplify communication impact to elevate brand value.",
      pt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Por meio de compra de mídia, parcerias de patrocínio e cobertura espontânea, ampliamos alcance, fortalecemos visibilidade e elevamos o valor da marca.",
    },
  },
  {
    num: "06",
    title: "Interactive & Games",
    body: {
      en: "Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt. From WebGL experiences to full game development, we build interactive worlds that turn audiences into players — real-time 3D, playable ads, and immersive brand universes.",
      pt: "Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt. De experiências WebGL a desenvolvimento completo de games, criamos mundos interativos que transformam audiências em jogadores — 3D em tempo real e universos imersivos.",
    },
  },
];