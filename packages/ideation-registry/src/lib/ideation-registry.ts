export interface IdeationApp {
  id: string;
  name: string;
  description: string;
  /** Category for grouping in the app-switcher dropdown */
  group: string;
  /** Shell-hosted path (e.g. /apps/<id>) or absolute URL for external apps */
  url: string;
  /** Optional dev server URL for HMR in development */
  devUrl?: string;
}

export const registry: IdeationApp[] = [
  {
    id: 'example-app',
    name: 'Example App',
    description: 'A starter sub-app demonstrating the ideation pattern',
    group: 'Sample Apps',
    url: '/apps/example-app',
  },
  {
    id: 'dashboard-app',
    name: 'Dashboard App',
    description: 'Multi-page app with sidebar navigation across Analytics and Settings',
    group: 'Sample Apps',
    url: '/apps/dashboard-app',
  },
];

/** Registry entries grouped by their `group` field (ungrouped → "Other"). */
export function groupedRegistry(): Record<string, IdeationApp[]> {
  return registry.reduce<Record<string, IdeationApp[]>>((acc, app) => {
    const g = app.group ?? 'Other';
    (acc[g] ??= []).push(app);
    return acc;
  }, {});
}

export function getApp(id: string): IdeationApp | undefined {
  return registry.find((app) => app.id === id);
}
