import type { NextConfig } from "next"
import createMDX from '@next/mdx'

import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from '@/plugins/remark-frontmatter-mdx'
import { rehypeHeadingIds, rehypeShiki } from '@astrojs/markdown-remark'
import rehypeHeadingsMdx from '@/plugins/rehype-headings-mdx'

import scopeql from "./shiki-scopeql-grammar.json"

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,

  options: {
    remarkPlugins: [
      remarkGfm,
      remarkFrontmatter,
      remarkMdxFrontmatter,
    ],
    rehypePlugins: [
      rehypeHeadingIds,
      rehypeHeadingsMdx,
      [rehypeShiki, {
        theme: 'github-light',
        langs: [scopeql],
      }]
    ],
  }
})

export default withMDX(nextConfig)

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
