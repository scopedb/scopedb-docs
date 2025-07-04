import { valueToEstree } from 'estree-util-value-to-estree'
import { type Literal, type Root } from 'mdast'
import { parse as parseToml } from 'toml'
import { type Plugin } from 'unified'
import { define } from 'unist-util-mdx-define'
import { parse as parseYaml } from 'yaml'

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

        let data = undefined
        if (node) {
            const parser = allParsers[node.type]
            const { value } = node as Literal
            data = parser(value)

            // HACK - collaborate with `@astrojs/markdown-remark`
            file.data.astro = { frontmatter: data }
        }

        define(ast, file, { [name]: valueToEstree(data, { preserveReferences: true }) }, options)
    }
}

export default plugin
