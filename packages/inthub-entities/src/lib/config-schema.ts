export enum ConfigPurpose {
  Integration = 'Integration',
  Provisioning = 'Provisioning',
  HealthCheck = 'HealthCheck',
}

export interface ConfigSchema {
  id: string;
  providerId: string;
  purpose: ConfigPurpose;
  name: string;
  schema: Record<string, unknown>;
}
