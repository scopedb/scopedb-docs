---
title: Data type conversion
---

In many cases, a value of one data type can be converted to another data type. For example, an INTEGER value can be converted to a floating-point data type value. Converting a data type is called casting.

## Explicit casting vs implicit casting

Users can explicitly convert a value from one data type to another. This is called explicit casting.

In some situations, ScopeDB converts a value to another data type automatically. This is called implicit casting or coercion.

### Explicit casting

Users can explicitly cast a value by using any of the following options:

* The [`CAST`](/reference/functions/conversion) function.
* The `::` operator (called the cast operator).
* The typed literal syntax `typename expression`.

For example, each query casts a string value to a timestamp value:

```scopeql
SELECT
    CAST('2024-12-24T00:00:00Z' AS timestamp) AS t1,
    '2024-12-24T00:00:00Z'::timestamp AS t2,
    timestamp '2024-12-24T00:00:00Z' AS t3;
```

Casting is allowed in most contexts in which a general expression is allowed, including the WHERE clause. For example:

```scopeql
FROM log
SELECT ts
WHERE ts >= '2024-12-24T00:00:00Z'::timestamp;
```

### Implicit casting (coercion)

Coercion occurs when a function (or operator) requires a data type that is different from, but compatible with, the arguments (or operands).

Currently, the following implicit casts are supported:

* Cast NULL to any data type.
* Cast between int and uint if the value is within the range of both types.

## Casting and precedence

When casting inside an expression, the code must take into account the precedence of the cast operator relative to other operators in the expression.

Consider the following example:

```scopeql
FROM dimensions
SELECT height * width::string || ' square meters';
```

The cast operator has higher precedence than the arithmetic operator * (multiply), so the statement is interpreted as:

```scopeql
... height * (width::string) ...
```

To cast the result of the expression `height * width`, use parentheses, as shown below:

```scopeql
FROM dimensions
SELECT (height * width)::string || ' square meters';
```

As another example, consider the following statement:

```scopeql
SELECT -0.0::float::string;
```

You might expect this to be interpreted as:

```scopeql
SELECT (-0.0::float)::string;
```

Therefore, it would be expected to return `-0.0`.

However, the cast operator has higher precedence than the unary minus (negation) operator, so the statement is interpreted as:

```scopeql
SELECT -(0.0::float::string);
```

Therefore, the query results in an error message because the unary minus can't be applied to a string.

## Data types that can be cast

Currently, the following explicit casts are supported:

* Between any numeric types (int, uint, float).
* Between int and timestamp (timestamp internally stores UNIX epoch in nanoseconds in 64-bit integer).
* Between int and interval (interval internally stores nanoseconds in 64-bit integer).
* Between string and any numeric types, boolean, timestamp, or interval.
* Between variant and any data type.
* From NULL to any data type.
