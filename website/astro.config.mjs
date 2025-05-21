// @ts-check
import starlight from "@astrojs/starlight";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import starlightLinksValidator from "starlight-links-validator";
import { sidebar } from "./src/content/docs/reference/sidebar.ts";
import { devServerFileWatcher } from "./config/integrations/dev-server-file-watcher.ts";
import tailwindcss from "@tailwindcss/vite";
import starlightSidebarTopics from "starlight-sidebar-topics";
import scopeql from "shikijs-lang-scopeql";

// import { loadEnv } from "vite";
// import starlightDocSearch from '@astrojs/starlight-docsearch';

// const { ALGOLIA_APIKEY, ALGOLIA_APPID, ALGOLIA_INDEXNAME } = loadEnv('production', process.cwd(), "");

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
        // starlightDocSearch({
        //   appId: ALGOLIA_APPID,
        //   apiKey: ALGOLIA_APIKEY,
        //   indexName: ALGOLIA_INDEXNAME,
        // }),
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
