export interface NavItem {
  id: string;
  label: string;
  icon: string; // lucide icon name (used as text label fallback)
}

export interface NavSection {
  id: string;
  label: string;
  items: NavItem[];
}

export const navSections: NavSection[] = [
  {
    id: 'analytics',
    label: 'Analytics',
    items: [
      { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
      { id: 'metrics', label: 'Metrics', icon: 'BarChart2' },
      { id: 'reports', label: 'Reports', icon: 'FileText' },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    items: [
      { id: 'profile', label: 'Profile', icon: 'User' },
      { id: 'notifications', label: 'Notifications', icon: 'Bell' },
      { id: 'security', label: 'Security', icon: 'Shield' },
    ],
  },
];

export const defaultPage = navSections[0].items[0].id;
