---
title: reverse
---

Reverses the order of characters in a string.

The returned value is the same length as the input, but with the characters in reverse order. If subject is NULL, the result is also NULL.

## Syntax

```scopeql
reverse(<subject>)
```

## Examples

This example reverses a string:

```scopeql
SELECT reverse('Hello, world!');
```

```
+--------------------------+
| reverse('Hello, world!') |
+--------------------------+
| !dlrow ,olleH            |
+--------------------------+
```
