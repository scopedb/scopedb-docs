---
title: array_slice
---

Returns an array constructed from a specified subset of elements of the input array.

## Syntax

```scopeql
array_slice( <array> , <start> , <end> , <step> )
```

## Arguments

### `<array>`

The source array of which a subset of the elements are used to construct the resulting array.

### `<start>`

A position in the source array. The position of the first element is `0`.

### `<end>`

A position in the source array.

### `<step>`

An iteration delta.

## Returns

An ARRAY constructed from a specified subset. NULL if the input array is NULL.

## Usage notes

Array slice returns a slice defined by the two slice parameters, `<start>` and `<end>`, and an iteration delta, `<step>`. Each of these parameters can be NULL.

The default value for `<step>` is 1. The default values for `<start>` and `<end>` depend on the sign of `<step>`:

| Condition | start | end    |
| --------- | ----- | ------ |
| step >= 0 | 0     | len    |
| step < 0  | len-1 | -len-1 |

The direction of the iteration is defined by the sign of step. If step is positive, the iteration is from `<start>` to `<end>`. If step is negative, the iteration is from `<end>` to `<start>`.

## Examples

Here is a simple example:

```scopeql
SELECT ["a", "b", "c", "d", "e", "f", "g"] AS v
SELECT
    array_slice(v, 1, 3, NULL) AS s1,
    array_slice(v, 5, NULL, NULL) AS s2,
    array_slice(v, 1, 5, 2) AS s3,
    array_slice(v, 5, 1, -2) AS s4,
    array_slice(v, NULL, NULL, -1) AS s5;
```

```
+-----------+-----------+-----------+-----------+-------------------------------+
| s1        | s2        | s3        | s4        | s5                            |
+-----------+-----------+-----------+-----------+-------------------------------+
| ['b','c'] | ['f','g'] | ['b','d'] | ['f','d'] | ['g','f','e','d','c','b','a'] |
+-----------+-----------+-----------+-----------+-------------------------------+
```
