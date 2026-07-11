import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import type { AnchorHTMLAttributes } from 'react'
import Callout from './components/Callout'

function MarkdownLink({ href, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
    if (typeof href === 'string' && href.startsWith('/') && !href.startsWith('//')) {
        return (
            <Link href={href} {...props}>
                {children}
            </Link>
        )
    }

    return (
        <a href={href} {...props}>
            {children}
        </a>
    )
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        Callout,
        a: MarkdownLink,
        ...components,
    }
}
