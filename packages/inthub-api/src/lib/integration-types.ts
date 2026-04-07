import type { Database, IntegrationType } from '@rp-vibe-ideation/inthub-entities';

export interface IntegrationTypesApi {
  getIntegrationTypes(): IntegrationType[];
  getIntegrationType(id: string): IntegrationType | undefined;
}

export function makeIntegrationTypesApi(db: Database): IntegrationTypesApi {
  return {
    getIntegrationTypes(): IntegrationType[] {
      return db.integrationTypes;
    },

    getIntegrationType(id: string): IntegrationType | undefined {
      return db.integrationTypes.find((t) => t.id === id);
    },
  };
}
