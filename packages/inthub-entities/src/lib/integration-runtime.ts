export enum RuntimeType {
  Astronomer = 'Astronomer',
  N8N = 'N8N',
  EKS = 'EKS',
  Other = 'Other',
}

export enum RuntimeStatus {
  Active = 'Active',
  Maintenance = 'Maintenance',
  Offline = 'Offline',
}

export interface IntegrationRuntime {
  id: string;
  name: string;
  type: RuntimeType;
  status: RuntimeStatus;
  url?: string;
}
