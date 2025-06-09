---
sidebar_label: General DDL
title: Data Definition Language (DDL) statements
---

DDL commands are used to create, manipulate, and modify objects in ScopeDB, such as databases, schemas, and tables.

## CREATE DATABASE

Creates a new database in the system.

### Syntax

```scopeql
CREATE DATABASE [ IF NOT EXISTS ] <name>
```

## DROP DATABASE

Removes a database from the system.

### Syntax

```scopeql
DROP DATABASE [ IF EXISTS ] <name>
```

## CREATE SCHEMA

Creates a new schema in the current database

### Syntax

```scopeql
CREATE SCHEMA [ IF NOT EXISTS ] <name>
```

## DROP SCHEMA

Removes a schema from the current database.

### Syntax

```scopeql
DROP SCHEMA [ IF EXISTS ] <name>
```

## CREATE TABLE

Creates a new table in the current schema.

### Syntax

```scopeql
CREATE TABLE [ IF NOT EXISTS ] <table_name> (
    [
        <col_name> <col_type>
        [ NULL | NOT NULL ]
        [ COMMENT '<string_literal>' ]
    ],*
)
[ COMMENT = '<string_literal>' ]
WITH (
    ['string_literal' = <literal>],*
)
```

### Examples

```scopeql
CREATE TABLE t1 (a int)
with (
    'storage.type' = 's3',
    'storage.endpoint' = 'http://127.0.0.1:9000/',
    'storage.bucket' = 'test-bucket',
    'storage.region' = 'us-east-1',
    'storage.access_key_id' = 'minioadmin',
    'storage.secret_access_key' = 'minioadmin'
);
```

## DROP TABLE

Removes a table from the current schema.

### Syntax

```scopeql
DROP TABLE [ IF EXISTS ] <name>
```

## CREATE VIEW

Creates a new view in the current schema. A view is a virtual table based on the result set of a query. Views can help simplify complex queries and provide an abstraction layer over the underlying tables.

### Syntax

```scopeql
CREATE [ OR REPLACE ] VIEW <name>
AS <query>
[ COMMENT = '<string_literal>' ]
```

### Parameters

#### `[ OR REPLACE ]`
Optional clause that allows you to replace an existing view if it already exists.

#### `<name>`
The name of the view to create.

#### `COMMENT`
Optional comment to describe the purpose of the view.

#### `<query>`
The SELECT query that defines the view's contents.

### Examples

```scopeql
-- Create a table to store user events
CREATE TABLE user_events (
    user_id int,
    event_time timestamp,
    status string,
    score int
);

-- Insert sample data
VALUES
    (1, '2024-01-01T10:00:00Z', 'active', 85),
    (1, '2024-01-02T15:30:00Z', 'inactive', 75),
    (2, '2024-01-01T09:00:00Z', 'active', 90),
    (2, '2024-01-03T14:20:00Z', 'active', 95)
INSERT INTO user_events;

-- Create a view that keeps only the latest record for each user
CREATE VIEW latest_user_status AS
FROM user_events
DISTINCT ON user_id
BY event_time DESC;

-- Create or replace a view with a comment
CREATE OR REPLACE VIEW highest_user_scores
AS
FROM user_events
DISTINCT ON user_id
BY score DESC
COMMENT = 'Users highest achieved scores';
```

### Usage Notes

* Views are read-only and cannot be used as targets for INSERT, UPDATE, or DELETE operations
* Views are useful for:
  * Simplifying repeated queries
  * Creating logical abstractions of the data
  * Storing commonly used DISTINCT ON operations

## DROP VIEW

Removes a view from the current schema.

### Syntax

```scopeql
DROP VIEW <name>
```

### Parameters

#### `<name>`
The name of the view to drop.

### Examples

```scopeql
-- Drop a view
DROP VIEW latest_user_status;

-- Drop a view if it exists
DROP VIEW highest_user_scores;
```

## SHOW TABLES

Lists the tables for which you have access privileges.

### Syntax

```scopeql
SHOW TABLES
```

## DESCRIBE TABLE

Describes the columns in a table.

### Syntax

```scopeql
DESCRIBE TABLE <name>
```

## CREATE INDEX

Creates a new index on a table to improve query performance.

### Syntax

```scopeql
CREATE <index_type> INDEX <name> ON <table_name> (<index_expression>)

<index_type>:
    smart
    | search
```

### Parameters

- `<index_type>`: The type of index to create:
  - `SMART`: A general-purpose index that improves performance of queries involving the indexed expression
  - `SEARCH`: A specialized index that optimizes performance of text search operations using the `search` function

- `<name>`: The name of the index (must be unique within the table)

- `<table_name>`: The name of the table to create the index on

- `<index_expression>`:
  * For SMART indexes: Any valid expression that returns a deterministic value
  * For SEARCH indexes: Must be a string column that will be used with the `search` function

### Examples

```scopeql
-- Create a table with different column types
CREATE TABLE logs (
    id int,
    time timestamp,
    message string,
    level string,
    var variant,
);

-- SMART index on a column
CREATE SMART INDEX idx_log_id ON logs (id);

-- SMART index on a timestamp expression
CREATE SMART INDEX idx_log_hour ON logs (trunc(time, unit => 'hour'));

-- SMART index on a computed expression
CREATE SMART INDEX idx_log_var_type ON logs (var['type']::string);

-- SEARCH index for text searching in log messages
CREATE SEARCH INDEX idx_log_message ON logs (message);
```

### When to Use Each Index Type

1. Use `SMART` indexes when:
   - You frequently filter on specific columns or expressions
   - You need to optimize queries that use range conditions or equality comparisons
   - You want to improve performance of queries involving computed expressions(e.g. path access on variant columns like `var['type']::string`)

2. Use `SEARCH` indexes when:
   - You need to perform text search operations using the `search` function
   - You want to optimize queries that look for specific text patterns in string columns

### Notes

- Indexes improve query performance but require additional storage space
- Creating too many indexes can slow down write operations and increase query latency
- The query optimizer automatically determines when to use available indexes

## DROP INDEX

Removes an index from a table.

### Syntax

```scopeql
DROP INDEX <name> ON <table_name>
```

### Parameters

- `<name>`: The name of the index to drop
- `<table_name>`: The name of the table containing the index

### Examples

```scopeql
-- Drop indexes created in the previous examples
DROP INDEX idx_log_id ON logs;
DROP INDEX idx_log_message ON logs;
```

## CREATE NODEGROUP

Creates a new nodegroup.

### Syntax

```scopeql
CREATE NODEGROUP <name>
```

## DROP NODEGROUP

Removes a nodegroup.

### Syntax

```scopeql
DROP NODEGROUP <name>
```

## CREATE JOB

Creates a new job.

### Syntax

```scopeql
CREATE JOB <name>
SCHEDULE = '<cronexpr>'
NODEGROUP = '<comma-separated-nodegroups>'
AS
  <statement>
```

### Examples

```scopeql
CREATE JOB archive_table_t
SCHEDULE = '4 2 * * * Asia/Shanghai'
NODEGROUP = 'background'
AS DELETE FROM t;
```

## DROP JOB

Removes a job.

### Syntax

```scopeql
DROP JOB <name>
```

## SHOW JOBS

Lists the jobs for which you have access privileges.

### Syntax

```scopeql
SHOW JOBS
```

## OPTIMIZE TABLE

Optimizing a table. Do compaction or purge historical data to save storage space and enhance query performance.

### Syntax

```scopeql
OPTIMIZE TABLE <name>
```
