define([

	'backbone',
	'socket.io-client',
	'app/views/RunnerView',
	'app/collections/RunnerCollection',
	'app/collections/FeatureCollection'

], function(Backbone, io, RunnerView, RunnerCollection, FeatureCollection) {

	'use strict';

	var Router = Backbone.Router.extend({

		routes: {
			'': 'runner'
		},

		runner: function runner() {
			var features = new FeatureCollection();
			var runners  = new RunnerCollection();
			var socket   = io.connect('http://localhost:9999');
			socket.emit('start runner', {});
			var view     = new RunnerView({
				socket   : socket,
				runners  : runners,
				features : features
			});
			$('#content').html(view.render().el);
		}

	});

	return Router;

});
