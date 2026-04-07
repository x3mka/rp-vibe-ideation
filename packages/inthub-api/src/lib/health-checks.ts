import type {
  Database,
  HealthCheck,
  HealthCheckBinding,
  HealthCheckRun,
} from '@rp-vibe-ideation/inthub-entities';

export interface HealthCheckFilter {
  targetEntityType?: string;
  providerId?: string;
}

export interface HealthCheckBindingFilter {
  healthCheckId?: string;
  targetEntityId?: string;
}

export interface HealthChecksApi {
  getHealthChecks(filter?: HealthCheckFilter): HealthCheck[];
  getHealthCheckBindings(filter?: HealthCheckBindingFilter): HealthCheckBinding[];
  getHealthCheckRuns(bindingId: string): HealthCheckRun[];
}

export function makeHealthChecksApi(db: Database): HealthChecksApi {
  return {
    getHealthChecks(filter?: HealthCheckFilter): HealthCheck[] {
      let checks = db.healthChecks;
      if (filter?.targetEntityType !== undefined) {
        checks = checks.filter((c) => c.targetEntityType === filter.targetEntityType);
      }
      if (filter?.providerId !== undefined) {
        checks = checks.filter((c) => c.providerId === filter.providerId);
      }
      return checks;
    },

    getHealthCheckBindings(filter?: HealthCheckBindingFilter): HealthCheckBinding[] {
      let bindings = db.healthCheckBindings;
      if (filter?.healthCheckId !== undefined) {
        bindings = bindings.filter((b) => b.healthCheckId === filter.healthCheckId);
      }
      if (filter?.targetEntityId !== undefined) {
        bindings = bindings.filter((b) => b.targetEntityId === filter.targetEntityId);
      }
      return bindings;
    },

    getHealthCheckRuns(bindingId: string): HealthCheckRun[] {
      return db.healthCheckRuns
        .filter((r) => r.bindingId === bindingId)
        .sort((a, b) => new Date(b.ranAt).getTime() - new Date(a.ranAt).getTime());
    },
  };
}
