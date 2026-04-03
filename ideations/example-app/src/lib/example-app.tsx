const mockItems = [
  { id: 1, title: 'Idea Alpha', status: 'In Progress' },
  { id: 2, title: 'Idea Beta', status: 'Backlog' },
  { id: 3, title: 'Idea Gamma', status: 'Done' },
];

export function ExampleApp() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-xl font-semibold mb-1">Example App</h1>
      <p className="text-sm text-muted-foreground mb-6">
        A pure UI sub-app with mock data — no backend required.
      </p>
      <ul className="space-y-2">
        {mockItems.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between rounded-lg border border-border px-4 py-3 text-sm"
          >
            <span className="font-medium">{item.title}</span>
            <span className="text-muted-foreground">{item.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExampleApp;
