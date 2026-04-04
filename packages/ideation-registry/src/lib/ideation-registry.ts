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
    id: 'google',
    name: 'Google',
    description: 'External URL smoke test',
    group: 'Examples',
    url: 'https://google.com',
  },
  {
    id: 'react-app',
    name: 'React App',
    description: 'Blank React + Vite example',
    group: 'Examples',
    url: '/apps/react-app',
    devUrl: 'http://localhost:4201',
  },
  {
    id: 'angular-app',
    name: 'Angular App',
    description: 'Blank Angular example',
    group: 'Examples',
    url: '/apps/angular-app',
    devUrl: 'http://localhost:4202',
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
