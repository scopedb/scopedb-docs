---
title: substr
---

Returns the portion of the string value from `<base_expr>`, starting from the character specified by `<start_expr>`, with optionally limited length.

## Syntax

```scopeql
substr( <base_expr>, <start_expr> [ , <length_expr> ] )
```

## Arguments

### `<base_expr>`

An expression that evaluates to a string value.

### `<start_expr>`

An expression that evaluates to an integer. It specifies the offset from which the substring starts. The offset is measured in the number of UTF-8 characters.

The start position is 0-based.

### `<length_expr>`

An expression that evaluates to an integer. It specifies the number of UTF-8 characters to return.

Specify a length that is greater than or equal to zero. If the length is a negative number, the function throws an error.

## Returns

The data type of the returned value is string. If any of the inputs are NULL, NULL is returned.

## Examples

The following example uses the substr function to return the portion of the string that starts at the ninth character and limits the length of the returned value to three characters:

```scopeql
SELECT substr('testing 1 2 3', 8, 3);
```

```
+-------------------------------+
| substr('testing 1 2 3', 8, 3) |
+-------------------------------+
| 1 2                           |
+-------------------------------+
```

The following example shows the substrings returned for the same `<base_expr>` when different values are specified for `<start_expr>` and `<length_expr>`:

```scopeql
VALUES
  ('mystring', -1, 3),
  ('mystring', -3, 3),
  ('mystring', -3, 7),
  ('mystring', -5, 3),
  ('mystring', -7, 3),
  ('mystring', 0, 3),
  ('mystring', 0, 7),
  ('mystring', 1, 3),
  ('mystring', 1, 7),
  ('mystring', 3, 3),
  ('mystring', 3, 7),
  ('mystring', 5, 3),
  ('mystring', 5, 7),
  ('mystring', 7, 3),
  ('mystring', NULL, 3),
  ('mystring', 3, NULL)
SELECT
  $0 as base_value,
  $1 as start_value,
  $2 as length_value,
  substr($0, $1, $2) as substring;
```

```
+------------+-------------+--------------+-----------+
| base_value | start_value | length_value | substring |
+------------+-------------+--------------+-----------+
| mystring   | -1          | 3            | g         |
| mystring   | -3          | 3            | ing       |
| mystring   | -3          | 7            | ing       |
| mystring   | -5          | 3            | tri       |
| mystring   | -7          | 3            | yst       |
| mystring   | 0           | 3            | mys       |
| mystring   | 0           | 7            | mystrin   |
| mystring   | 1           | 3            | yst       |
| mystring   | 1           | 7            | ystring   |
| mystring   | 3           | 3            | tri       |
| mystring   | 3           | 7            | tring     |
| mystring   | 5           | 3            | ing       |
| mystring   | 5           | 7            | ing       |
| mystring   | 7           | 3            | g         |
| mystring   | NULL        | 3            | NULL      |
| mystring   | 3           | NULL         | NULL      |
+------------+-------------+--------------+-----------+
```
