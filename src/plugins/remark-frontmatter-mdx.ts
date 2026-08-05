import { valueToEstree } from 'estree-util-value-to-estree'
import { type Literal, type Root } from 'mdast'
import { parse as parseToml } from 'toml'
import { type Plugin } from 'unified'
import { define } from 'unist-util-mdx-define'
import { parse as parseYaml } from 'yaml'

const MAX_DESCRIPTION_LENGTH = 160

interface TextNode {
    type?: string
    value?: unknown
    alt?: unknown
    children?: unknown[]
}

function nodeText(node: unknown): string {
    if (!node || typeof node !== 'object') {
        return ''
    }

    const { type, value, alt, children } = node as TextNode
    if ((type === 'text' || type === 'inlineCode') && typeof value === 'string') {
        return value
    }

    if (type === 'image' && typeof alt === 'string') {
        return alt
    }

    return Array.isArray(children) ? children.map(nodeText).join('') : ''
}

function findFirstParagraph(node: unknown): unknown | undefined {
    if (!node || typeof node !== 'object') {
        return undefined
    }

    const { type, children } = node as TextNode
    if (type === 'paragraph') {
        return node
    }

    if (Array.isArray(children)) {
        for (const child of children) {
            const paragraph = findFirstParagraph(child)
            if (paragraph) {
                return paragraph
            }
        }
    }

    return undefined
}

function deriveDescription(ast: Root): string | undefined {
    const paragraph = findFirstParagraph(ast)
    const text = nodeText(paragraph).replace(/\s+/g, ' ').trim()
    if (!text) {
        return undefined
    }

    if (text.length <= MAX_DESCRIPTION_LENGTH) {
        return text
    }

    const truncated = text.slice(0, MAX_DESCRIPTION_LENGTH - 1)
    const lastSpace = truncated.lastIndexOf(' ')
    const end = lastSpace > 80 ? lastSpace : truncated.length
    return `${truncated.slice(0, end).trim()}…`
}

const plugin: Plugin<[define.Options?], Root> = ({
    ...options
} = {}) => {
    const name = 'frontmatter'

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const allParsers: Record<string, (value: string) => any> = {
        yaml: parseYaml,
        toml: parseToml,
    }

    return (ast, file) => {
        const node = ast.children.find((child) => Object.hasOwn(allParsers, child.type))

        let data: Record<string, unknown> | undefined
        if (node) {
            const parser = allParsers[node.type]
            const { value } = node as Literal
            const parsed = parser(value)
            const frontmatterData: Record<string, unknown> = parsed && typeof parsed === 'object' && !Array.isArray(parsed)
                ? { ...parsed }
                : {}

            if (!frontmatterData.description) {
                frontmatterData.description = deriveDescription(ast)
            }

            data = frontmatterData

            // HACK - collaborate with `@astrojs/markdown-remark`
            file.data.astro = { frontmatter: data }
        }

        define(ast, file, { [name]: valueToEstree(data, { preserveReferences: true }) }, options)
    }
}

export default plugin
