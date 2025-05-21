---
title: array_length
---

Returns the length of the input array.

A variation of ARRAY_LENGTH takes a variant value as input. If the variant value contains an array, the length of the array is returned; otherwise, NULL is returned if the value is not an array.

## Syntax

```scopeql
array_length( <array> )
```

## Returns

The data type of the returned value is INTEGER.

## Examples

Here is a simple example:

```scopeql
SELECT array_length([1, 2, 3]);
```

```scopeql
| array_length([1, 2, 3]) |
+-------------------------+
| 3                       |
+-------------------------+
```

Here is a slightly more complex example, this time using variant data type:

```scopeql
CREATE TABLE colors (v variant);

VALUES
     ('[{"r":255,"g":12,"b":0},{"r":0,"g":255,"b":0},{"r":0,"g":0,"b":255}]'),
     ('[{"r":255,"g":128,"b":0},{"r":128,"g":255,"b":0},{"r":0,"g":255,"b":128},{"r":0,"g":128,"b":255},{"r":128,"g":0,"b":255},{"r":255,"g":0,"b":128}]')
SELECT parse_json($0)
INSERT INTO colors;
```

Retrieve the length for each array in the variant column:

```scopeql
FROM colors SELECT array_length(v);
```

```scopeql
+-----------------+
| array_length(v) |
+-----------------+
| 3               |
| 6               |
+-----------------+
```

Retrieve the last element of each array in the variant column:

```scopeql
FROM colors SELECT get(v, array_length(v)-1);
```

```scopeql
+-----------------------------+
| get(v, array_length(v) - 1) |
+-----------------------------+
| {"b":255,"g":0,"r":0}       |
| {"b":128,"g":0,"r":255}     |
+-----------------------------+
```
