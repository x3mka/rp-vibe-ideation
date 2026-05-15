import type { ReactElement } from 'react';
import { ProvidersPage } from '@/app/pages/providers-page';
import { CredentialTypesPage } from '@/app/pages/credential-types-page';
import { IntegrationTypesPage } from '@/app/pages/integration-types-page';
import { IntegrationRuntimesPage } from '@/app/pages/integration-runtimes-page';
import { OrgsPage } from '@/app/pages/orgs-page';
import { ProviderAccountsPage } from '@/app/pages/provider-accounts-page';
import { CredentialsPage } from '@/app/pages/credentials-page';
import { IntegrationsPage } from '@/app/pages/integrations-page';

const pages: Record<string, ReactElement> = {
  providers: <ProvidersPage />,
  'credential-types': <CredentialTypesPage />,
  'integration-types': <IntegrationTypesPage />,
  'integration-runtimes': <IntegrationRuntimesPage />,
  orgs: <OrgsPage />,
  'provider-accounts': <ProviderAccountsPage />,
  credentials: <CredentialsPage />,
  integrations: <IntegrationsPage />,
};

export function PageRouter({ activeView }: { activeView: string }): ReactElement {
  return pages[activeView] ?? <p className="text-muted-foreground">Page not found.</p>;
}
