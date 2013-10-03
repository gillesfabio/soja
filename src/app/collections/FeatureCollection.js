define('app/collections/FeatureCollection', [

	'app/models/FeatureModel',
	'underscore',
	'backbone',
	'loglevel',
	'backbone.localStorage'

],
/**
* FeatureCollection
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
		* @type {FeatureModel}
		*/
		model: FeatureModel,

		/**
		* The Backbone.LocalStorage instance.
		* @type {Backbone.LocalStorage}
		*/
		localStorage: new Backbone.LocalStorage('watai:soja:features'),

		/**
		* Takes a WebSocket message and create the given feature if it
		* does not exists in the database. Returns the given model instance
		* or `undefined` if an error occurred (the error is logged).
		* @param {object} data - WebSocket message
		* @returns {FeatureModel|null}
		*/
		createUnique: function createUnique(data) {
			var exists, feature;
			data = _.extend({
				runDate     : null,
				status      : null,
				description : null
			}, data);
			if (!data.runDate && !data.status && !data.description) {
				logger.warn("Something is wrong with: " + JSON.stringify(data));
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
