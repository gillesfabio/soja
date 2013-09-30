define([

	'backbone',
	'app/views/RunnerView',
	'app/collections/RunnerCollection',
	'app/collections/FeatureCollection'

], function(Backbone, RunnerView, RunnerCollection, FeatureCollection) {

	'use strict';

	var Router = Backbone.Router.extend({

		routes: {
			'': 'runner'
		},

		runner: function runner() {
			var ws   = new WebSocket('ws://localhost:9999');
			var view = new RunnerView({
				ws       : ws,
				runners  : new RunnerCollection(),
				features : new FeatureCollection()
			});
			view.fetch();
			$('#content').html(view.render().el);
		}

	});

	return Router;

});
