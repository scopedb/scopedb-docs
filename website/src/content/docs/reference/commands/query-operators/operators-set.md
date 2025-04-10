---
sidebar_label: Set operators
title: Set operators
---

Set operators allow queries to be combined.

## UNION ALL

Combines the result sets from two queries without duplicate elimination.

### Syntax

```scopeql
<query> UNION ALL <query>
```

### Examples

This example demonstrates the basic usage of the UNION ALL operator. It also demonstrates a potential issue when data types do not match, then provides the solution.

Start by creating the tables and inserting some data:

```scopeql
CREATE TABLE t1 (v string);
CREATE TABLE t2 (i int);
VALUES ('Adams, Douglas') INSERT INTO t1;
VALUES (42) INSERT INTO t2;
```

Execute a UNION ALL operation with different data types:

```scopeql
FROM t1 UNION ALL FROM t2;
```

Output:

```
relation type mismatched on union all: expected [String], found [Int]
```

Now use explicit casting to convert the inputs to a compatible type:

```scopeql
FROM t1 SELECT v::string
UNION ALL
FROM t2 SELECT i::string;
```

Output:

```
+----------------+
| v::string      |
+----------------+
| Adams, Douglas |
| 42             |
+----------------+
```
