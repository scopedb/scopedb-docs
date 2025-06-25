import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import {
  remarkDefinitionList,
  defListHastHandlers,
} from "remark-definition-list";
import remarkDirective from "remark-directive";
import remarkCalloutDirectives from "@microflash/remark-callout-directives";
import devtoolsJson from "vite-plugin-devtools-json";
import scopeql from "./shiki-scopeql-grammar.json";
import Icons from 'unplugin-icons/vite';

// https://astro.build/config
export default defineConfig({
  site: "https://docs.scopedb.io",
  integrations: [react(), sitemap(), mdx()],

  vite: {
    resolve: {
      alias: [
        { find: 'icons:react', replacement: '~icons' },
        { find: 'icons:astro', replacement: '~icons' },
      ],
    },
    plugins: [
      tailwindcss(),
      devtoolsJson(),
      Icons({
        compiler: 'jsx',
        jsx: 'react',
        autoInstall: true,
      }),
      Icons({
        compiler: 'astro',
        autoInstall: true,
      }),
    ],
    optimizeDeps: {
      include: ["@docsearch/react"],
    },
  },

  markdown: {
    remarkPlugins: [
      remarkDefinitionList,
      remarkDirective,
      remarkCalloutDirectives,
    ],
    remarkRehype: { handlers: defListHastHandlers },
    shikiConfig: {
      theme: "github-light",
      langs: [scopeql],
    },
  },
});
