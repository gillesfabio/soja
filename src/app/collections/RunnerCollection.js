define('app/collections/RunnerCollection', [

	'app/models/RunnerModel',
	'underscore',
	'backbone',
	'loglevel',
	'backbone.localStorage'

],
/**
* RunnerCollection
* @exports collections/RunnerCollection
*/
function(RunnerModel, _, Backbone, logger) {

	'use strict';

	/**
	* RunnerCollection
	* @class
	* @extends Backbone.View
	*/
	var RunnerCollection = Backbone.Collection.extend(/** @lends module:collections/RunnerCollection~RunnerCollection.prototype */{

		/**
		* The model.
		* @type {RunnerModel}
		*/
		model: RunnerModel,

		/**
		* The Backbone.LocalStorage instance.
		* @type {Backbone.LocalStorage}
		*/
		localStorage: new Backbone.LocalStorage('watai:soja:runners'),

		/**
		* Orders by `runDate`.
		*/
		comparator: function(model) {
			var date = new Date(model.get('runDate'));
			return date.getTime();
		},

		/**
		* Takes a WebSocket message and create the given runner if it
		* does not exists in the database. Returns the given model instance
		* or `undefined` if an error occurred (the error is logged).
		* @param {object} data - WebSocket message
		* @returns {RunnerModel|null}
		*/
		createUnique: function createUnique(data) {
			var exists, runner;
			data = _.extend({
				runDate : null,
				name    : null
			}, data);
			if (!data.runDate && !data.name) {
				logger.warn('Something is wrong with: ' + JSON.stringify(data));
				return;
			}
			exists = this.findWhere({
				runDate : data.runDate,
				name    : data.name
			});
			if (!exists) {
				delete data.type;
				runner = this.create(data);
				logger.info('Created runner: ' + runner.attributes.name);
				return runner;
			}
			logger.info('Runner: ' + exists.attributes.name + ' (run date: ' + exists.attributes.runDate + ') — already exists');
			return exists;
		}
	});

	return RunnerCollection;

});
