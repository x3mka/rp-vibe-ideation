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
import type { ProviderAccountStatus } from '@rp-vibe-ideation/inthub-entities';

const api = makeApi(database);
const providerAccounts = api.getProviderAccounts();

function accountStatusVariant(status: ProviderAccountStatus): BadgeProps['variant'] {
  switch (status) {
    case 'Active':
      return 'default';
    case 'Inactive':
      return 'secondary';
    case 'Suspended':
      return 'destructive';
    default:
      return 'outline';
  }
}

export function ProviderAccountsPage(): ReactElement {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Provider Accounts</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Org</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead>External ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Region</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {providerAccounts.map((pa) => (
            <TableRow key={pa.id}>
              <TableCell className="font-medium">{pa.name}</TableCell>
              <TableCell>{api.getOrg(pa.orgId)?.name ?? '—'}</TableCell>
              <TableCell>{api.getProvider(pa.providerId)?.name ?? '—'}</TableCell>
              <TableCell className="text-muted-foreground text-xs font-mono">{pa.externalId}</TableCell>
              <TableCell>
                <Badge variant={accountStatusVariant(pa.status)}>{pa.status}</Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">{pa.region ?? '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
