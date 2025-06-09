---
title: split
---

Splits a given string with a given separator and returns the result in an array of strings.

Contiguous split strings in the source string, or the presence of a split string at the beginning or end of the source string, results in an empty string in the output. An empty separator string results in an array containing only the source string. If either parameter is a NULL, a NULL is returned.

## Syntax

```scopeql
split(<string>, <separator>)
```

## Arguments

### `<string>`

Text to be split into parts.

### `<separator>` (named)

Text to split string by.

## Returns

The data type of the returned value is ARRAY.

## Examples

Split the localhost IP address "127.0.0.1" into an array consisting of each of the four parts:

```scopeql
SELECT split('127.0.0.1', '.');
```

```
+-------------------------+
| split('127.0.0.1', '.') |
+-------------------------+
| ['127','0','0','1']     |
+-------------------------+
```

Split a string that contains vertical lines as separators (note that the output will contain empty strings):

```scopeql
SELECT split('|a||', '|');
```

```
+--------------------+
| split('|a||', '|') |
+--------------------+
| ['','a','','']     |
+--------------------+
```
