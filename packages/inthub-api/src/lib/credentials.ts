import type { Database, Credential } from '@rp-vibe-ideation/inthub-entities';
import { CredentialStatus } from '@rp-vibe-ideation/inthub-entities';

export interface CredentialFilter {
  providerAccountId?: string;
  credentialTypeId?: string;
}

export interface CredentialsApi {
  getCredentials(filter?: CredentialFilter): Credential[];
  getCredential(id: string): Credential | undefined;
  getExpiredCredentials(): Credential[];
  getExpiringCredentials(withinDays: number): Credential[];
}

export function makeCredentialsApi(db: Database): CredentialsApi {
  return {
    getCredentials(filter?: CredentialFilter): Credential[] {
      let creds = db.credentials;
      if (filter?.providerAccountId !== undefined) {
        creds = creds.filter((c) => c.providerAccountId === filter.providerAccountId);
      }
      if (filter?.credentialTypeId !== undefined) {
        creds = creds.filter((c) => c.credentialTypeId === filter.credentialTypeId);
      }
      return creds;
    },

    getCredential(id: string): Credential | undefined {
      return db.credentials.find((c) => c.id === id);
    },

    getExpiredCredentials(): Credential[] {
      return db.credentials.filter((c) => c.status === CredentialStatus.Expired);
    },

    getExpiringCredentials(withinDays: number): Credential[] {
      const now = Date.now();
      const cutoff = now + withinDays * 24 * 60 * 60 * 1000;
      return db.credentials.filter((c) => {
        if (c.status === CredentialStatus.Expired) return false;
        if (!c.expiresAt) return false;
        const expiry = new Date(c.expiresAt).getTime();
        return expiry <= cutoff && expiry > now;
      });
    },
  };
}
