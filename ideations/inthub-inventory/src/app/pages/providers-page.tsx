import type { ReactElement } from 'react';
import { makeApi } from '@rp-vibe-ideation/inthub-api';
import { database } from '@rp-vibe-ideation/inthub-data-inventory';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const api = makeApi(database);
const providers = api.getProviders();

export function ProvidersPage(): ReactElement {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Providers</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {providers.map((provider) => (
            <TableRow key={provider.id}>
              <TableCell className="font-medium">{provider.name}</TableCell>
              <TableCell>
                <Badge variant="outline">{provider.category}</Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {provider.description ?? '—'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
