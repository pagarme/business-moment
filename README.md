# business-moment
[![Build Status](https://travis-ci.org/pagarme/business-moment.svg)](https://travis-ci.org/pagarme/business-moment) [![Coverage Status](https://coveralls.io/repos/pagarme/business-moment/badge.svg?branch=master)](https://coveralls.io/r/pagarme/business-moment?branch=master)

Helpers for dealing with business days. Uses [business-calendar](https://pagarme.github.io/business-calendar) as source.

# Configuration

You can change the default configs as following:

```
bm.configure({
	source: 'http'
});
```

# Sources

There are currenctly two sources, `static` uses a version of `business-calendar` installed as an npm dependency of this package.

`http` makes GET HTTP request, by default uses GitHub Pages as source(beware of usage limits).

# Caching

You can change the `cacheLifetime` to change by how much time an year information can be used before being considered invalid.

# Helpers

## queryDateInformation(country, date, options)

Returns information from `business-calendar` about this day.

## isBusinessDay(country, date, options)

Returns if the supplied date is a business day.

## nextBusinessDay(country, date, options)

Returns the next business day after `day`.

# License

Check [here](LICENSE).

