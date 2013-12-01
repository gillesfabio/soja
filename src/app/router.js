define([

	'backbone',
	'app/views/RunnerView',
	'app/views/DatabaseView',
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
function(Backbone, RunnerView, DatabaseView, RunnerCollection, FeatureCollection, config, logger) {

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
			'database'  : 'database'
		},

		/**
		* The runner action.
		*/
		runner: function runner() {
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
			var view = new DatabaseView({
				runners  : new RunnerCollection(),
				features : new FeatureCollection()
			});
			view.fetch();
			$('#content').html(view.render().el);
		}
	});

	return Router;

});
