---
title: object_construct
---

Returns an OBJECT constructed from the arguments.

## Syntax

```scopeql
object_construct( [<key>, <value> [, <key>, <value> , ...]] )
```

## Arguments

### `<key>`

The key in a key-value pair. Each key is a string value.

### `<value>`

The value that is associated with the key. The value can be any data type.

## Returns

Returns a value of type OBJECT.

## Examples

This example shows how to construct a simple object:

```scopeql
SELECT object_construct('a', 1, 'b', 'BBBB', 'c', NULL);
```

```
+--------------------------------------------------+
| object_construct('a', 1, 'b', 'BBBB', 'c', NULL) |
+--------------------------------------------------+
| {"a":1,"b":'BBBB'}                               |
+--------------------------------------------------+
```
