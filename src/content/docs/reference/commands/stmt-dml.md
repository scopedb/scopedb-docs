---
sidebar_label: General DML
title: Data Manipulation Language (DML) statements
---

## INSERT

Updates a table by inserting one or more rows into the table. The values inserted into each column in the table can be explicitly-specified or the results of a query.

### Examples

Inserts with constants:

```scopeql
CREATE TABLE t (a int);
VALUES (1), (2), (3) INSERT INTO t;
```

Inserts from the results of a query:

```scopeql
CREATE TABLE t1 (a int);
CREATE TABLE t2 (a int);

VALUES (1), (2), (3) INSERT INTO t1;
FROM t1 WHERE a > 1 SELECT a + 1 AS b INSERT INTO t2;
```

## DELETE

Remove rows from a table. You can use a WHERE clause to specify which rows should be removed.

### Examples

Deletes with conditions:

```scopeql
DELETE FROM t WHERE a > 1;
```

Deletes all the data:

```scopeql
DELETE FROM t;
```

## UPDATE

Updates specified rows in the target table with new values.

### Examples

```scopeql
UPDATE t SET a = 2 WHERE a = 1;
```
