---
title: to_json
---

Converts a variant value to a string containing the JSON representation of the value.

## Syntax

```scopeql
to_json( <expr> )
```

## Arguments

### `<expr>`

An expression of type variant that holds valid JSON information.

## Returns

Returns a value of type VARCHAR.

If the input is NULL, the function returns NULL.

## Examples

Handling NULL values with TO_JSON:

```scopeql
SELECT to_json(NULL), to_json('null'::variant);
```

```
+---------------+--------------------------+
| TO_JSON(NULL) | TO_JSON('null'::variant) |
+---------------+--------------------------+
| NULL          | "null"                   |
+---------------+--------------------------+
```

Comparing parse_json and TO_JSON:

```scopeql
SELECT to_json(parse_json('{"b":1,"a":2}')),
       to_json(parse_json('{"b":1,"a":2}')) = '{"b":1,"a":2}',
       to_json(parse_json('{"b":1,"a":2}')) = '{"a":2,"b":1}';
```

```
+--------------------------------------+--------------------------------------------------------+--------------------------------------------------------+
| TO_JSON(parse_json('{"b":1,"a":2}')) | TO_JSON(parse_json('{"b":1,"a":2}')) = '{"b":1,"a":2}' | TO_JSON(parse_json('{"b":1,"a":2}')) = '{"a":2,"b":1}' |
+--------------------------------------+--------------------------------------------------------+--------------------------------------------------------+
| {"a":2,"b":1}                        | false                                                  | true                                                   |
+--------------------------------------+--------------------------------------------------------+--------------------------------------------------------+
```
