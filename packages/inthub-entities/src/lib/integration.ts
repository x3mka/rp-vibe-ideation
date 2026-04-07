export enum IntegrationStatus {
  Active = 'Active',
  Paused = 'Paused',
  Failed = 'Failed',
  Decommissioned = 'Decommissioned',
}

export interface Integration {
  id: string;
  orgId: string;
  integrationTypeId: string;
  sourceAccountId: string;
  targetAccountId: string;
  sourceCredentialId?: string;
  targetCredentialId?: string;
  name: string;
  status: IntegrationStatus;
  createdAt: string;
  lastRunAt?: string;
}
