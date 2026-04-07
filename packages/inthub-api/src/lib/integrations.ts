import type { Database, Integration, ProviderAccount } from '@rp-vibe-ideation/inthub-entities';

export interface IntegrationFilter {
  orgId?: string;
  integrationTypeId?: string;
}

export interface IntegrationGraph {
  nodes: ProviderAccount[];
  edges: Integration[];
}

export interface IntegrationsApi {
  getIntegrations(filter?: IntegrationFilter): Integration[];
  getIntegration(id: string): Integration | undefined;
  getIntegrationGraph(orgId: string): IntegrationGraph;
}

export function makeIntegrationsApi(db: Database): IntegrationsApi {
  return {
    getIntegrations(filter?: IntegrationFilter): Integration[] {
      let integrations = db.integrations;
      if (filter?.orgId !== undefined) {
        integrations = integrations.filter((i) => i.orgId === filter.orgId);
      }
      if (filter?.integrationTypeId !== undefined) {
        integrations = integrations.filter(
          (i) => i.integrationTypeId === filter.integrationTypeId,
        );
      }
      return integrations;
    },

    getIntegration(id: string): Integration | undefined {
      return db.integrations.find((i) => i.id === id);
    },

    getIntegrationGraph(orgId: string): IntegrationGraph {
      const orgIntegrations = db.integrations.filter((i) => i.orgId === orgId);
      const accountIds = new Set<string>();
      for (const integration of orgIntegrations) {
        accountIds.add(integration.sourceAccountId);
        accountIds.add(integration.targetAccountId);
      }
      const nodes = db.providerAccounts.filter((a) => accountIds.has(a.id));
      return { nodes, edges: orgIntegrations };
    },
  };
}
