/* jshint expr: true */

define(function(require) {

	'use strict';

	var expect           = require('chai').expect;
	var Backbone         = require('backbone');
	var RunnerCollection = require('app/collections/RunnerCollection');

	var collection, runDate, model, data1, data2;

	RunnerCollection.prototype.localStorage = new Backbone.LocalStorage('watai:web:test:runners');


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
					action  : 'start',
					runDate : runDate,
					name    : 'Runner'
				};

				data2 = {
					action  : 'foobar',
					runDate : runDate,
					name    : 'Runner'
				};

				model = collection.createUnique(data1);
				expect(model).to.be.ok;
				expect(collection.models.length).to.equal(1);

				model = collection.createUnique(data1);
				expect(model).to.be.undefined;
				expect(collection.models.length).to.equal(1);

				model = collection.createUnique(data2);
				expect(model).to.be.undefined;
				expect(collection.models.length).to.equal(1);
			});
		});
	});

});
