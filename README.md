# SOPA Agency — Website

Single-page marketing site for SOPA Agency: a creative + engineering studio bridging the old internet and the new one. Built with Next.js (App Router), a persistent WebGL orb background, and a 3D scroll-driven showcase. Bilingual (en / pt-BR).

## Architecture

The whole site is a **single page** — the main menu swaps sections client-side, no full reloads:

```
src/
├── app/
│   ├── [locale]/            # /en and /pt routes
│   │   ├── layout.tsx       # fonts, metadata per locale
│   │   ├── page.tsx         # renders LayoutClient
│   │   └── LayoutClient.tsx # section state machine + global overlays
│   ├── api/contact/route.ts # contact form → LLM scope helper
│   └── page.tsx             # / redirects to /en
├── components/              # one component per section + shared overlays
│   ├── WebGL.tsx            # persistent amber orb background (GLSL shader)
│   ├── ScrollShowcase.tsx   # 3D scroll journey on home (three.js)
│   └── ...
├── data/                    # content layer — ALL copy lives here, typed
│   ├── site.ts              # menu, footer menu, socials (per locale)
│   ├── work.ts              # work items, categories (single source of truth for filters)
│   ├── solutions.ts, process.ts, team.ts, feed.ts, about (inline in About.tsx)...
│   └── i18n.ts              # UI strings
└── globals.css              # animation keyframes, font themes
```

Key patterns:

- **Content as modules**: no CMS/database. Every section reads from a typed data file in `src/data/`. All content is keyed by locale (`en` / `pt`) — never add a locale entry to only one language.
- **Section switching**: `LayoutClient` holds `section` state; transitions use a letterbox wipe (`TransitionOverlay` + `withWipe()`).
- **Persistent WebGL**: the orb background stays mounted across sections; opacity varies per section.
- **Scroll-driven 3D**: home uses a fixed viewport with camera flying through stacked 3D scenes as the user scrolls (`ScrollShowcase`).

See [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) for step-by-step patterns and [DESIGN-PATTERN.md](./DESIGN-PATTERN.md) for UI/animation standards.

## Stack

| Package | Role |
|---|---|
| Next.js 16 | App Router, SSR/SSG |
| React 19 | UI |
| three | WebGL orb background + scroll showcase |
| Tailwind CSS v4 | styling |
| TypeScript | types everywhere |
| ESLint (eslint-config-next) | linting |

Package manager: **pnpm**.

## Run Locally

```bash
pnpm install
pnpm dev        # http://localhost:3000 (redirects to /en)
```

Optional — contact form LLM (`.env.local`):

```
PIONEERS_API_KEY=...     # key from alpha.pioneers.dev/keys (funded)
PIONEERS_BASE_URL=https://alpha.pioneers.dev/api/v1
PIONEERS_MODEL=...
```

Without these, everything works except the AI follow-up in the contact form.

## Build & Lint

```bash
pnpm build      # production build
pnpm start      # serve the production build
pnpm lint       # eslint
```
