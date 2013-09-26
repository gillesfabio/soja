define(function(require) {

	'use strict';

	var _        = require('underscore');
	var Backbone = require('backbone');

	var RunnerView = Backbone.View.extend({

		options    :  {},
		socket     :   null,
		template   : _.template($('#runner-template').html()),

		runnerName : null,
		features   : [],
		connected  : false,

		initialize: function initialize(options) {
			this.options = options;
			this.socket  = options.socket;
			_.bindAll(this, 'connect', 'disconnect', 'message', 'render');
			this.listenTo(this.socket, 'connect', this.connect);
			this.listenTo(this.socket, 'disconnect', this.disconnect);
			this.listenTo(this.socket, 'message', this.message);
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
			if (data && data.type === 'runner' && data.state === 'start') {
				this.runnerName = data.message;
				this.render();
			}
			if (data && data.type === 'feature') {
				this.features.push(data);
				this.render();
			}
			return this;
		},

		render: function render() {
			$(this.el).html(this.template({
				connected  : this.connected,
				runnerName : this.runnerName,
				features   : this.features
			}));
			return this;
		}

	});

	return RunnerView;

});
