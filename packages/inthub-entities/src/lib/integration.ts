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
  accountId?: string;
  credentialId?: string;
  name?: string;
  status: IntegrationStatus;
  schedule?: string;
  config?: Record<string, unknown>;
  createdAt: string;
  lastRunAt?: string;
}
