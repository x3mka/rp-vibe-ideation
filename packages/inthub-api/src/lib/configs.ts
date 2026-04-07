import type { Database, Config } from '@rp-vibe-ideation/inthub-entities';

export interface ConfigFilter {
  providerAccountId?: string;
  configSchemaId?: string;
}

export interface ConfigsApi {
  getConfigs(filter?: ConfigFilter): Config[];
  getConfig(id: string): Config | undefined;
}

export function makeConfigsApi(db: Database): ConfigsApi {
  return {
    getConfigs(filter?: ConfigFilter): Config[] {
      let configs = db.configs;
      if (filter?.providerAccountId !== undefined) {
        configs = configs.filter((c) => c.providerAccountId === filter.providerAccountId);
      }
      if (filter?.configSchemaId !== undefined) {
        configs = configs.filter((c) => c.configSchemaId === filter.configSchemaId);
      }
      return configs;
    },

    getConfig(id: string): Config | undefined {
      return db.configs.find((c) => c.id === id);
    },
  };
}
