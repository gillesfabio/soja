define([

	'backbone',
	'app/views/RunnerView',
	'app/views/SettingsView',
	'app/collections/RunnerCollection',
	'app/collections/FeatureCollection',
	'loglevel'

],
/**
* Router
* @exports Router
*/
function(Backbone, RunnerView, SettingsView, RunnerCollection, FeatureCollection, logger) {

	'use strict';

	/**
	* @class
	* @extends Backbone.Router
	*/
	var Router = Backbone.Router.extend(/** @lends module:Router~Router.prototype */{

		/**
		* The application's routes.
		* @type {object}
		*/
		routes: {
			''			: 'runner',
			'settings'	: 'settings'
		},

		/**
		* The runner action.
		*/
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
		}

	});

	return Router;

});
