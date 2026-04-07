export enum IntegrationTypeStatus {
  Active = 'Active',
  Deprecated = 'Deprecated',
  Draft = 'Draft',
}

export interface IntegrationType {
  id: string;
  name: string;
  sourceProviderId: string;
  targetProviderId: string;
  runtimeId: string;
  version: string;
  dagId?: string;
  status: IntegrationTypeStatus;
  description?: string;
}
