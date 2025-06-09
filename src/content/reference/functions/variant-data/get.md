---
title: get, []
---

Extracts a value from a variant that contains an array or object. The return value is of variant type.

The `[]` operator provides alternative syntax for variant index or field get.

The function returns NULL if either of the arguments is NULL.

## Syntax

```scopeql
get( <variant> , <index> )
get( <variant> , <field_name> )
<variant>[ <index> ]
<variant>[ <field_name> ]
```

## Arguments

### `<variant>`

An expression that evaluates to a variant that contains either an ARRAY or an OBJECT.

### `<index>`

An expression that evaluates to an INTEGER. This specifies the position of the element to retrieve from the ARRAY. The position is 0-based, not 1-based.

If the index points outside the array boundaries, this function returns NULL.

### `<field_name>`

An expression that evaluates to a string. This specifies the key in a key-value pair for which you want to retrieve the value.

`<field_name>` must not be an empty string.

If object does not contain the specified key, the function returns NULL.

## Returns

This function returns a variant.

## Examples

Extract the first element of an ARRAY:

```scopeql
CREATE TABLE vartab (a variant, o variant, v variant);

VALUES
([2.71, 3.14], {"France": 'Paris', "Germany": 'Berlin'}, {"sensorType": 'indoor', "temperature": 31.5, "timestamp": '2022-03-07T14:00:00.000-0800', "weatherStationID": 42})
INSERT INTO vartab;
```

```scopeql
FROM vartab;
```

```
+-------------+---------------------------------------+-------------------------------------------------------------------------------------------------------------+
| a           | o                                     | v                                                                                                           |
+-------------+---------------------------------------+-------------------------------------------------------------------------------------------------------------+
| [2.71,3.14] | {"France":'Paris',"Germany":'Berlin'} | {"sensorType":'indoor',"temperature":31.5,"timestamp":'2022-03-07T14:00:00.000-0800',"weatherStationID":42} |
+-------------+---------------------------------------+-------------------------------------------------------------------------------------------------------------+
```

Extract the first element of an ARRAY:

```scopeql
FROM vartab SELECT get(a, 0), a[0];
```

```
+-----------+------+
| get(a, 0) | a[0] |
+-----------+------+
| 2.71      | 2.71 |
+-----------+------+
```

Given the name of a country, extract the name of the capital city of that country from an OBJECT containing country names and capital cities:

```scopeql
FROM vartab SELECT get(o, 'Germany'), o['Germany'];
```

```
+-------------------+--------------+
| get(o, 'Germany') | o['Germany'] |
+-------------------+--------------+
| "Berlin"          | "Berlin"     |
+-------------------+--------------+
```

Extract the temperature from a variant that contains an OBJECT:

```scopeql
FROM vartab SELECT get(v, 'temperature');
```

```
+-----------------------+------------------+
| get(v, 'temperature') | v['temperature'] |
+-----------------------+------------------+
| 31.5                  | 31.5             |
+-----------------------+------------------+
```
