'use client';

import React, { useState } from 'react';
import { ChevronsUpDown } from 'lucide-react';
import { groupedRegistry } from '@rp-vibe-ideation/ideation-registry';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface AppSwitcherProps {
  activeId: string | undefined;
  onSelect: (id: string) => void;
}

export function AppSwitcher({ activeId, onSelect }: AppSwitcherProps): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const groups = groupedRegistry();
  const groupEntries = Object.entries(groups);

  const activeApp = groupEntries
    .flatMap(([, apps]) => apps)
    .find((app) => app.id === activeId);

  return (
    <Popover open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <PopoverTrigger className="inline-flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-sm text-white shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 aria-expanded:bg-zinc-700">
        <span>{activeApp?.name ?? '— Select an app —'}</span>
        <ChevronsUpDown className="h-3.5 w-3.5 shrink-0 opacity-60" aria-hidden />
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0" align="end">
        <Command>
          <CommandInput placeholder="Search apps..." />
          <CommandList>
            <CommandEmpty>No apps found.</CommandEmpty>
            {groupEntries.map(([groupName, apps], index) => (
              <React.Fragment key={groupName}>
                <CommandGroup heading={groupName}>
                  {apps.map((app) => (
                    <CommandItem
                      key={app.id}
                      value={app.id}
                      data-checked={app.id === activeId}
                      onSelect={() => {
                        onSelect(app.id);
                        setOpen(false);
                      }}
                    >
                      {app.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
                {index < groupEntries.length - 1 && <CommandSeparator />}
              </React.Fragment>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
