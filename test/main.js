requirejs.config({

	baseUrl: '.',

	paths: {
		'jquery'				: 'vendor/jquery/jquery',
		'underscore'			: 'vendor/underscore/underscore',
		'backbone'				: 'vendor/backbone/backbone',
		'backbone.localStorage'	: 'vendor/backbone.localStorage/backbone.localStorage',
		'moment'				: 'vendor/momentjs/moment',
		'mocha'					: 'vendor/mocha/mocha',
		'chai'					: 'vendor/chai/chai',
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
		'mocha': {
			exports: 'mocha'
		},
		'handlebars': {
			exports: 'Handlebars',
		},
		'handlebars-helpers': {
			deps: ['handlebars'],
			exports: 'Handlebars'
		}
	}
});

require([

	'mocha',
	'loglevel'

], function(mocha, logger) {

	'use strict';

	logger.enableAll();
	mocha.setup('bdd');

	require([

		'backbone.localStorage',
		'handlebars-helpers',

		'collections/RunnerCollectionTest',
		'collections/FeatureCollectionTest',
		'views/RunnerViewTest',
		'views/RunnerInfoViewTest',
		'views/SettingsViewTest'

	], function() {

		mocha.run();

	});

});
