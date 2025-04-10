---
title: mode
---

Returns the most frequent value for the values within `<expr>`. NULL values are ignored. If all the values are NULL, or there are 0 rows, then the function returns NULL.

## Syntax

```scopeql
mode( <expr1> )
```

## Arguments

### `<expr>`

This expression produces the values that are searched to find the most frequent value. The expression can be of any data types.

## Returns

The data type of the returned value is identical to the data type of the input expression.
