define([

	'underscore',
	'backbone',
	'app/models/RunnerModel',
	'app/models/FeatureModel',
	'app/views/RunnerInfoView'

], function(_, Backbone, RunnerModel, FeatureModel, RunnerInfoView) {

	'use strict';

	var RunnerView = Backbone.View.extend({

		options     :  {},
		socket      :   null,
		template    : _.template($('#runner-template').html()),

		features    : null,
		runners     : null,

		models      : [RunnerModel, FeatureModel],
		collections : [],

		infoData : {
			connected: false,
			lastSessionDate: null
		},

		initialize: function initialize(options) {

			_.bindAll(this, 'start', 'connect', 'disconnect', 'message', 'render');

			this.options  = options;
			this.socket   = options.socket;
			this.runners  = options.runners;
			this.features = options.features;

			this.collections.push(this.runners);
			this.collections.push(this.features);

			this.runnerInfoView = new RunnerInfoView({data: this.infoData});

			this.listenTo(this.socket, 'connect', this.connect);
			this.listenTo(this.socket, 'disconnect', this.disconnect);
			this.listenTo(this.socket, 'message', this.message);
			this.listenTo(this.socket, 'start', this.start);
			this.listenTo(this.features, 'change', this.render);
			this.listenTo(this.runners, 'change', this.render);

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

		connect: function onSocketConnect() {
			this.infoData.connected = true;
			this.render();
			return this;
		},

		disconnect: function onSocketDisconnect() {
			this.infoData.connected = false;
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
			this.infoData.lastSessionDate = runner.startedAt;
			$(this.el).html(this.template({
				runner   : runner,
				features : this.features.models
			}));
			$(this.el).find('#runner-info').html(this.runnerInfoView.render().el);
			return this;
		}

	});

	return RunnerView;

});
