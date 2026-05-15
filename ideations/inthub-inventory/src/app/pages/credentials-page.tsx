import type { ReactElement } from 'react';
import { makeApi } from '@rp-vibe-ideation/inthub-api';
import { database } from '@rp-vibe-ideation/inthub-data-inventory';
import { Badge } from '@/components/ui/badge';
import type { BadgeProps } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { CredentialStatus } from '@rp-vibe-ideation/inthub-entities';

const api = makeApi(database);

function credentialStatusVariant(status: CredentialStatus): BadgeProps['variant'] {
  switch (status) {
    case 'Active':
      return 'default';
    case 'Expiring':
      return 'secondary';
    case 'Expired':
      return 'destructive';
    case 'Revoked':
      return 'outline';
    default:
      return 'outline';
  }
}

export function CredentialsPage({
  selectedOrgId,
}: {
  selectedOrgId: string | null;
}): ReactElement {
  const allCredentials = api.getCredentials();
  const credentials = selectedOrgId
    ? allCredentials.filter((c) => {
        const account = api.getProviderAccount(c.providerAccountId);
        return account?.orgId === selectedOrgId;
      })
    : allCredentials;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Credentials</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Provider Account</TableHead>
            <TableHead>Org</TableHead>
            <TableHead>Credential Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Expires At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {credentials.map((cred) => {
            const pa = api.getProviderAccount(cred.providerAccountId);
            const org = pa ? api.getOrg(pa.orgId) : undefined;
            const ctName =
              database.credentialTypes.find((ct) => ct.id === cred.credentialTypeId)?.name ?? '—';
            return (
              <TableRow key={cred.id}>
                <TableCell className="font-medium">{cred.name}</TableCell>
                <TableCell>{pa?.name ?? '—'}</TableCell>
                <TableCell>{org?.name ?? '—'}</TableCell>
                <TableCell>{ctName}</TableCell>
                <TableCell>
                  <Badge variant={credentialStatusVariant(cred.status)}>{cred.status}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {cred.expiresAt ? new Date(cred.expiresAt).toLocaleDateString() : '—'}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
