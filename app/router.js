define([

	'backbone',
	'socket.io-client',
	'app/views/runner'

], function(Backbone, io, RunnerView) {

	'use strict';

	var Router = Backbone.Router.extend({

		routes: {
			'': 'runner'
		},

		runner: function runner() {
			var socket = io.connect('http://localhost:9999');
			var view   = new RunnerView({socket: socket});
			$('#content').html(view.render().el);
		}

	});

	return Router;

});
