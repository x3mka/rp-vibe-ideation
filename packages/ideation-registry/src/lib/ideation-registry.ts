export interface IdeationApp {
  id: string;
  label: string;
  description: string;
  /** Backend type for display/filtering */
  type: 'ui-only' | 'mock-api' | 'real-api';
  /** Group name shown in the app-switcher dropdown */
  group?: string;
}

export const registry: IdeationApp[] = [
  {
    id: 'example-app',
    label: 'Example App',
    description: 'A starter sub-app demonstrating the ideation pattern',
    type: 'ui-only',
    group: 'Sample Apps',
  },
  {
    id: 'dashboard-app',
    label: 'Dashboard App',
    description: 'Multi-page app with sidebar navigation across Analytics and Settings',
    type: 'ui-only',
    group: 'Sample Apps',
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
