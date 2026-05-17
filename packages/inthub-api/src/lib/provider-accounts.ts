import type { Database, Account } from '@rp-vibe-ideation/inthub-entities';

export interface AccountFilter {
  orgId?: string;
  providerId?: string;
}

export interface AccountsApi {
  getAccounts(filter?: AccountFilter): Account[];
  getAccount(id: string): Account | undefined;
}

export function makeAccountsApi(db: Database): AccountsApi {
  return {
    getAccounts(filter?: AccountFilter): Account[] {
      let accounts = db.accounts;
      if (filter?.orgId !== undefined) {
        accounts = accounts.filter((a) => a.orgId === filter.orgId);
      }
      if (filter?.providerId !== undefined) {
        accounts = accounts.filter((a) => a.providerId === filter.providerId);
      }
      return accounts;
    },

    getAccount(id: string): Account | undefined {
      return db.accounts.find((a) => a.id === id);
    },
  };
}
