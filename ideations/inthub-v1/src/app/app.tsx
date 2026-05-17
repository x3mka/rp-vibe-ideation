import type { ReactElement } from 'react';
import { useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/app/components/app-sidebar';
import { PageRouter } from '@/app/page-router';

interface BreadcrumbEntry {
  section: string;
  label: string;
}

const breadcrumbMap: Record<string, BreadcrumbEntry> = {
  'accounts': { section: 'Main', label: 'Accounts' },
  credentials: { section: 'Main', label: 'Credentials' },
  integrations: { section: 'Main', label: 'Integrations' },
  providers: { section: 'Dictionaries', label: 'Providers' },
  'credential-types': { section: 'Dictionaries', label: 'Credential Types' },
  'integration-types': { section: 'Dictionaries', label: 'Integration Types' },
  'integration-runtimes': { section: 'Dictionaries', label: 'Integration Runtimes' },
};

export function App(): ReactElement {
  const [activeView, setActiveView] = useState<string>('accounts');
  const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null);

  const breadcrumb = breadcrumbMap[activeView] ?? { section: '', label: activeView };

  return (
    <SidebarProvider>
      <AppSidebar
        activeView={activeView}
        onNavigate={setActiveView}
        selectedOrgId={selectedOrgId}
        onOrgChange={setSelectedOrgId}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">{breadcrumb.section}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <PageRouter activeView={activeView} selectedOrgId={selectedOrgId} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default App;
