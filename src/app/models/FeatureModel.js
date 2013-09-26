define('app/models/FeatureModel', [

	'backbone',
	'backbone.localStorage'

], function(Backbone) {

	'use strict';

	var FeatureModel = Backbone.Model.extend({
		localStorage: new Backbone.LocalStorage('watai-web-features')
	});

	return FeatureModel;

});
