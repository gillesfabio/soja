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
			this.socket = (_.has(this.options, 'socket') && this.options.socket) ? this.options.socket : null;
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

			_.bindAll(this,
				'onSocketConnect',
				'onSocketDisconnect',
				'onSocketRunner',
				'onSocketFeature',
				'render');

			this.listenTo(this.socket, 'connect', this.onSocketConnect);
			this.listenTo(this.socket, 'disconnect', this.onSocketDisconnect);
			this.listenTo(this.socket, 'watai:web:runner', this.onSocketRunner);
			this.listenTo(this.socket, 'watai:web:feature', this.onSocketFeature);

			this.listenTo(this.features, 'change', this.render);
			this.listenTo(this.runners, 'change', this.render);
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

		onSocketConnect: function onSocketConnect() {
			this.runnerInfoView.data.connected = true;
			this.render();
			return this;
		},

		onSocketDisconnect: function onSocketDisconnect() {
			this.runnerInfoView.data.connected = false;
			this.render();
			return this;
		},

		onSocketRunner: function onSocketRunner(data) {
			this.runner = this.runners.createUnique(data);
			if (this.runner) this.runnerInfoView.data.lastRunDate = this.runner.toJSON().runDate;
			return this;
		},

		onSocketFeature: function onSocketFeature(data) {
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
