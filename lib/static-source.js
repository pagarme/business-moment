var fs = require('fs');
var path = require('path');
var Promise = require('bluebird-ff');
var readFileAsync = Promise.promisify(fs.readFile);

exports.load = function(country, year, config) {
	return readFileAsync(path.join(config.staticPath, country, year + '.json')).then(JSON.parse);
};

