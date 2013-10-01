define('app/collections/FeatureCollection', [

	'app/models/FeatureModel',
	'underscore',
	'backbone',
	'backbone.localStorage'

], function(FeatureModel, _, Backbone) {

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
			if (!data.runDate && !data.status && !data.description) return;
			exists = this.findWhere({
				runDate     : data.runDate,
				status      : data.status,
				description : data.description
			});
			if (!exists) {
				delete data.type;
				feature = this.create(data);
				return feature;
			}
			return;
		}
	});

	return FeatureCollection;

});
