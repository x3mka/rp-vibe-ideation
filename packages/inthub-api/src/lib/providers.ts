import type { Database, Provider, ProviderCategory } from '@rp-vibe-ideation/inthub-entities';

export interface ProvidersApi {
  getProviders(): Provider[];
  getProvider(id: string): Provider | undefined;
  getProvidersByCategory(): Record<ProviderCategory, Provider[]>;
}

export function makeProvidersApi(db: Database): ProvidersApi {
  return {
    getProviders(): Provider[] {
      return db.providers;
    },

    getProvider(id: string): Provider | undefined {
      return db.providers.find((p) => p.id === id);
    },

    getProvidersByCategory(): Record<ProviderCategory, Provider[]> {
      const result = {} as Record<ProviderCategory, Provider[]>;
      for (const provider of db.providers) {
        if (!result[provider.category]) {
          result[provider.category] = [];
        }
        result[provider.category].push(provider);
      }
      return result;
    },
  };
}
