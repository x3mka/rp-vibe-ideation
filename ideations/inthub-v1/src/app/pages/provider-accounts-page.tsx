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
import type { AccountStatus, AccountOwner } from '@rp-vibe-ideation/inthub-entities';

const api = makeApi(database);

function ownerVariant(owner: AccountOwner): BadgeProps['variant'] {
  return owner === 'SHQ' ? 'default' : 'secondary';
}

function accountStatusVariant(status: AccountStatus): BadgeProps['variant'] {
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

export function AccountsPage({
  selectedOrgId,
}: {
  selectedOrgId: string | null;
}): ReactElement {
  const accounts = api.getAccounts(selectedOrgId ? { orgId: selectedOrgId } : {});

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Accounts</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Org</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead>External ID</TableHead>
            <TableHead>Config</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((acc) => (
            <TableRow key={acc.id}>
              <TableCell className="font-medium">{acc.name}</TableCell>
              <TableCell><Badge variant={ownerVariant(acc.owner)}>{acc.owner}</Badge></TableCell>
              <TableCell>{api.getOrg(acc.orgId)?.name ?? '—'}</TableCell>
              <TableCell>{api.getProvider(acc.providerId)?.name ?? '—'}</TableCell>
              <TableCell className="text-muted-foreground text-xs font-mono">{acc.externalId}</TableCell>
              <TableCell className="text-muted-foreground text-xs font-mono">
                {acc.config
                  ? Object.entries(acc.config).map(([k, v]) => `${k}: ${String(v)}`).join(', ')
                  : '—'}
              </TableCell>
              <TableCell>
                <Badge variant={accountStatusVariant(acc.status)}>{acc.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
