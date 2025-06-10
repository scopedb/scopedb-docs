import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import process from "node:process";
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
import expressiveCode from "astro-expressive-code";
import scopeql from "./shiki-scopeql-grammar.json";

function viteCssModuleName() {
  // do not use hash when dev
  return process.env.NODE_ENV === "development" ? "[local]" : "[hash:base64:8]";
}

// https://astro.build/config
export default defineConfig({
  site: "https://docs.scopedb.io",
  integrations: [
    react(),
    sitemap(),
    expressiveCode({
      themes: ["min-light"],
      shiki: {
        langs: [scopeql],
      },
    }),
    mdx(),
  ],

  vite: {
    plugins: [tailwindcss(), devtoolsJson()],
    optimizeDeps: {
      include: ["@docsearch/react"],
    },
    css: {
      modules: {
        generateScopedName: viteCssModuleName(),
      },
    },
  },

  markdown: {
    remarkPlugins: [
      remarkDefinitionList,
      remarkDirective,
      remarkCalloutDirectives,
    ],
    remarkRehype: { handlers: defListHastHandlers },
  },
});
