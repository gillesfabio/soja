/* jshint expr: true */

define(function(require) {

	'use strict';

	var expect            = require('chai').expect;
	var Backbone          = require('backbone');
	var RunnerView        = require('app/views/RunnerView');
	var RunnerInfoView    = require('app/views/RunnerInfoView');
	var RunnerCollection  = require('app/collections/RunnerCollection');
	var FeatureCollection = require('app/collections/FeatureCollection');
	var fixtures          = require('app/fixtures');

	var server = 'ws://localhost:9999';

	var ws, view, runners, features, output;

	RunnerCollection.prototype.localStorage  = new Backbone.LocalStorage('watai:soja:test:runners');
	FeatureCollection.prototype.localStorage = new Backbone.LocalStorage('watai:soja:test:features');

	runners  = new RunnerCollection();
	features = new FeatureCollection();

	function clean() {
		features.reset();
		features.localStorage._clear();
		runners.reset();
		runners.localStorage._clear();
	}

	function dateComparator(a, b) {
		a = new Date(a);
		b = new Date(b);
		if (a > b) return -1;
		if (a < b) return 1;
		return 0;
	}

	describe('Views', function() {
		describe('RunnerView', function() {

			beforeEach(function() {
				$('#fixtures').empty();
				clean();
				ws = new WebSocket(server);
				view = new RunnerView({
					ws       : ws,
					runners  : runners,
					features : features
				});
				view.fetch();
			});

			afterEach(function() {
				$('#fixtures').empty();
			});

			it('should properly initialize view', function() {
				expect(view.runners).to.be.an.instanceof(RunnerCollection);
				expect(view.features).to.be.an.instanceof(FeatureCollection);
			});

			it('should have a proper "collections" array property', function() {
				expect(view.collections.length).to.equal(2);
			});

			it('should have a proper "subviews" array property', function() {
				expect(view.subviews.length).to.equal(1);
				expect(view.subviews[0]).to.be.an.instanceof(RunnerInfoView);
			});

			it('should properly create runners', function(done) {
				this.timeout(5000);
				setTimeout(function() {
					expect(view.runners.models.length).to.equal(1);
					done();
				}, 4000);
			});

			it('should properly create features', function(done) {
				this.timeout(5000);
				setTimeout(function() {
					expect(view.features.models.length).to.equal(4);
					done();
				}, 4000);
			});

			it('should properly render RunnerInfoView subview', function(done) {
				this.timeout(5000);
				setTimeout(function() {
					view.runnerInfoView.data.connected = true;
					view.runnerInfoView.data.lastRunDate = new Date();
					output = $('#fixtures').html(view.render().el).html();
					expect(output).to.have.string('<strong>Last run:</strong> a few seconds ago');
					expect(output).to.have.string('<strong>Server:</strong> connected');
					done();
				}, 4000);
			});

			it('should properly returns the current runner', function(done) {
				this.timeout(5000);
				setTimeout(function() {
					var dates    = [];
					var lastDate = null;
					clean();
					expect(view.runners.size()).to.equal(0);
					expect(view.features.size()).to.equal(0);
					fixtures.create({namespace: 'test'});
					view = new RunnerView({
						runners  : runners,
						features : features
					});
					view.fetch();
					view.runners.models.forEach(function(model) {
						dates.push(model.attributes.runDate);
					});
					dates = dates.sort(dateComparator);
					lastDate = dates[0];
					expect(view.getCurrentRunner().runDate).to.equal(lastDate);
					done();
				}, 4000);
			});

			it('should properly returns the latest features', function(done) {
				this.timeout(5000);
				setTimeout(function() {
					var dates          = [];
					var lastDate       = null;
					var latestFeatures = [];
					clean();
					expect(view.runners.size()).to.equal(0);
					expect(view.features.size()).to.equal(0);
					fixtures.create({namespace: 'test'});
					view = new RunnerView({
						runners  : runners,
						features : features
					});
					view.fetch();
					view.features.models.forEach(function(model) {
						dates.push(model.attributes.runDate);
					});
					dates = dates.sort(dateComparator);
					lastDate = dates[0];
					latestFeatures = view.getLatestFeatures();
					latestFeatures.forEach(function(feature) {
						expect(feature.runDate).to.equal(lastDate);
					});
					done();
				}, 4000);
			});
		});
	});

});
