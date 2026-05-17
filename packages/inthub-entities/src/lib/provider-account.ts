export enum AccountStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  Suspended = 'Suspended',
}

export enum AccountOwner {
  Customer = 'Customer',
  SHQ = 'SHQ',
}

export interface Account {
  id: string;
  orgId: string;
  providerId: string;
  name: string;
  externalId: string;
  status: AccountStatus;
  owner: AccountOwner;
  config?: Record<string, unknown>;
}
