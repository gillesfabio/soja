/* jshint expr: true */

define(function(require) {

	'use strict';

	var expect           = require('chai').expect;
	var Backbone         = require('backbone');
	var RunnerCollection = require('app/collections/RunnerCollection');
	var fixtures         = require('app/fixtures');

	var collection, runDate, model, data1, data2;

	RunnerCollection.prototype.localStorage = new Backbone.LocalStorage('watai:soja:test:runners');

	function dateComparator(a, b) {
		a = new Date(a);
		b = new Date(b);
		if (a > b) return -1;
		if (a < b) return 1;
		return 0;
	}

	describe('Collections', function() {
		describe('RunnerCollection', function() {

			beforeEach(function() {
				collection = new RunnerCollection();
				collection.localStorage._clear();
				runDate = new Date().toISOString();
			});

			it('should properly create new models with createUnique()', function() {

				collection = new RunnerCollection();

				data1 = {
					runDate : runDate,
					name    : 'Runner'
				};

				data2 = {
					runDate : runDate,
					name    : 'Runner'
				};

				model = collection.createUnique(data1);
				expect(model).to.be.ok;
				expect(collection.models.length).to.equal(1);

				model = collection.createUnique(data1);
				expect(model).to.be.ok;
				expect(collection.models.length).to.equal(1);

				model = collection.createUnique(data2);
				expect(model).to.be.ok;
				expect(collection.models.length).to.equal(1);
			});

			it('should properly sort models', function() {
				var sortedDates = [];
				var modelsDates = [];
				fixtures.create({namespace: 'test'});
				collection.fetch();
				collection.models.forEach(function(model) {
					modelsDates.push(model.attributes.runDate);
				});
				sortedDates = modelsDates.sort(dateComparator);
				expect(modelsDates).to.equal(sortedDates);
			});
		});
	});

});
