---
title: parse_json
---

Interprets an input string as a JSON document, producing a variant value.

You can use the parse_json function when you have input data in JSON format. This function can convert data from JSON format to ARRAY or OBJECT data and store that data directly in a variant value. You can then analyze or manipulate the data.

## Syntax

```scopeql
parse_json(<expr>)
```

## Arguments

### `<expr>`

An expression of string type that holds valid JSON information.

## Returns

Returns a value of type variant that contains a JSON document.

If the input is NULL, the function returns NULL.

## Examples

Handling NULL values with parse_json:

```scopeql
SELECT parse_json(NULL), parse_json('null');
```

```
+------------------+--------------------+
| parse_json(NULL) | parse_json('null') |
+------------------+--------------------+
| NULL             | null               |
+------------------+--------------------+
```

Other regular calls:

```scopeql
SELECT parse_json('{"b":1,"a":2}');
```

```
+-----------------------------+
| parse_json('{"b":1,"a":2}') |
+-----------------------------+
| {"a":2,"b":1}               |
+-----------------------------+
```
