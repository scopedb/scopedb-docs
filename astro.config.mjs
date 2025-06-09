import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import process from 'node:process';
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { remarkDefinitionList, defListHastHandlers } from 'remark-definition-list';
import remarkDirective from "remark-directive";
// @ts-expect-error no @types package available
import remarkCalloutDirectives from '@microflash/remark-callout-directives';
import devtoolsJson from 'vite-plugin-devtools-json';

import scopeql from "./shiki-scopeql-grammar.json";

// https://astro.build/config
export default defineConfig({
  site: "https://docs.scopedb.io",
  integrations: [react(), sitemap(), mdx({
    remarkPlugins: [remarkDefinitionList, remarkDirective, [remarkCalloutDirectives, {
      aliases: {
        info: "assert",
        commend: "tip"
      },
      callouts: {
        commend: { title: "Tip" },
        assert: { title: "Info" },
      }
    }]],
    remarkRehype: { handlers: defListHastHandlers },
  })],

  vite: {
    plugins: [tailwindcss(), devtoolsJson()],
    optimizeDeps: {
      include: ['@docsearch/react']
    },
    css:{
    modules: {
      // do not use hash when dev
      generateScopedName: process.env.NODE_ENV === 'development'
        ? '[local]'
        : '[hash:base64:8]'
    }
  }
  },

  markdown: {
    remarkPlugins: [remarkDefinitionList, remarkDirective, [remarkCalloutDirectives, {
      aliases: {
        info: "assert",
        commend: "tip"
      },
      callouts: {
        commend: { title: "Tip" },
        assert: { title: "Info" },
      }
    }]],
    remarkRehype: { handlers: defListHastHandlers },
    shikiConfig: {
      // @ts-expect-error custom grammar
      langs: [scopeql],
    },
  },
});
