export enum CredentialStatus {
  Active = 'Active',
  Expiring = 'Expiring',
  Expired = 'Expired',
  Revoked = 'Revoked',
}

export interface Credential {
  id: string;
  providerAccountId: string;
  credentialTypeId: string;
  name: string;
  vaultPath: string;
  status: CredentialStatus;
  expiresAt?: string;
  rotatedAt?: string;
}
