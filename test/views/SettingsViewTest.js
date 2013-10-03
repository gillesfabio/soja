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


	describe('Views', function() {
		describe('SettingsView', function() {

			beforeEach(function() {
				$('#fixtures').empty();
			});

			afterEach(function() {
				$('#fixtures').empty();
			});

			it('should be ok', function() {
				expect('hello').to.equal('hello');
			});
		});
	});
});
