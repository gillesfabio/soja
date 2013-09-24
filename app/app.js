define([

	'app/views/AppView',
	'app/routers/Router'

], function(AppView, Router) {

	'use strict';

	new AppView();
	new Router();
	Backbone.history.start();

});
