define('app/collections/FeatureCollection', [

	'app/models/FeatureModel',
	'underscore',
	'backbone',
	'backbone.localStorage'

], function(FeatureModel, _, Backbone) {

	'use strict';

	var FeatureCollection = Backbone.Collection.extend({

		model: FeatureModel,
		localStorage: new Backbone.LocalStorage('watai-web-features'),

		createUnique: function createUnique(data) {
			if (_.has(data, 'type') && data.type === 'feature') {
				if (!this.findWhere({state: data.state, message: data.message})) {
					this.create(data);
				}
			}
		}
	});

	return FeatureCollection;

});
