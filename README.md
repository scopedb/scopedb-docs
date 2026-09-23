# ScopeDB Documents

This project keeps all sources used for building the ScopeDB official documents website, which is served at https://docs.scopedb.io/.

## Edit documentation

Pages live in `src/content/guides`, `src/content/developer`, and
`src/content/reference`. Add each page to its section in `src/sidebars.ts`;
the sidebar also supplies breadcrumbs and the sitemap. Use an `index.mdx` file
for a section overview.

Run `pnpm lint` and `pnpm check:docs` to verify code, page titles, sidebar
coverage, and links. Both checks run in CI. Run `pnpm build` before shipping
changes to MDX rendering or site code.

Keep `public/llms.txt` as a short index of the most useful documentation pages
when adding or moving guides. `pnpm check:docs` validates its documentation links.

When a new ScopeDB CLI release is published, update the versioned download
links and Go install command in `src/content/developer/scopedb-cli.mdx` after
confirming the release assets and checksum manifest exist.
