export interface CredentialType {
  id: string;
  providerId: string;
  name: string;
  description?: string;
  fields: string[];
}
