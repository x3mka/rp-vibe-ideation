import type { ReactElement } from 'react';
import { makeApi } from '@rp-vibe-ideation/inthub-api';
import { database } from '@rp-vibe-ideation/inthub-data-inventory';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const api = makeApi(database);
const credentialTypes = database.credentialTypes;

export function CredentialTypesPage(): ReactElement {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Credential Types</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Provider</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Fields</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {credentialTypes.map((ct) => (
            <TableRow key={ct.id}>
              <TableCell className="font-medium">
                {api.getProvider(ct.providerId)?.name ?? '—'}
              </TableCell>
              <TableCell>{ct.name}</TableCell>
              <TableCell className="text-muted-foreground">{ct.description ?? '—'}</TableCell>
              <TableCell className="text-muted-foreground text-xs">{ct.fields.join(', ')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
