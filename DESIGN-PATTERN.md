# SOPA Agency — Design Pattern & Page Architecture Guide

This document defines the strict UI/UX, animation, layout, and architectural standards for all pages in **SOPA Agency**. All AI agents and developers must follow these patterns to maintain visual and behavioral consistency across the website.

---

## 1. Core Architecture & Navigation

The SOPA Agency website behaves as a seamless single-page application (SPA) with 3D background continuity:

- **Single Layout Client (`src/app/[locale]/LayoutClient.tsx`)**:
  - The background WebGL scene (`<WebGL />`) stays mounted permanently (`heroVisible = true`).
  - Navigation between sections (e.g. `home`, `work`, `team`, `portfolio`, `services`, `contact`) happens client-side without full page reloads.
  - Page transitions trigger a cinematic letterbox bar wipe (`TransitionOverlay` via `withWipe()`).
  - Upon route/section change, the camera scrolls to top smoothly, the new view mounts, and the WebGL orb transitions into its designated section state.

---

## 2. Background & 3D Layer (The Orb & Particles)

The background consists of a shared WebGL canvas (`WebGL.tsx`) featuring the golden particles and dynamic shader orb.

### Must-Have Rules:
1. **Continuous Mounting**: Never unmount or hide the WebGL background container on standard pages.
2. **Orb Section Dissolve (`ORB_OPACITY`)**:
   - `home`: `1.0` (Full orb opacity at start; unfolds/opens dynamically on scroll down into presentation)
   - `work`: `0.3` (Dissolved / ambient particles)
   - `team`: `0.3`
   - `portfolio`: `0.4`
   - `services`: `0.5`
   - `contact`: `0.3`
3. **Orb Color Scheme**:
   - Outer shell & rim: **SOPA Yellow** (`#FFE000` / `#FFD54F`)
   - Inner core: Dynamic cycling chromatic shader
   - Glow: Warm ambient yellow `vec3(0.1, 0.08, 0.0)`

---

## 3. Typography & Text Hierarchy

| Role | Font / Styling | Animation Class |
|---|---|---|
| **Ghost Watermark** | `font-sans`, uppercase, `text-[28vh]`, `color: rgba(255,255,255,0.1)`, `letter-spacing: 2vh` | `page-anim` |
| **Page Title (`<h2>`)** | `text-3xl md:text-4xl font-bold tracking-tight text-white` | `page-title-anim` (Slides right &rarr; left) |
| **Page Subtitle (`<p>`)** | `text-base md:text-lg opacity-70 text-white/70` | `page-title-anim page-title-anim-d1` |
| **Hero Title (`<h1>`)** | `font-display text-4xl md:text-5xl font-medium tracking-tight` (theme-aware display font) | `page-anim` |
| **Card / Item Title** | `text-xl font-semibold text-white` | Inherited from container / card animation |

> Fonts are never hard-coded by name — use semantic roles (`font-sans` body, `font-display` headings, `font-mono` code). The actual typefaces come from the runtime-switchable theme system; see DEVELOPMENT_GUIDE.md §4.

---

## 4. Animation Standards (CSS)

All page transitions must use standardized CSS keyframes defined in `src/globals.css`:

### 4.1. Title & Subtitle Entrance (`page-title-anim`)
Titles slide gracefully from right to left with a slight ease-out deceleration curve:
- **`page-title-anim`**: Slides `translateX(80px)` &rarr; `0` (0.85s `cubic-bezier(0.22, 1, 0.36, 1)`)
- **`page-title-anim-d1`**: Delay of `0.12s` (used for subtitles)
- **`page-title-anim-d2`**: Delay of `0.24s`

### 4.2. Page Content & Grids (`page-anim`)
Body content, cards, forms, and interactive grids drift upwards from the bottom:
- **`page-anim`**: Drifts `translate3d(0, 40px, 0)` &rarr; `0` (0.8s `ease-out`)
- **`page-anim-d1`**: Delay of `0.15s`
- **`page-anim-d2`**: Delay of `0.30s`

---

## 5. Standard Page Template Structure

When creating a new page or section component, adhere to this exact structural template:

```tsx
// src/components/ExampleSection.tsx
'use client';

interface ExampleSectionProps {
  title?: string;
  subtitle?: string;
  locale: string;
}

export default function ExampleSection({ title, subtitle, locale }: ExampleSectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* 1. Header Block: Right -> Left Animation */}
      {title && (
        <h2 className="text-3xl md:text-4xl font-bold mb-2 page-title-anim">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="mb-10 text-base md:text-lg opacity-70 page-title-anim page-title-anim-d1">
          {subtitle}
        </p>
      )}

      {/* 2. Content Block / Grid: Bottom -> Up Animation */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 page-anim page-anim-d1">
        {/* Card items with glassmorphic styling */}
        <div className="rounded-2xl border border-white/15 bg-black/40 p-6 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-black/60">
          <h3 className="text-xl font-semibold mb-2">Item Title</h3>
          <p className="text-sm opacity-70 leading-relaxed">
            Content description goes here...
          </p>
        </div>
      </div>
    </section>
  );
}
```

---

## 6. Glassmorphism & UI Surface Rules

- **Borders**: Thin translucent white border `border border-white/15`
- **Backgrounds**: Dark translucent background `bg-black/40` or `bg-black/70` with `backdrop-blur-md`
- **Hover States**: Subdued lightening + border highlight (`hover:border-white/30 hover:bg-black/60`)
- **Action Buttons**: Minimalist outline or SOPA yellow accent (`#FFE000`) for primary CTAs.

---

## 7. Multi-language (i18n) Pattern

- All copy must be available in both **English (`en`)** and **Portuguese (`pt`)**.
- Data belongs in structured files under `src/data/` (e.g., `site.ts`, `work.ts`, `team.ts`, `portfolio.ts`).
- Pages consume the current locale prop and index data by `data[locale] ?? data.en`.

---

## 8. Checklist for New Pages

When implementing or editing any page:
- [ ] Registered in `LayoutClient.tsx` Section type and navigation handler.
- [ ] Section opacity configured in `WebGL.tsx` `ORB_OPACITY`.
- [ ] Ghost watermark title included in `LayoutClient.tsx`.
- [ ] Title & Subtitle use `page-title-anim` / `page-title-anim-d1` (Right &rarr; Left).
- [ ] Content container / Grid uses `page-anim` (Bottom &rarr; Up).
- [ ] Glassmorphic card styling (`border-white/15`, `backdrop-blur-md`).
- [ ] Bilingual text content configured in `src/data/`.
