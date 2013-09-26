define([

	'underscore',
	'backbone',
	'moment',
	'app/models/RunnerModel',
	'app/models/FeatureModel'

], function(_, Backbone, moment, RunnerModel, FeatureModel) {

	'use strict';

	var RunnerView = Backbone.View.extend({

		options     :  {},
		socket      :   null,
		template    : _.template($('#runner-template').html()),

		features    : null,
		runners     : null,
		connected   : false,
		startDate   : null,

		models      : [RunnerModel, FeatureModel],
		collections : [],

		initialize: function initialize(options) {

			_.bindAll(this, 'start', 'connect', 'disconnect', 'message', 'render');

			this.options  = options;
			this.socket   = options.socket;
			this.runners  = options.runners;
			this.features = options.features;

			this.collections.push(this.runners);
			this.collections.push(this.features);

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
			this.connected = true;
			this.render();
			return this;
		},

		disconnect: function onSocketDisconnect() {
			this.connected = false;
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
			$(this.el).html(this.template({
				connected : this.connected,
				startDate : this.startDate,
				runner    : runner,
				lastSessionDate: moment(runner.startedAt).fromNow(),
				features  : this.features.models
			}));
			return this;
		}

	});

	return RunnerView;

});
