/* jshint expr: true */

define(function(require) {

	'use strict';

	// Vendor
	var expect   = require('chai').expect;
	var Backbone = require('backbone');

	// App
	var SettingsView      = require('app/views/SettingsView');
	var RunnerCollection  = require('app/collections/RunnerCollection');
	var FeatureCollection = require('app/collections/FeatureCollection');

	RunnerCollection.prototype.localStorage  = new Backbone.LocalStorage('watai:soja:test:runners');
	FeatureCollection.prototype.localStorage = new Backbone.LocalStorage('watai:soja:test:features');

	var runners  = new RunnerCollection();
	var features = new FeatureCollection();

	var view;


	describe('Views', function() {
		describe('SettingsView', function() {

			beforeEach(function() {
				$('#fixtures').empty();
				runners.localStorage._clear();
				features.localStorage._clear();
				view = new SettingsView({runners: runners, features: features});
				view.fetch();
			});

			afterEach(function() {
				$('#fixtures').empty();
			});

			it('should properly flush database', function() {
				for (var i = 0; i < 100; i++) {
					runners.create({foobar: 'something'});
					features.create({barfoo: 'anything'});
				}
				expect(runners.models.length).to.equal(100);
				expect(features.models.length).to.equal(100);
				view.flushDatabase();
				expect(runners.models.length).to.equal(0);
				expect(features.models.length).to.equal(0);
			});
		});
	});
});
