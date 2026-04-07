import type { Database } from '@rp-vibe-ideation/inthub-entities';
import { makeProvidersApi, type ProvidersApi } from './providers.js';
import { makeOrgsApi, type OrgsApi } from './orgs.js';
import { makeProviderAccountsApi, type ProviderAccountsApi } from './provider-accounts.js';
import { makeCredentialsApi, type CredentialsApi } from './credentials.js';
import { makeConfigsApi, type ConfigsApi } from './configs.js';
import { makeIntegrationTypesApi, type IntegrationTypesApi } from './integration-types.js';
import { makeIntegrationsApi, type IntegrationsApi } from './integrations.js';
import { makeHealthChecksApi, type HealthChecksApi } from './health-checks.js';
import { makeScheduledTasksApi, type ScheduledTasksApi } from './scheduled-tasks.js';
import { makeProvisioningsApi, type ProvisioningsApi } from './provisionings.js';

export type IntHubApi = ProvidersApi &
  OrgsApi &
  ProviderAccountsApi &
  CredentialsApi &
  ConfigsApi &
  IntegrationTypesApi &
  IntegrationsApi &
  HealthChecksApi &
  ScheduledTasksApi &
  ProvisioningsApi;

export function makeApi(db: Database): IntHubApi {
  return {
    ...makeProvidersApi(db),
    ...makeOrgsApi(db),
    ...makeProviderAccountsApi(db),
    ...makeCredentialsApi(db),
    ...makeConfigsApi(db),
    ...makeIntegrationTypesApi(db),
    ...makeIntegrationsApi(db),
    ...makeHealthChecksApi(db),
    ...makeScheduledTasksApi(db),
    ...makeProvisioningsApi(db),
  };
}
