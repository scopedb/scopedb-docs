import { valueToEstree } from 'estree-util-value-to-estree'
import { type Root } from 'hast'
import { type Plugin } from 'unified'
import { define } from 'unist-util-mdx-define'

const plugin: Plugin<[define.Options?], Root> = ({
    ...options
} = {}) => {
    const name = 'headings'
    return (ast, file) => {
        const data = file.data.astro?.headings
        if (data) {
            define(ast, file, { [name]: valueToEstree(data, { preserveReferences: true }) }, options)
        }
    }
}

export default plugin
