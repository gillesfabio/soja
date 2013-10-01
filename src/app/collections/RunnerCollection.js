define('app/collections/RunnerCollection', [

	'app/models/RunnerModel',
	'underscore',
	'backbone',
	'loglevel',
	'backbone.localStorage'

], function(RunnerModel, _, Backbone, logger) {

	'use strict';

	var RunnerCollection = Backbone.Collection.extend({

		model: RunnerModel,
		localStorage: new Backbone.LocalStorage('watai:soja:runners'),

		createUnique: function createUnique(data) {
			var exists, runner;
			data = _.extend({
				action  : null,
				runDate : null,
				name    : null
			}, data);
			if (!data.action && !data.runDate && !data.name) {
				logger.warn('Something is wrong with: ' + JSON.stringify(data));
				return;
			}
			if (data.action === 'start') {
				exists = this.findWhere({
					runDate : data.runDate,
					name    : data.name
				});
				if (!exists) {
					delete data.type;
					delete data.action;
					runner = this.create(data);
					logger.info('Created runner: ' + runner.attributes.name);
					return runner;
				}
				logger.info('Runner: ' + exists.attributes.name + ' (run date: ' + data.runDate + ') — already exists');
			}
		}
	});

	return RunnerCollection;

});
