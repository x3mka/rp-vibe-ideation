import type { ReactElement } from 'react';
import { makeApi } from '@rp-vibe-ideation/inthub-api';
import { database } from '@rp-vibe-ideation/inthub-data';
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
import type { ProviderAccountStatus, ProviderAccountOwner } from '@rp-vibe-ideation/inthub-entities';

const api = makeApi(database);

function ownerVariant(owner: ProviderAccountOwner): BadgeProps['variant'] {
  return owner === 'SHQ' ? 'default' : 'secondary';
}

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

export function ProviderAccountsPage({
  selectedOrgId,
}: {
  selectedOrgId: string | null;
}): ReactElement {
  const providerAccounts = api.getProviderAccounts(selectedOrgId ? { orgId: selectedOrgId } : {});

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Provider Accounts</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Owner</TableHead>
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
              <TableCell><Badge variant={ownerVariant(pa.owner)}>{pa.owner}</Badge></TableCell>
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
