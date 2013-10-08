define(
	/**
	* Database View.
	*
	* @exports views/DatabaseView
	*/
	function(require) {

	'use strict';

	var _          = require('underscore');
	var Backbone   = require('backbone');
	var Handlebars = require('handlebars');
	var logger     = require('loglevel');
	var tpl        = require('text!app/templates/database.hbs');
	var bootstrap  = require('bootstrap');

	var RunnerCollection  = require('app/collections/RunnerCollection');
	var FeatureCollection = require('app/collections/FeatureCollection');

	/**
	* @class
	* @requires Underscore
	* @requires Backbone
	* @requires Handlebars
	* @extends Backbone.View
	* @property {object} data - View's template context data.
	*/
	var DatabaseView = Backbone.View.extend(/** @lends module:views/DatabaseView~DatabaseView.prototype */{

		/**
		* The view container ID.
		*
		* @type {string}
		*/
		id: 'database',

		/**
		* The view template.
		*
		* @type {string}
		*/
		template: Handlebars.compile(tpl),

		/**
		* The view events.
		*
		* @type {object}
		*/
		events: {
			'click .flush-database': 'flushDatabase'
		},

		/**
		* Initilizes view.
		*
		* @param {object} options - The view options.
		*/
		initialize: function initialize(options) {
			this.options = _.extend({
				runners  : null,
				features : null
			}, options);
			this.feedback = null;
			this.initCollections();
		},

		/**
		* Initializes view collections.
		*
		* @private
		*/
		initCollections: function initCollections() {
			logger.debug('DatabaseView: initialize collections');
			this.collections = [];
			this.runners = this.options.runners;
			if (this.runners && this.runners instanceof RunnerCollection) {
				logger.debug('DatabaseView: added runners (RunnerCollection) to collections');
				this.collections.push(this.runners);
			}
			this.features = this.options.features;
			if (this.features && this.features instanceof FeatureCollection) {
				logger.debug('DatabaseView: added features (FeatureCollection) to collections');
				this.collections.push(this.features);
			}
			return this;
		},

		/**
		* Fetches collections data.
		*/
		fetch: function fetch() {
			if (this.runners)  this.runners.fetch();
			if (this.features) this.features.fetch();
		},

		/**
		* Flushes the application database (then renders the view).
		*/
		flushDatabase: function flushDatabase() {
			logger.debug('DatabaseView: flush database');
			this.collections.forEach(function(collection) {
				collection.reset();
				collection.localStorage._clear();
			});
			this.feedback = {
				type	: 'success',
				message	: 'You successfully flushed the database.'
			};
			this.render();
			return this;
		},

		/**
		* Renders the view.
		*/
		render: function render() {
			logger.debug('DatabaseView: render');
			$(this.el).html(this.template({feedback: this.feedback}));
			this.feedback = null;
			return this;
		}
	});

	return DatabaseView;

});
