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
		'mocha'					: 'vendor/mocha/mocha',
		'chai'					: 'vendor/chai/chai',
		'text'					: 'vendor/requirejs-text/text',
		'loglevel'				: 'vendor/loglevel/dist/loglevel',
		'handlebars'			: 'vendor/handlebars/handlebars',
		'handlebars-helpers'	: 'vendor/handlebars-helpers/helpers',
		'd3'					: 'vendor/d3/d3',
		'nvd3'					: 'vendor/nvd3/nv.d3',
		'jszip'                 : 'vendor/jszip/jszip',
		'jszip-load'            : 'vendor/jszip/jszip-load',
		'jszip-inflate'         : 'vendor/jszip/jszip-inflate',
		'async'                 : 'vendor/async/lib/async'
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
		'mocha': {
			exports: 'mocha'
		},
		'handlebars': {
			exports: 'Handlebars',
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
		},
		'jszip': {
			exports: 'JSZip'
		},
		'jszip-load': {
			exports: 'JSZip',
			deps: ['jszip']
		},
		'jszip-inflate': {
			exports: 'JSZip',
			deps: ['jszip']
		},
		'async': {
			exports: 'async'
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
		'bootstrap',

		//'collections/RunnerCollectionTest',
		//'collections/FeatureCollectionTest',
		//'views/RunnerViewTest',
		//'views/RunnerInfoViewTest',
		'views/DatabaseViewTest'

	], function() {

		mocha.run();

	});

});
