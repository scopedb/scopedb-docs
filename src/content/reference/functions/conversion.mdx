---
sidebar_label: Conversion
title: Conversion functions
---

This family of functions can be used to convert an expression of any ScopeDB data type to another data type.

## CAST, ::

Converts a value of one data type into another data type. If the cast is not possible, an error is raised.

### Syntax

```scopeql
CAST ( <source_expr> AS <target_data_type> )
```

or

```scopeql
<source_expr> :: <target_data_type>
```

### Arguments

#### `<source_expr>`

Expression of any supported data type to be converted into a different data type.

#### `<target_data_type>`

The data type to which to convert the expression.

### Examples

Convert a string to a timestamp:

```scopeql
SELECT CAST('1900-10-16T19:00:00Z' AS timestamp);
SELECT '2024-10-16T19:00:00Z'::timestamp;
```

Convert a string to an interval:

```scopeql
SELECT CAST('PT24h' AS interval);
SELECT 'PT60s'::interval;
```

## TRY CAST

You can combine CAST with TRY. It performs the same operation (i.e. converts a value of one data type into another data type), but returns a NULL value instead of raising an error when the conversion can not be performed.

### Syntax

```scopeql
TRY ( CAST ( <source_expr> AS <target_data_type> ) )
```

### Arguments

#### `<source_expr>`

Expression of any supported data type to be converted into a different data type.

#### `<target_data_type>`

The data type to which to convert the expression.

### Examples

Successfully convert a string to a timestamp:

```scopeql
SELECT TRY(CAST('1900-10-16T19:00:00Z' AS timestamp));
```

```
+------------------------------------------------+
| try(CAST('1900-10-16T19:00:00Z' AS timestamp)) |
+------------------------------------------------+
| 1900-10-16T19:00:00Z                           |
+------------------------------------------------+
```

Failed to convert a string to a timestamp:

```scopeql
SELECT
    TRY(CAST('malformed string' AS timestamp)) as result,
    CATCH(CAST('malformed string' AS timestamp)) as reason;
```

```
+--------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| result | reason                                                                                                                                                                                        |
+--------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| NULL   | cannot convert `malformed string` to timestamp: failed to parse year in date "malformed string": failed to parse "malf" as year (a four digit integer): invalid digit, expected 0-9 but got m |
+--------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
```

## Related content

See also [data type conversion](/reference/data-types/conversion).
