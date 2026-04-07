export enum TargetEntityType {
  Credential = 'Credential',
  ProviderAccount = 'ProviderAccount',
  Integration = 'Integration',
  Provisioning = 'Provisioning',
}

export enum Severity {
  Critical = 'Critical',
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
  Info = 'Info',
}

export interface HealthCheck {
  id: string;
  name: string;
  description: string;
  targetEntityType: TargetEntityType;
  providerId?: string;
  severity: Severity;
  defaultParams?: Record<string, unknown>;
}
