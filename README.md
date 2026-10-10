# [Shinjith P R](https://shnjd.com)

## Project structure

The site is a Next.js App Router app. Everything shared lives at the
root (`app/`, `components/`, `lib/`, `utils/`, `hooks/`, `contexts/`,
`styles/`), and larger features are split out as **sub-apps**.

### Sub-apps

A sub-app is a self-contained sub-tree of `app/`. It works like
inheritance:

- A sub-app **may use anything from the root** (components, libs, utils,
  styles, layouts, etc.).
- Anything that **belongs exclusively to a sub-app lives inside its
  folder**, never at the root. Root code shouldn't depend on a sub-app's
  internals. The one exception is root-level aggregators like
  `app/sitemap.ts`, which call a helper the sub-app exports for this.
- If a sub-app's code becomes useful elsewhere, move it to the root
  first, then share it.

Sub-apps are built with Next.js
[colocation](https://nextjs.org/docs/app/getting-started/project-structure#colocation)
and
[private folders](https://nextjs.org/docs/app/getting-started/project-structure#private-folders):

- Each sub-app is a [route group](https://nextjs.org/docs/app/getting-started/project-structure#route-groups)
  named `app/(<sub-app>)/`, so it can own several URL segments without
  changing any URLs.
- Its non-route code goes in `_`-prefixed private folders (`_components`,
  `_lib`, `_content`, ...). These are left out of routing. Put them at the
  sub-app root when the whole sub-app shares them, or next to the route
  that uses them.

```
app/
├── (notes)/                  # notes sub-app
│   ├── _content/             # MDX notes
│   ├── _lib/notes.ts         # note loading, sitemap entries
│   ├── notes/page.tsx        # /notes
│   ├── on/[slug]/            # /on/:slug
│   │   └── _components/      # used only by this route
│   └── api/og/note/[slug]/   # /api/og/note/:slug
├── projects/                 # root pages
├── api/                      # shared API routes
└── ...
```

Current sub-apps:

| Sub-app | Folder         | Routes                                      |
| ------- | -------------- | ------------------------------------------- |
| `notes` | `app/(notes)/` | `/notes`, `/on/:slug`, `/api/og/note/:slug` |
| `wiki`  | `app/(wiki)/`  | `/wiki`, `/wiki/:category/.../:page`        |

More will be added. To add one, create `app/(<name>)/`, keep its
exclusive code inside it, add a row to the table above, and use
`<name>` as its commit scope.

## Commit conventions

Commits follow [Conventional Commits](https://www.conventionalcommits.org),
enforced by commitlint (see `commitlint.config.mjs`).

- A change that only touches a sub-app uses the sub-app's name as its
  scope, e.g. `feat(notes): Add tag filter` or `fix(notes): Fix OG image`.
- A change to shared/root code has no sub-app scope, e.g.
  `refactor: Extract shared BackLink component`.
- Changes that touch both should be split into atomic commits where
  possible.
