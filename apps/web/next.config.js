//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // Compile workspace packages from source in dev
  transpilePackages: ['@rp-vibe-ideation/ideation-registry'],
  // Rewrite /apps/:id → /apps/:id/index.html so the sub-app entry point is served
  // without requiring the trailing /index.html in the registry url field.
  async rewrites() {
    return [{ source: '/apps/:id', destination: '/apps/:id/index.html' }];
  },
  // Use this to set Nx-specific options
  // See: https://nx.dev/recipes/next/next-config-setup
  nx: {},
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
