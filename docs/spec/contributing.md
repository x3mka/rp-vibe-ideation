# Contributing

## How to Add a New Sub-App

Sub-apps live under `ideations/<app-name>/`, are built with any framework, and their compiled assets are copied into the shell's `public/apps/<id>/` directory. The shell serves them at `/apps/<id>`.

---

### Step 1: Scaffold the App

Use the appropriate Nx generator for your stack:

```bash
# React + Vite
pnpm nx g @nx/react:app <app-name> --directory=ideations/<app-name> --bundler=vite --style=css --routing=false --e2eTestRunner=none

# Angular
pnpm nx g @nx/angular:app <app-name> --directory=ideations/<app-name> --style=css --routing=false --e2eTestRunner=none
```

The app is automatically included in the pnpm workspace via the `ideations/*` glob in `pnpm-workspace.yaml`.

---

### Step 2: Set the Asset Base Path

The sub-app must be built with its base path set to `/apps/<app-name>/` so all asset references resolve correctly when served by the shell.

**Vite** — in `vite.config.ts`:
```ts
export default defineConfig({
  base: '/apps/<app-name>/',
  // ...
})
```

**Angular** — in `angular.json` under `projects.<app-name>.architect.build.options`:
```json
{
  "baseHref": "/apps/<app-name>/"
}
```

---

### Step 3: Add a Copy Nx Target

Add a `copy` target to the sub-app's `project.json` that moves built assets into the shell's public folder:

```json
{
  "targets": {
    "copy": {
      "dependsOn": ["build"],
      "command": "cp -r dist/ideations/<app-name>/. apps/web/public/apps/<app-name>/",
      "options": { "cwd": "{workspaceRoot}" }
    }
  }
}
```

Add `apps/web/public/apps/` to `.gitignore` — these are generated build artifacts, not source files. The copy step recreates them on every build.

```
# .gitignore
apps/web/public/apps/
```

Then declare this as a dependency of the shell's build in `apps/web/project.json`:

```json
{
  "targets": {
    "build": {
      "dependsOn": ["<app-name>:copy", "...other sub-apps..."]
    }
  }
}
```

---

### Step 4: Register the App

Edit `packages/ideation-registry/src/lib/ideation-registry.ts` and add an entry:

```ts
{
  id: '<app-name>',
  name: 'My App',
  description: 'One-line description for the app switcher',
  group: 'My Group',
  url: '/apps/<app-name>',          // shell-hosted path (production)
  devUrl: 'http://localhost:4201',  // optional: dev server for HMR
}
```

---

### Step 5: Add a Unit Test

Add at minimum a smoke test that the root component renders without errors. This keeps `pnpm nx affected -t test` green for the new sub-app.

**React (Vitest/Jest):**
```tsx
import { render } from '@testing-library/react';
import App from './app';

it('renders without errors', () => {
  expect(() => render(<App />)).not.toThrow();
});
```

**Angular:**
```ts
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

it('creates the app', async () => {
  await TestBed.configureTestingModule({ imports: [AppComponent] }).compileComponents();
  const fixture = TestBed.createComponent(AppComponent);
  expect(fixture.componentInstance).toBeTruthy();
});
```

Run tests: `pnpm nx test <app-name>`

---

### Step 6: Verify

**Production build:**
1. `pnpm nx build web` — builds all sub-apps, copies assets, builds shell
2. Start the built shell and open `http://localhost:3000`
3. Select your app from the app-switcher — confirm it loads from `/apps/<app-name>`
4. Click "Open in new tab" — confirm the app runs standalone

**Development (with HMR):**
1. `pnpm nx dev <app-name>` — start the sub-app dev server
2. `pnpm nx dev web` — start the shell
3. Select your app — shell loads it from `devUrl` for full HMR support
4. Click "Open in new tab" — confirm the app runs standalone

---

## External Apps

Apps hosted outside this repo (separately deployed apps, third-party services) can be registered with an absolute URL in the `url` field instead of a shell-hosted path:

```ts
{
  id: 'external-app',
  name: 'External App',
  description: 'Hosted outside the shell',
  group: 'External',
  url: 'https://example.com/my-app',
}
```

No copy step or base path configuration is needed for external apps.
