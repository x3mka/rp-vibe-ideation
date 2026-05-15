import { database } from './data';

const db = database;

// ── Helpers ───────────────────────────────────────────────────────────────────

function ids<T extends { id: string }>(arr: T[]): Set<string> {
  return new Set(arr.map((x) => x.id));
}

function noDuplicates<T extends { id: string }>(arr: T[], label: string): void {
  const idList = arr.map((x) => x.id);
  const unique = new Set(idList);
  if (unique.size !== idList.length) {
    const dups = idList.filter((id, i) => idList.indexOf(id) !== i);
    throw new Error(`Duplicate IDs in ${label}: ${dups.join(', ')}`);
  }
}

function allExist(refs: string[], pool: Set<string>, label: string): void {
  const missing = refs.filter((ref) => !pool.has(ref));
  if (missing.length > 0) {
    throw new Error(`${label}: missing references: ${missing.join(', ')}`);
  }
}

// ── No duplicate IDs ──────────────────────────────────────────────────────────

describe('No duplicate IDs', () => {
  it('providers', () => noDuplicates(db.providers, 'providers'));
  it('orgs', () => noDuplicates(db.orgs, 'orgs'));
  it('providerAccounts', () => noDuplicates(db.providerAccounts, 'providerAccounts'));
  it('credentialTypes', () => noDuplicates(db.credentialTypes, 'credentialTypes'));
  it('credentials', () => noDuplicates(db.credentials, 'credentials'));
  it('configSchemas', () => noDuplicates(db.configSchemas, 'configSchemas'));
  it('configs', () => noDuplicates(db.configs, 'configs'));
  it('integrationRuntimes', () => noDuplicates(db.integrationRuntimes, 'integrationRuntimes'));
  it('integrationTypes', () => noDuplicates(db.integrationTypes, 'integrationTypes'));
  it('integrations', () => noDuplicates(db.integrations, 'integrations'));
  it('provisionings', () => noDuplicates(db.provisionings, 'provisionings'));
  it('healthChecks', () => noDuplicates(db.healthChecks, 'healthChecks'));
  it('healthCheckBindings', () => noDuplicates(db.healthCheckBindings, 'healthCheckBindings'));
  it('healthCheckRuns', () => noDuplicates(db.healthCheckRuns, 'healthCheckRuns'));
  it('scheduledTasks', () => noDuplicates(db.scheduledTasks, 'scheduledTasks'));
});

// ── Foreign key integrity ─────────────────────────────────────────────────────

describe('Foreign key integrity', () => {
  const providerIds = ids(db.providers);
  const orgIds = ids(db.orgs);
  const providerAccountIds = ids(db.providerAccounts);
  const credentialTypeIds = ids(db.credentialTypes);
  const configSchemaIds = ids(db.configSchemas);
  const integrationTypeIds = ids(db.integrationTypes);
  const healthCheckIds = ids(db.healthChecks);
  const healthCheckBindingIds = ids(db.healthCheckBindings);

  it('ProviderAccount.providerId → providers', () => {
    allExist(db.providerAccounts.map((a) => a.providerId), providerIds, 'ProviderAccount.providerId');
  });

  it('ProviderAccount.orgId → orgs', () => {
    allExist(db.providerAccounts.map((a) => a.orgId), orgIds, 'ProviderAccount.orgId');
  });

  it('Credential.providerAccountId → providerAccounts', () => {
    allExist(db.credentials.map((c) => c.providerAccountId), providerAccountIds, 'Credential.providerAccountId');
  });

  it('Credential.credentialTypeId → credentialTypes', () => {
    allExist(db.credentials.map((c) => c.credentialTypeId), credentialTypeIds, 'Credential.credentialTypeId');
  });

  it('Config.providerAccountId → providerAccounts', () => {
    allExist(db.configs.map((c) => c.providerAccountId), providerAccountIds, 'Config.providerAccountId');
  });

  it('Config.configSchemaId → configSchemas', () => {
    allExist(db.configs.map((c) => c.configSchemaId), configSchemaIds, 'Config.configSchemaId');
  });

  it('Integration.orgId → orgs', () => {
    allExist(db.integrations.map((i) => i.orgId), orgIds, 'Integration.orgId');
  });

  it('Integration.integrationTypeId → integrationTypes', () => {
    allExist(db.integrations.map((i) => i.integrationTypeId), integrationTypeIds, 'Integration.integrationTypeId');
  });

  it('Integration.sourceAccountId → providerAccounts', () => {
    allExist(db.integrations.map((i) => i.sourceAccountId), providerAccountIds, 'Integration.sourceAccountId');
  });

  it('Integration.targetAccountId → providerAccounts', () => {
    allExist(db.integrations.map((i) => i.targetAccountId), providerAccountIds, 'Integration.targetAccountId');
  });

  it('HealthCheckBinding.healthCheckId → healthChecks', () => {
    allExist(db.healthCheckBindings.map((b) => b.healthCheckId), healthCheckIds, 'HealthCheckBinding.healthCheckId');
  });

  it('HealthCheckRun.bindingId → healthCheckBindings', () => {
    allExist(db.healthCheckRuns.map((r) => r.bindingId), healthCheckBindingIds, 'HealthCheckRun.bindingId');
  });

  it('ScheduledTask.orgId → orgs', () => {
    allExist(db.scheduledTasks.map((t) => t.orgId), orgIds, 'ScheduledTask.orgId');
  });
});

// ── Non-empty dataset checks ──────────────────────────────────────────────────

describe('Dataset non-empty requirements', () => {
  it('has at least 2 orgs', () => {
    expect(db.orgs.length).toBeGreaterThanOrEqual(2);
  });

  it('has at least 3 providers', () => {
    expect(db.providers.length).toBeGreaterThanOrEqual(3);
  });

  it('has at least 1 integration', () => {
    expect(db.integrations.length).toBeGreaterThanOrEqual(1);
  });

  it('covers all 15 entity types (non-empty arrays)', () => {
    expect(db.providers.length).toBeGreaterThan(0);
    expect(db.orgs.length).toBeGreaterThan(0);
    expect(db.providerAccounts.length).toBeGreaterThan(0);
    expect(db.credentialTypes.length).toBeGreaterThan(0);
    expect(db.credentials.length).toBeGreaterThan(0);
    expect(db.configSchemas.length).toBeGreaterThan(0);
    expect(db.configs.length).toBeGreaterThan(0);
    expect(db.integrationRuntimes.length).toBeGreaterThan(0);
    expect(db.integrationTypes.length).toBeGreaterThan(0);
    expect(db.integrations.length).toBeGreaterThan(0);
    expect(db.provisionings.length).toBeGreaterThan(0);
    expect(db.healthChecks.length).toBeGreaterThan(0);
    expect(db.healthCheckBindings.length).toBeGreaterThan(0);
    expect(db.healthCheckRuns.length).toBeGreaterThan(0);
    expect(db.scheduledTasks.length).toBeGreaterThan(0);
  });
});
