define([

	'backbone',
	'app/views/RunnerView',
	'app/views/SettingsView',
	'app/collections/RunnerCollection',
	'app/collections/FeatureCollection',
	'loglevel'

], function(Backbone, RunnerView, SettingsView, RunnerCollection, FeatureCollection, logger) {

	'use strict';

	var Router = Backbone.Router.extend({

		routes: {
			''			: 'runner',
			'settings'	: 'settings'
		},

		runner: function runner() {
			logger.info('Router: runner');
			var ws   = new WebSocket('ws://localhost:9999');
			var view = new RunnerView({
				ws       : ws,
				runners  : new RunnerCollection(),
				features : new FeatureCollection()
			});
			view.fetch();
			$('#content').html(view.render().el);
		},

		settings: function settings() {
			logger.info('Router: settings');
			var view = new SettingsView({
				runners  : new RunnerCollection(),
				features : new FeatureCollection()
			});
			view.fetch();
			$('#content').html(view.render().el);
		}

	});

	return Router;

});
