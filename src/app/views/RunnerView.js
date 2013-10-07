define(
	/**
	* Runner View.
	*
	* @exports views/RunnerView
	*/
	function(require) {

	'use strict';

	var _                 = require('underscore');
	var Backbone          = require('backbone');
	var tpl               = require('text!app/templates/runner.hbs');
	var logger            = require('loglevel');
	var Handlebars        = require('handlebars');

	var RunnerCollection  = require('app/collections/RunnerCollection');
	var FeatureCollection = require('app/collections/FeatureCollection');
	var RunnerInfoView    = require('app/views/RunnerInfoView');

	/**
	* @class
	* @requires Underscore
	* @requires Backbone
	* @requires Handlebars
	* @extends Backbone.View
	* @property {WebSocket} ws - The WebSocket client instance.
	* @property {RunnerModel} currentRunner - The current runner model instance.
	* @property {RunnerCollection} runners - The view's RunnerCollection instance.
	* @property {FeatureCollection} features - The view's FeatureCollection instance.
	* @property {Array} collections - Contains all collections.
	* @property {Array} subviews - Contains all subviews.
	* @property {RunnerInfoView} runnerInfoView - The RunnerInfoView subview instance.
	*/
	var RunnerView = Backbone.View.extend(/** @lends module:views/RunnerView~RunnerView.prototype */{

		/**
		* The view template.
		*
		* @type {string}
		*/
		template: Handlebars.compile(tpl),

		/**
		* Initializes view.
		*
		* @param {object} options - View Options
		*/
		initialize: function initialize(options) {
			this.options = _.extend({
				ws       : null,
				runners  : null,
				features : null,
			}, options);
			this.ws            = this.options.ws;
			this.runners       = this.options.runners;
			this.features      = this.options.features;
			this.currentRunner = null;
			this.collections   = [];
			this.initCollections();
			this.initSubviews();
			this.initEvents();
		},

		/**
		* Initializes view collections.
		*
		* @private
		*/
		initCollections: function initCollections() {
			logger.debug('RunnerView: initialize collections');
			if (this.runners && this.runners instanceof RunnerCollection) {
				this.collections.push(this.runners);
				logger.debug('RunnerView: added runners (RunnerCollection) to collections');
			}
			if (this.features && this.features instanceof FeatureCollection) {
				this.collections.push(this.features);
				logger.debug('RunnerView: added features (FeatureCollection) to collections');
			}
		},

		/**
		* Initializes view's subviews.
		*
		* @private
		*/
		initSubviews: function initSubviews() {
			logger.debug('RunnerView: initialize subviews');
			this.subviews = [];
			this.runnerInfoView = new RunnerInfoView({
				ws       : this.ws,
				runners  : this.runners,
				features : this.features
			});
			this.subviews.push(this.runnerInfoView);
			logger.debug('RunnerView: added runnerInfoView (RunnerInfoView) to subviews');
		},

		/**
		* Initializes view events.
		*
		* @private
		*/
		initEvents: function initEvents() {
			logger.debug('RunnerView: initialize events');
			_.bindAll(this, 'onSocketOpen', 'onSocketClose', 'onSocketMessage', 'render');
			this.listenTo(this.features, 'change', this.render);
			this.listenTo(this.runners, 'change', this.render);
			if (this.ws) {
				this.ws.onopen    = this.onSocketOpen;
				this.ws.onclose   = this.onSocketClose;
				this.ws.onmessage = this.onSocketMessage;
			}
		},

		/**
		* Fetches view collections data.
		*
		*/
		fetch: function fetch() {
			logger.debug('RunnerView: fetch collections data');
			if (this.runners && this.runners instanceof RunnerCollection)    this.runners.fetch();
			if (this.features && this.features instanceof FeatureCollection) this.features.fetch();
			return this;
		},

		/**
		* Resets collections
		*
		* @private
		*/
		reset: function clear() {
			logger.debug('RunnerView: reset collections');
			this.collections.forEach(function(collection) {
				collection.reset();
			});
			return this;
		},

		/**
		* WebSocket "onopen" event callback.
		*
		* @private
		*/
		onSocketOpen: function onSocketOpen() {
			logger.debug('RunnerView: onSocketOpen');
			this.reset();
			this.render();
			return this;
		},

		/**
		* WebSocket "onclose" event callback.
		*
		* @private
		*/
		onSocketClose: function onSocketClose() {
			logger.debug('RunnerView: onSocketClose');
			this.render();
			return this;
		},

		/**
		* WebSocket "onmessage" event callback.
		*
		* @param {object} event - The event
		* @private
		*/
		onSocketMessage: function onSocketMessage(event) {
			logger.debug('RunnerView: onSocketMessage');
			if (!_.has(event, data) && !event.data) {
				logger.warn("RunnerView: something went wrong with " + JSON.stringify(event));
				return this;
			}
			var data = JSON.parse(event.data);
			data = _.extend({type: null}, data);
			if (!data.type) {
				logger.warn("RunnerView: the websocket message does not contain a 'type' property");
				return this;
			}
			switch (data.type) {
				case 'watai:websocket:runner:start':
					this.createRunner(data);
					break;
				case 'watai:websocket:feature':
					this.createFeature(data);
					break;
				case 'watai:websocket:runner:stop':
					this.closeConnection();
					break;
			}
			return this;
		},

		/**
		* Closes the WebSocket server connection.
		*
		* @private
		*/
		closeConnection: function closeConnection() {
			logger.debug('RunnerView: close WebSocket connection');
			this.ws.close();
		},

		/**
		* Takes data sent by WebSocket and creates the runner if it does not
		* already exists in the database.
		*
		* @param {object} data - WebSocket "onmessage" event data.
		* @private
		*/
		createRunner: function createRunner(data) {
			this.currentRunner = this.runners.createUnique(data);
			return this;
		},

		/**
		* Takes data sent by WebSocket and creates the feature if it does not
		* already exists in the database.
		*
		* @param {Object} data - WebSocket "onmessage" event data.
		* @private
		*/
		createFeature: function createFeature(data) {
			this.features.createUnique(data);
			return this;
		},

		/**
		* Returns the current runner model object (`toJSON` is called, so it's
		* not a runner model instance) or `null` if no runner has been created yet.
		*
		* @returns {Object|null}
		*/
		getCurrentRunner: function getCurrentRunner() {
			if (this.currentRunner) return this.currentRunner.toJSON();
			if (this.runners.size() > 0) {
				this.runners.sort();
				return this.runners.last().toJSON();
			}
			return null;
		},

		/**
		* Returns the latest features (of the last run) as an array of objects
		* (`toJSON` is called, so it's not a `FeatureCollection` instance) or
		* an empty array if no feature has been created yet.
		*
		* @returns {Array}
		*/
		getLatestFeatures: function getLatestFeatures() {
			if (this.features.size() > 0) return this.features.latest().toJSON();
			return [];
		},

		/**
		* Renders the view.
		*/
		render: function render() {
			logger.debug('RunnerView: render');
			var runner   = this.getCurrentRunner();
			var features = this.getLatestFeatures();
			$(this.el).html(this.template({runner: runner, features: features}));
			$(this.el).find('#runner-info').html(this.runnerInfoView.render().el);
			return this;
		}
	});

	return RunnerView;

});
