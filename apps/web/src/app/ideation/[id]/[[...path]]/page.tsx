import { notFound } from 'next/navigation';
import { getApp } from '@rp-vibe-ideation/ideation-registry';

// Sub-app component map — add new entries here as sub-apps are created
const subApps: Record<string, () => Promise<{ default: React.ComponentType }>> =
  {
    'example-app': () => import('@rp-vibe-ideation/example-app'),
    'dashboard-app': () => import('@rp-vibe-ideation/dashboard-app'),
  };

interface Props {
  params: Promise<{ id: string; path?: string[] }>;
}

export default async function IdeationPage({ params }: Props) {
  const { id } = await params;
  const app = getApp(id);

  if (!app || !subApps[id]) {
    notFound();
  }

  const { default: SubApp } = await subApps[id]();

  return (
    <div className="h-[calc(100vh-3.5rem)] overflow-auto">
      <SubApp />
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(subApps).map((id) => ({ id }));
}
