export enum IntegrationTypeStatus {
  Active = 'Active',
  Deprecated = 'Deprecated',
  Draft = 'Draft',
}

export enum IntegrationTypeKind {
  DataPipeline = 'DataPipeline',
  Provisioning = 'Provisioning',
}

export interface IntegrationType {
  id: string;
  name: string;
  kind: IntegrationTypeKind;
  sourceProviderId?: string;
  targetProviderId: string;
  runtimeId: string;
  version: string;
  dagId?: string;
  status: IntegrationTypeStatus;
  description?: string;
  defaultSchedule?: string;
}
