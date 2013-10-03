requirejs.config({

	baseUrl: '.',

	paths: {
		'jquery'				: 'vendor/jquery/jquery',
		'underscore'			: 'vendor/underscore/underscore',
		'backbone'				: 'vendor/backbone/backbone',
		'backbone.localStorage'	: 'vendor/backbone.localStorage/backbone.localStorage',
		'bootstrap'				: 'vendor/bootstrap/dist/js/bootstrap',
		'moment'				: 'vendor/momentjs/moment',
		'text'					: 'vendor/requirejs-text/text',
		'loglevel'				: 'vendor/loglevel/dist/loglevel',
		'handlebars'			: 'vendor/handlebars/handlebars',
		'handlebars-helpers'	: 'vendor/handlebars-helpers/helpers'
	},

	shim: {
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'backbone.localStorage': {
			deps: ['underscore', 'jquery', 'backbone']
		},
		'bootstrap': {
			deps: ['jquery']
		},
		'handlebars': {
			exports: 'Handlebars'
		},
		'handlebars-helpers': {
			deps: ['handlebars'],
			exports: 'Handlebars'
		}
	}
});

require([

	'backbone',
	'app/router',
	'loglevel',
	'handlebars-helpers'

], function(Backbone, Router, logger) {

	'use strict';

	logger.enableAll();

	var router = new Router();
	Backbone.history.start();

});
