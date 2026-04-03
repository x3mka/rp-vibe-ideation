# Phase 1 — Working Shell

**Goal:** A fully functional shell with the iframe loading pattern proven against a real external URL. No sub-apps scaffolded yet — just the framework working end-to-end.

---

## Tasks

---

### P1-001 — Update registry interface

**Status:** `new`

Update `packages/ideation-registry/src/lib/ideation-registry.ts` to match the spec:
- Rename `label` → `name`
- Remove `type` field (`'ui-only' | 'mock-api' | 'real-api'`)
- Add `url: string`
- Update existing entries to conform to the new interface

**Files:**
- `packages/ideation-registry/src/lib/ideation-registry.ts`

**Definition of done:**
- `IdeationApp` interface has exactly: `id`, `name`, `description`, `group`, `url`
- Shell compiles without TypeScript errors after the change
- Unit tests written for `getApp()` and `groupedRegistry()` — `pnpm nx test ideation-registry` passes

---

### P1-002 — Implement iframe loader route

**Status:** `new`

Replace the current React dynamic-import route with a simple iframe loader.

- Delete `apps/web/src/app/ideation/[id]/[[...path]]/page.tsx`
- Create `apps/web/src/app/ideation/[id]/page.tsx`
- Render `<iframe src={app.url} style={{ width: '100%', height: 'calc(100vh - 3.5rem)', border: 'none' }} />`
- Call `notFound()` for unknown app IDs
- Remove `generateStaticParams` (no longer needed; apps are external URLs)

**Files:**
- `apps/web/src/app/ideation/[id]/[[...path]]/page.tsx` — delete
- `apps/web/src/app/ideation/[id]/page.tsx` — create

**Definition of done:**
- Navigating to `/ideation/<registered-id>` renders an iframe pointing to the app's `url`
- Navigating to `/ideation/<unknown-id>` returns a 404
- No dynamic imports of sub-app packages remain in the shell routing layer

---

### P1-003 — Update ShellHeader

**Status:** `new`

Align `ShellHeader.tsx` with the updated registry interface and add the "Open in new tab" button.

- Change `app.label` → `app.name` (all references)
- Add an icon button in the header right area (next to the app switcher) that calls `window.open(activeApp.url, '_blank')` — visible only when an app is active

**Files:**
- `apps/web/src/components/ShellHeader.tsx`

**Definition of done:**
- Header compiles without TypeScript errors
- Active app name and description display correctly
- "Open in new tab" button is visible when an app is selected and absent on the home page
- Clicking it opens the app URL in a new browser tab
- Unit tests cover: renders brand mark; hides "Open in new tab" with no active app; shows it when an app is active — `pnpm nx test web` passes

---

### P1-004 — Clean up next.config.js

**Status:** `new`

Remove sub-app packages from `transpilePackages`. After the iframe pivot, the shell no longer imports sub-apps as TypeScript modules.

- Remove `@rp-vibe-ideation/example-app` and `@rp-vibe-ideation/dashboard-app` from `transpilePackages`
- Keep `@rp-vibe-ideation/ideation-registry` (still imported by the shell at build time)

**Files:**
- `apps/web/next.config.js`

**Definition of done:**
- `transpilePackages` contains only `@rp-vibe-ideation/ideation-registry`
- Shell builds successfully (`pnpm nx build web`)

---

### P1-005 — Register a static external app

**Status:** `new`

Replace existing registry entries with a single external URL entry to validate the iframe loading pattern without needing a local dev server. External apps use an absolute URL directly in `url` — no base path or copy step required.

```ts
{ id: 'google', name: 'Google', description: 'External URL smoke test', group: 'Examples', url: 'https://google.com' }
```

**Files:**
- `packages/ideation-registry/src/lib/ideation-registry.ts`

**Definition of done:**
- Registry contains one entry with `url: 'https://google.com'`
- App appears in the shell's app switcher under "Examples"

---

### P1-006 — End-to-end smoke test

**Status:** `new`

Verify the full Phase 1 shell flow works end-to-end.

Steps:
1. `pnpm nx dev web` — confirm shell starts at `http://localhost:3000`
2. Open shell, confirm app switcher shows "Google" under "Examples"
3. Select Google — confirm iframe loads `https://google.com`
4. Click "Open in new tab" — confirm `https://google.com` opens in a new tab
5. Navigate to `/ideation/does-not-exist` — confirm 404
6. `pnpm nx build web` — confirm shell production build succeeds

**Definition of done:**
- All 6 steps pass without errors
- No TypeScript errors (`pnpm nx run-many -t typecheck`)
- No lint errors (`pnpm nx lint web`)
- All tests pass (`pnpm nx run-many -t test`)
