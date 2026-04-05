import { notFound } from 'next/navigation';
import { getApp, registry } from '@rp-vibe-ideation/ideation-registry';

interface Props {
  params: Promise<{ id: string }>;
}

// Pre-render a page for every registered app so the dynamic route works in
// static export mode (required for GitHub Pages deployment).
export function generateStaticParams(): { id: string }[] {
  return registry.map((app) => ({ id: app.id }));
}

export default async function IdeationPage({ params }: Props): Promise<React.JSX.Element> {
  const { id } = await params;
  const app = getApp(id);

  if (!app) {
    notFound();
  }

  const useDevUrls = process.env.NEXT_PUBLIC_USE_DEV_URLS === 'true';
  // In static export (GitHub Pages) the basePath prefix must be prepended to
  // shell-hosted paths so the iframe resolves under the correct sub-directory.
  // devUrls are absolute (http://localhost:…) so they never need the prefix.
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  const rawUrl = useDevUrls && app.devUrl ? app.devUrl : app.url;
  const effectiveUrl = rawUrl.startsWith('/') ? `${basePath}${rawUrl}` : rawUrl;

  return (
    <iframe
      src={effectiveUrl}
      style={{ width: '100%', height: 'calc(100vh - 3.5rem)', border: 'none' }}
      title={app.name}
    />
  );
}
