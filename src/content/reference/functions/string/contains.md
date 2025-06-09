---
title: contains
---

Returns true if `<expr1>` contains `<expr2>`. Both expressions must be strings.

## Syntax

```scopeql
contains( <expr1> , <expr2> )
```

## Arguments

### `<expr1>`

The string to search in.

### `<expr2>`

The string to search for.

## Returns

Returns a boolean or NULL:

* Returns TRUE if `<expr2>` is found inside `<expr1>`.
* Returns FALSE if `<expr2>` is not found inside `<expr1>`.
* Returns NULL if either input expression is NULL.

## Examples

Determine whether column values contain a string:

```scopeql
VALUES
  ('coffee'),
  ('ice tea'),
  ('latte'),
  ('tea'),
  (NULL)
WHERE contains($0, 'te');
```

```
+---------+
| $0      |
+---------+
| ice tea |
| latte   |
| tea     |
+---------+
```
