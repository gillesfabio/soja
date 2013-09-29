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
			var view = new RunnerView({
				socket   : io.connect('http://localhost:9999'),
				runners  : new RunnerCollection(),
				features : new FeatureCollection()
			});
			view.fetch();
			$('#content').html(view.render().el);
		}

	});

	return Router;

});
