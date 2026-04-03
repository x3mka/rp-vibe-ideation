const sessions = [
  { device: 'Chrome · macOS', location: 'New York, US', active: true, last: 'Now' },
  { device: 'Safari · iPhone 15', location: 'New York, US', active: false, last: '2 hr ago' },
  { device: 'Firefox · Windows', location: 'London, UK', active: false, last: '5 days ago' },
];

export function SecurityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Security</h2>
        <p className="text-sm text-muted-foreground">
          Manage your password and active sessions.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Change Password</h3>
        <div className="space-y-3 max-w-md">
          {['Current Password', 'New Password', 'Confirm New Password'].map((f) => (
            <input
              key={f}
              type="password"
              placeholder={f}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          ))}
          <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            Update Password
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Active Sessions</h3>
        <div className="space-y-2">
          {sessions.map((s) => (
            <div
              key={s.device}
              className="flex items-center justify-between rounded-lg border border-border px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium">{s.device}</p>
                <p className="text-xs text-muted-foreground">
                  {s.location} · {s.last}
                </p>
              </div>
              {s.active ? (
                <span className="text-xs text-green-600 font-medium">Current</span>
              ) : (
                <button className="text-xs text-destructive hover:underline">
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
