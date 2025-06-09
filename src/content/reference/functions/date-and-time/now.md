---
title: now
---

Returns the current timestamp for the system in the local time zone.

## Syntax

```scopeql
now()
```

## Returns

Returns the current system time. The data type of the returned value is timestamp.

## Examples

Return the current timestamp:

```scopeql
SELECT now();
```

```scopeql
| now()                       |
+-----------------------------+
| 2024-10-16T11:36:51.730042Z |
+-----------------------------+
```
