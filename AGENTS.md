<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Locales

The site is bilingual (en / pt-BR). When creating or updating page content (data files in `src/data/*.ts`, section components, menu entries), ALWAYS add it to ALL locales — `en` AND `pt` objects. Never add a locale-keyed entry to only one language.

# Guides

- `DEVELOPMENT_GUIDE.md` — how to add/modify sections: LayoutClient pattern, data-file structure, component conventions. Read before adding pages.
- `DESIGN-PATTERN.md` — UI/UX, layout, and animation standards for the site. Follow when building or changing page visuals.
