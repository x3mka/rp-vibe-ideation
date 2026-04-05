//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const basePath = isGitHubPages ? '/rp-vibe-ideation' : '';

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // Compile workspace packages from source in dev
  transpilePackages: ['@rp-vibe-ideation/ideation-registry'],

  // Static export for GitHub Pages; omitted in dev/server mode
  ...(isGitHubPages && { output: 'export', trailingSlash: true }),

  // Base path for GitHub Pages (repo is served at /rp-vibe-ideation/)
  basePath,

  // Rewrite /apps/:id → /apps/:id/index.html so the sub-app entry point is served
  // without requiring the trailing /index.html in the registry url field.
  // Not supported in static export mode — GitHub Pages serves index.html from
  // directories automatically, so the rewrite is only needed in server mode.
  ...(!isGitHubPages && {
    async rewrites() {
      return [{ source: '/apps/:id', destination: '/apps/:id/index.html' }];
    },
  }),

  // Use this to set Nx-specific options
  // See: https://nx.dev/recipes/next/next-config-setup
  nx: {},
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
