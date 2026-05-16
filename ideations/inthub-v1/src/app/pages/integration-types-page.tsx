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
import type { IntegrationTypeStatus, IntegrationTypeKind } from '@rp-vibe-ideation/inthub-entities';

const api = makeApi(database);
const integrationTypes = api.getIntegrationTypes();

function statusVariant(status: IntegrationTypeStatus): BadgeProps['variant'] {
  switch (status) {
    case 'Active':
      return 'default';
    case 'Draft':
      return 'secondary';
    case 'Deprecated':
      return 'destructive';
    default:
      return 'outline';
  }
}

function kindVariant(kind: IntegrationTypeKind): BadgeProps['variant'] {
  return kind === 'Provisioning' ? 'secondary' : 'outline';
}

export function IntegrationTypesPage(): ReactElement {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Integration Types</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Kind</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Runtime</TableHead>
            <TableHead>Version</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {integrationTypes.map((it) => {
            const runtime =
              database.integrationRuntimes.find((r) => r.id === it.runtimeId)?.name ?? '—';
            return (
              <TableRow key={it.id}>
                <TableCell className="font-medium">{it.name}</TableCell>
                <TableCell>
                  <Badge variant={kindVariant(it.kind)}>{it.kind}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">{it.description ?? '—'}</TableCell>
                <TableCell>{runtime}</TableCell>
                <TableCell className="text-muted-foreground">{it.version}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant(it.status)}>{it.status}</Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
