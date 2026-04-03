const reports = [
  { name: 'Q1 2025 Summary', type: 'Quarterly', status: 'Ready', date: 'Apr 2, 2025' },
  { name: 'March Engagement', type: 'Monthly', status: 'Ready', date: 'Apr 1, 2025' },
  { name: 'Campaign ROI — Spring', type: 'Ad-hoc', status: 'Processing', date: 'Mar 28, 2025' },
  { name: 'User Cohort Analysis', type: 'Ad-hoc', status: 'Ready', date: 'Mar 20, 2025' },
  { name: 'Q4 2024 Summary', type: 'Quarterly', status: 'Ready', date: 'Jan 5, 2025' },
];

const statusColor: Record<string, string> = {
  Ready: 'text-green-600 bg-green-50',
  Processing: 'text-yellow-600 bg-yellow-50',
};

export function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Reports</h2>
        <p className="text-sm text-muted-foreground">
          Generated reports available for download.
        </p>
      </div>
      <div className="space-y-2">
        {reports.map((r) => (
          <div
            key={r.name}
            className="flex items-center justify-between rounded-lg border border-border px-4 py-3"
          >
            <div>
              <p className="text-sm font-medium">{r.name}</p>
              <p className="text-xs text-muted-foreground">
                {r.type} · {r.date}
              </p>
            </div>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor[r.status]}`}
            >
              {r.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
