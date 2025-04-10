import type { StarlightUserConfig } from '@astrojs/starlight/types';

export const sidebar = [
    {
        label: 'Overview',
        link: '/',
    },
    {
        label: 'Reference',
        autogenerate: { directory: 'reference' },
    },
] satisfies StarlightUserConfig['sidebar'];
