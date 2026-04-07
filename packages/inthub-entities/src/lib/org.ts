export enum OrgStatus {
  Active = 'Active',
  Suspended = 'Suspended',
  Offboarding = 'Offboarding',
}

export interface Org {
  id: string;
  name: string;
  status: OrgStatus;
  createdAt: string;
}
