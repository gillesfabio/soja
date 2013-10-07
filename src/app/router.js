define([

	'backbone',
	'app/views/RunnerView',
	'app/views/SettingsView',
	'app/views/StatsView',
	'app/collections/RunnerCollection',
	'app/collections/FeatureCollection',
	'app/config',
	'loglevel'

],
/**
* Router
*
* @exports Router
*/
function(Backbone, RunnerView, SettingsView, StatsView, RunnerCollection, FeatureCollection, config, logger) {

	'use strict';

	/**
	* @class
	* @extends Backbone.Router
	*/
	var Router = Backbone.Router.extend(/** @lends module:Router~Router.prototype */{

		/**
		* The application's routes.
		*
		* @type {object}
		*/
		routes: {
			''          : 'runner',
			'settings'  : 'settings',
			'stats'     : 'stats'
		},

		/**
		* The runner action.
		*/
		runner: function runner() {
			logger.info('Router: runner');
			var opts, view;
			opts = {
				runners  : new RunnerCollection(),
				features : new FeatureCollection()
			};
			if (config.env !== 'staging') opts.ws = new WebSocket('ws://localhost:9999');
			view = new RunnerView(opts);
			view.fetch();
			$('#content').html(view.render().el);
		},

		/**
		* The settings action.
		*/
		settings: function settings() {
			logger.info('Router: settings');
			var view = new SettingsView({
				runners  : new RunnerCollection(),
				features : new FeatureCollection()
			});
			view.fetch();
			$('#content').html(view.render().el);
		},

		/**
		* The stats action.
		*/
		stats: function stats() {
			logger.info('Router: stats');
			var view = new StatsView({
				runners  : new RunnerCollection(),
				features : new FeatureCollection()
			});
			view.fetch();
			$('#content').html(view.render().el);
		}
	});

	return Router;

});
