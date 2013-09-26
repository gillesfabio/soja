define('app/collections/RunnerCollection', [

	'app/models/RunnerModel',
	'underscore',
	'backbone',
	'backbone.localStorage'

], function(RunnerModel, _, Backbone) {

	'use strict';

	var RunnerCollection = Backbone.Collection.extend({

		model: RunnerModel,
		localStorage: new Backbone.LocalStorage('watai-web-runners'),

		createUnique: function createIfDoesNotExist(data) {
			if (_.has(data, 'type') && data.type === 'runner' && data.state === 'start') {
				if (!this.findWhere({description: data.message})) {
					this.create({description: data.message});
				}
			}
		}
	});

	return RunnerCollection;

});
