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
		'handlebars'			: 'vendor/handlebars/handlebars'
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

		'collections/RunnerCollectionTest',
		'collections/FeatureCollectionTest',
		'views/RunnerViewTest',
		'views/RunnerInfoViewTest'

	], function() {

		mocha.run();

	});

});
