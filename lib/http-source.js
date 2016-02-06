var path = require('path');
var Promise = require('bluebird-ff');
var prequest = require('prequest');

exports.load = function(country, year, config) {
	return prequest(config.httpBase + '/' + country + '/' + year + '.json');
};

