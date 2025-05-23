import sitemap from "@astrojs/sitemap";
import starlight from "@astrojs/starlight";
import starlightDocSearch from "@astrojs/starlight-docsearch";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import scopeql from "./shiki-scopeql-grammar.json";
import starlightLinksValidator from "starlight-links-validator";
import starlightSidebarTopics from "starlight-sidebar-topics";
import { devServerFileWatcher } from "./config/integrations/dev-server-file-watcher.ts";
import { sidebar } from "./src/content/docs/reference/sidebar.ts";

// https://astro.build/config
export default defineConfig({
  site: "https://docs.scopedb.io",

  integrations: [
    devServerFileWatcher([
      "./config/*",
      "./src/content/docs/reference/sidebar.ts",
    ]),
    starlight({
      title: "ScopeDB",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/scopedb/scopedb-docs",
        },
      ],
      plugins: [
        starlightSidebarTopics([
          {
            label: "Guides",
            link: "/guides",
            items: [],
          },
          {
            label: "Developer",
            link: "/developer",
            items: [],
          },
          {
            label: "Reference",
            link: "/reference",
            items: [...sidebar],
          },
        ]),
        starlightLinksValidator(),
        starlightDocSearch({
          appId: "WHHXVN2FB9",
          apiKey: "aa8e5889d050ad97cf07bcaecc2173fc",
          indexName: "scopedb",
        }),
      ],
      customCss: ["./src/styles/global.css"],
      components: {
        Header: "./src/overrides/Header.astro",
        PageFrame: "./src/overrides/PageFrame.astro",
        Sidebar: "./src/overrides/Sidebar.astro",
        PageSidebar: "./src/overrides/PageSidebar.astro",
        TwoColumnContent: "./src/overrides/TwoColumnContent.astro",
        ContentPanel: "./src/overrides/ContentPanel.astro",
        ThemeSelect: "./src/overrides/ThemeSelect.astro",
        MarkdownContent: './src/overrides/MarkdownContent.astro',
      },
    }),
    sitemap(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    shikiConfig: {
      langs: [scopeql],
    },
  },
});
