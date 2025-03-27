import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'ScopeDB Documents',
  favicon: 'brand-kit/favicon.svg',

  url: 'https://docs.scopedb.io',
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: false,
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'brand-kit/centered-sign.jpg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
    },
    navbar: {
      logo: {
        alt: 'ScopeDB Logo',
        src: 'brand-kit/horizontal-no-slogan-trimmed.svg',
      },
      items: [
        { type: 'docSidebar', docsPluginId: 'reference', sidebarId: 'reference', position: 'right', label: 'Reference' },
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright (c) 2025 ScopeDB Inc. All rights reserved.`
    },
    prism: {
      theme: prismThemes.github,
    },
    docs: {
      sidebar: {
        autoCollapseCategories: true,
      }
    }
  } satisfies Preset.ThemeConfig,

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'reference',
        path: 'reference',
        routeBasePath: 'reference',
        sidebarPath: './reference/sidebars.ts',
      },
    ],
  ],

  themes: [],

  scripts: [{ src: 'https://plausible.io/js/script.js', defer: true, 'data-domain': 'docs.scopedb.io' }],
};

export default config;
