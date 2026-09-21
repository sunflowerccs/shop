# AGENTS.md

SvelteKit 2 + Svelte 5 app (scaffolded via `sv`), with shadcn-svelte UI and Tailwind CSS v4. No backend — single-page frontend so far.

## Commands

- `npm run dev` — dev server
- `npm run check` — typecheck (`svelte-kit sync && svelte-check`); there is no lint or test setup, this is the verification command
- `npm run build` / `npm run preview` — production build / preview of build

Typecheck output should be clean after any change; it's the closest thing to CI.

## Conventions that differ from Svelte defaults

- **Runes mode is forced** in `vite.config.ts` (`compilerOptions.runes`). Write runes syntax only: `$props`, `$state`, `$derived`, `$effect`, `{@render children()}`. Legacy Svelte 4 patterns (export-let props, `on:click`, `:reactive` CSS) will fail to compile.
- **Tailwind v4** — there is no `tailwind.config.js` or PostCSS config. All theme config lives in `src/routes/layout.css`: imports at the top (`@import "tailwindcss"`), design tokens as CSS vars in `:root` / `.dark`, mapped into utilities via `@theme inline`. To add a color/token, add the CSS var and a corresponding `@theme` mapping.
- **shadcn-svelte** (nova style, `components.json`): components live in `src/lib/components/ui/<name>/` with `index.ts` barrels. Import via `$lib/components/ui/<name>`. Add new components with `npx shadcn-svelte@latest add <name>`. `cn` and type helpers come from `$lib/utils.ts`.

## Gotchas

- `.npmrc` sets `engine-strict=true`; npm fails installs on Node engine mismatches.
- `.svelte-kit/` is generated and gitignored; `$types` and generated code are only refreshed by `svelte-kit sync` (run automatically by `check`/`prepare`). After adding routes, run `npm run check` before relying on generated types.
- Path alias `$lib` maps to `src/lib`.
- `layerchart` and `d3-dsv` are installed but not yet used — they're intended for chart work, not general-purpose dependencies.