define('app/models/FeatureModel', [

	'backbone',
	'backbone.localStorage'

],
/**
* FeatureModel
* @exports models/FeatureModel
*/
function(Backbone) {

	'use strict';

	/**
	* @class
	* @extends Backbone.Model
	*/
	var FeatureModel = Backbone.Model.extend(/** @lends module:models/FeatureModel~FeatureModel.prototype */{});

	return FeatureModel;

});
