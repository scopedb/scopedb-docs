---
sidebar_label: Arithmetic
title: Arithmetic operators
---

Arithmetic operators are used to generate numeric output from one or more input expressions.

The input expressions must be numeric (integer or floating point), except in the following cases:

* The binary operator `+` and `-` can be applied for datetime calculations:
    * `<timestamp>+<interval>` returns a `<timestamp>`
    * `<timestamp>-<interval>` returns a `<timestamp>`
    * `<timestamp>-<timestamp>` returns a `<interval>`

## List of arithmetic operators

| Operator    | Syntax  | Description                                                                            |
|-------------|---------|----------------------------------------------------------------------------------------|
| `-` (unary) | `-a`    | Negates the input numeric expression.                                                  |
| `+`         | `a + b` | Adds two numeric expressions (`a` and `b`).                                            |
| `-`         | `a - b` | Subtracts one numeric expression (`b`) from another (`a`).                             |
| `*`         | `a * b` | Multiplies two numeric expressions (`a` and `b`).                                      |
| `/`         | `a / b` | Divides one numeric expression (`a`) by another (`b`). Divide by `0` returns infinity. |
| `%`         | `a % b` | Computes the modulo of numeric expression `a` by `b`.                                  |
