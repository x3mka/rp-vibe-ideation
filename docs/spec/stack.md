# Stack

## Shell App (Host)

The shell is the only app with a fixed technology requirement. It is a Next.js application that hosts sub-apps.

| Layer | Technology | Version |
|---|---|---|
| Monorepo orchestration | Nx | 22.x |
| Package manager | pnpm | (workspace) |
| Shell framework | Next.js | 16.x |
| UI library | React | 19.x |
| Language | TypeScript | 5.x (strict) |
| Styling | Tailwind CSS v4 | 4.x |
| Component library | shadcn/ui (base-nova style) | — |
| Icons | Lucide React | 1.x |
| Compiler | SWC | 1.x |
| Testing | Jest | 30.x |
| Linting | ESLint | 9.x |
| Formatting | Prettier | 3.x |
| Variant management | class-variance-authority | 0.7.x |
| Class merging | tailwind-merge + clsx | latest |

> **Why these versions?** React 19, Next.js 16, and Tailwind CSS v4 are intentionally used on the cutting edge. These choices are deliberate — do not downgrade without discussion.

---

## Sub-Apps (Ideations)

Sub-apps are **stack-agnostic**. They may use any framework, bundler, or styling approach. Co-located sub-apps must satisfy two build-time requirements:
1. Built with asset base path set to `/apps/<id>/`
2. An Nx `copy` target that moves the built output into `apps/web/public/apps/<id>/`

Examples of valid sub-app stacks:
- React + Vite
- Angular
- Vue / Svelte / SolidJS
- Vanilla HTML/JS/CSS
- Any other technology that produces a static web bundle

Sub-apps in this monorepo are managed by the appropriate Nx plugin for their stack.

---

## Shared Packages

| Package | Purpose |
|---|---|
| `@rp-vibe-ideation/ideation-registry` | TypeScript registry contract and app entries — imported by the shell at build time |

---

## Running Tasks

Always run tasks through Nx. Never invoke Next.js, Jest, or ESLint CLIs directly.

```bash
pnpm nx dev web               # start the shell dev server
pnpm nx build web             # build the shell for production
pnpm nx test <project>        # run tests for a specific project
pnpm nx lint <project>        # lint a specific project
pnpm nx run-many -t build     # build all projects
pnpm nx affected -t test      # test only projects affected by current changes
pnpm nx format:write          # format all files with Prettier
```
