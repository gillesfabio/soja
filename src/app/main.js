requirejs.config({

	baseUrl: '.',

	paths: {
		'jquery'				: 'vendor/jquery/jquery',
		'underscore'			: 'vendor/underscore/underscore',
		'underscore.string'		: 'vendor/underscore.string/lib/underscore.string',
		'backbone'				: 'vendor/backbone/backbone',
		'backbone.localStorage'	: 'vendor/backbone.localStorage/backbone.localStorage',
		'bootstrap'				: 'vendor/bootstrap/dist/js/bootstrap',
		'moment'				: 'vendor/momentjs/moment',
		'text'					: 'vendor/requirejs-text/text',
		'loglevel'				: 'vendor/loglevel/dist/loglevel',
		'handlebars'			: 'vendor/handlebars/handlebars',
		'handlebars-helpers'	: 'vendor/handlebars-helpers/helpers',
		'd3'					: 'vendor/d3/d3',
		'nvd3'					: 'vendor/nvd3/nv.d3'
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
		},
		'd3': {
			exports: 'd3'
		},
		'nvd3': {
			deps: ['d3'],
			exports: 'nv'
		}
	}
});

require([

	'backbone',
	'app/router',
	'app/config',
	'app/fixtures',
	'loglevel',
	'handlebars-helpers'

],
/**
* main (application's entry point)
* @exports main
*/
function(Backbone, Router, config, fixtures, logger) {

	'use strict';


	switch (config.env) {
		case 'dev':
			logger.enableAll();
			break;
		case 'staging':
			logger.enableAll();
			fixtures.create();
			break;
		case 'prod':
			logger.disableAll();
			break;
		default:
			logger.disableAll();
	}

	logger.info('Environment: ' + config.env);

	var router = new Router();
	Backbone.history.start();

});
