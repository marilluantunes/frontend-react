# BANDEJÃO da Faculdade

Aplicação para consulta ao cardápio do dia do bandejão universitário, com
avaliação de refeições (sabor, sal, temperatura, apresentação, quantidade),
área de reclamações, escolha de campus/restaurante e planejamento semanal —
incluindo estimativa de lotação/horário de pico.

Stack: **React 19 + Vite 8 + TypeScript + Tailwind CSS v4**.

## Como rodar

Pré-requisito: **Node 22+** (npm incluso).

```bash
npm install   # instala dependências
npm run dev   # dev server em http://127.0.0.1:5173
npm run build # build de produção (gera dist/)
npm run lint  # lint com oxlint (0 erros; 5 warnings herdados, ver abaixo)
```

## Organização dos arquivos

```
├── index.html          # shell HTML (pt-BR, título + description)
├── vite.config.ts      # React + Tailwind + alias @ para src, porta 5173
├── tsconfig.json       # TypeScript strict + paths @/*
├── package.json        # scripts: dev, build, preview, lint
├── .oxlintrc.json      # regras do lint
└── src/
    ├── main.tsx            # entrada: monta App + importa index.css
    ├── App.tsx             # shell: estados, handlers e navegação das 4 abas
    ├── HomeScreen.tsx      # composição da tela "Hoje" (~77 linhas)
    ├── types.ts            # tipos compartilhados (Refeicao, Avaliacao, ...)
    ├── data.ts             # dados: campi, cardápio da semana, avaliações iniciais
    ├── utils.ts            # funções puras (saudação, cores de lotação, emoji de fruta...)
    ├── index.css           # tema (variáveis CSS) + Tailwind + modo alto-contraste
    ├── vite-env.d.ts       # tipos do Vite
    ├── components/
    │   ├── ui.tsx              # micro-componentes (StarRating, AvaliacaoCard, ...)
    │   ├── AppHeader.tsx       # cabeçalho com seletores de campus/restaurante
    │   ├── AppNav.tsx          # navegação das abas
    │   ├── AppFooter.tsx       # rodapé
    │   ├── A11yFloat.tsx       # botão/painel flutuante de acessibilidade
    │   ├── MealContent.tsx     # bloco de conteúdo da refeição (cardápio)
    │   ├── LotacaoTimeline.tsx # linha do tempo de lotação
    │   └── home/               # 1 arquivo por seção da tela Hoje
    │       ├── TopBar, GreetingHeader, MealCard, LiveReviews,
    │       ├── AvaliacoesDiaLinks, LotacaoAgora, PlanejamentoSemana,
    │       └── FeedbackCTA, CommunityMini
    └── screens/                # 1 arquivo por aba
        ├── CardapioTab.tsx     # cardápio da semana por dia/refeição
        ├── LotacaoTab.tsx      # lotação + reportar movimento
        ├── AvaliarTab.tsx      # sub-abas: avaliar / histórico / reclamações
        ├── AvaliacaoForm.tsx   # formulário de avaliação com foto
        ├── AvaliacaoHistorico.tsx
        └── Reclamacoes.tsx     # formulário + lista de reclamações
```

Regras seguidas: um componente por arquivo, props tipadas com interface
exportada, tipos/dados/funções compartilhados fora do JSX. Imports com `@`
apontam para `src` (ex.: `import type { Avaliacao } from '@/types'`).

## Informações úteis

- **Dados mockados:** `src/data.ts` contém campi, cardápio da semana e
  avaliações iniciais em constantes. Trocar por chamadas à API é o próximo
  passo de integração (os formatos do mock não batem 1:1 com os schemas do
  backend — será preciso mapear).
- **Sem persistência:** avaliações, reclamações e planejamentos vivem só em
  memória (somem no refresh). Fotos vão para o state como base64.
- **Acessibilidade:** painel flutuante (tamanho de fonte, alto contraste,
  espaçamento, sublinhar links) + `:focus-visible` global. Ao mexer em estilos
  de cards/badges, conferir com a classe `alto-contraste` ativa — vários
  seletores dela casam por atributo de `style` inline e são frágeis a mudanças.
- **Lint:** `npm run lint` acusa 5 warnings herdados do código original
  (código morto de planejamento, `Date.now` no render, `exhaustive-deps`) —
  mantidos de propósito para não mudar lógica.
- **Planejamento:** as props `diasPlanejados`/`planejadosCount`/`onPlanejar`
  chegam ao `HomeScreen` mas nunca foram renderizadas no original; o componente
  `PlanejamentoSemana.tsx` as recebe e retorna `null` (documentado no arquivo)
  até a UI dessa seção ser definida.
