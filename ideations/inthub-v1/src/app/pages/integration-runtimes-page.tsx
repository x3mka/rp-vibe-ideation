import type { ReactElement } from 'react';
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
import type { RuntimeStatus } from '@rp-vibe-ideation/inthub-entities';

const runtimes = database.integrationRuntimes;

function runtimeStatusVariant(status: RuntimeStatus): BadgeProps['variant'] {
  switch (status) {
    case 'Active':
      return 'default';
    case 'Maintenance':
      return 'secondary';
    case 'Offline':
      return 'destructive';
    default:
      return 'outline';
  }
}

export function IntegrationRuntimesPage(): ReactElement {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Integration Runtimes</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>URL</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {runtimes.map((runtime) => (
            <TableRow key={runtime.id}>
              <TableCell className="font-medium">{runtime.name}</TableCell>
              <TableCell>
                <Badge variant="outline">{runtime.type}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={runtimeStatusVariant(runtime.status)}>{runtime.status}</Badge>
              </TableCell>
              <TableCell className="text-muted-foreground text-xs">{runtime.url ?? '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
