---
title: floor
---

Returns values from `<input_expr>` rounded to the nearest equal or smaller integer.

## Syntax

```scopeql
floor( <input_expr> )
```

## Returns

The return type is float.

## Arguments

### `<input_expr>`

The value or expression to operate on. The data type should be float.

## Examples

```scopeql
SELECT floor(135.135), floor(-975.975), floor(2.5), floor(-2.5);
```

```
+----------------+------------------+------------+--------------+
| floor(135.135) | floor(- 975.975) | floor(2.5) | floor(- 2.5) |
+----------------+------------------+------------+--------------+
| 135.0          | -976.0           | 2.0        | -3.0         |
+----------------+------------------+------------+--------------+
```
