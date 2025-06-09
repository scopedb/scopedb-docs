// @ts-check
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
import fs from "node:fs";
import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  site: "https://docs.scopedb.io",
  integrations: [
    react(),
    sitemap(),
    expressiveCode({
      themes: ["min-light"],
      shiki: {
        langs: [
          JSON.parse(fs.readFileSync("./shiki-scopeql-grammar.json", "utf-8")),
        ],
      },
    }),
    mdx({
      remarkPlugins: [
        remarkDefinitionList,
        remarkDirective,
        [
          remarkCalloutDirectives,
          {
            aliases: {
              info: "assert",
              commend: "tip",
            },
            callouts: {
              commend: { title: "Tip" },
              assert: { title: "Info" },
            },
          },
        ],
      ],
      remarkRehype: { handlers: defListHastHandlers },
    }),
  ],

  vite: {
    plugins: [tailwindcss(), devtoolsJson()],
  },

  markdown: {
    remarkPlugins: [
      remarkDefinitionList,
      remarkDirective,
      [
        remarkCalloutDirectives,
        {
          aliases: {
            info: "assert",
            commend: "tip",
          },
          callouts: {
            commend: { title: "Tip" },
            assert: { title: "Info" },
          },
        },
      ],
    ],
    remarkRehype: { handlers: defListHastHandlers },
  },
});
