import type { Database, Provisioning } from '@rp-vibe-ideation/inthub-entities';

export interface ProvisioningFilter {
  providerAccountId?: string;
  status?: string;
}

export interface ProvisioningsApi {
  getProvisionings(filter?: ProvisioningFilter): Provisioning[];
}

export function makeProvisioningsApi(db: Database): ProvisioningsApi {
  return {
    getProvisionings(filter?: ProvisioningFilter): Provisioning[] {
      let provisionings = db.provisionings;
      if (filter?.providerAccountId !== undefined) {
        provisionings = provisionings.filter(
          (p) => p.providerAccountId === filter.providerAccountId,
        );
      }
      if (filter?.status !== undefined) {
        provisionings = provisionings.filter((p) => p.status === filter.status);
      }
      return provisionings;
    },
  };
}
