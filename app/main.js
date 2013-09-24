requirejs.config({
	baseUrl: '.',
	paths: {
		'jquery': 'vendor/jquery/jquery',
		'underscore': 'vendor/underscore/underscore',
		'backbone': 'vendor/backbone/backbone',
		'bootstrap': 'vendor/bootstrap/dist/js/bootstrap',
		'socket.io-client': 'vendor/socket.io-client/dist/socket.io'
	},
	shim: {
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
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

	'app/routers/Router'

], function(Router) {

	'use strict';

	var router = new Router();
	Backbone.history.start();

});
