var R = require('ramda');
var path = require('path');
var moment = require('moment');
var Promise = require('bluebird-ff');

var sources = {
	static: require('./static-source'),
	http: require('./http-source')
};

var defaultConfig = {
	cacheLifetime: 24 * 60 * 60 * 1000,
	source: 'static',
	staticPath: path.join(__dirname, '..', 'node_modules', 'business-calendar', 'data'),
	httpBase: 'https://pagarme.github.io/business-calendar/data'
};

var cache = {};

exports.configure = function(config) {
	defaultConfig = R.merge(defaultConfig, config);
};

exports.queryDateInformation = function(country, date, options) {
	var config = R.mergeWith(R.defaultTo, defaultConfig, options || {});

	date = moment(date);

	return Promise.resolve()
	.then(loadInformation)
	.then(compare);

	function loadInformation() {
		return getYearInformation(country, date.year(), config);
	}

	function compare(info) {
		return getDateFromInformation(info, date);
	}
}

exports.isBusinessDay = function(country, date, options) {
	date = moment(date);

	return exports.queryDateInformation(country, date, options)
	.then(function(day) {
		if (isWeekend(date)) {
			return false;
		}

		if (!day) {
			return true;
		}
		return !day.holiday && !day.limited_financial_operation;
	});
};

exports.nextBusinessDay = function(country, anchorDate, options) {
	var day = moment(anchorDate).add(1, 'd');

	return iterate(day);

	function iterate(day) {
		return exports.isBusinessDay(country, day, options)
		.then(function(isBusinessDay) {
			if (isBusinessDay) {
				return day.toDate();
			}

			return iterate(day.add(1, 'd'));
		});
	}
};

function getDateFromInformation(info, date) {
	var key = date.format('YYYY-MM-DD');

	return R.find(R.propEq('date', key), info.calendar);
}

function getYearInformation(country, year, config) {
	var cacheName = country.toLowerCase() + '_' + year;

	if (cache[cacheName] && (Date.now() - cache[cacheName].time) <= config.cacheLifetime) {
		return Promise.resolve(cache[cacheName].data);
	}

	return sources[config.source].load(country, year, config)
	.tap(function(result) {
		cache[cacheName] = {
			time: Date.now(),
			data: result
		};
	});
}

function isWeekend(date) {
	return date.isoWeekday() == 6 || date.isoWeekday() == 7;
}

