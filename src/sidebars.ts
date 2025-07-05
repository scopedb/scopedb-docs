export interface SidebarItem {
    label: string;
    link?: string;
    items?: SidebarItem[];
}

export const guidesSidebar: SidebarItem[] = [
    { label: "Overview", link: "/guides" },
];

export const developerSidebar: SidebarItem[] = [
    { label: "Overview", link: "/developer" },
];

export const referenceSidebar: SidebarItem[] = [
    { label: "Overview", link: "/reference" },
    {
        label: "Data types", items: [
            { label: "Overview", link: "/reference/data-types" },
            { label: "Date and time", link: "/reference/data-types/datetime" },
            { label: "Semi-structured", link: "/reference/data-types/semi-structured" },
            { label: "Conversion", link: "/reference/data-types/conversion" },
        ],
    },
    {
        label: "Commands", items: [
            { label: "Overview", link: "/reference/commands" },
            { label: "Query Syntax", link: "/reference/commands/stmt-query" },
            {
                label: "Query Operators", items: [
                    { label: "Overview", link: "/reference/commands/query-operators" },
                    { label: "Arithmetic", link: "/reference/commands/query-operators/arithmetic" },
                    { label: "Comparison", link: "/reference/commands/query-operators/comparison" },
                    { label: "Logical", link: "/reference/commands/query-operators/logical" },
                    { label: "Set operators", link: "/reference/commands/query-operators/set" },
                ],
            },
            { label: "General DDL", link: "/reference/commands/stmt-ddl" },
            { label: "General DML", link: "/reference/commands/stmt-dml" },
        ],
    },
    {
        label: "Functions", items: [
            { label: "Overview", link: "/reference/functions" },
            {
                label: "Aggregate", items: [
                    { label: "Overview", link: "/reference/functions/aggregate" },
                    { label: "approx_quantile", link: "/reference/functions/aggregate/approx_quantile" },
                    { label: "avg", link: "/reference/functions/aggregate/avg" },
                    { label: "count", link: "/reference/functions/aggregate/count" },
                    { label: "max", link: "/reference/functions/aggregate/max" },
                    { label: "max_by", link: "/reference/functions/aggregate/max_by" },
                    { label: "min", link: "/reference/functions/aggregate/min" },
                    { label: "min_by", link: "/reference/functions/aggregate/min_by" },
                    { label: "mode", link: "/reference/functions/aggregate/mode" },
                    { label: "stddev_pop", link: "/reference/functions/aggregate/stddev_pop" },
                    { label: "stddev_samp", link: "/reference/functions/aggregate/stddev_samp" },
                    { label: "sum", link: "/reference/functions/aggregate/sum" },
                    { label: "variance_pop", link: "/reference/functions/aggregate/variance_pop" },
                    { label: "variance_samp", link: "/reference/functions/aggregate/variance_samp" },
                ],
            },
            {
                label: "Conditional expression", items: [
                    { label: "Overview", link: "/reference/functions/conditional-expression" },
                    { label: "IS [ NOT ]", link: "/reference/functions/conditional-expression/is" },
                ],
            },
            { label: "Conversion", link: "/reference/functions/conversion" },
            {
                label: "Date and time", items: [
                    { label: "Overview", link: "/reference/functions/date-and-time" },
                    { label: "now", link: "/reference/functions/date-and-time/now" },
                    { label: "trunc", link: "/reference/functions/date-and-time/temporal-trunc" },
                ],
            },
            {
                label: "Numeric", items: [
                    { label: "Overview", link: "/reference/functions/numeric" },
                    { label: "ceil", link: "/reference/functions/numeric/ceil" },
                    { label: "floor", link: "/reference/functions/numeric/floor" },
                    { label: "round", link: "/reference/functions/numeric/round" },
                    { label: "trunc", link: "/reference/functions/numeric/trunc" },
                ],
            },
            {
                label: "String", items: [
                    { label: "Overview", link: "/reference/functions/string" },
                    { label: "|| (concat)", link: "/reference/functions/string/concat" },
                    { label: "contains", link: "/reference/functions/string/contains" },
                    { label: "ends_with", link: "/reference/functions/string/ends_with" },
                    { label: "length", link: "/reference/functions/string/length" },
                    { label: "ltrim", link: "/reference/functions/string/ltrim" },
                    { label: "lower", link: "/reference/functions/string/lower" },
                    { label: "regexp_like", link: "/reference/functions/string/regexp_like" },
                    { label: "replace", link: "/reference/functions/string/replace" },
                    { label: "reverse", link: "/reference/functions/string/reverse" },
                    { label: "rtrim", link: "/reference/functions/string/rtrim" },
                    { label: "search", link: "/reference/functions/string/search" },
                    { label: "split", link: "/reference/functions/string/split" },
                    { label: "starts_with", link: "/reference/functions/string/starts_with" },
                    { label: "substr", link: "/reference/functions/string/substr" },
                    { label: "trim", link: "/reference/functions/string/trim" },
                    { label: "upper", link: "/reference/functions/string/upper" },
                ],
            },
            {
                label: "Semi-structured data", items: [
                    { label: "Overview", link: "/reference/functions/semi-structured-data" },
                    { label: "{} (object_construct)", link: "/reference/functions/semi-structured-data/object_construct" },
                    { label: "[] (array_construct)", link: "/reference/functions/semi-structured-data/array_construct" },
                    { label: "[] (get)", link: "/reference/functions/semi-structured-data/get" },
                    { label: "[] (slice)", link: "/reference/functions/semi-structured-data/slice" },
                    { label: "|| (array_concat)", link: "/reference/functions/semi-structured-data/concat" },
                    { label: "append", link: "/reference/functions/semi-structured-data/append" },
                    { label: "contains", link: "/reference/functions/semi-structured-data/contains" },
                    { label: "exclude", link: "/reference/functions/semi-structured-data/exclude" },
                    { label: "keys", link: "/reference/functions/semi-structured-data/keys" },
                    { label: "length", link: "/reference/functions/semi-structured-data/length" },
                    { label: "parse_json", link: "/reference/functions/semi-structured-data/parse_json" },
                    { label: "to_json", link: "/reference/functions/semi-structured-data/to_json" },
                    { label: "typeof", link: "/reference/functions/semi-structured-data/typeof" },
                ],
            },
        ],
    },
];

export const categories = {
    guides: {
        label: "Guides",
        link: "/guides",
        sidebar: guidesSidebar,
    },
    developer: {
        label: "Developer",
        link: "/developer",
        sidebar: developerSidebar,
    },
    reference: {
        label: "Reference",
        link: "/reference",
        sidebar: referenceSidebar,
    },
}

export function getSidebar(path: string): SidebarItem[] | undefined {
    for (const category of Object.values(categories)) {
        if (path.startsWith(category.link)) {
            return category.sidebar
        }
    }

    return undefined
}
