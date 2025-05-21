---
title: approx_quantile
---

Returns the approximate boundaries for `<expr>`. If all records inside a group are NULL, the function returns NULL.

## Syntax

```scopeql
approx_quantile( <expr>, <quantile> )
```

## Arguments

### `<expr>`

A column that contains float values.

### `<quantile>` (named)

A float literal that represents the quantile to calculate.

## Returns

A float value that identifies the approximate quantile.

## Examples

```scopeql
VALUES (1.0), (1.0), (1.0), (4.0), (5.0), (6.0), (7.0), (8.0), (9.0), (10.0)
AGGREGATE
    approx_quantile($0, quantile => 0.1) as p10,
    approx_quantile($0, quantile => 0.5) as p50,
    approx_quantile($0, quantile => 0.9) as p90,
    approx_quantile($0, quantile => 0.95) as p90,
    approx_quantile($0, quantile => 0.99) as p99;
```

```
+-----+-----+-----+------+------+
| p10 | p50 | p90 | p90  | p99  |
+-----+-----+-----+------+------+
| 1.0 | 5.5 | 9.1 | 9.55 | 9.91 |
+-----+-----+-----+------+------+
```
