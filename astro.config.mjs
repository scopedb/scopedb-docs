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

// https://astro.build/config
export default defineConfig({
  site: "https://docs.scopedb.io",
  integrations: [react(), sitemap(), mdx()],

  vite: {
    plugins: [tailwindcss(), devtoolsJson()],
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
