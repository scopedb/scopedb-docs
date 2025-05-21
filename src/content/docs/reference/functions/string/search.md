---
title: search
---

Searches character data (text) in specified columns.

## Syntax

```scopeql
search( <search_data>, <query>, <analyzer> )
```

## Arguments

### `<search_data>`

The data you want to search.

### `<query>` (named)

A string that contains one or more search terms. This argument must be a literal string; column names are not supported. Specify one pair of single quotes around the entire string.

### `<analyzer>` (named) (optional)

The analyzer to use for the search. This argument must be one of the strings listed below:

* `log`

The default value is `log`.

## Returns

Returns a boolean.

* The value is TRUE if any `<query>` tokens are found in `<search_data>`.
* Returns NULL if either of these arguments is NULL.
* Otherwise, returns FALSE.

## Examples

```scopeql
VALUES ('foo bar'), ('foobar'), ('bar baz'), ('') SELECT *, search($0, query => 'foo');
```

```
+---------+----------------------------+
| $0      | search($0, query => 'foo') |
+---------+----------------------------+
| foo bar | true                       |
| foobar  | false                      |
| bar baz | false                      |
|         | false                      |
+---------+----------------------------+
```
