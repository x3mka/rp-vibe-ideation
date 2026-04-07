export enum ProviderAccountStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  Suspended = 'Suspended',
}

export interface ProviderAccount {
  id: string;
  orgId: string;
  providerId: string;
  name: string;
  externalId: string;
  status: ProviderAccountStatus;
  region?: string;
}
