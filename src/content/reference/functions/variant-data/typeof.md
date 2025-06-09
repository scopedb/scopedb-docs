---
title: typeof
---

Returns the type of value stored in a variant column. The type is returned as a string.

## Syntax

```scopeql
typeof( <expr> )
```

## Arguments

### `<expr>`

The argument can be a column name or a general expression of type variant. If necessary, you can cast the expr to a variant.

## Returns

Returns a string that contains the data type of the input expression, such as boolean, DECIMAL, ARRAY, OBJECT, etc.

## Examples

Create and populate a table. Note that the INSERT statement uses the parse_json function.

```scopeql
CREATE TABLE vartab (n int, v variant);
VALUES
    (1, 'null'),
    (2, null),
    (3, 'true'),
    (4, '-17'),
    (5, '123.12'),
    (6, '1.912e2'),
    (7, '"Om ara pa ca na dhih"  '),
    (8, '[-1, 12, 289, 2188, false]'),
    (9, '{ "x" : "abc", "y" : false, "z": 10} ')
SELECT $0 AS n, parse_json($1) AS v
INSERT INTO vartab;
```

Query the data:

```scopeql
FROM vartab
SELECT n, v, typeof(v)
ORDER BY n;
```

```
+---+------------------------------+-----------+
| n | v                            | typeof(v) |
+---+------------------------------+-----------+
| 1 | null                         | null      |
| 2 | NULL                         | NULL      |
| 3 | true                         | boolean   |
| 4 | -17                          | int       |
| 5 | 123.12                       | float     |
| 6 | 191.2                        | float     |
| 7 | 'Om ara pa ca na dhih'       | string    |
| 8 | [-1,12,289,2188,false]       | array     |
| 9 | {"x":'abc',"y":false,"z":10} | object    |
+---+------------------------------+-----------+
```
