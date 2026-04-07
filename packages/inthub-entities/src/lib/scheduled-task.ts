export enum TaskType {
  IntegrationRun = 'IntegrationRun',
  HealthCheck = 'HealthCheck',
  Provisioning = 'Provisioning',
}

export enum TaskStatus {
  Active = 'Active',
  Paused = 'Paused',
  Completed = 'Completed',
  Failed = 'Failed',
}

export interface ScheduledTask {
  id: string;
  orgId: string;
  type: TaskType;
  targetId: string;
  schedule: string;
  status: TaskStatus;
  lastRunAt?: string;
  nextRunAt?: string;
}
