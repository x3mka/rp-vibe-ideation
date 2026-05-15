import type { ReactElement } from 'react';
import * as React from 'react';
import {
  ArrowLeftRight,
  BadgeCheck,
  Bell,
  Building2,
  Cpu,
  ChevronsUpDown,
  CreditCard,
  KeyRound,
  Lock,
  LogOut,
  Network,
  Package,
  Server,
  Sparkles,
  Workflow,
  type LucideIcon,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';

// --- Nav data ---

interface NavItem {
  title: string;
  icon: LucideIcon;
  view: string;
}

const navMain: NavItem[] = [
  { title: 'Orgs', icon: Building2, view: 'orgs' },
  { title: 'Provider Accounts', icon: Server, view: 'provider-accounts' },
  { title: 'Credentials', icon: KeyRound, view: 'credentials' },
  { title: 'Integrations', icon: ArrowLeftRight, view: 'integrations' },
];

const navDictionaries: NavItem[] = [
  { title: 'Providers', icon: Package, view: 'providers' },
  { title: 'Credential Types', icon: Lock, view: 'credential-types' },
  { title: 'Integration Types', icon: Workflow, view: 'integration-types' },
  { title: 'Integration Runtimes', icon: Cpu, view: 'integration-runtimes' },
];

// --- IntHubHeader ---

function IntHubHeader(): ReactElement {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className="pointer-events-none">
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <Network className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">IntHub</span>
            <span className="truncate text-xs text-muted-foreground">Integration Hub</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

// --- NavSection ---

interface NavSectionProps {
  label: string;
  items: NavItem[];
  activeView: string;
  onNavigate: (view: string) => void;
}

function NavSection({ label, items, activeView, onNavigate }: NavSectionProps): ReactElement {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.view}>
            <SidebarMenuButton
              tooltip={item.title}
              isActive={activeView === item.view}
              onClick={() => onNavigate(item.view)}
            >
              <item.icon />
              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

// --- NavUser ---

interface User {
  name: string;
  email: string;
  avatar: string;
}

const mockUser: User = {
  name: 'Admin User',
  email: 'admin@inthub.io',
  avatar: '',
};

function NavUser({ user }: { user: User }): ReactElement {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">AU</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">AU</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

// --- AppSidebar ---

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  activeView: string;
  onNavigate: (view: string) => void;
}

export function AppSidebar({ activeView, onNavigate, ...props }: AppSidebarProps): ReactElement {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <IntHubHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavSection
          label="Main"
          items={navMain}
          activeView={activeView}
          onNavigate={onNavigate}
        />
        <NavSection
          label="Dictionaries"
          items={navDictionaries}
          activeView={activeView}
          onNavigate={onNavigate}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={mockUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
