var prequest = require('prequest');

exports.load = function(country, year, config) {
	return prequest(config.httpBase + '/' + country + '/' + year + '.json');
};

