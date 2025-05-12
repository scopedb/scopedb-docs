import {defineConfig} from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import svgr from 'vite-plugin-svgr';

import {
  remarkDefinitionList,
  defListHastHandlers,
} from 'remark-definition-list';

export default defineConfig({
  outDir: './build',
  alias: {
    '@': './src',
  },
  experimental: {
    svg: true,
  },
  vite: {
    plugins: [tailwindcss(), svgr()],
  },
  integrations: [
    react({
      include: ['**/react/*'],
      experimentalDisableStreaming: true,
      experimentalReactChildren: true,
    }),
    mdx({
      remarkPlugins: [remarkDefinitionList],
      remarkRehype: {handlers: defListHastHandlers},
    }),
  ],
  markdown: {
    shikiConfig: {
      themes: {
        dark: 'nord',
        light: 'min-light',
      },
      langs: ['javascript', 'typescript', 'html', 'css', 'json', 'python', 'bash', 'yaml', 'sql'],
      wrap: true,
      transformers: [],
    },
  },
});
