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

CI (`.github/workflows/ci.yml`) on PRs into `dev` or `main` runs eslint, `prettier --check`, tsc, the OpenNext build, and uploads a preview version aliased `pr-<number>`. Pushes to `dev` upload a version aliased `dev` (`deploy-dev.yml`); pushes to `main` deploy production (`deploy.yml`).

## Branches

- `dev` is the integration branch; `main` is production. Both are protected: changes land only through PRs with the `Lint, typecheck & build` check passing.
- Branch features and fixes off `dev` and open the PR against `dev`.
- To release, open a PR from `dev` into `main` (merge commit, not squash, so `dev` and `main` stay in sync).

## Commits

Husky hooks enforce Conventional Commits via commitlint (`commit-msg`) and run lint-staged (eslint + prettier) on commit. Use types like `fix:`, `chore:`, `ci:`, `feat:`.

Changes limited to a sub-app use the sub-app name as scope, e.g. `feat(notes): …`. Changes to shared/root code take no sub-app scope; split commits that touch both.

Do not include Claude session or project links (`claude.ai/code/…`) in commit messages, PR descriptions, comments or anything else recorded in the repo or on GitHub.

## Architecture

### Sub-apps

Self-contained features live as **sub-apps**: a route group `app/(<name>)/` that owns its routes and everything exclusive to it, using Next.js colocation with `_`-prefixed private folders (`_components`, `_lib`, `_content`, …) that stay out of routing. A sub-app may use anything from the root (`components/`, `lib/`, `utils/`, …), like inheritance. Root code must not depend on a sub-app's internals, except root aggregators such as `app/sitemap.ts`, `app/api/terminal/route.ts` and `components/terminal/fs.tsx`, which call a helper the sub-app exports. Anything exclusive to a sub-app goes inside its folder. Promote code to the root before sharing it. Current sub-apps: `notes` (`app/(notes)/`), `wiki` (`app/(wiki)/`). See README.md for details.

### Overview

- **Landing page** (`app/page.tsx` → `app/_components/*`) is assembled from sections; content comes from typed data modules in `lib/data/*` (about, experience, projects, services, technologies; types in `types.d.ts`). Edit content there, not in the components. `lib/lenis.ts` provides smooth scrolling.
- **Notes (blog)** — the `notes` sub-app in `app/(notes)/`: posts are MDX files in `app/(notes)/_content/*.mdx` with YAML frontmatter (`title`, `description`, `tags`, `date`, optional `cover`). The filename is the slug. They are served at `/on/[slug]` (`app/(notes)/on/[slug]`) and listed at `/notes` (`app/(notes)/notes`). Load them through `app/(notes)/_lib/notes.ts` (`getNote`, `getAllNotes` sorted by `frontmatter.date`, `getNotesSitemap` used by `app/sitemap.ts`). MDX is configured in `next.config.mjs` (remark-gfm for tables etc., remark-frontmatter + remark-mdx-frontmatter, rehype-pretty-code with catppuccin themes, whose token colours `lib/code-themes.mjs` darkens or lightens to WCAG AA contrast); element overrides live in `mdx-components.tsx` and `styles/markdown.css`.
  The RSS feed is the static route `app/(notes)/notes/feed.xml`, announced site-wide from the root layout's `<head>`; sitemap and feed dates come from frontmatter (`updatedAt` or `date`), never file mtimes.
- **Wiki** — the `wiki` sub-app in `app/(wiki)/`: MDX pages in `app/(wiki)/_content/<category>/<page>.mdx`, one folder per category with an `index.mdx` for the category page (folders can nest, e.g. `web-pentesting/tools/`). Frontmatter: `title`, `created`, `description` (the page's meta description, 120–160 characters; every page has one), optional `updated`, `order` (position among siblings; unordered pages sort by title). The folder path is the URL: `/wiki/<category>/<page>`, rendered by the catch-all `app/(wiki)/wiki/[...slug]`, fully prerendered via `generateStaticParams` with `dynamicParams = false`. `/wiki` lists the 10 most recently modified pages (`updated` or `created`); category pages list their children; content pages get a collapsible sidebar and an "On this page" TOC built from heading ids (set in `mdx-components.tsx`, which also adds a copy button to every code block). Load content through `app/(wiki)/_lib/wiki.ts` (`getWikiTree`, `getWikiNode`, `getWikiPage`, `getWikiSitemap`). Link between pages with absolute `/wiki/...` paths. Content was imported from the `shnjd/wiki` and `shnjd/notes-v2` repos; author it here now.
- **OG images**: `app/(notes)/api/og/note/[slug]/route.tsx` generates a per-note image, used as the default when frontmatter has no `cover`.
- **View counter**: `app/api/content-views/[slug]/route.ts` reads/writes the Cloudflare KV binding `CONTENT_VIEWS` through `getCloudflareContext().env` (GET reads, POST increments); consumed by `app/(notes)/on/[slug]/_components/ViewCount.tsx`.
- **Cloudflare runtime**: `wrangler.jsonc` defines the bindings (assets, self-reference service, R2 incremental cache `NEXT_INC_CACHE_R2_BUCKET`, KV `CONTENT_VIEWS`, Images `IMAGES`); `open-next.config.ts` configures OpenNext. Code runs on Workers, so avoid Node-only APIs in request-time paths (`app/(notes)/_lib/notes.ts` uses `fs` and relies on build-time/Node access).
- Response headers (security headers, `/assets/images/*` caching) are set in both `next.config.mjs` (worker responses) and `public/_headers` (static assets); keep them in sync. `/_next/static/*` is cached immutable.
- `next/image` is optimised through the Cloudflare Images binding `IMAGES`; without it OpenNext serves the original files.
- **Navbar and terminal**: the navbar brand (`components/common/Navbar/Prompt.tsx`) is a shell prompt that doubles as the breadcrumb, `shnjd/<path>❯`, with notes shown under `notes/` (`lib/terminal/path.ts` maps URLs to these paths). Clicking the prompt or pressing `` ` `` opens the terminal (`contexts/TerminalContext.tsx`, `components/terminal/*`), which presents the site as a `shnjd` directory: notes and wiki pages are `.md` files, plus `home.md` (`app/_content/home.mdx`, written from `lib/data`) and one file per project. The note and wiki listing comes from the static route `app/api/terminal/route.ts`; `cat` loads pages through the sub-apps' client-safe loaders (`_lib/load.ts`). Add new content sections to both.
- Imports use the `@/` alias for the repo root. Use `utils/cn.ts` (clsx + tailwind-merge) for class merging. Dark mode is handled by `hooks/useDarkMode.ts` and `components/common/Navbar/ModeSwitch.tsx`.
- **SEO metadata**: `lib/seo.ts` holds the shared bits. Next.js replaces a parent's `openGraph` object rather than merging it, so every page spreads `openGraphBase` (site name, locale) into its own; pages add `breadcrumbLd(...)` JSON-LD. Theme colours live in `THEME_COLORS` (`lib/constants.ts`), used by the viewport `theme-color`, the pre-paint theme script in `app/layout.tsx`, `useDarkMode` and `app/manifest.ts`.
