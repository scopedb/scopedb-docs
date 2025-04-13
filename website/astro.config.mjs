// @ts-check
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import starlightLinksValidator from 'starlight-links-validator';
import { sidebar } from './astro.sidebar.ts';
import { devServerFileWatcher } from './config/integrations/dev-server-file-watcher.ts';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [
      devServerFileWatcher([
          './config/*',
          './astro.sidebar.ts',
      ]),
      starlight({
          title: 'ScopeDB',
          social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/scopedb/scopedb-docs' }],
          plugins: [starlightLinksValidator()],
          customCss: ['./src/styles/global.css'],
          sidebar,
          components:{
            'PageFrame': './src/overrides/PageFrame.astro'
          }
      }),
	],

  vite: {
    plugins: [tailwindcss()],
  },
});
