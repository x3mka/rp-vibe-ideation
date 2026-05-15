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
import type { OrgStatus } from '@rp-vibe-ideation/inthub-entities';

const api = makeApi(database);
const orgs = api.getOrgs();

function orgStatusVariant(status: OrgStatus): BadgeProps['variant'] {
  switch (status) {
    case 'Active':
      return 'default';
    case 'Offboarding':
      return 'secondary';
    case 'Suspended':
      return 'destructive';
    default:
      return 'outline';
  }
}

export function OrgsPage(): ReactElement {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Orgs</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Provider Accounts</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orgs.map((org) => {
            const accountCount = api.getProviderAccounts({ orgId: org.id }).length;
            return (
              <TableRow key={org.id}>
                <TableCell className="font-medium">{org.name}</TableCell>
                <TableCell>
                  <Badge variant={orgStatusVariant(org.status)}>{org.status}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(org.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{accountCount}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
