define([

	'backbone',
	'app/views/RunnerView',
	'app/views/DatabaseView',
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
function(Backbone, RunnerView, DatabaseView, StatsView, RunnerCollection, FeatureCollection, config, logger) {

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
			'database'  : 'database',
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
			if (config.env !== 'staging') opts.ws = new WebSocket('ws://localhost:8888');
			view = new RunnerView(opts);
			view.fetch();
			$('#content').html(view.render().el);
		},

		/**
		* The database action.
		*/
		database: function settings() {
			logger.info('Router: database');
			var view = new DatabaseView({
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
