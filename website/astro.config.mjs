// @ts-check
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightLinksValidator from "starlight-links-validator";
import { sidebar } from "./astro.sidebar.ts";
import { devServerFileWatcher } from "./config/integrations/dev-server-file-watcher.ts";
import tailwindcss from "@tailwindcss/vite";
import starlightSidebarTopics from "starlight-sidebar-topics";

// https://astro.build/config
export default defineConfig({
  integrations: [
    devServerFileWatcher(["./config/*", "./astro.sidebar.ts"]),
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
            label: "Developer",
            link: "/developer",
            items: [],
          },
          {
            label: "Reference",
            link: "/reference",
            items: [...sidebar],
          },
          {
            label: "Releases",
            link: "/releases",
            items: [
              {
                label: "ScopeDB Releases",
                link: "/releases",
              },
            ],
          },
          {
            label: "Tutorials",
            link: "/tutorials",
            items: [],
          },
        ]),
        starlightLinksValidator(),
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
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
