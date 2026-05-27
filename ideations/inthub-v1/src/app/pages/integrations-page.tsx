import type { ReactElement } from 'react';
import { useState } from 'react';
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { IntegrationStatus } from '@rp-vibe-ideation/inthub-entities';

const api = makeApi(database);

function integrationStatusVariant(status: IntegrationStatus): BadgeProps['variant'] {
  switch (status) {
    case 'Active':
      return 'default';
    case 'Paused':
      return 'secondary';
    case 'Failed':
      return 'destructive';
    case 'Decommissioned':
      return 'outline';
    default:
      return 'outline';
  }
}

function describeCron(cron: string): string {
  const parts = cron.split(' ');
  if (parts.length !== 5) return '';
  const [minute, hour, , , weekday] = parts;
  if (minute.startsWith('*/')) return `Every ${minute.slice(2)} min`;
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  if (minute === '0' && hour !== '*' && weekday !== '*')
    return `Weekly ${days[parseInt(weekday, 10)]} at ${hour.padStart(2, '0')}:00`;
  if (minute === '0' && hour !== '*')
    return `Daily at ${hour.padStart(2, '0')}:00`;
  return '';
}

const providersByCategory = api.getProvidersByCategory();
const integrationTypeGroups = Object.entries(providersByCategory)
  .map(([category, providers]) => {
    const providerIds = new Set(providers.map((p) => p.id));
    const types = api.getIntegrationTypes().filter(
      (it) => it.providerId && providerIds.has(it.providerId),
    );
    return { category, types };
  })
  .filter((g) => g.types.length > 0);

export function IntegrationsPage({
  selectedOrgId,
}: {
  selectedOrgId: string | null;
}): ReactElement {
  const [selectedTypeId, setSelectedTypeId] = useState<string>('all');

  const integrations = api.getIntegrations({
    ...(selectedOrgId ? { orgId: selectedOrgId } : {}),
    ...(selectedTypeId !== 'all' ? { integrationTypeId: selectedTypeId } : {}),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Integrations</h2>
        <Select value={selectedTypeId} onValueChange={setSelectedTypeId}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="All integration types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All integration types</SelectItem>
            {integrationTypeGroups.map(({ category, types }) => (
              <SelectGroup key={category}>
                <SelectLabel>{category}</SelectLabel>
                {types.map((it) => (
                  <SelectItem key={it.id} value={it.id}>{it.name}</SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Org</TableHead>
            <TableHead>Account</TableHead>
            <TableHead>Integration Type</TableHead>
            <TableHead>Schedule</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Run</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {integrations.map((intg) => {
            const org = api.getOrg(intg.orgId);
            const intType = api.getIntegrationType(intg.integrationTypeId);
            const runtime = intType
              ? database.integrationRuntimes.find((r) => r.id === intType.runtimeId)?.name ?? '—'
              : '—';
            const account = intg.accountId
              ? api.getAccount(intg.accountId)
              : null;
            const schedule = intg.schedule ?? intType?.defaultSchedule;
            const scheduleIsDefault = !intg.schedule && !!intType?.defaultSchedule;
            return (
              <TableRow key={intg.id}>
                <TableCell>{org?.name ?? '—'}</TableCell>
                <TableCell className="text-sm">
                  {account?.name ?? '—'}
                </TableCell>
                <TableCell>
                  <span className="font-medium">{intType?.name ?? '—'}</span>
                  {intType && (
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {intType.kind} · {runtime}
                    </div>
                  )}
                </TableCell>
                <TableCell className={`font-mono text-xs${scheduleIsDefault ? ' text-muted-foreground' : ''}`}>
                  {schedule ? (
                    <>
                      {schedule}
                      {describeCron(schedule) && (
                        <div className="font-sans text-muted-foreground mt-0.5">{describeCron(schedule)}</div>
                      )}
                    </>
                  ) : '—'}
                </TableCell>
                <TableCell>
                  <Badge variant={integrationStatusVariant(intg.status)}>{intg.status}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {intg.lastRunAt ? new Date(intg.lastRunAt).toLocaleDateString() : '—'}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
