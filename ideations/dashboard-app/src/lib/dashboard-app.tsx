'use client';

import { usePathname, useRouter } from 'next/navigation';
import { navSections, defaultPage } from './nav';
import { OverviewPage } from './pages/OverviewPage';
import { MetricsPage } from './pages/MetricsPage';
import { ReportsPage } from './pages/ReportsPage';
import { ProfilePage } from './pages/ProfilePage';
import { NotificationsPage } from './pages/NotificationsPage';
import { SecurityPage } from './pages/SecurityPage';

const pageMap: Record<string, React.ReactNode> = {
  overview: <OverviewPage />,
  metrics: <MetricsPage />,
  reports: <ReportsPage />,
  profile: <ProfilePage />,
  notifications: <NotificationsPage />,
  security: <SecurityPage />,
};

export function DashboardApp() {
  const router = useRouter();
  const pathname = usePathname();

  // pathname: /ideation/dashboard-app  or  /ideation/dashboard-app/overview
  const segments = pathname.split('/');
  const basePath = `/${segments[1]}/${segments[2]}`; // /ideation/dashboard-app
  const activePage = segments[3] || defaultPage;

  function navigate(pageId: string) {
    router.push(`${basePath}/${pageId}`);
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      {/* Sidebar */}
      <aside className="flex w-56 shrink-0 flex-col border-r border-border bg-background">
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {navSections.map((section, si) => (
            <div key={section.id} className={si > 0 ? 'mt-6' : ''}>
              <p className="mb-1.5 px-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                {section.label}
              </p>
              <ul className="space-y-0.5">
                {section.items.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => navigate(item.id)}
                      className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                        activePage === item.id
                          ? 'bg-accent font-medium text-accent-foreground'
                          : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl p-8">
          {pageMap[activePage] ?? (
            <p className="text-sm text-muted-foreground">Page not found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardApp;
