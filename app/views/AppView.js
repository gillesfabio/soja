define([

	'backbone',
	'socket.io-client'

], function(Backbone, io) {

	'use strict';

	var AppView = Backbone.View.extend({

		socket: io.connect('http://localhost:9999'),

		initialize: function initialize() {
			console.log(io);
			this.listenTo(this.socket, 'message', this.render);
		},

		render: function render() {
			return this;
		}

	});

	return AppView;

});
