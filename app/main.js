requirejs.config({
	paths: {
		'jquery': 'vendor/jquery/jquery',
		'underscore': 'vendor/underscore/underscore',
		'backbone': 'vendor/backbone/backbone',
		'bootstrap': 'vendor/bootstrap/dist/js/bootstrap'
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
		}
	}
});
