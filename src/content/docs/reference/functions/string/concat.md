---
title: concat, ||
---

Concatenates two strings.

The `||` operator provides alternative syntax for CONCAT and can concatenate more than two strings.

## Syntax

```scopeql
concat( <expr> , <expr> )
<expr> || <expr> [ || <expr> ... ]
```

## Arguments

### `<expr>`

The input expressions must all be strings.

## Returns

The data type of the returned value is string. If any input value is NULL, returns NULL.

## Examples

```scopeql
SELECT concat('George Washington ', 'Carver');
```

```
+----------------------------------------+
| concat('George Washington ', 'Carver') |
+----------------------------------------+
| George Washington Carver               |
+----------------------------------------+
```

Use the `||` concatenation operator instead of the function:

```scopeql
SELECT 'This ' || 'is ' || 'another ' || 'concatenation ' || 'technique.';
```

```
+--------------------------------------------------------------------+
| 'This ' || 'is ' || 'another ' || 'concatenation ' || 'technique.' |
+--------------------------------------------------------------------+
| This is another concatenation technique.                           |
+--------------------------------------------------------------------+
```
