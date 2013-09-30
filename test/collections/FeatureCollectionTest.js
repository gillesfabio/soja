/* jshint expr: true */

define(function(require) {

	'use strict';

	var expect            = require('chai').expect;
	var Backbone          = require('backbone');
	var FeatureCollection = require('app/collections/FeatureCollection');

	var collection, model, runDate, data1, data2;

	FeatureCollection.prototype.localStorage = new Backbone.LocalStorage('watai:web:test:features');

	describe('Collections', function() {
		describe('FeatureCollection', function() {

			beforeEach(function() {
				collection = new FeatureCollection();
				collection.localStorage._clear();
				runDate = new Date().toISOString();
			});

			it('should properly create new models with createUnique()', function() {

				collection = new FeatureCollection();

				data1 = {
					runDate     : runDate,
					status      : 'success',
					description : 'This is a message',
					reasons     : []
				};

				data2 = {
					runDate      : runDate,
					status       : 'success',
					description  : 'This is another message',
					reasons      : []
				};

				model = collection.createUnique(data1);
				expect(model).to.be.ok;
				expect(collection.models.length).to.equal(1);

				model = collection.createUnique(data1);
				expect(model).to.be.undefined;
				expect(collection.models.length).to.equal(1);

				model = collection.createUnique(data2);
				expect(model).to.be.ok;
				expect(collection.models.length).to.equal(2);

				model = collection.createUnique(data2);
				expect(model).to.be.undefined;
				expect(collection.models.length).to.equal(2);
			});
		});
	});

});
