import { makeApi } from './make-api';
import type { Database } from '@rp-vibe-ideation/inthub-entities';
import {
  ProviderCategory,
  OrgStatus,
  ProviderAccountStatus,
  CredentialStatus,
  ConfigPurpose,
  ConfigStatus,
  RuntimeType,
  RuntimeStatus,
  IntegrationTypeStatus,
  IntegrationStatus,
  ProvisioningStatus,
  TargetEntityType,
  Severity,
  RunStatus,
  TaskType,
  TaskStatus,
} from '@rp-vibe-ideation/inthub-entities';

// ── Minimal, controlled test database ────────────────────────────────────────

const db: Database = {
  providers: [
    { id: 'p-aws', name: 'AWS', category: ProviderCategory.Cloud },
    { id: 'p-qualys', name: 'Qualys', category: ProviderCategory.Vulnerability },
    { id: 'p-datadog', name: 'DataDog', category: ProviderCategory.SIEM },
  ],
  orgs: [
    { id: 'o-alpha', name: 'Alpha Corp', status: OrgStatus.Active, createdAt: '2023-01-01T00:00:00Z' },
    { id: 'o-beta', name: 'Beta Inc', status: OrgStatus.Active, createdAt: '2024-01-01T00:00:00Z' },
  ],
  providerAccounts: [
    { id: 'pa-alpha-aws', orgId: 'o-alpha', providerId: 'p-aws', name: 'Alpha AWS', externalId: '111', status: ProviderAccountStatus.Active },
    { id: 'pa-alpha-qualys', orgId: 'o-alpha', providerId: 'p-qualys', name: 'Alpha Qualys', externalId: '222', status: ProviderAccountStatus.Active },
    { id: 'pa-beta-aws', orgId: 'o-beta', providerId: 'p-aws', name: 'Beta AWS', externalId: '333', status: ProviderAccountStatus.Active },
  ],
  credentialTypes: [
    { id: 'ct-aws-key', providerId: 'p-aws', name: 'Access Key', fields: ['accessKeyId', 'secretKey'] },
  ],
  credentials: [
    {
      id: 'cred-active',
      providerAccountId: 'pa-alpha-aws',
      credentialTypeId: 'ct-aws-key',
      name: 'Active Cred',
      vaultPath: 'secret/active',
      status: CredentialStatus.Active,
      expiresAt: '2030-01-01T00:00:00Z',
    },
    {
      id: 'cred-expired',
      providerAccountId: 'pa-alpha-aws',
      credentialTypeId: 'ct-aws-key',
      name: 'Expired Cred',
      vaultPath: 'secret/expired',
      status: CredentialStatus.Expired,
      expiresAt: '2020-01-01T00:00:00Z',
    },
    {
      // Expires 10 days from test date reference — use a date far in the future for "expiring soon"
      id: 'cred-expiring',
      providerAccountId: 'pa-beta-aws',
      credentialTypeId: 'ct-aws-key',
      name: 'Expiring Cred',
      vaultPath: 'secret/expiring',
      status: CredentialStatus.Expiring,
      expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  configSchemas: [
    { id: 'cs-qualys', providerId: 'p-qualys', purpose: ConfigPurpose.Integration, name: 'Qualys Config', schema: {} },
  ],
  configs: [
    { id: 'cfg-alpha-qualys', providerAccountId: 'pa-alpha-qualys', configSchemaId: 'cs-qualys', values: { domain: 'q.example.com' }, status: ConfigStatus.Active },
  ],
  integrationRuntimes: [
    { id: 'rt-astro', name: 'Astronomer', type: RuntimeType.Astronomer, status: RuntimeStatus.Active },
  ],
  integrationTypes: [
    { id: 'it-q-aws', name: 'Qualys → AWS', sourceProviderId: 'p-qualys', targetProviderId: 'p-aws', runtimeId: 'rt-astro', version: '1.0', status: IntegrationTypeStatus.Active },
  ],
  integrations: [
    {
      id: 'int-alpha-1',
      orgId: 'o-alpha',
      integrationTypeId: 'it-q-aws',
      sourceAccountId: 'pa-alpha-qualys',
      targetAccountId: 'pa-alpha-aws',
      name: 'Alpha Q→AWS',
      status: IntegrationStatus.Active,
      createdAt: '2023-06-01T00:00:00Z',
    },
    {
      id: 'int-beta-1',
      orgId: 'o-beta',
      integrationTypeId: 'it-q-aws',
      sourceAccountId: 'pa-beta-aws',
      targetAccountId: 'pa-alpha-aws',
      name: 'Beta integration',
      status: IntegrationStatus.Paused,
      createdAt: '2024-02-01T00:00:00Z',
    },
  ],
  provisionings: [
    { id: 'prov-1', providerAccountId: 'pa-alpha-aws', name: 'Dashboard', status: ProvisioningStatus.Succeeded, resourceType: 'dashboard', createdAt: '2023-07-01T00:00:00Z' },
  ],
  healthChecks: [
    { id: 'hc-1', name: 'Cred Check', description: 'Check cred expiry', targetEntityType: TargetEntityType.Credential, severity: Severity.Critical },
  ],
  healthCheckBindings: [
    { id: 'hcb-1', healthCheckId: 'hc-1', targetEntityId: 'cred-active', targetEntityType: TargetEntityType.Credential, enabled: true },
    { id: 'hcb-2', healthCheckId: 'hc-1', targetEntityId: 'cred-expired', targetEntityType: TargetEntityType.Credential, enabled: false },
  ],
  healthCheckRuns: [
    { id: 'hcr-1', bindingId: 'hcb-1', status: RunStatus.Passed, ranAt: '2026-04-07T06:00:00Z', durationMs: 100 },
    { id: 'hcr-2', bindingId: 'hcb-1', status: RunStatus.Failed, ranAt: '2026-04-06T06:00:00Z', durationMs: 90 },
    { id: 'hcr-3', bindingId: 'hcb-1', status: RunStatus.Passed, ranAt: '2026-04-05T06:00:00Z', durationMs: 85 },
    { id: 'hcr-4', bindingId: 'hcb-2', status: RunStatus.Failed, ranAt: '2026-04-07T07:00:00Z' },
  ],
  scheduledTasks: [
    { id: 'st-1', orgId: 'o-alpha', type: TaskType.IntegrationRun, targetId: 'int-alpha-1', schedule: '0 2 * * *', status: TaskStatus.Active },
  ],
};

const emptyDb: Database = {
  providers: [],
  orgs: [],
  providerAccounts: [],
  credentialTypes: [],
  credentials: [],
  configSchemas: [],
  configs: [],
  integrationRuntimes: [],
  integrationTypes: [],
  integrations: [],
  provisionings: [],
  healthChecks: [],
  healthCheckBindings: [],
  healthCheckRuns: [],
  scheduledTasks: [],
};

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('makeApi()', () => {
  it('returns an object with the expected API methods', () => {
    const api = makeApi(db);
    expect(typeof api.getProviders).toBe('function');
    expect(typeof api.getOrgs).toBe('function');
    expect(typeof api.getProviderAccounts).toBe('function');
    expect(typeof api.getCredentials).toBe('function');
    expect(typeof api.getIntegrations).toBe('function');
    expect(typeof api.getIntegrationGraph).toBe('function');
    expect(typeof api.getHealthCheckRuns).toBe('function');
    expect(typeof api.getScheduledTasks).toBe('function');
  });
});

describe('Providers', () => {
  const api = makeApi(db);

  it('getProviders() returns all providers', () => {
    expect(api.getProviders()).toHaveLength(3);
  });

  it('getProvider(id) returns correct provider', () => {
    expect(api.getProvider('p-aws')?.name).toBe('AWS');
  });

  it('getProvider(id) returns undefined for unknown id', () => {
    expect(api.getProvider('nonexistent')).toBeUndefined();
  });

  it('getProvidersByCategory() groups correctly', () => {
    const grouped = api.getProvidersByCategory();
    expect(grouped[ProviderCategory.Cloud]).toHaveLength(1);
    expect(grouped[ProviderCategory.Vulnerability]).toHaveLength(1);
    expect(grouped[ProviderCategory.SIEM]).toHaveLength(1);
    expect(grouped[ProviderCategory.Cloud][0].id).toBe('p-aws');
  });
});

describe('Orgs', () => {
  const api = makeApi(db);

  it('getOrgs() returns all orgs', () => {
    expect(api.getOrgs()).toHaveLength(2);
  });

  it('getOrg(id) returns correct org', () => {
    expect(api.getOrg('o-alpha')?.name).toBe('Alpha Corp');
  });

  it('getOrg(id) returns undefined for unknown id', () => {
    expect(api.getOrg('does-not-exist')).toBeUndefined();
  });
});

describe('ProviderAccounts', () => {
  const api = makeApi(db);

  it('getProviderAccounts() returns all accounts when no filter', () => {
    expect(api.getProviderAccounts()).toHaveLength(3);
  });

  it('getProviderAccounts({ orgId }) filters by org', () => {
    const accounts = api.getProviderAccounts({ orgId: 'o-alpha' });
    expect(accounts).toHaveLength(2);
    expect(accounts.every((a) => a.orgId === 'o-alpha')).toBe(true);
  });

  it('getProviderAccounts({ providerId }) filters by provider', () => {
    const accounts = api.getProviderAccounts({ providerId: 'p-aws' });
    expect(accounts).toHaveLength(2);
    expect(accounts.every((a) => a.providerId === 'p-aws')).toBe(true);
  });

  it('getProviderAccount(id) returns correct account', () => {
    expect(api.getProviderAccount('pa-alpha-aws')?.name).toBe('Alpha AWS');
  });

  it('getProviderAccount(id) returns undefined for unknown id', () => {
    expect(api.getProviderAccount('unknown')).toBeUndefined();
  });
});

describe('Credentials', () => {
  const api = makeApi(db);

  it('getCredentials() returns all credentials', () => {
    expect(api.getCredentials()).toHaveLength(3);
  });

  it('getCredentials({ providerAccountId }) filters correctly', () => {
    const creds = api.getCredentials({ providerAccountId: 'pa-alpha-aws' });
    expect(creds).toHaveLength(2);
    expect(creds.every((c) => c.providerAccountId === 'pa-alpha-aws')).toBe(true);
  });

  it('getCredential(id) returns correct credential', () => {
    expect(api.getCredential('cred-active')?.name).toBe('Active Cred');
  });

  it('getCredential(id) returns undefined for unknown id', () => {
    expect(api.getCredential('nope')).toBeUndefined();
  });

  it('getExpiredCredentials() returns only expired credentials', () => {
    const expired = api.getExpiredCredentials();
    expect(expired).toHaveLength(1);
    expect(expired[0].id).toBe('cred-expired');
  });

  it('getExpiringCredentials(days) returns credentials expiring within the window', () => {
    // cred-expiring expires in ~5 days; cred-active expires in 2030; cred-expired is already expired
    const expiring = api.getExpiringCredentials(7);
    expect(expiring).toHaveLength(1);
    expect(expiring[0].id).toBe('cred-expiring');
  });

  it('getExpiringCredentials(days) does not include already-expired credentials', () => {
    const expiring = api.getExpiringCredentials(365 * 10);
    expect(expiring.every((c) => c.status !== CredentialStatus.Expired)).toBe(true);
  });
});

describe('Configs', () => {
  const api = makeApi(db);

  it('getConfigs() returns all configs', () => {
    expect(api.getConfigs()).toHaveLength(1);
  });

  it('getConfigs({ providerAccountId }) filters correctly', () => {
    expect(api.getConfigs({ providerAccountId: 'pa-alpha-qualys' })).toHaveLength(1);
    expect(api.getConfigs({ providerAccountId: 'pa-beta-aws' })).toHaveLength(0);
  });

  it('getConfig(id) returns correct config', () => {
    expect(api.getConfig('cfg-alpha-qualys')?.values).toEqual({ domain: 'q.example.com' });
  });
});

describe('IntegrationTypes', () => {
  const api = makeApi(db);

  it('getIntegrationTypes() returns all types', () => {
    expect(api.getIntegrationTypes()).toHaveLength(1);
  });

  it('getIntegrationType(id) returns correct type', () => {
    expect(api.getIntegrationType('it-q-aws')?.version).toBe('1.0');
  });

  it('getIntegrationType(id) returns undefined for unknown id', () => {
    expect(api.getIntegrationType('unknown')).toBeUndefined();
  });
});

describe('Integrations', () => {
  const api = makeApi(db);

  it('getIntegrations() returns all integrations', () => {
    expect(api.getIntegrations()).toHaveLength(2);
  });

  it('getIntegrations({ orgId }) filters by org', () => {
    expect(api.getIntegrations({ orgId: 'o-alpha' })).toHaveLength(1);
    expect(api.getIntegrations({ orgId: 'o-beta' })).toHaveLength(1);
  });

  it('getIntegration(id) returns correct integration', () => {
    expect(api.getIntegration('int-alpha-1')?.name).toBe('Alpha Q→AWS');
  });

  it('getIntegration(id) returns undefined for unknown id', () => {
    expect(api.getIntegration('nope')).toBeUndefined();
  });

  it('getIntegrationGraph(orgId) returns correct nodes and edges', () => {
    const graph = api.getIntegrationGraph('o-alpha');
    expect(graph.edges).toHaveLength(1);
    expect(graph.edges[0].id).toBe('int-alpha-1');
    // nodes should include source and target accounts
    const nodeIds = graph.nodes.map((n) => n.id);
    expect(nodeIds).toContain('pa-alpha-qualys');
    expect(nodeIds).toContain('pa-alpha-aws');
  });

  it('getIntegrationGraph(orgId) returns empty graph for org with no integrations', () => {
    const graph = api.getIntegrationGraph('o-nonexistent');
    expect(graph.nodes).toHaveLength(0);
    expect(graph.edges).toHaveLength(0);
  });
});

describe('HealthChecks', () => {
  const api = makeApi(db);

  it('getHealthChecks() returns all health checks', () => {
    expect(api.getHealthChecks()).toHaveLength(1);
  });

  it('getHealthChecks({ targetEntityType }) filters correctly', () => {
    expect(api.getHealthChecks({ targetEntityType: TargetEntityType.Credential })).toHaveLength(1);
    expect(api.getHealthChecks({ targetEntityType: TargetEntityType.Integration })).toHaveLength(0);
  });

  it('getHealthCheckBindings() returns all bindings', () => {
    expect(api.getHealthCheckBindings()).toHaveLength(2);
  });

  it('getHealthCheckBindings({ healthCheckId }) filters correctly', () => {
    expect(api.getHealthCheckBindings({ healthCheckId: 'hc-1' })).toHaveLength(2);
    expect(api.getHealthCheckBindings({ healthCheckId: 'hc-unknown' })).toHaveLength(0);
  });

  it('getHealthCheckRuns(bindingId) returns runs sorted newest-first', () => {
    const runs = api.getHealthCheckRuns('hcb-1');
    expect(runs).toHaveLength(3);
    expect(runs[0].id).toBe('hcr-1'); // 2026-04-07 is newest
    expect(runs[1].id).toBe('hcr-2');
    expect(runs[2].id).toBe('hcr-3');
  });

  it('getHealthCheckRuns(bindingId) returns empty array for unknown binding', () => {
    expect(api.getHealthCheckRuns('hcb-unknown')).toHaveLength(0);
  });
});

describe('ScheduledTasks', () => {
  const api = makeApi(db);

  it('getScheduledTasks() returns all tasks', () => {
    expect(api.getScheduledTasks()).toHaveLength(1);
  });

  it('getScheduledTasks({ orgId }) filters by org', () => {
    expect(api.getScheduledTasks({ orgId: 'o-alpha' })).toHaveLength(1);
    expect(api.getScheduledTasks({ orgId: 'o-beta' })).toHaveLength(0);
  });
});

describe('Provisionings', () => {
  const api = makeApi(db);

  it('getProvisionings() returns all provisionings', () => {
    expect(api.getProvisionings()).toHaveLength(1);
  });

  it('getProvisionings({ providerAccountId }) filters correctly', () => {
    expect(api.getProvisionings({ providerAccountId: 'pa-alpha-aws' })).toHaveLength(1);
    expect(api.getProvisionings({ providerAccountId: 'pa-beta-aws' })).toHaveLength(0);
  });
});

describe('Empty database', () => {
  const api = makeApi(emptyDb);

  it('getProviders() returns empty array', () => expect(api.getProviders()).toHaveLength(0));
  it('getOrgs() returns empty array', () => expect(api.getOrgs()).toHaveLength(0));
  it('getProviderAccounts() returns empty array', () => expect(api.getProviderAccounts()).toHaveLength(0));
  it('getCredentials() returns empty array', () => expect(api.getCredentials()).toHaveLength(0));
  it('getExpiredCredentials() returns empty array', () => expect(api.getExpiredCredentials()).toHaveLength(0));
  it('getExpiringCredentials(30) returns empty array', () => expect(api.getExpiringCredentials(30)).toHaveLength(0));
  it('getIntegrations() returns empty array', () => expect(api.getIntegrations()).toHaveLength(0));
  it('getIntegrationGraph(orgId) returns empty graph', () => {
    const graph = api.getIntegrationGraph('any-org');
    expect(graph.nodes).toHaveLength(0);
    expect(graph.edges).toHaveLength(0);
  });
  it('getHealthCheckRuns(bindingId) returns empty array', () => expect(api.getHealthCheckRuns('any')).toHaveLength(0));
  it('getProvisionings() returns empty array', () => expect(api.getProvisionings()).toHaveLength(0));
  it('getScheduledTasks() returns empty array', () => expect(api.getScheduledTasks()).toHaveLength(0));
});
