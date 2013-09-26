define(function(require) {

	'use strict';

	var _                 = require('underscore');
	var Backbone          = require('backbone');
	var RunnerModel       = require('app/models/RunnerModel');
	var FeatureModel      = require('app/models/FeatureModel');
	var RunnerInfoView    = require('app/views/RunnerInfoView');


	var RunnerView = Backbone.View.extend({

		// View properties
		options  : {},
		socket   : null,
		template : _.template($('#runner-template').html()),

		// Collections
		features : null,
		runners  : null,

		// Subviews
		runnerInfoView    : null,
		runnerControlView : null,

		// Collectors
		models      : [RunnerModel, FeatureModel],
		collections : [],
		subviews    : [],

		// Subviews data
		runnerInfoViewData : {
			connected       : false,
			lastSessionDate : null
		},

		initialize: function initialize(options) {
			this.initView(options);
			this.initCollections();
			this.initSubviews();
			this.initEvents();
			this.fetch();
		},

		initView: function initView(options) {
			this.options = options;
			this.socket = this.options.socket;
		},

		initCollections: function initCollections() {
			this.runners = this.options.runners;
			this.features = this.options.features;
			this.collections.push(this.runners);
			this.collections.push(this.features);
		},

		initSubviews: function initSubviews() {
			this.runnerInfoView = new RunnerInfoView({data: this.runnerInfoViewData});
			this.subviews.push(this.runnerInfoView);
		},

		initEvents: function initEvents() {

			_.bindAll(this,
				'startRunner',
				'stopRunner',
				'start',
				'connect',
				'disconnect',
				'message',
				'render');

			this.listenTo(this.socket, 'connect', this.connect);
			this.listenTo(this.socket, 'disconnect', this.disconnect);
			this.listenTo(this.socket, 'message', this.message);
			this.listenTo(this.socket, 'start', this.start);
			this.listenTo(this.features, 'change', this.render);
			this.listenTo(this.runners, 'change', this.render);

			// Outside of el (in navbar)
			$('#watai-start').on('click', this.startRunner);
			$('#watai-stop').on('click', this.stopRunner);
		},

		fetch: function fetch() {
			this.features.fetch();
			this.runners.fetch();
		},

		clear: function clear() {
			this.models.forEach(function(Model) {
				var model = new Model();
				model.localStorage._clear();
			});
			this.collections.forEach(function(collection) {
				collection.reset();
			});
		},

		start: function start() {
			this.clear();
			return this;
		},

		startRunner: function startRunner() {
			this.socket.emit('start runner', {});
			console.log('start runner');
		},

		stopRunner: function stopRunner() {
			this.socket.emit('stop runner', {});
			console.log('stop runner');
		},

		connect: function onSocketConnect() {
			this.runnerInfoViewData.connected = true;
			this.render();
			return this;
		},

		disconnect: function onSocketDisconnect() {
			this.runnerInfoViewData.connected = false;
			this.render();
			return this;
		},

		message: function message(data) {
			this.runners.createUnique(data);
			this.features.createUnique(data);
			return this;
		},

		render: function render() {
			var runner = this.runners.first().toJSON();
			this.runnerInfoViewData.lastSessionDate = runner.startedAt;
			$(this.el).html(this.template({runner: runner, features: this.features.models}));
			$(this.el).find('#runner-info').html(this.runnerInfoView.render().el);
			return this;
		}

	});

	return RunnerView;

});
