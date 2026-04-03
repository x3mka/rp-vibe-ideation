# Architecture

## Monorepo Structure

```
rp-vibe-ideation/
├── apps/
│   └── web/                              # Next.js shell (host application)
│       ├── public/
│       │   └── apps/                     # Built sub-app assets (copied at build time, git-ignored)
│       │       └── <app-name>/           # Each sub-app's compiled bundle
│       └── src/
│           ├── app/
│           │   ├── layout.tsx            # Root layout — mounts ShellHeader
│           │   ├── page.tsx              # Home / landing page
│           │   └── ideation/
│           │       └── [id]/
│           │           └── page.tsx      # Sub-app iframe loader
│           ├── components/
│           │   └── ShellHeader.tsx       # Sticky header + app-switcher dropdown
│           └── lib/
│               └── utils.ts             # cn() class merging helper
├── packages/
│   └── ideation-registry/               # Shared registry contract and entries
│       └── src/lib/ideation-registry.ts
├── ideations/                           # Sub-apps co-located in this repo
│   └── <app-name>/                      # Any stack; managed by an Nx plugin
│       └── ...
├── nx.json                              # Nx workspace configuration
├── pnpm-workspace.yaml                  # pnpm workspace globs
└── tsconfig.base.json                   # Shared TypeScript base config
```

---

## Key Patterns

### Registry Pattern

`packages/ideation-registry` is the single source of truth for all registered sub-apps. The shell imports it at build time to populate the app-switcher and resolve app URLs.

```ts
interface IdeationApp {
  id: string;            // unique kebab-case slug
  name: string;          // display name (shown in header center when active)
  description: string;   // one-line description (shown below name when active)
  group: string;         // category for grouping in the switcher dropdown
  url: string;           // shell-hosted path: /apps/<id>
  devUrl?: string;       // optional dev server URL for HMR (e.g. http://localhost:4201)
}
```

The shell resolves the effective URL at runtime:
- In development (`NODE_ENV === 'development'`): use `devUrl` if present, otherwise `url`
- In production: always use `url`

Helper exports:
- `registry` — full array of registered apps
- `groupedRegistry()` — apps grouped by `group` field, used for the `<optgroup>` dropdown
- `getApp(id)` — look up a single app by id

### Iframe Loading Pattern

The shell route `/ideation/[id]` always renders the sub-app inside a full-height iframe:

```tsx
<iframe
  src={app.url}
  style={{ width: '100%', height: 'calc(100vh - 3.5rem)', border: 'none' }}
/>
```

The sub-app runs in **full isolation** — its own DOM, JS scope, and styles. There is no shared state between the shell and the sub-app. Cross-app communication, if needed post-MVP, uses the `postMessage` API.

### Open in New Tab

The shell header includes a button that opens the active app's effective URL directly in a new browser tab (`window.open(effectiveUrl, '_blank')`). The sub-app then runs standalone without the shell chrome. This is a universal affordance — no per-app configuration required.

### Asset Copy Pattern

Sub-apps are built as static bundles and their output is copied into the shell's `public/apps/<id>/` directory before the shell is built. Next.js serves everything under `public/` as static files, making sub-app assets available at `/apps/<id>/`.

`apps/web/public/apps/` is a generated directory — it must be added to `.gitignore` and is never committed. The copy step recreates it on every build.

**Requirements for co-located sub-apps:**
1. **Base path** — the sub-app must be built with its asset base path set to `/apps/<id>/`:
   - Vite: `base: '/apps/<id>/'` in `vite.config.ts`
   - Angular: `"baseHref": "/apps/<id>/"` in `angular.json` build options
2. **Copy target** — an Nx `copy` target on the sub-app copies `dist/` output to `apps/web/public/apps/<id>/`
3. **Shell build dependency** — the shell's `build` target declares `dependsOn` the sub-app copy targets so the full build is orchestrated by a single `pnpm nx build web`

### Dev vs Production

| Context | URL used | Source |
|---|---|---|
| Development (devUrl set) | `http://localhost:<port>` | Sub-app dev server — full HMR |
| Development (no devUrl) | `/apps/<id>` | Pre-built assets in `public/apps/` |
| Production | `/apps/<id>` | Assets copied into shell's `public/apps/` |

### Stack Agnosticism

The shell has no knowledge of a sub-app's framework. It only loads a URL. Sub-apps can be built with any technology that produces a valid web entrypoint (HTML/CSS/JS). The only build-time requirement is that the sub-app sets its asset base path to `/apps/<id>/`.

---

## Data Flow

```
User selects app in ShellHeader dropdown
  → router.push('/ideation/<id>')
  → /ideation/[id]/page.tsx looks up app in registry
  → resolves effective URL (devUrl in dev, url in production)
  → renders <iframe src={effectiveUrl} />

User clicks "Open in new tab" button in ShellHeader
  → window.open(effectiveUrl, '_blank')

Build time
  → pnpm nx build web
  → Nx builds each sub-app (respecting dependsOn)
  → each sub-app's copy target moves dist/ → apps/web/public/apps/<id>/
  → Next.js build runs with all sub-app assets already in public/
```

---

## Architectural Decision Records

### ADR-001: Iframe over Module Federation

**Decision:** Load sub-apps via `<iframe>` rather than webpack/rspack Module Federation.

**Reasoning:** Module Federation constrains sub-apps to webpack or rspack and requires shared build-time configuration. Iframes provide true runtime isolation, support any stack, and require no build-time coupling between the shell and sub-apps.

**Tradeoffs:**
- Each sub-app ships its own copy of dependencies (no deduplication)
- Cross-app communication requires the `postMessage` API
- `iframe` sandboxing must be configured carefully to balance security and functionality

---

### ADR-002: Compile-time Registry over Runtime API

**Decision:** The registry is a TypeScript package imported by the shell at build time, not fetched from an API at runtime.

**Reasoning:** Compile-time import gives full TypeScript type safety on registry entries, zero network latency for app discovery, and no runtime failure mode for registry fetch errors.

**Tradeoffs:**
- Adding or updating a sub-app requires rebuilding the shell
- Not suitable for truly dynamic plug-and-play registration

A runtime/API-based registry is the natural next step post-MVP for enabling plug-and-play registration without shell rebuilds.

---

### ADR-003: Assets Copied into Shell Public Folder

**Decision:** Sub-app built assets are copied into `apps/web/public/apps/<id>/` and served by the shell, rather than deployed to a separate CDN or server.

**Reasoning:** A single deployment artifact simplifies hosting — only the Next.js shell needs to be deployed. Same-origin serving eliminates CORS and mixed-content issues with iframes. Nx `dependsOn` orchestrates the build order automatically.

**Tradeoffs:**
- Shell deployment includes all sub-app assets (larger artifact)
- Sub-apps are coupled to the shell's deployment cycle
- External apps (not in this repo) still require a separate `url` pointing to their own host
