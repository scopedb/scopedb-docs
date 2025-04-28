import {defineConfig} from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';

import {
  remarkDefinitionList,
  defListHastHandlers,
} from 'remark-definition-list';

export default defineConfig({
  outDir: './build',
  experimental: {
    svg: true,
  },
  integrations: [
    tailwind(),
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
