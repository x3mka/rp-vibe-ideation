export enum ConfigStatus {
  Active = 'Active',
  Draft = 'Draft',
  Invalid = 'Invalid',
}

export interface Config {
  id: string;
  providerAccountId: string;
  configSchemaId: string;
  values: Record<string, unknown>;
  status: ConfigStatus;
}
