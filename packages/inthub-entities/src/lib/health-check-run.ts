export enum RunStatus {
  Passed = 'Passed',
  Failed = 'Failed',
  Skipped = 'Skipped',
  Error = 'Error',
}

export interface HealthCheckRun {
  id: string;
  bindingId: string;
  status: RunStatus;
  ranAt: string;
  durationMs?: number;
  message?: string;
  details?: Record<string, unknown>;
}
