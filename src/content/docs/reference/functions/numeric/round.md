---
title: round
---

Returns rounded values for `<input_expr>`. If the fractional part is exactly 0.5, the result is rounded away from zero.

## Syntax

```scopeql
round( <input_expr> )
```

## Returns

The return type is float.

## Arguments

### `<input_expr>`

The value or expression to operate on. The data type should be float.

## Examples

```scopeql
SELECT round(135.135), round(-975.975), round(2.5), round(-2.5);
```

```
+----------------+------------------+------------+--------------+
| round(135.135) | round(- 975.975) | round(2.5) | round(- 2.5) |
+----------------+------------------+------------+--------------+
| 135.0          | -976.0           | 3.0        | -3.0         |
+----------------+------------------+------------+--------------+
```
