export enum ProvisioningStatus {
  Pending = 'Pending',
  Running = 'Running',
  Succeeded = 'Succeeded',
  Failed = 'Failed',
  Skipped = 'Skipped',
}

export interface Provisioning {
  id: string;
  providerAccountId: string;
  name: string;
  status: ProvisioningStatus;
  resourceType: string;
  resourceId?: string;
  createdAt: string;
  completedAt?: string;
}
