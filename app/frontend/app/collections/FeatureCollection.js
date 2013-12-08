define('app/collections/FeatureCollection', [

	'app/models/FeatureModel',
	'underscore',
	'backbone',
	'loglevel',
	'backbone.localStorage'

],
/**
* FeatureCollection
*
* @exports collections/FeatureCollection
*/
function(FeatureModel, _, Backbone, logger) {

	'use strict';

	/**
	* @class
	* @extends Backbone.View
	*/
	var FeatureCollection = Backbone.Collection.extend(/** @lends module:collections/FeatureCollection~FeatureCollection.prototype */{

		/**
		* The model.
		*
		* @type {FeatureModel}
		*/
		model: FeatureModel,

		/**
		* The Backbone.LocalStorage instance.
		*
		* @type {Backbone.LocalStorage}
		*/
		localStorage: new Backbone.LocalStorage('watai:soja:features'),

		/**
		* Orders by `runner.runDate`.
		*/
		comparator: function comparator(model) {
			if (model.attributes.runner && model.attributes.runner.runDate) {
				return new Date(model.attributes.runner.runDate).getTime();
			}
		},

		/**
		* Only returns last run features.
		*
		* @returns {Array} Latest features (based on `runner.runDate` date).
		*/
		latest: function latest() {
			var last = this.last();
			var models = this.filter(function(model) {
				return (model.attributes.runner.name === last.attributes.runner.name &&
						model.attributes.runner.runDate === last.attributes.runner.runDate);
			});
			return new FeatureCollection(models);
		},

		/**
		* Returns count for a given `where` clause.
		*
		* @param   {Object}  options        - Method options.
		* @param   {Object}  options.where  - Object to pass to `where` method.
		* @returns {Integer|null}
		*/
		countWhere: function countWhere(options) {
			options = _.extend({where: {}}, options);
			var models = this.where(options.where);
			return models ? models.length : null;
		},

		/**
		* Returns count of succeeded features.
		*
		* @returns {Integer|null}
		*/
		succeededCount: function succeededCount() {
			return this.countWhere({where: {status: 'success'}});
		},

		/**
		* Returns count of failed features.
		*
		* @returns {Integer|null}
		*/
		failedCount: function failedCount() {
			return this.countWhere({where: {status: 'failure'}});
		},

		/**
		* Returns features of a given `Runner` (identified by its `name`).
		*
		* @param   {String} name - The `Runner` name.
		* @returns {Array}  Features of the given `Runner`.
		*/
		findByRunner: function findByRunner(name) {
			var models = this.filter(function(model) {
				return model.attributes.runner.name === name;
			});
			return new FeatureCollection(models);
		},

		/**
		* Takes a WebSocket message and create the given feature if it
		* does not exists in the database. Returns the given model instance
		* or `undefined` if an error occurred (the error is logged).
		*
		* @param {object} data - WebSocket message
		* @returns {FeatureModel|null}
		*/
		createUnique: function createUnique(data) {
			var exists, feature;
			data = _.extend({
				runner      : {name: null, runDate: null},
				status      : null,
				description : null
			}, data);
			if (!data.runner.name && !data.runner.runDate && !data.status && !data.description) {
				logger.warn("Something went wrong with: " + JSON.stringify(data));
				return;
			}
			exists = this.findWhere({
				runDate     : data.runDate,
				status      : data.status,
				description : data.description
			});
			if (!exists) {
				delete data.type;
				feature = this.create(data);
				logger.info('Created feature: ' + feature.attributes.description);
				return feature;
			}
			logger.info('Feature: ' + exists.attributes.description + ' — already exists');
			return exists;
		}
	});

	return FeatureCollection;

});
