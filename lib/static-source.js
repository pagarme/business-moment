var Promise = require('bluebird-ff');
var calendar = require('business-calendar');

exports.load = function(country, year) {
    return Promise.resolve(calendar.getCalendar(country, year));
};

