---
title: array_except
---

Returns a new ARRAY that contains the elements from one input ARRAY that are not in another input ARRAY.

## Syntax

```scopeql
array_except( <source_array> , <array_of_elements_to_exclude> )
```

## Arguments

### `<source_array>`

An array that contains elements to be included in the new ARRAY.

### `<array_of_elements_to_exclude>`

An array that contains elements to be excluded from the new ARRAY.

## Returns

This function returns an ARRAY that contains the elements from `<source_array>` that are not in `<array_of_elements_to_exclude>`.

If no elements remain after excluding the elements in `<array_of_elements_to_exclude>` from `<source_array>`, the function returns an empty ARRAY.

If one or both arguments are NULL, the function returns NULL.

The order of the values within the returned array is unspecified.

## Examples

The following example demonstrates how to use the function:

```scopeql
SELECT array_except(['A', 'B'], ['B', 'C']);
```

```
+--------------------------------------+
| array_except(['A', 'B'], ['B', 'C']) |
+--------------------------------------+
| ['A']                                |
+--------------------------------------+
```

The following example adds the element `'C'` to `<source_array>`. The returned ARRAY excludes `'C'` because `'C'` is also specified in `<array_of_elements_to_exclude>`.

```scopeql
SELECT array_except(['A', 'B', 'C'], ['B', 'C']);
```

```
+-------------------------------------------+
| array_except(['A', 'B', 'C'], ['B', 'C']) |
+-------------------------------------------+
| ['A']                                     |
+-------------------------------------------+
```

In the following example, `<source_array>` contains 3 elements with the value `'B'`. Because `<array_of_elements_to_exclude>` contains only 1 `'B'` element, the function excludes all `'B'` element and returns an ARRAY containing no `'B'` elements.

```scopeql
SELECT array_except(['A', 'B', 'B', 'B', 'C'], ['B']);
```

```
+------------------------------------------------+
| array_except(['A', 'B', 'B', 'B', 'C'], ['B']) |
+------------------------------------------------+
| ['A','C']                                      |
+------------------------------------------------+
```

In the following example, no elements remain after excluding the elements in `<array_of_elements_to_exclude>` from `<source_array>`. As a result, the function returns an empty ARRAY.

```scopeql
SELECT array_except(['A', 'B'], ['A', 'B']);
```

```
+--------------------------------------+
| array_except(['A', 'B'], ['A', 'B']) |
+--------------------------------------+
| []                                   |
+--------------------------------------+
```

The following example demonstrates how the function treats NULL elements as known values. As explained earlier, the returned ARRAY excludes all the NULL elements.

```scopeql
SELECT array_except(['A', NULL, NULL], ['B', NULL]);
```

```
+----------------------------------------------+
| array_except(['A', NULL, NULL], ['B', NULL]) |
+----------------------------------------------+
| ['A']                                        |
+----------------------------------------------+
```

The following example demonstrates how specifying the same object in `<source_array>` and `<array_of_elements_to_exclude>` excludes that object from the returned ARRAY:

```scopeql
SELECT array_except([{'a': 1, 'b': 2}, 1], [{'a': 1, 'b': 2}, 3]);
```

```
+------------------------------------------------------------+
| array_except([{"a": 1, "b": 2}, 1], [{"a": 1, "b": 2}, 3]) |
+------------------------------------------------------------+
| [1]                                                        |
+------------------------------------------------------------+
```

The following example demonstrates that passing in NULL results in the function returning NULL:

```scopeql
SELECT array_except(['A', 'B'], NULL);
```

```
+--------------------------------+
| array_except(['A', 'B'], NULL) |
+--------------------------------+
| NULL                           |
+--------------------------------+
```
