# Phase 3 — Sub-Apps

**Status:** `planning`

**Prerequisite:** Phase 2 complete.

---

Sub-apps to be defined. Each sub-app will follow the pattern established in Phase 2:
- Scaffolded under `ideations/<app-name>/` using the appropriate Nx plugin
- Asset base path set to `/apps/<app-name>/`
- `copy` Nx target added; shell `build` target updated to depend on it
- Registered in `packages/ideation-registry/src/lib/ideation-registry.ts` with `url: '/apps/<app-name>'` and optional `devUrl`
- Tasks numbered `P3-001`, `P3-002`, etc.

---

_Tasks will be added here once sub-apps are planned._
