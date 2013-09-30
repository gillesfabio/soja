define('app/collections/RunnerCollection', [

	'app/models/RunnerModel',
	'underscore',
	'backbone',
	'backbone.localStorage'

], function(RunnerModel, _, Backbone) {

	'use strict';

	var RunnerCollection = Backbone.Collection.extend({

		model: RunnerModel,
		localStorage: new Backbone.LocalStorage('watai:web:runners'),

		createUnique: function createUnique(data) {
			var exists, runner;
			data = _.extend({
				action  : null,
				runDate : null,
				name    : null
			}, data);
			if (!data.action && !data.runDate && !data.name) return;
			if (data.action === 'start') {
				exists = this.findWhere({
					runDate : data.runDate,
					name    : data.name
				});
				if (!exists) {
					delete data.type;
					delete data.action;
					runner = this.create(data);
					return runner;
				}
			}
		}
	});

	return RunnerCollection;

});
