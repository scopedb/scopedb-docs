---
title: stddev_samp
---

Returns the sample standard deviation (square root of sample variance) of non-NULL values.

See also [STDDEV_POP](/reference/functions/aggregate/stddev_pop), which returns the population standard deviation (square root of variance).

## Syntax

```scopeql
stddev_samp ( <expr> )
```

## Arguments

### `<expr>`

An expression that evaluates to a numeric value. This is the expression on which the standard deviation is calculated.

## Returns

The data type of the returned value is float.

If all records inside a group are NULL, this function returns NULL.
