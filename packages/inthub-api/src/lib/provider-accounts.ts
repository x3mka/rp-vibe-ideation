import type { Database, ProviderAccount } from '@rp-vibe-ideation/inthub-entities';

export interface ProviderAccountFilter {
  orgId?: string;
  providerId?: string;
}

export interface ProviderAccountsApi {
  getProviderAccounts(filter?: ProviderAccountFilter): ProviderAccount[];
  getProviderAccount(id: string): ProviderAccount | undefined;
}

export function makeProviderAccountsApi(db: Database): ProviderAccountsApi {
  return {
    getProviderAccounts(filter?: ProviderAccountFilter): ProviderAccount[] {
      let accounts = db.providerAccounts;
      if (filter?.orgId !== undefined) {
        accounts = accounts.filter((a) => a.orgId === filter.orgId);
      }
      if (filter?.providerId !== undefined) {
        accounts = accounts.filter((a) => a.providerId === filter.providerId);
      }
      return accounts;
    },

    getProviderAccount(id: string): ProviderAccount | undefined {
      return db.providerAccounts.find((a) => a.id === id);
    },
  };
}
