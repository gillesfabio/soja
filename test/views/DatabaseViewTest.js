/* jshint expr: true */

define(function(require) {

	'use strict';

	var expect            = require('chai').expect;
	var Backbone          = require('backbone');
	var DatabaseView      = require('app/views/DatabaseView');
	var RunnerCollection  = require('app/collections/RunnerCollection');
	var FeatureCollection = require('app/collections/FeatureCollection');
	var helpers           = require('helpers');
	var fixtures          = require('app/fixtures');
	var JSZip             = require('jszip');
	var JSZipLoad         = require('jszip-load');
	var JSZipInflate      = require('jszip-inflate');
	var async             = require('async');

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

			it('should properly create zip archive of the database', function(done) {
				var data = {runners: [], features: []};
				var reader = new FileReader();
				fixtures.create({namespace: 'test'});
				async.series([
					function getRunners(callback) {
						runners.fetch({
							success: function success() {
								data.runners = runners.toJSON();
								callback(null);
							}
						});
					},
					function getFeatures(callback) {
						features.fetch({
							success: function success() {
								data.features = features.toJSON();
								callback(null);
							}
						});
					},
				], function() {
					view.createZip(function(blob) {
						reader.onload = function(e) {
							var zip, zipData;
							zip = new JSZip(e.target.result);
							expect(zip.files).to.have.key(view.DUMP_FILENAME);
							zipData = JSON.parse(zip.files[view.DUMP_FILENAME].asText());
							expect(zipData).to.deep.equal(data);
							done();
						};
						reader.readAsBinaryString(blob);
					});
				});
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
