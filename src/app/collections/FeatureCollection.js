define('app/collections/FeatureCollection', [

	'app/models/FeatureModel',
	'underscore',
	'backbone',
	'loglevel',
	'backbone.localStorage'

], function(FeatureModel, _, Backbone, logger) {

	'use strict';

	var FeatureCollection = Backbone.Collection.extend({

		model: FeatureModel,
		localStorage: new Backbone.LocalStorage('watai:soja:features'),

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
		}
	});

	return FeatureCollection;

});
