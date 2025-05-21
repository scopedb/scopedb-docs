---
title: max_by
---

Finds the row(s) containing the maximum value for a column and returns the value of another column in that row.

For example, if a table contains the columns `employee_id` and `salary`, `MAX_BY(employee_id, salary)` returns the value of the `employee_id` column for the row that has the highest value in the `salary` column.

If multiple rows contain the specified maximum value, the function is non-deterministic.

## Syntax

```scopeql
max_by( <col_to_return>, <col_containing_maximum> )
```

## Arguments

### `<col_to_return>`

Column containing the value to return.

### `<col_containing_maximum>`

Column containing the maximum value.

## Returns

The function returns a value of the same type as `col_to_return`.

## Example

The following examples demonstrate how to use the MAX_BY function.

To run these examples, execute the following statements to set up the table and data for the examples:

```scopeql
CREATE TABLE employees(employee_id int, department_id int, salary int);
VALUES
  (1001, 10, 10000),
  (1020, 10, 9000),
  (1030, 10, 8000),
  (900, 20, 15000),
  (2000, 20, NULL),
  (2010, 20, 15000),
  (2020, 20, 8000),
INSERT INTO employees;
```

The following example returns the ID of the employee with the highest salary:

```scopeql
FROM employees aggregate max_by(employee_id, salary);
```

```
+-----------------------------+
| max_by(employee_id, salary) |
+-----------------------------+
| 2010                        |
+-----------------------------+
```

Note the following:

* Because more than one row contains the maximum value for the `salary` column, the function is non-deterministic and might return the employee ID for a different row in subsequent executions.
* The function ignores the NULL value in the salary column when determining the rows with the maximum values.
