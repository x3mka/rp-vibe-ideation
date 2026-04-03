export function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Profile</h2>
        <p className="text-sm text-muted-foreground">
          Manage your personal information.
        </p>
      </div>
      <div className="space-y-4 max-w-md">
        {[
          { label: 'Full Name', value: 'Alex Johnson', type: 'text' },
          { label: 'Email', value: 'alex@example.com', type: 'email' },
          { label: 'Role', value: 'Product Manager', type: 'text' },
        ].map((f) => (
          <div key={f.label} className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              {f.label}
            </label>
            <input
              type={f.type}
              defaultValue={f.value}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        ))}
        <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          Save Changes
        </button>
      </div>
    </div>
  );
}
