/* jshint expr: true */

define(function(require) {

	'use strict';

	var expect            = require('chai').expect;
	var Backbone          = require('backbone');
	var RunnerCollection  = require('app/collections/RunnerCollection');
	var FeatureCollection = require('app/collections/FeatureCollection');
	var fixtures          = require('app/fixtures');
	var helpers           = require('test/helpers');

	var collection, model, runDate, data1, data2;

	RunnerCollection.prototype.localStorage = new Backbone.LocalStorage('watai:soja:test:features');
	FeatureCollection.prototype.localStorage = new Backbone.LocalStorage('watai:soja:test:features');

	describe('Collections', function() {
		describe('FeatureCollection', function() {

			beforeEach(function() {
				collection = new FeatureCollection();
				helpers.clean([collection]);
				runDate = new Date().toISOString();
			});

			it('should properly create new models with createUnique()', function() {

				collection = new FeatureCollection();

				data1 = {
					runner      : {name: 'Runner', runDate: runDate},
					status      : 'success',
					description : 'This is a message',
					reasons     : []
				};

				data2 = {
					runner      : {name: 'Runner', runDate: runDate},
					status       : 'success',
					description  : 'This is another message',
					reasons      : []
				};

				model = collection.createUnique(data1);
				expect(model).to.be.ok;
				expect(collection.models.length).to.equal(1);

				model = collection.createUnique(data1);
				expect(model).to.be.ok;
				expect(collection.models.length).to.equal(1);

				model = collection.createUnique(data2);
				expect(model).to.be.ok;
				expect(collection.models.length).to.equal(2);

				model = collection.createUnique(data2);
				expect(model).to.be.ok;
				expect(collection.models.length).to.equal(2);
			});

			it('should properly sort models', function() {
				var sortedDates = [];
				var modelsDates = [];
				fixtures.create({namespace: 'test'});
				collection.fetch();
				collection.models.forEach(function(model) {
					modelsDates.push(model.attributes.runner.runDate);
				});
				sortedDates = modelsDates.sort(helpers.dateComparator);
				expect(modelsDates).to.equal(sortedDates);
			});

			it('should properly return latest models', function() {
				var dates = [];
				var lastDate, latest;
				fixtures.create({namespace: 'test'});
				collection.fetch();
				collection.models.forEach(function(model) {
					dates.push(model.attributes.runner.runDate);
				});
				dates    = dates.sort(helpers.dateComparator);
				lastDate = dates[0];
				latest   = collection.latest();
				latest.models.forEach(function(model) {
					expect(model.attributes.runner.runDate).to.equal(lastDate);
				});
			});

			it('should properly return models for a given Runner', function() {
				var runners = new RunnerCollection();
				var randomRunner;
				fixtures.create({namespace: 'test'});
				collection.fetch();
				runners.fetch();
				randomRunner = runners.shuffle()[0].toJSON();
				collection = collection.findByRunner(randomRunner.name);
				collection.models.forEach(function(model) {
					expect(model.attributes.runner.name).to.equal(randomRunner.name);
				});
			});

			it('should properly return succeeded feature count', function() {
				fixtures.create({namespace: 'test'});
				collection.fetch();
				expect(collection.succeededCount()).to.equal(collection.where({status: 'success'}).length);
			});

			it('should properly return succeeded feature count only for latest run', function() {
				fixtures.create({namespace: 'test'});
				collection.fetch();
				expect(collection.latest().succeededCount()).to.equal(collection.latest().where({status: 'success'}).length);
			});

			it('should properly return failed feature count', function() {
				fixtures.create({namespace: 'test'});
				collection.fetch();
				expect(collection.failedCount()).to.equal(collection.where({status: 'failure'}).length);
			});

			it('should properly return failed feature count only for latest run', function() {
				fixtures.create({namespace: 'test'});
				collection.fetch();
				expect(collection.latest().failedCount()).to.equal(collection.latest().where({status: 'failure'}).length);
			});
		});
	});
});
