# Aggregate functions

Aggregate functions operate on values across rows to perform mathematical calculations such as sum, average, counting, minimum/maximum values, standard deviation, and estimation, as well as some non-mathematical operations.

An aggregate function takes multiple rows (actually, zero, one, or more rows) as input and produces a single output. In contrast, scalar functions take one row as input and produce one row (one value) as output.

An aggregate function always returns exactly one row, **even when the input contains zero rows**. Typically, if the input contains zero rows, the output is NULL. However, an aggregate function could return 0, an empty string, or some other value when passed zero rows.

## List of functions

* [approx_quantile](functions/approx_quantile.md)
* [avg](functions/avg.md)
* [count](functions/count.md)
* [max](functions/max.md)
* [max_by](functions/max_by.md)
* [min](functions/min.md)
* [min_by](functions/min_by.md)
* [mode](functions/mode.md)
* [stddev_pop](functions/stddev_pop.md)
* [stddev_samp](functions/stddev_samp.md)
* [sum](functions/sum.md)
* [variance_pop](functions/variance_pop.md)
* [variance_samp](functions/variance_samp.md)
