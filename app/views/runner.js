define([

	'backbone',

], function(Backbone) {

	'use strict';

	var RunnerView = Backbone.View.extend({

		initialize: function initialize(options) {
			this.options = options || {};
			this.socket = options.socket;
			this.listenTo(this.socket, 'connect', this.onSocketConnect);
			this.listenTo(this.socket, 'disconnect', this.onSocketDisconnect);
			this.listenTo(this.socket, 'message', this.render);
		},

		onSocketConnect: function onSocketConnect() {
			console.log('socket.io: connected');
		},

		onSocketDisconnect: function onSocketDisconnect() {
			console.log('socket.io: disconnected');
		},

		render: function render() {
			$(this.el).html('RUNNER');
			return this;
		}

	});

	return RunnerView;

});
