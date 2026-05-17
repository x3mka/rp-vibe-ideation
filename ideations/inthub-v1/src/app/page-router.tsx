import type { ReactElement } from 'react';
import { ProvidersPage } from '@/app/pages/providers-page';
import { CredentialTypesPage } from '@/app/pages/credential-types-page';
import { IntegrationTypesPage } from '@/app/pages/integration-types-page';
import { IntegrationRuntimesPage } from '@/app/pages/integration-runtimes-page';
import { AccountsPage } from '@/app/pages/provider-accounts-page';
import { CredentialsPage } from '@/app/pages/credentials-page';
import { IntegrationsPage } from '@/app/pages/integrations-page';

export function PageRouter({
  activeView,
  selectedOrgId,
}: {
  activeView: string;
  selectedOrgId: string | null;
}): ReactElement {
  const pages: Record<string, ReactElement> = {
    'accounts': <AccountsPage selectedOrgId={selectedOrgId} />,
    credentials: <CredentialsPage selectedOrgId={selectedOrgId} />,
    integrations: <IntegrationsPage selectedOrgId={selectedOrgId} />,
    providers: <ProvidersPage />,
    'credential-types': <CredentialTypesPage />,
    'integration-types': <IntegrationTypesPage />,
    'integration-runtimes': <IntegrationRuntimesPage />,
  };
  return pages[activeView] ?? <p className="text-muted-foreground">Page not found.</p>;
}
