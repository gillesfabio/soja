define('app/models/RunnerModel', [

	'backbone',
	'backbone.localStorage'

], function(Backbone) {

	'use strict';

	var RunnerModel = Backbone.Model.extend({
		localStorage: new Backbone.LocalStorage('watai-web-runners')
	});

	return RunnerModel;

});
