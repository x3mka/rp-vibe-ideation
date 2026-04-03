# MVP

## Core Concept

A shell platform that discovers and hosts independently-built web applications. Sub-apps are compiled bundles (HTML/CSS/JS) built with any stack, copied into the shell's `public/apps/<id>/` directory, and served by the shell under `/apps/<id>`. The result is a **single deployable artifact** — one Next.js app that serves both the shell and all sub-apps.

---

## In Scope

### Shell Application
- Next.js host app with a sticky header
- App-switcher dropdown in the header for navigating between registered apps
- Grouped app discovery — apps belong to named categories shown as option groups in the switcher
- Active app name and description displayed in the header center

### Sub-App Loading
- Sub-apps always load in a full-height `<iframe>` inside the shell (`/ideation/[id]`)
- The shell header includes an **"Open in new tab" button** that opens the active app's URL directly in a new browser tab
- In production, the iframe points to `/apps/<id>` — assets served by the shell itself
- In development, the iframe can point to a separate dev server (`devUrl`) for HMR

### Registry
- Compile-time TypeScript registry package shared across the monorepo
- Each entry stores: `id`, `name`, `description`, `group`, `url`, and optionally `devUrl`
- `url` is the shell-hosted path: `/apps/<id>`
- `devUrl` (optional) is the local dev server URL used during development for HMR
- `groupedRegistry()` helper for building grouped dropdown UI

### Local Development
- Each sub-app can run its own dev server at a known port (registered as `devUrl`)
- Shell uses `devUrl` when running in dev mode and `devUrl` is present, otherwise falls back to `url`
- Alternatively, sub-apps can be built and copied to `public/apps/<id>/` for static dev testing

### Build
- Each sub-app is built with its asset base path set to `/apps/<id>/`
- Built assets are copied from the sub-app's dist folder into `apps/web/public/apps/<id>/`
- Shell is built after all sub-app copy steps complete
- The shell's `public/` folder is the single static asset directory for the entire platform

---

## Out of Scope (MVP)

- Authentication / authorization
- Cross-app communication (`postMessage` API — post-MVP)
- Shared component library across sub-apps
- Analytics or telemetry
- CI/CD pipeline
- Dynamic runtime registry (apps registered without rebuilding the shell)
- Shared dependency deduplication across sub-apps

---

## Definition of Done

- Any co-located sub-app can be built and its assets served by the shell under `/apps/<id>`
- Shell renders the app in an iframe at `/apps/<id>`; header button opens it in a new tab
- App switcher shows all registered apps grouped by category
- Switching apps updates the URL and header active state correctly
- The entire platform (shell + all sub-apps) is deployable as a single Next.js build output

---

## Post-MVP Candidates

- `postMessage` protocol for shell ↔ app communication (theme, user context)
- Dynamic registry fetched from an API at runtime (plug-and-play without shell rebuild)
- App health checks and loading/error states in the iframe wrapper
- iframe `sandbox` policy refinement per security requirements
- External app support: registry entry with an absolute URL for apps hosted outside the shell
