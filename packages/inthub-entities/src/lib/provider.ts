export enum ProviderCategory {
  Cloud = 'Cloud',
  Vulnerability = 'Vulnerability',
  SIEM = 'SIEM',
  Data = 'Data',
  ITSM = 'ITSM',
  Identity = 'Identity',
  Network = 'Network',
  Other = 'Other',
}

export interface Provider {
  id: string;
  name: string;
  category: ProviderCategory;
  description?: string;
  logoUrl?: string;
}
