/* jshint expr: true */

define(function(require) {

	'use strict';

	var expect            = require('chai').expect;
	var Backbone          = require('backbone');
	var DatabaseView      = require('app/views/DatabaseView');
	var RunnerCollection  = require('app/collections/RunnerCollection');
	var FeatureCollection = require('app/collections/FeatureCollection');
	var helpers           = require('helpers');
	var fixtures          = require('fixtures');

	RunnerCollection.prototype.localStorage  = new Backbone.LocalStorage('watai:soja:test:runners');
	FeatureCollection.prototype.localStorage = new Backbone.LocalStorage('watai:soja:test:features');

	var runners  = new RunnerCollection();
	var features = new FeatureCollection();

	var view, output;

	describe('Views', function() {
		describe('DatabaseView', function() {

			beforeEach(function() {
				$('#fixtures').empty();
				helpers.clean([features, runners]);
				view = new DatabaseView({runners: runners, features: features});
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
				view.flush();
				expect(runners.models.length).to.equal(0);
				expect(features.models.length).to.equal(0);
			});

			it('should properly export the database', function() {
				fixtures.create({namespace: 'test'});
				runners.fetch();
				features.fetch();

			});

			it('should properly import a previous database export', function() {

			});

			it('should properly show the feedback message', function() {
				view.feedback = {type: 'success', message: 'I am the feedback message'};
				output = $('#fixtures').html(view.render().el).html();
				expect(output).to.have.string('alert-success');
				expect(output).to.have.string('I am the feedback message');
				expect(view.feedback).to.be.null;
			});
		});
	});
});
