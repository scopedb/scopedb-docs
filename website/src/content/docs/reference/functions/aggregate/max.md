---
title: max
---

Returns the maximum value for the records within `<expr>`. NULL values are ignored unless all the records are NULL, in which case a NULL value is returned.

If `<n>` is specified, MAX returns the N maximum values from a column, which is the same results as the regular query `FROM ... ORDER BY ... DESC LIMIT n` but as a variant list.

## Syntax

```scopeql
max( <expr> )
max( <expr>, <n> )
```

## Returns

The data type of the returned value is the same as the data type of the input values.

## Arguments

**Required:**

### `<expr>`

A column name, which can be a qualified name (for example, database.schema.table.column_name).

### `<n>` (named) (optional)

The number of maximum values to return.

## Returns

* If `<n>` is not specified, MIN returns the same as the data type of the input values.
* If `<n>` is specified, MIN returns an ARRAY that contains all the `<n>` minimum values.

## Examples

Get the maximum value:

```scopeql
VALUES (1), (1), (1), (4), (5), (6), (7), (8), (9), (10)
AGGREGATE max($0);
```

```
+---------+
| max($0) |
+---------+
| 10      |
+---------+
```

Get the maximum N value:

```scopeql
VALUES (1), (1), (1), (4), (5), (6), (7), (8), (9), (10)
AGGREGATE max($0, 5);
```

```
+--------------+
| max($0, 5)   |
+--------------+
| [10,9,8,7,6] |
+--------------+
```

Alternatively, use the named argument syntax:

```scopeql
VALUES (1), (1), (1), (4), (5), (6), (7), (8), (9), (10)
AGGREGATE max($0, n => 5);
```

```
+-----------------+
| max($0, n => 5) |
+-----------------+
| [10,9,8,7,6]    |
+-----------------+
```
