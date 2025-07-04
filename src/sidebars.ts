export interface SidebarItem {
    label: string;
    link?: string;
    items?: SidebarItem[];
}

const guidesSidebar: SidebarItem[] = [
    { label: "Overview", link: "/guides" },
];

const developerSidebar: SidebarItem[] = [
    { label: "Overview", link: "/developer" },
];

const referenceSidebar: SidebarItem[] = [
    { label: "Overview", link: "/reference" },
    {
        label: "Data types", items: [
            { label: "Overview", link: "/reference/data-types" },
            { label: "Date and time", link: "/reference/data-types/datetime" },
            { label: "Variant", link: "/reference/data-types/variant" },
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
                    { label: "IS [ NOT ] DISTINCT FROM", link: "/reference/functions/conditional-expression/is-distinct-from" },
                    { label: "IS [ NOT ] NULL", link: "/reference/functions/conditional-expression/is-null" },
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
                    { label: "concat, ||", link: "/reference/functions/string/concat" },
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
                label: "Variant data", items: [
                    { label: "Overview", link: "/reference/functions/variant-data" },
                    { label: "array_append", link: "/reference/functions/variant-data/array_append" },
                    { label: "array_concat, ||", link: "/reference/functions/variant-data/array_concat" },
                    { label: "array_construct", link: "/reference/functions/variant-data/array_construct" },
                    { label: "array_contains", link: "/reference/functions/variant-data/array_contains" },
                    { label: "array_except", link: "/reference/functions/variant-data/array_except" },
                    { label: "array_length", link: "/reference/functions/variant-data/array_length" },
                    { label: "array_slice", link: "/reference/functions/variant-data/array_slice" },
                    { label: "get, []", link: "/reference/functions/variant-data/get" },
                    { label: "object_construct", link: "/reference/functions/variant-data/object_construct" },
                    { label: "object_keys", link: "/reference/functions/variant-data/object_keys" },
                    { label: "parse_json", link: "/reference/functions/variant-data/parse_json" },
                    { label: "to_json", link: "/reference/functions/variant-data/to_json" },
                    { label: "typeof", link: "/reference/functions/variant-data/typeof" },
                ],
            },
        ],
    },
];

const sidebars = {
    "guides": guidesSidebar,
    "developer": developerSidebar,
    "reference": referenceSidebar,
}

export function getSidebar(path: string): SidebarItem[] | undefined {
    if (path.startsWith("/guides")) {
        return sidebars["guides"]
    } else if (path.startsWith("/developer")) {
        return sidebars["developer"]
    } else if (path.startsWith("/reference")) {
        return sidebars["reference"]
    } else {
        return undefined
    }
}

export default sidebars
