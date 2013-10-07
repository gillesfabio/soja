/* jshint expr: true */

define(function(require) {

	'use strict';

	var expect            = require('chai').expect;
	var Backbone          = require('backbone');
	var StatsView         = require('app/views/StatsView');
	var RunnerCollection  = require('app/collections/RunnerCollection');
	var FeatureCollection = require('app/collections/FeatureCollection');
	var helpers           = require('helpers');

	RunnerCollection.prototype.localStorage  = new Backbone.LocalStorage('watai:soja:test:runners');
	FeatureCollection.prototype.localStorage = new Backbone.LocalStorage('watai:soja:test:features');

	var runners  = new RunnerCollection();
	var features = new FeatureCollection();

	var view, output;

	describe('Views', function() {
		describe('StatsView', function() {

			beforeEach(function() {
				$('#fixtures').empty();
				helpers.clean([features, runners]);
				view = new StatsView({runners: runners, features: features});
				view.fetch();
			});

			afterEach(function() {
				$('#fixtures').empty();
			});

			it('should be ok', function() {
			});
		});
	});
});
