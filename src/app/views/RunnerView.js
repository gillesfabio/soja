define(function(require) {

	'use strict';

	var _                 = require('underscore');
	var Backbone          = require('backbone');
	var RunnerModel       = require('app/models/RunnerModel');
	var FeatureModel      = require('app/models/FeatureModel');
	var RunnerInfoView    = require('app/views/RunnerInfoView');
	var template          = require('text!app/templates/runner.html');

	var RunnerView = Backbone.View.extend({

		template: _.template(template),

		initialize: function initialize(options) {
			this.options = options || {};
			this.initView();
			this.initModels();
			this.initCollections();
			this.initSubviews();
			this.initEvents();
		},

		initView: function initView() {
			if (!_.has(this.options, 'ws') && !this.options.ws && !this.options.ws instanceof WebSocket) {
				throw new Error('RunnerView: "ws" argument is required and must be a WebSocket instance');
			}
			this.ws = this.options.ws;
			this.runner = null;
		},

		initModels: function initModels() {
			this.models = [RunnerModel, FeatureModel];
		},

		initCollections: function initCollections() {
			this.collections = [];
			this.runners  = (_.has(this.options, 'runners') && this.options.runners) ? this.options.runners : null;
			this.features = (_.has(this.options, 'features') && this.options.features) ? this.options.features : null;
			if (this.runners)  this.collections.push(this.runners);
			if (this.features) this.collections.push(this.features);
		},

		initSubviews: function initSubviews() {
			this.subviews = [];
			this.runnerInfoView = new RunnerInfoView();
			this.subviews.push(this.runnerInfoView);
		},

		initEvents: function initEvents() {
			_.bindAll(this, 'onSocketOpen', 'onSocketClose', 'onSocketMessage', 'render');
			this.listenTo(this.features, 'change', this.render);
			this.listenTo(this.runners, 'change', this.render);
			this.ws.onopen    = this.onSocketOpen;
			this.ws.onclose   = this.onSocketClose;
			this.ws.onmessage = this.onSocketMessage;
		},

		fetch: function fetch() {
			this.features.fetch();
			this.runners.fetch();
			return this;
		},

		clear: function clear() {
			this.models.forEach(function(Model) {
				var model = new Model();
				model.localStorage._clear();
			});
			this.collections.forEach(function(collection) {
				collection.reset();
			});
			return this;
		},

		onSocketOpen: function onSocketOpen(event) {
			this.runnerInfoView.data.connected = true;
			this.render();
			return this;
		},

		onSocketClose: function onSocketClose(event) {
			this.runnerInfoView.data.connected = false;
			this.render();
			return this;
		},

		onSocketMessage: function onSocketMessage(event) {
			if (!_.has(event, data) && !event.data) return this;
			var data = JSON.parse(event.data);
			data = _.extend({type: null}, data);
			if (!data.type) return this;
			switch (data.type) {
				case 'watai:ws:runner':
					this.createRunner(data);
					break;
				case 'watai:ws:feature':
					this.createFeature(data);
					break;
			}
			return this;
		},

		createRunner: function createRunner(data) {
			this.runner = this.runners.createUnique(data);
			if (this.runner) {
				this.runnerInfoView.data.lastRunDate = this.runner.toJSON().runDate;
			}
			return this;
		},

		createFeature: function createFeature(data) {
			this.features.createUnique(data);
			return this;
		},

		render: function render() {
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
