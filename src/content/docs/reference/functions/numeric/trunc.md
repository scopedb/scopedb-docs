---
title: trunc
---

Rounds the input expression down to the nearest (or equal) integer closer to zero.

## Syntax

```scopeql
trunc( <input_expr> )
```

## Returns

The return type is float.

## Arguments

### `<input_expr>`

The value or expression to operate on. The data type should be float.

## Examples

```scopeql
SELECT trunc(135.135), trunc(-975.975), trunc(2.5), trunc(-2.5);
```

```
+----------------+------------------+------------+--------------+
| TRUNC(135.135) | TRUNC(- 975.975) | TRUNC(2.5) | TRUNC(- 2.5) |
+----------------+------------------+------------+--------------+
| 135.0          | -975.0           | 2.0        | -2.0         |
+----------------+------------------+------------+--------------+
```
