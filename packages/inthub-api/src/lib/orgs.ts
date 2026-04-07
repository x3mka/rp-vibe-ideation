import type { Database, Org } from '@rp-vibe-ideation/inthub-entities';

export interface OrgsApi {
  getOrgs(): Org[];
  getOrg(id: string): Org | undefined;
}

export function makeOrgsApi(db: Database): OrgsApi {
  return {
    getOrgs(): Org[] {
      return db.orgs;
    },

    getOrg(id: string): Org | undefined {
      return db.orgs.find((o) => o.id === id);
    },
  };
}
