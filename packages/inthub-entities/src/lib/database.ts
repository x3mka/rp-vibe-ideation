import type { Provider } from './provider.js';
import type { Org } from './org.js';
import type { ProviderAccount } from './provider-account.js';
import type { CredentialType } from './credential-type.js';
import type { Credential } from './credential.js';
import type { ConfigSchema } from './config-schema.js';
import type { Config } from './config.js';
import type { IntegrationRuntime } from './integration-runtime.js';
import type { IntegrationType } from './integration-type.js';
import type { Integration } from './integration.js';
import type { Provisioning } from './provisioning.js';
import type { HealthCheck } from './health-check.js';
import type { HealthCheckBinding } from './health-check-binding.js';
import type { HealthCheckRun } from './health-check-run.js';
import type { ScheduledTask } from './scheduled-task.js';

export interface Database {
  providers: Provider[];
  orgs: Org[];
  providerAccounts: ProviderAccount[];
  credentialTypes: CredentialType[];
  credentials: Credential[];
  configSchemas: ConfigSchema[];
  configs: Config[];
  integrationRuntimes: IntegrationRuntime[];
  integrationTypes: IntegrationType[];
  integrations: Integration[];
  provisionings: Provisioning[];
  healthChecks: HealthCheck[];
  healthCheckBindings: HealthCheckBinding[];
  healthCheckRuns: HealthCheckRun[];
  scheduledTasks: ScheduledTask[];
}
