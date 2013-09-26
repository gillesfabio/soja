requirejs.config({

	baseUrl: '.',

	paths: {
		'jquery'				: 'vendor/jquery/jquery',
		'underscore'			: 'vendor/underscore/underscore',
		'backbone'				: 'vendor/backbone/backbone',
		'backbone.localStorage'	: 'vendor/backbone.localStorage/backbone.localStorage',
		'bootstrap'				: 'vendor/bootstrap/dist/js/bootstrap',
		'socket.io-client'		: 'vendor/socket.io-client/dist/socket.io',
		'moment'				: 'vendor/momentjs/moment'
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
		'socket.io-client': {
			deps: ['jquery'],
			exports: 'io'
		}
	}
});

require([

	'app/router'

], function(Router) {

	'use strict';

	var router = new Router();
	Backbone.history.start();

});
