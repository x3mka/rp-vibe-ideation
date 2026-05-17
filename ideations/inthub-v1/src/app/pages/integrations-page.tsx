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

export function IntegrationsPage({
  selectedOrgId,
}: {
  selectedOrgId: string | null;
}): ReactElement {
  const integrations = api.getIntegrations(selectedOrgId ? { orgId: selectedOrgId } : {});

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Integrations</h2>
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
            const sourceAccount = intg.sourceAccountId
              ? api.getProviderAccount(intg.sourceAccountId)
              : null;
            const targetAccount = api.getProviderAccount(intg.targetAccountId);
            const schedule = intg.schedule ?? intType?.defaultSchedule;
            const scheduleIsDefault = !intg.schedule && !!intType?.defaultSchedule;
            return (
              <TableRow key={intg.id}>
                <TableCell>{org?.name ?? '—'}</TableCell>
                <TableCell className="text-sm">
                  {sourceAccount && (
                    <div>{sourceAccount.name}</div>
                  )}
                  <div className={sourceAccount ? 'text-muted-foreground' : undefined}>
                    {sourceAccount ? '→ ' : ''}{targetAccount?.name ?? '—'}
                  </div>
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
