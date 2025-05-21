---
title: replace
---

Removes all occurrences of a specified substring, and replaces them with another substring.

## Syntax

```scopeql
replace( <subject> , <pattern> , <replacement> )
```

## Arguments

### `<subject>`

The subject is the string in which to do the replacements. Typically, this is a column, but it can be a literal.

### `<pattern>`

This is the substring that you want to replace. Typically, this is a literal, but it can be a column or expression.

If this is an empty string, then the `REPLACE` function simply return the original `<subject>` value.

### `<replacement>`

This is the value used as a replacement for the `<pattern>`.

If this is an empty string, then the `REPLACE` function simply deletes all occurrences of the `<pattern>`.

## Returns

The returned value is the string after all replacements have been done.

If any of the arguments is a NULL, the result is also a NULL.

## Examples

Replace the string "down" with the string "up":

```scopeql
SELECT replace('down', 'down', 'up');
```

```
+-------------------------------+
| replace('down', 'down', 'up') |
+-------------------------------+
| up                            |
+-------------------------------+
```

Replace the substring "Athens" in the string "Vacation in Athens" with the substring "Rome":

```scopeql
SELECT replace('Vacation in Athens', 'Athens', 'Rome');
```

```
+-------------------------------------------------+
| replace('Vacation in Athens', 'Athens', 'Rome') |
+-------------------------------------------------+
| Vacation in Rome                                |
+-------------------------------------------------+
```

Delete the substring "bc" in the string "abcd":

```scopeql
SELECT replace('abcd', 'bc', '');
```

```
+---------------------------+
| replace('abcd', 'bc', '') |
+---------------------------+
| ad                        |
+---------------------------+
```
