# New App Instructions

Step-by-step guide for adding a React+Vite or Angular sub-app to the monorepo. For architecture background see [architecture.md](./architecture.md) and [contributing.md](./contributing.md).

---

## React + Vite

### 1. Scaffold

```bash
pnpm nx g @nx/react:app <app-name> \
  --directory=ideations/<app-name> \
  --bundler=vite --style=css --routing=false --e2eTestRunner=none
```

### 2. `vite.config.mts` — base path

Read `NEXT_PUBLIC_BASE_PATH` so the build works both locally and on GitHub Pages:

```ts
const basePath = process.env['NEXT_PUBLIC_BASE_PATH'] ?? '';

export default defineConfig(() => ({
  root: import.meta.dirname,
  base: `${basePath}/apps/<app-name>/`,
  // ...
}));
```

- Locally (`NEXT_PUBLIC_BASE_PATH` unset): base = `/apps/<app-name>/`
- GitHub Pages CI (`NEXT_PUBLIC_BASE_PATH=/rp-vibe-ideation`): base = `/rp-vibe-ideation/apps/<app-name>/`

> **Do not** use `base: './'` — relative paths break under the Next.js rewrite because the shell serves `index.html` at a URL without a trailing slash.

### 3. `project.json` — copy target

Use the Node.js `cpSync` one-liner (works on Windows and Linux):

```json
{
  "targets": {
    "copy": {
      "dependsOn": ["build"],
      "command": "node -e \"require('fs').cpSync('ideations/<app-name>/dist','apps/web/public/apps/<app-name>',{recursive:true,force:true})\"",
      "options": { "cwd": "{workspaceRoot}" }
    }
  }
}
```

### 4. Register in `packages/ideation-registry/src/lib/ideation-registry.ts`

```ts
{
  id: '<app-name>',
  name: 'My App',
  description: 'One-line description',
  group: 'My Group',
  url: '/apps/<app-name>',
  devUrl: 'http://localhost:<port>',
}
```

### 5. Wire into shell — `apps/web/project.json`

Add `"<app-name>:copy"` (or `"@rp-vibe-ideation/<app-name>:copy"` if the package has a scope) to both `build.dependsOn` and `dev.dependsOn`.

### 6. Smoke test

```tsx
// ideations/<app-name>/src/app/app.spec.tsx
import { render } from '@testing-library/react';
import App from './app';

it('renders without errors', () => {
  expect(() => render(<App />)).not.toThrow();
});
```

---

## Angular

### 1. Scaffold

```bash
pnpm nx g @nx/angular:app <app-name> \
  --directory=ideations/<app-name> \
  --style=css --routing=false --e2eTestRunner=none
```

### 2. `angular.json` — base href

Set `baseHref` in the build options:

```json
{
  "projects": {
    "<app-name>": {
      "architect": {
        "build": {
          "options": {
            "baseHref": "/apps/<app-name>/"
          }
        }
      }
    }
  }
}
```

This bakes `/apps/<app-name>/` into the compiled `index.html`. For GitHub Pages the CI workflow patches it (see step below).

### 3. `project.json` — copy target

Same Node.js `cpSync` pattern as React. Angular outputs to `dist/<app-name>/browser/` by default:

```json
{
  "targets": {
    "copy": {
      "dependsOn": ["build"],
      "command": "node -e \"require('fs').cpSync('ideations/<app-name>/dist/<app-name>/browser','apps/web/public/apps/<app-name>',{recursive:true,force:true})\"",
      "options": { "cwd": "{workspaceRoot}" }
    }
  }
}
```

> Check the actual `outputPath` in `angular.json` — it varies by Nx/Angular version.

### 4. Patch base href for GitHub Pages — `.github/workflows/ci.yml`

Angular's `baseHref` is compiled into the HTML and cannot be overridden by an env var at build time. Add a sed patch step in the `deploy` job after `Build for GitHub Pages`:

```yaml
- name: Patch <app-name> base href for GitHub Pages
  run: |
    sed -i 's|<base href="/apps/<app-name>/">|<base href="/rp-vibe-ideation/apps/<app-name/">|g' \
      apps/web/out/apps/<app-name>/index.html
```

### 5. Register and wire

Same as React steps 4 and 5 above.

### 6. Smoke test

```ts
// ideations/<app-name>/src/app/app.component.spec.ts
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

it('creates the app', async () => {
  await TestBed.configureTestingModule({ imports: [AppComponent] }).compileComponents();
  const fixture = TestBed.createComponent(AppComponent);
  expect(fixture.componentInstance).toBeTruthy();
});
```

---

## Common steps (both stacks)

### After adding packages to the new app's `package.json`

```bash
pnpm install   # regenerate pnpm-lock.yaml
pnpm nx reset  # clear Nx project graph cache
```

### Verify locally

```bash
pnpm nx build web         # builds all sub-apps + copies + builds shell
pnpm nx start web         # serve static build at http://localhost:3000
```

Open the app-switcher and confirm the new app loads. Then open it standalone via "Open in new tab".

### Verify on GitHub Pages

Push to `main`. CI runs `pnpm nx build web` with `NEXT_PUBLIC_BASE_PATH=/rp-vibe-ideation` set, then deploys to `https://x3mka.github.io/rp-vibe-ideation/`. Check each app loads from the app-switcher.
