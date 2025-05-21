---
title: min
---

Returns the minimum value for the records within `<expr>`. NULL values are ignored unless all the records are NULL, in which case a NULL value is returned.

If `<n>` is specified, MIN returns the N minimum values from a column, which is the same results as the regular query `FROM ... ORDER BY ... LIMIT n` but as a variant list.

## Syntax

```scopeql
min( <expr> )
min( <expr>, <n> )
```

## Arguments

**Required:**

### `<expr>`

A column name, which can be a qualified name (for example, database.schema.table.column_name).

### `<n>` (named) (optional)

The number of minimum values to return.

## Returns

* If `<n>` is not specified, MIN returns the same as the data type of the input values.
* If `<n>` is specified, MIN returns an ARRAY that contains all the `<n>` minimum values.

## Examples

Get the minimum value:

```scopeql
VALUES (1), (1), (1), (4), (5), (6), (7), (8), (9), (10)
AGGREGATE min($0);
```

```
+---------+
| MIN($0) |
+---------+
| 1       |
+---------+
```

Get the minimum N value:

```scopeql
VALUES (1), (1), (1), (4), (5), (6), (7), (8), (9), (10)
AGGREGATE min($0, 5);
```

```
+-------------+
| MIN($0, 5)  |
+-------------+
| [1,1,1,4,5] |
+-------------+
```

Alternatively, use the named argument syntax:

```scopeql
VALUES (1), (1), (1), (4), (5), (6), (7), (8), (9), (10)
AGGREGATE min($0, n => 5);
```

```
+-----------------+
| MIN($0, n => 5) |
+-----------------+
| [1,1,1,4,5]     |
+-----------------+
```
