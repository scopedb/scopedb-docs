---
title: count
---

Returns the number of records with non-NULL values for the specified field. If all records are NULL, the function returns 0.

## Syntax

```scopeql
count( <expr> )
```

## Arguments

### `<expr>`

A column name, which can be a qualified name (for example, database.schema.table.column_name).

## Returns

Returns a value of type int.
