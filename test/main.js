requirejs.config({

	baseUrl: '.',

	paths: {
		'jquery'				: 'jquery/jquery',
		'underscore'			: 'underscore/underscore',
		'backbone'				: 'backbone/backbone',
		'backbone.localStorage'	: 'backbone.localStorage/backbone.localStorage',
		'moment'				: 'momentjs/moment',
		'mocha'					: 'mocha/mocha'
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
		}
	}
});

require([

	'mocha'

], function(mocha) {

	'use strict';

	mocha.setup('bdd');
	mocha.run();

});
