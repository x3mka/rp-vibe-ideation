import type { TargetEntityType } from './health-check.js';

export interface HealthCheckBinding {
  id: string;
  healthCheckId: string;
  targetEntityId: string;
  targetEntityType: TargetEntityType;
  params?: Record<string, unknown>;
  enabled: boolean;
}
