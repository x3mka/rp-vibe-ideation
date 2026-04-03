# Instructions

Guidelines for code quality, process, and validation in this project. For how to add a new sub-app, see [contributing.md](./contributing.md).

---

## Code Quality (Shell App)

These rules apply to the shell (`apps/web`) and shared packages (`packages/`).

### TypeScript
- Strict mode is enabled — no `any`, no implicit `any`, no non-null assertions (`!`) without a comment explaining why
- All exported functions and components must have explicit return types
- No `@ts-ignore` or `@ts-expect-error` without a comment

### ESLint
- Must pass with zero errors before commit
- Run: `pnpm nx lint web`

### Prettier
- Formatting is enforced; do not hand-format code
- Run before committing: `pnpm nx format:write`

### Components
- Use `'use client'` only when the component genuinely requires browser APIs or React hooks — avoid unnecessary client bundles
- No inline styles — use Tailwind utility classes exclusively
- Prefer existing shadcn/ui primitives; add new ones via `pnpm dlx shadcn@latest add <component>`
- No unused exports — each module exports only what consumers need

---

## Testing

Unit tests should be written wherever logic can meaningfully be verified in isolation. Use Jest (already configured via `@nx/jest`).

### What to test

**`packages/ideation-registry`**
- `getApp(id)` — returns the correct entry for a known id; returns `undefined` for an unknown id
- `groupedRegistry()` — groups apps by their `group` field; uses `'Other'` as fallback for entries without a group
- Registry integrity — no duplicate `id` values; all entries satisfy the `IdeationApp` interface shape

**`apps/web` components and utilities**
- `ShellHeader` — renders the brand mark; shows the "Open in new tab" button only when an app is active; renders app groups correctly in the switcher
- Utility functions (`cn()`, any helpers added over time) — pure functions are always good test targets

### What not to test

- Thin glue code with no logic (e.g., the iframe loader page that just passes `app.url` to an `<iframe>`)
- Third-party library behaviour
- Build infrastructure (copy targets, config files)

### Running tests

```bash
pnpm nx test <project>          # run tests for one project
pnpm nx affected -t test        # run tests for all affected projects
pnpm nx run-many -t test        # run all tests across the workspace
```

---

## Registry Contract

Each sub-app entry in `packages/ideation-registry/src/lib/ideation-registry.ts` must conform to the `IdeationApp` interface:

```ts
interface IdeationApp {
  id: string;          // unique slug, kebab-case (e.g., 'my-app')
  name: string;        // human-readable display name
  description: string; // one-line description shown in the app switcher
  group: string;       // category for grouping in the switcher dropdown
  url: string;         // shell-hosted path: /apps/<id>
  devUrl?: string;     // optional: dev server URL for HMR (e.g. http://localhost:4201)
}
```

- `url` is always a root-relative path pointing to the sub-app's assets inside the shell: `/apps/<id>`
- `devUrl` is optional; when present, the shell uses it in development mode to enable HMR via the sub-app's own dev server
- `id` must be unique across all registry entries
- External apps (not served by the shell) may use an absolute URL in `url` instead of a shell-hosted path

> **Known pain point:** The registry is imported at shell build time (compile-time package). Adding or updating a sub-app requires rebuilding the shell. A runtime/API-based registry is on the post-MVP roadmap.

---

## Sub-App Build Requirements

Co-located sub-apps must satisfy two build-time requirements:

1. **Base path** — built with the asset base path set to `/apps/<id>/` so all asset references resolve correctly when served by the shell:
   - Vite: `base: '/apps/<id>/'` in `vite.config.ts`
   - Angular: `"baseHref": "/apps/<id>/"` in `angular.json` build options

2. **Copy target** — an Nx target that copies the sub-app's `dist/` output into `apps/web/public/apps/<id>/` after a successful build

---

## Validation Gates

Run before committing:

1. `pnpm nx lint web` — zero ESLint errors in the shell
2. `pnpm nx build web` — shell builds without errors (triggers all sub-app builds and copies via `dependsOn`)
3. `pnpm nx affected -t test` — all affected tests pass
4. TypeScript: `tsc --noEmit` must succeed in shell and registry packages

Sub-apps own their own quality gates.

---

## Git Workflow

Direct commits to `main`. No pull request process.

### Commit Messages
Follow [Conventional Commits](https://www.conventionalcommits.org/). One commit per task, one concern per commit — if the message needs "and", split the task.

```
feat: add iframe loading mode to shell router
fix: correct active app detection for nested paths
docs: add registry contract to instructions
chore: update ideation-registry interface
```
