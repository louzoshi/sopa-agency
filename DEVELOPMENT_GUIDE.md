# SOPA Agency — Agent Development Guide

This file documents the design patterns, animation conventions, and architectural decisions used across the site. Follow these when adding new pages or editing existing ones.

## 1. Section Structure (LayoutClient)

All sections live in `src/app/[locale]/LayoutClient.tsx` and render conditionally based on `section` state.

```tsx
type Section = 'home' | 'work' | 'team' | 'portfolio' | 'solutions' | 'about' | 'contact';
```

**Pattern for a new section:**
```tsx
{section === 'your-section' && (
  <div className="max-w-7xl mx-auto px-6 py-16">
    <h2 className="text-3xl font-bold mb-2 page-title-anim">{title}</h2>
    <p className="mb-6 opacity-70 page-title-anim page-title-anim-d1">{subtitle}</p>
    {/* content */}
  </div>
)}
```

- Title → `.page-title-anim` (slides from right, 0.85s cubic-bezier)
- Subtitle/body → `.page-title-anim-d1` (0.12s delay)
- Content grid → `.page-anim .page-anim-d1` (drifts up, 0.15s delay)

## 2. Animation Classes (globals.css)

| Class | Effect | Duration | Delay variants |
|-------|--------|----------|----------------|
| `.page-title-anim` | Slide from right (80px) | 0.85s | `.page-title-anim-d1` (0.12s), `.page-title-anim-d2` (0.24s) |
| `.page-anim` | Fade + drift up (40px) | 0.8s | `.page-anim-d1` (0.15s), `.page-anim-d2` (0.30s) |
| `.aos-zoom` | Scale 0.6 → 1 + fade | 1s | `.aos-zoom-d1` (0.5s), `.aos-zoom-d2` (0.7s) |
| `.slide-from-right` | Legacy alias for title | 0.9s | `.slide-from-right-d1` (0.15s) |

**Usage:**
```tsx
<h2 className="text-3xl font-bold mb-2 page-title-anim">Title</h2>
<p className="opacity-70 page-title-anim page-title-anim-d1">Subtitle</p>
<div className="grid gap-6 page-anim page-anim-d1">...</div>
```

## 3. Page Transition (Orb + Bar Wipe)

**TransitionOverlay.tsx** provides `withWipe(onNavigate)`:
- Adds `.wipe` class to `#top-bar` and `#bottom-bar`
- After 500ms calls `onNavigate` (section change + scroll to top)

**LayoutClient navigate:**
```tsx
const navigate = (s: Section) => {
  if (s === section) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  withWipe(() => { window.scrollTo({ top: 0 }); setSection(s); });
};
```

**Orb state:**
- Home: `orbOpen = scrollP` (0→1 as user scrolls down hero)
- Other sections: `orbOpen = menuOpenAnim` (animates 0→1 on entry, stays open)
- `menuOpenAnim` driven by `requestAnimationFrame` easeOutCubic over 850ms

**WebGL receives:**
```tsx
<WebGL section={section} open={orbOpen} onProgress={setProgress} />
```
- `section` string for per-page shader variants
- `open` 0–1 controls orb unfold
- `onProgress` fires when first frame renders (loader gate)

## 4. Fonts

- **Home hero & showcase titles:** Futura PT via Adobe Typekit (kit `wvh2fzc`)
  - CSS: `.font-futura { font-family: futura-pt, Futura, 'Trebuchet MS', Arial, sans-serif; }`
  - Loaded in `src/app/layout.tsx` via `<script src="https://use.typekit.net/wvh2fzc.js" />`
- **Body/UI:** Geist Sans (Tailwind `--font-sans`)
- **Monospace:** Geist Mono (Tailwind `--font-mono`)

## 5. Colour Palette (Amber/Black)

```css
:root { --background: #0a0a0a; --foreground: #ededed; }
```
- Primary accent: `amber-300` / `amber-400` / `amber-600`
- Backgrounds: `black/40` with `backdrop-blur-sm`
- Borders: `border-white/15` or `border-white/20`
- Text: `text-white`, `text-white/70`, `text-white/50`, `text-white/30`

## 6. Data Files (Module System)

No CMS. Each section has a `src/data/*.ts` file exporting locale-keyed objects.

```ts
// src/data/your-section.ts
export const yourSection = {
  en: { title: 'Title', subtitle: 'Subtitle', list: [...] },
  pt: { title: 'Título', subtitle: 'Legenda', list: [...] },
};
```
Import in LayoutClient:
```ts
import { yourSection } from '@/data/your-section';
const data = yourSection[l] ?? yourSection.en;
```

## 7. Components Reuse

| Component | Purpose | Props |
|-----------|---------|-------|
| `Team` | Member cards with skills, AI badge | `title`, `subtitle`, `locale` |
| `Solutions` | Sticky card stack (zeitmedia style) | `title`, `locale` |
| `Contact` | Terminal form + LLM chat (3 turns) | `title`, `locale` |
| `ScrollShowcase` | WebGL scroll narrative (home only) | — |
| `Showreel` | Video modal | `videoUrl`, `onClose` |
| `Loader` | Top progress bar | `progress` 0–1, `done` boolean |

## 8. Adding a New Page Checklist

1. Add section to `Section` union type in LayoutClient.
2. Create `src/data/your-section.ts` with `en`/`pt` content.
3. Import data in LayoutClient.
4. Add conditional render block using animation classes above.
5. Add locale strings to `src/data/i18n.ts` (menu labels).
6. Add menu links in `Header.tsx` and `MobileMenu.tsx` (both take `onNavigate`).
7. Add `orbOpacity` entry in `WebGL.tsx` if custom orb visibility needed.
8. Run `pnpm run lint && pnpm run build` to verify.

## 9. Lint / Build Commands

```bash
pnpm run lint   # ESLint (0 errors required)
pnpm run build  # Next.js production build
hermes verify   # Full verification (install, build, lint, readiness)
```

## 10. Ponytail Rules Applied Here

- Reuse existing animation classes; don't write new keyframes.
- Keep data in `src/data/*.ts`; no new CMS or API routes unless necessary.
- One component per concern; delete over addition.
- Stdlib / native CSS over JS animation libraries.
- Fewest files: edit LayoutClient + one data file + i18n for a new page.