export enum ProviderAccountStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  Suspended = 'Suspended',
}

export enum ProviderAccountOwner {
  Customer = 'Customer',
  SHQ = 'SHQ',
}

export interface ProviderAccount {
  id: string;
  orgId: string;
  providerId: string;
  name: string;
  externalId: string;
  status: ProviderAccountStatus;
  owner: ProviderAccountOwner;
  config?: Record<string, unknown>;
}
