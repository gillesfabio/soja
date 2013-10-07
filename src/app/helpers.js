define(function(require) {

	'use strict';

	var Handlebars = require('handlebars');
	var moment = require('moment');

	Handlebars.registerHelper('dateFromNow', function(date) {
		return moment(date).fromNow();
	});

	return Handlebars;

});
