'use client';

import { useRouter, usePathname } from 'next/navigation';
import { ExternalLink, Sparkles } from 'lucide-react';
import { registry, groupedRegistry } from '@rp-vibe-ideation/ideation-registry';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

/**
 * Icon choices for "Vibe Ideation" brand mark (swap as desired):
 *   Sparkles  — creative energy / AI aesthetic  ← current
 *   Lightbulb — classic ideation
 *   Zap       — energy / speed
 *   Brain     — thinking / cognition
 *   Flame     — fire / passion
 */

export function ShellHeader(): React.JSX.Element {
  const router = useRouter();
  const pathname = usePathname();

  const activeId = pathname.startsWith('/ideation/')
    ? pathname.split('/')[2]
    : undefined;

  const activeApp = registry.find((a) => a.id === activeId);
  const groups = groupedRegistry();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    const id = e.target.value;
    if (id) router.push(`/ideation/${id}`);
    else router.push('/');
  }

  function handleOpenInNewTab(): void {
    if (!activeApp) return;
    const useDevUrls = process.env.NEXT_PUBLIC_USE_DEV_URLS === 'true';
    const effectiveUrl = useDevUrls && activeApp.devUrl ? activeApp.devUrl : activeApp.url;
    window.open(effectiveUrl, '_blank');
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-900">
      <div className="relative mx-auto flex h-14 max-w-screen-2xl items-center px-4">

        {/* Left — brand mark */}
        <div className="flex items-center gap-2.5">
          <Sparkles className="h-5 w-5 text-violet-400" aria-hidden="true" />
          <span className="text-sm font-bold tracking-tight text-white">
            Vibe Ideation
          </span>
        </div>

        {/* Center — active app name + description (absolutely centred) */}
        {activeApp && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-base font-semibold leading-tight text-white">
              {activeApp.name}
            </span>
            <span className="text-xs leading-tight text-zinc-400">
              {activeApp.description}
            </span>
          </div>
        )}

        {/* Right — open-in-new-tab button + grouped app switcher */}
        <div className="ml-auto flex items-center gap-2">
          {activeApp && (
            <Tooltip>
              <TooltipTrigger
                type="button"
                onClick={handleOpenInNewTab}
                aria-label="Open in new tab"
                className="rounded-md p-1.5 text-zinc-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </TooltipTrigger>
              <TooltipContent>Open in new tab</TooltipContent>
            </Tooltip>
          )}
          <select
            value={activeId ?? ''}
            onChange={handleChange}
            className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-sm text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="">— Select an app —</option>
            {Object.entries(groups).map(([groupName, apps]) => (
              <optgroup key={groupName} label={groupName}>
                {apps.map((app) => (
                  <option key={app.id} value={app.id}>
                    {app.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

      </div>
    </header>
  );
}
