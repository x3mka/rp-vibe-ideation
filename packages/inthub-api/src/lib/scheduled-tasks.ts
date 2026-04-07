import type { Database, ScheduledTask } from '@rp-vibe-ideation/inthub-entities';

export interface ScheduledTaskFilter {
  orgId?: string;
  type?: string;
}

export interface ScheduledTasksApi {
  getScheduledTasks(filter?: ScheduledTaskFilter): ScheduledTask[];
}

export function makeScheduledTasksApi(db: Database): ScheduledTasksApi {
  return {
    getScheduledTasks(filter?: ScheduledTaskFilter): ScheduledTask[] {
      let tasks = db.scheduledTasks;
      if (filter?.orgId !== undefined) {
        tasks = tasks.filter((t) => t.orgId === filter.orgId);
      }
      if (filter?.type !== undefined) {
        tasks = tasks.filter((t) => t.type === filter.type);
      }
      return tasks;
    },
  };
}
