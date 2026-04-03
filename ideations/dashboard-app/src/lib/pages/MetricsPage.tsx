const rows = [
  { metric: 'Page Views', today: '23,410', week: '158,290', month: '604,300' },
  { metric: 'Unique Visitors', today: '8,120', week: '54,700', month: '210,400' },
  { metric: 'Bounce Rate', today: '42%', week: '39%', month: '41%' },
  { metric: 'Avg. Session', today: '2m 14s', week: '2m 31s', month: '2m 22s' },
  { metric: 'New Signups', today: '134', week: '891', month: '3,204' },
];

export function MetricsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Metrics</h2>
        <p className="text-sm text-muted-foreground">
          Detailed performance metrics across time periods.
        </p>
      </div>
      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              {['Metric', 'Today', 'This Week', 'This Month'].map((h) => (
                <th
                  key={h}
                  className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={r.metric}
                className={i % 2 === 0 ? '' : 'bg-muted/20'}
              >
                <td className="px-4 py-2.5 font-medium">{r.metric}</td>
                <td className="px-4 py-2.5 text-muted-foreground">{r.today}</td>
                <td className="px-4 py-2.5 text-muted-foreground">{r.week}</td>
                <td className="px-4 py-2.5 text-muted-foreground">{r.month}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
