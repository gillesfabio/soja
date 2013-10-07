/* jshint expr: true */

define(function(require) {

	'use strict';

	var expect            = require('chai').expect;
	var Backbone          = require('backbone');
	var moment            = require('moment');
	var RunnerCollection  = require('app/collections/RunnerCollection');
	var FeatureCollection = require('app/collections/FeatureCollection');
	var RunnerInfoView    = require('app/views/RunnerInfoView');
	var fixtures          = require('app/fixtures');
	var helpers           = require('helpers');

	var WS_SERVER = 'ws://localhost:9999';

	var ws, view, runners, features, output;

	RunnerCollection.prototype.localStorage  = new Backbone.LocalStorage('watai:soja:test:runners');
	FeatureCollection.prototype.localStorage = new Backbone.LocalStorage('watai:soja:test:features');

	runners  = new RunnerCollection();
	features = new FeatureCollection();

	describe('Views', function() {
		describe('RunnerInfoView', function() {

			beforeEach(function() {
				$('#fixtures').empty();
			});

			beforeEach(function() {
				$('#fixtures').empty();
				helpers.clean([features, runners]);
			});

			afterEach(function() {
				$('#fixtures').empty();
			});

			it('should properly set last run date for the first launch (shows "Never")', function() {
				view = new RunnerInfoView({
					ws       : null,
					runners  : runners,
					features : features
				});
				output = $('#fixtures').html(view.render().el).html();
				expect(output).to.have.string('Never');
			});

			it('should properly set last run date', function() {
				fixtures.create({namespace: 'test'});
				view = new RunnerInfoView({
					ws       : null,
					runners  : runners,
					features : features
				});
				runners.fetch();
				features.fetch();
				output = $('#fixtures').html(view.render().el).html();
				expect(output).to.have.string(moment(runners.last().attributes.runDate).fromNow());
			});

			it('should properly set server status up', function(done) {
				this.timeout(3000);
				ws = new WebSocket(WS_SERVER);
				view = new RunnerInfoView({
					ws       : ws,
					runners  : runners,
					features : features
				});
				setTimeout(function() {
					output = $('#fixtures').html(view.render().el).html();
					expect(output).to.have.string('icon-thumbs-up-alt');
					done();
				}, 2000);
			});

			it('should properly set server status down', function() {
				view = new RunnerInfoView({
					ws       : null,
					runners  : runners,
					features : features
				});
				output = $('#fixtures').html(view.render().el).html();
				expect(output).to.have.string('icon-thumbs-down-alt');
			});

			it('should properly set total count', function() {
				fixtures.create({namespace: 'test'});
				runners.fetch();
				features.fetch();
				output = $('#fixtures').html(view.render().el).html();
				expect(output).to.have.string('<h2 class="runner-summary-total-count">' + features.latest().size() + '</h2>');
			});

			it('should properly set succeeded count', function() {
				fixtures.create({namespace: 'test'});
				runners.fetch();
				features.fetch();
				output = $('#fixtures').html(view.render().el).html();
				expect(output).to.have.string('<h2 class="runner-summary-succeeded-count">' + features.succeededCount({latest: true}) + '</h2>');
			});

			it('should properly set failed count', function() {
				fixtures.create({namespace: 'test'});
				runners.fetch();
				features.fetch();
				output = $('#fixtures').html(view.render().el).html();
				expect(output).to.have.string('<h2 class="runner-summary-failed-count">' + features.failedCount({latest: true}) + '</h2>');
			});
		});
	});

});
