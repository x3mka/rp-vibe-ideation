'use client';

import { useRouter, usePathname } from 'next/navigation';
import { groupedRegistry } from '@rp-vibe-ideation/ideation-registry';

export function AppSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const activeId = pathname.startsWith('/ideation/')
    ? pathname.split('/')[2]
    : '';

  const groups = groupedRegistry();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const id = e.target.value;
    if (id) router.push(`/ideation/${id}`);
    else router.push('/');
  }

  return (
    <select
      value={activeId}
      onChange={handleChange}
      className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-sm text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
    >
      <option value="">— Select an app —</option>
      {Object.entries(groups).map(([groupName, apps]) => (
        <optgroup key={groupName} label={groupName}>
          {apps.map((app) => (
            <option key={app.id} value={app.id}>
              {app.label}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
}
