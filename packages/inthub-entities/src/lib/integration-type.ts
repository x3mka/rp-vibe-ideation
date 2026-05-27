export enum IntegrationTypeStatus {
  Active = 'Active',
  Deprecated = 'Deprecated',
  Draft = 'Draft',
}

export enum IntegrationTypeKind {
  DataPipeline = 'DataPipeline',
  Provisioning = 'Provisioning',
  Assessment = 'Assessment',
}

export interface IntegrationType {
  id: string;
  name: string;
  kind: IntegrationTypeKind;
  providerId?: string;
  runtimeId: string;
  version: string;
  status: IntegrationTypeStatus;
  description?: string;
  defaultSchedule?: string;
  config?: Record<string, unknown>;
  configSchema?: Record<string, unknown>;
}
