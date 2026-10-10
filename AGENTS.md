# AGENTS.md

Personal portfolio and blog for Shinjith P R (shnjd.com): Next.js 16 (App Router, React 19, Tailwind v4) deployed to Cloudflare Workers via OpenNext.

## Commands

Package manager is pnpm (version pinned via `packageManager`).

- `pnpm dev` — dev server (Turbopack). `next.config.mjs` calls `initOpenNextCloudflareForDev()` only when `NODE_ENV=development`, because the `CONTENT_VIEWS` KV binding is `remote: true` and needs Cloudflare credentials.
- `pnpm build` — plain `next build`. `pnpm preview` / `pnpm deploy` / `pnpm upload` run `opennextjs-cloudflare build` first, then preview/deploy/upload.
- `pnpm lint` — `eslint . --fix`; `pnpm format` — prettier over the repo.
- `pnpm exec tsc --noEmit` — type check (CI runs this; there is no script for it).
- `pnpm cf-typegen` — regenerate `cloudflare-env.d.ts` after changing bindings in `wrangler.jsonc`.
- There is no test suite.

CI (`.github/workflows/ci.yml`) on PRs runs eslint, tsc, the OpenNext build, and uploads a preview version aliased `pr-<number>`. Pushes to main deploy (`deploy.yml`).

## Commits

Husky hooks enforce Conventional Commits via commitlint (`commit-msg`) and run lint-staged (eslint + prettier) on commit. Use types like `fix:`, `chore:`, `ci:`, `feat:`.

Changes limited to a sub-app use the sub-app name as scope, e.g. `feat(notes): …`. Changes to shared/root code take no sub-app scope; split commits that touch both.

Do not include Claude session links (`claude.ai/code/session_…`) in commit messages, PR descriptions or comments.

## Architecture

### Sub-apps

Self-contained features live as **sub-apps**: a route group `app/(<name>)/` that owns its routes and everything exclusive to it, using Next.js colocation with `_`-prefixed private folders (`_components`, `_lib`, `_content`, …) that stay out of routing. A sub-app may use anything from the root (`components/`, `lib/`, `utils/`, …), like inheritance. Root code must not depend on a sub-app's internals, except root aggregators such as `app/sitemap.ts`, which call a helper the sub-app exports. Anything exclusive to a sub-app goes inside its folder. Promote code to the root before sharing it. Current sub-apps: `notes` (`app/(notes)/`). See README.md for details.

### Overview

- **Landing page** (`app/page.tsx` → `app/_components/*`) is assembled from sections; content comes from typed data modules in `lib/data/*` (about, experience, projects, services, technologies; types in `types.d.ts`). Edit content there, not in the components. `contexts/SectionContext.tsx` and `lib/lenis.ts` (smooth scrolling) support section navigation.
- **Notes (blog)** — the `notes` sub-app in `app/(notes)/`: posts are MDX files in `app/(notes)/_content/*.mdx` with YAML frontmatter (`title`, `description`, `tags`, `date`, optional `cover`). The filename is the slug. They are served at `/on/[slug]` (`app/(notes)/on/[slug]`) and listed at `/notes` (`app/(notes)/notes`). Load them through `app/(notes)/_lib/notes.ts` (`getNote`, `getAllNotes` sorted by `frontmatter.date`, `getNotesSitemap` used by `app/sitemap.ts`). MDX is configured in `next.config.mjs` (remark-frontmatter + remark-mdx-frontmatter, rehype-pretty-code with catppuccin themes); element overrides live in `mdx-components.tsx` and `styles/markdown.css`.
- **OG images**: `app/(notes)/api/og/note/[slug]/route.tsx` generates a per-note image, used as the default when frontmatter has no `cover`.
- **View counter**: `app/api/content-views/[slug]/route.ts` reads/writes the Cloudflare KV binding `CONTENT_VIEWS` through `getCloudflareContext().env` (GET reads, POST increments); consumed by `app/(notes)/on/[slug]/_components/ViewCount.tsx`.
- **Cloudflare runtime**: `wrangler.jsonc` defines the bindings (assets, self-reference service, R2 incremental cache `NEXT_INC_CACHE_R2_BUCKET`, KV `CONTENT_VIEWS`); `open-next.config.ts` configures OpenNext. Code runs on Workers, so avoid Node-only APIs in request-time paths (`app/(notes)/_lib/notes.ts` uses `fs` and relies on build-time/Node access).
- `public/_headers` sets static asset headers; `/assets/images/*` is cached immutable via `next.config.mjs`.
- Imports use the `@/` alias for the repo root. Use `utils/cn.ts` (clsx + tailwind-merge) for class merging. Dark mode is handled by `hooks/useDarkMode.ts` and `components/common/Navbar/ModeSwitch.tsx`.
