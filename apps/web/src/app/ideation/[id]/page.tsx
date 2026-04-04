import { notFound } from 'next/navigation';
import { getApp } from '@rp-vibe-ideation/ideation-registry';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function IdeationPage({ params }: Props): Promise<React.JSX.Element> {
  const { id } = await params;
  const app = getApp(id);

  if (!app) {
    notFound();
  }

  const useDevUrls = process.env.NEXT_PUBLIC_USE_DEV_URLS === 'true';
  const effectiveUrl = useDevUrls && app.devUrl ? app.devUrl : app.url;

  return (
    <iframe
      src={effectiveUrl}
      style={{ width: '100%', height: 'calc(100vh - 3.5rem)', border: 'none' }}
      title={app.name}
    />
  );
}
