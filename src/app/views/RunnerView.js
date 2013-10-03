define(function(require) {

	'use strict';

	var _                 = require('underscore');
	var Backbone          = require('backbone');
	var RunnerModel       = require('app/models/RunnerModel');
	var FeatureModel      = require('app/models/FeatureModel');
	var RunnerInfoView    = require('app/views/RunnerInfoView');
	var template          = require('text!app/templates/runner.html');
	var logger            = require('loglevel');

	var RunnerView = Backbone.View.extend({

		template: Handlebars.compile(template),

		initialize: function initialize(options) {
			this.options = options || {};
			this.initView();
			this.initCollections();
			this.initSubviews();
			this.initEvents();
		},

		initView: function initView() {
			logger.debug('RunnerView: initialize view');
			if (!_.has(this.options, 'ws') && !this.options.ws && !this.options.ws instanceof WebSocket) {
				throw new Error('RunnerView: "ws" argument is required and must be a WebSocket instance');
			}
			this.ws = this.options.ws;
			this.runner = null;
		},

		initCollections: function initCollections() {
			logger.debug('RunnerView: initialize collections');
			this.collections = [];
			this.runners  = (_.has(this.options, 'runners') && this.options.runners) ? this.options.runners : null;
			this.features = (_.has(this.options, 'features') && this.options.features) ? this.options.features : null;
			if (this.runners) {
				this.collections.push(this.runners);
				logger.debug('RunnerView: added runners (RunnerCollection) to collections');
			}
			if (this.features) {
				this.collections.push(this.features);
				logger.debug('RunnerView: added features (FeatureCollection) to collections');
			}
		},

		initSubviews: function initSubviews() {
			logger.debug('RunnerView: initialize subviews');
			this.subviews = [];
			this.runnerInfoView = new RunnerInfoView();
			this.subviews.push(this.runnerInfoView);
			logger.debug('RunnerView: added runnerInfoView (RunnerInfoView) to subviews');
		},

		initEvents: function initEvents() {
			logger.debug('RunnerView: initialize events');
			_.bindAll(this, 'onSocketOpen', 'onSocketClose', 'onSocketMessage', 'render');
			this.listenTo(this.features, 'change', this.render);
			this.listenTo(this.runners, 'change', this.render);
			this.ws.onopen    = this.onSocketOpen;
			this.ws.onclose   = this.onSocketClose;
			this.ws.onmessage = this.onSocketMessage;
		},

		fetch: function fetch() {
			logger.debug('RunnerView: fetch collections data');
			this.features.fetch();
			this.runners.fetch();
			return this;
		},

		clear: function clear() {
			logger.debug('RunnerView: clear (reset) collections');
			this.collections.forEach(function(collection) {
				collection.reset();
				collection.localStorage._clear();
			});
			return this;
		},

		onSocketOpen: function onSocketOpen(event) {
			logger.debug('RunnerView: onSocketOpen');
			this.clear();
			this.runnerInfoView.data.connected = true;
			this.render();
			return this;
		},

		onSocketClose: function onSocketClose(event) {
			logger.debug('RunnerView: onSocketClose');
			this.runnerInfoView.data.connected = false;
			this.render();
			return this;
		},

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

		createRunner: function createRunner(data) {
			this.runner = this.runners.createUnique(data);
			if (this.runner) {
				this.runnerInfoView.data.lastRunDate = this.runner.toJSON().runDate;
				logger.debug('RunnerView: lastRunDate:' + this.runnerInfoView.data.lastRunDate);
			}
			return this;
		},

		createFeature: function createFeature(data) {
			this.features.createUnique(data);
			return this;
		},

		closeConnection: function closeConnection() {
			logger.debug('RunnerView: close WebSocket connection');
			this.ws.close();
		},

		render: function render() {
			logger.debug('RunnerView: render');
			$(this.el).html(this.template({
				runner   : this.runner ? this.runner.toJSON() : null,
				features : this.features ? this.features.toJSON() : []
			}));
			$(this.el).find('#runner-info').html(this.runnerInfoView.render().el);
			return this;
		}
	});

	return RunnerView;

});
