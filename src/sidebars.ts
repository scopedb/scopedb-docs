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
            {
                label: "Statements", items: [
                    { label: "Overview", link: "/reference/commands/statements" },
                    { label: "DDL overview", link: "/reference/commands/stmt-ddl" },
                    { label: "CREATE DATABASE", link: "/reference/commands/statements/create-database" },
                    { label: "DROP DATABASE", link: "/reference/commands/statements/drop-database" },
                    { label: "CREATE SCHEMA", link: "/reference/commands/statements/create-schema" },
                    { label: "DROP SCHEMA", link: "/reference/commands/statements/drop-schema" },
                    { label: "CREATE TABLE", link: "/reference/commands/statements/create-table" },
                    { label: "DROP TABLE", link: "/reference/commands/statements/drop-table" },
                    { label: "ALTER TABLE", link: "/reference/commands/statements/alter-table" },
                    { label: "CREATE VIEW", link: "/reference/commands/statements/create-view" },
                    { label: "DROP VIEW", link: "/reference/commands/statements/drop-view" },
                    { label: "SHOW TABLES", link: "/reference/commands/statements/show-tables" },
                    { label: "DESCRIBE TABLE", link: "/reference/commands/statements/describe-table" },
                    { label: "CREATE INDEX", link: "/reference/commands/statements/create-index" },
                    { label: "DROP INDEX", link: "/reference/commands/statements/drop-index" },
                    { label: "DML overview", link: "/reference/commands/stmt-dml" },
                    { label: "INSERT", link: "/reference/commands/statements/insert" },
                    { label: "DELETE", link: "/reference/commands/statements/delete" },
                    { label: "UPDATE", link: "/reference/commands/statements/update" },
                ],
            },
        ],
    },
    {
        label: "Functions", items: [
            { label: "Overview", link: "/reference/functions" },
            {
                label: "Aggregate", items: [
                    { label: "Overview", link: "/reference/functions/aggregate" },
                    { label: "approx_count_distinct", link: "/reference/functions/aggregate/approx_count_distinct" },
                    { label: "approx_quantile", link: "/reference/functions/aggregate/approx_quantile" },
                    { label: "array_agg", link: "/reference/functions/aggregate/array_agg" },
                    { label: "avg", link: "/reference/functions/aggregate/avg" },
                    { label: "count", link: "/reference/functions/aggregate/count" },
                    { label: "count_distinct", link: "/reference/functions/aggregate/count_distinct" },
                    { label: "first, first_value", link: "/reference/functions/aggregate/first" },
                    { label: "last, last_value", link: "/reference/functions/aggregate/last" },
                    { label: "max", link: "/reference/functions/aggregate/max" },
                    { label: "max_by", link: "/reference/functions/aggregate/max_by" },
                    { label: "min", link: "/reference/functions/aggregate/min" },
                    { label: "min_by", link: "/reference/functions/aggregate/min_by" },
                    { label: "mode", link: "/reference/functions/aggregate/mode" },
                    { label: "object_agg", link: "/reference/functions/aggregate/object_agg" },
                    { label: "quantile", link: "/reference/functions/aggregate/quantile" },
                    { label: "schema", link: "/reference/functions/aggregate/schema" },
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
                    { label: "ceil, floor", link: "/reference/functions/date-and-time/temporal-round" },
                    { label: "strftime, strptime", link: "/reference/functions/date-and-time/format-parse" },
                    { label: "now", link: "/reference/functions/date-and-time/now" },
                    { label: "trunc", link: "/reference/functions/date-and-time/temporal-trunc" },
                ],
            },
            {
                label: "Numeric", items: [
                    { label: "Overview", link: "/reference/functions/numeric" },
                    { label: "abs", link: "/reference/functions/numeric/abs" },
                    { label: "ceil", link: "/reference/functions/numeric/ceil" },
                    { label: "floor", link: "/reference/functions/numeric/floor" },
                    { label: "ln, log", link: "/reference/functions/numeric/logarithms" },
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
                    { label: "lpad, rpad", link: "/reference/functions/string/pad" },
                    { label: "ltrim", link: "/reference/functions/string/ltrim" },
                    { label: "lower", link: "/reference/functions/string/lower" },
                    { label: "md5", link: "/reference/functions/string/md5" },
                    { label: "regexp_extract", link: "/reference/functions/string/regexp_extract" },
                    { label: "regexp_like", link: "/reference/functions/string/regexp_like" },
                    { label: "regexp_replace", link: "/reference/functions/string/regexp_replace" },
                    { label: "repeat", link: "/reference/functions/string/repeat" },
                    { label: "replace", link: "/reference/functions/string/replace" },
                    { label: "reverse", link: "/reference/functions/string/reverse" },
                    { label: "rtrim", link: "/reference/functions/string/rtrim" },
                    { label: "search", link: "/reference/functions/string/search" },
                    { label: "search_ip", link: "/reference/functions/string/search_ip" },
                    { label: "split", link: "/reference/functions/string/split" },
                    { label: "starts_with", link: "/reference/functions/string/starts_with" },
                    { label: "substr", link: "/reference/functions/string/substr" },
                    { label: "tokenize", link: "/reference/functions/string/tokenize" },
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
                    { label: "dedup", link: "/reference/functions/semi-structured-data/dedup" },
                    { label: "exclude", link: "/reference/functions/semi-structured-data/exclude" },
                    { label: "keys", link: "/reference/functions/semi-structured-data/keys" },
                    { label: "length", link: "/reference/functions/semi-structured-data/length" },
                    { label: "parse_json", link: "/reference/functions/semi-structured-data/parse_json" },
                    { label: "to_json", link: "/reference/functions/semi-structured-data/to_json" },
                    { label: "typeof", link: "/reference/functions/semi-structured-data/typeof" },
                ],
            },
            {
                label: "Window", items: [
                    { label: "Overview", link: "/reference/functions/window" },
                    { label: "lag, lead", link: "/reference/functions/window/lag-lead" },
                    { label: "row_number", link: "/reference/functions/window/row_number" },
                ],
            },
            {
                label: "System", items: [
                    { label: "Overview", link: "/reference/functions/system" },
                    { label: "version", link: "/reference/functions/system/version" },
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
