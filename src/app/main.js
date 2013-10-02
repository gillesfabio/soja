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
		'loglevel'				: 'vendor/loglevel/dist/loglevel'
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
		}
	}
});

require([

	'backbone',
	'app/router',
	'loglevel'

], function(Backbone, Router, logger) {

	'use strict';

	logger.enableAll();

	var router = new Router();
	Backbone.history.start();

});
