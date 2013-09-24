define([

	'underscore',
	'backbone',
	'app/models/feature'

], function(_, Backbone, FeatureModel) {

	'use strict';

	var RunnerView = Backbone.View.extend({

		template: $('#runner-template'),
		features: [],
		connected: false,
		runnerName: null,

		initialize: function initialize(options) {
			this.options = options || {};
			this.socket = options.socket;
			this.template = _.template(this.template.html());
			_.bindAll(this, 'connect', 'disconnect', 'message', 'render');
			this.listenTo(this.socket, 'connect', this.connect);
			this.listenTo(this.socket, 'disconnect', this.disconnect);
			this.listenTo(this.socket, 'message', this.message);
		},

		connect: function onSocketConnect() {
			this.connected = true;
			console.log('socket.io: connected');
			return this;
		},

		disconnect: function onSocketDisconnect() {
			this.connected = false;
			console.log('socket.io: disconnected');
			this.render();
			return this;
		},

		message: function message(data) {
			this.connected = true;
			if (data) {
				if (data.type === 'runner' && data.state === 'start') this.runnerName = data.message;
				this.features.push(new FeatureModel(data).toJSON());
			}
			this.render();
			return this;
		},

		render: function render() {
			$(this.el).html(this.template({
				features:  this.features,
				connected: this.connected,
				runnerName: this.runnerName
			}));
			return this;
		}

	});

	return RunnerView;

});
