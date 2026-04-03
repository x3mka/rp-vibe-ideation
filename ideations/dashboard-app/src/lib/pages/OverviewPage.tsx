const stats = [
  { label: 'Total Users', value: '12,430', change: '+8.2%' },
  { label: 'Active Sessions', value: '1,893', change: '+3.1%' },
  { label: 'Conversion Rate', value: '4.7%', change: '-0.4%' },
  { label: 'Revenue', value: '$48,200', change: '+12.5%' },
];

export function OverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Overview</h2>
        <p className="text-sm text-muted-foreground">
          High-level summary of key metrics.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-lg border border-border p-4 space-y-1"
          >
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="text-2xl font-semibold">{s.value}</p>
            <p
              className={`text-xs ${s.change.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}
            >
              {s.change} vs last period
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
