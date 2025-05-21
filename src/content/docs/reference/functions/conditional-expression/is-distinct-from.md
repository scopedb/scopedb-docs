---
title: IS [ NOT ] DISTINCT FROM
---

Compares whether two expressions are equal (or not equal). The function is NULL-safe, meaning it treats NULLs as known values for comparing equality. Note that this is different from the EQUAL comparison operator (=), which treats NULLs as unknown values.

## Syntax

```scopeql
<expr1> IS [ NOT ] DISTINCT FROM <expr2>
```

## Returns

The value returned depends on whether any of the inputs are NULL values:

* Returns TRUE, if:
    * `<null> IS NOT DISTINCT FROM <null>`
    * `<null> IS DISTINCT FROM <not_null>`
    * `<not_null> IS DISTINCT FROM <null>`
* Returns FALSE, if:
    * `<null> IS DISTINCT FROM <null>`
    * `<null> IS NOT DISTINCT FROM <not_null>`
    * `<not_null> IS NOT DISTINCT FROM <null>`
* Otherwise,
    * `<expr1> IS DISTINCT FROM <expr2>` is equivalent to `<expr1> != <expr2>`
    * `<expr1> IS NOT DISTINCT FROM <expr2>` is equivalent to `<expr1> = <expr2>`
