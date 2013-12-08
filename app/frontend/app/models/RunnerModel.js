define('app/models/RunnerModel', [

	'backbone',
	'backbone.localStorage'

],
/**
* RunnerModel
*
* @exports models/RunnerModel
*/
function(Backbone) {

	'use strict';

	/**
	* @class
	* @extends Backbone.Model
	*/
	var RunnerModel = Backbone.Model.extend(/** @lends module:models/RunnerModel~RunnerModel.prototype */{});

	return RunnerModel;

});
