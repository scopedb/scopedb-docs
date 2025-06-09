---
title: ceil
---

Returns values from `<input_expr>` rounded to the nearest equal or larger integer.

## Syntax

```scopeql
ceil( <input_expr> )
```

## Returns

The return type is float.

## Arguments

### `<input_expr>`

The value or expression to operate on. The data type should be float.

## Examples

```scopeql
SELECT ceil(135.135), ceil(-975.975), ceil(2.5), ceil(-2.5);
```

```
+---------------+-----------------+-----------+-------------+
| ceil(135.135) | ceil(- 975.975) | ceil(2.5) | ceil(- 2.5) |
+---------------+-----------------+-----------+-------------+
| 136.0         | -975.0          | 3.0       | -2.0        |
+---------------+-----------------+-----------+-------------+
```
