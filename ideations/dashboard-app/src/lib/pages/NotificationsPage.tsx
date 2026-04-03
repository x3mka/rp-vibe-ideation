const notifications = [
  {
    title: 'New comment on your report',
    time: '5 min ago',
    read: false,
  },
  {
    title: 'Q1 report is ready to download',
    time: '1 hr ago',
    read: false,
  },
  {
    title: 'System maintenance scheduled',
    time: 'Yesterday',
    read: true,
  },
  {
    title: 'Your export is complete',
    time: '2 days ago',
    read: true,
  },
];

export function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Notifications</h2>
        <p className="text-sm text-muted-foreground">
          Manage how you receive alerts and updates.
        </p>
      </div>
      <div className="space-y-2">
        {notifications.map((n, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 rounded-lg border px-4 py-3 ${
              n.read ? 'border-border' : 'border-primary/30 bg-primary/5'
            }`}
          >
            {!n.read && (
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
            )}
            {n.read && <span className="mt-1.5 h-2 w-2 shrink-0" />}
            <div>
              <p className="text-sm font-medium">{n.title}</p>
              <p className="text-xs text-muted-foreground">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
