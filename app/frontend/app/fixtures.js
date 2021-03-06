define(function(require) {

	'use strict';

	var _                 = require('underscore');
	var _s                = require('underscore.string');
	var Backbone          = require('backbone');
	var LocalStorage      = require('backbone.localStorage');
	var logger            = require('loglevel');
	var moment            = require('moment');
	var RunnerCollection  = require('app/collections/RunnerCollection');
	var FeatureCollection = require('app/collections/FeatureCollection');

	var runners     = new RunnerCollection();
	var features    = new FeatureCollection();
	var collections = [runners, features];

	var NB_RUNNERS  = 30;
	var NB_FEATURES = 15;

	/**
	* Helper to generate a random date.
	*
	* @returns {Date} The random date.
	*/
	function randomDate() {
		var start = new Date(2012, 0, 1);
		var end = new Date();
		return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
	}

	/**
	* Creates sample runners.
	*
	* @returns {Array} Created runners.
	*/
	function createRunners() {
		var created = [];
		var runner, runDate, i;
		for (i = 0; i < NB_RUNNERS; i++) {
			runDate = randomDate();
			runner = runners.create({
				runDate: runDate,
				name: _s.sprintf('Runner — %s', moment(runDate).format('L'))
			});
			created.push(runner);
		}
		logger.info(_s.sprintf('Fixtures: created %d runners', created.length));
		return created;
	}

	/**
	* Creates sample features.
	*
	* @returns {Array} Created features.
	*/
	function createFeatures() {
		var created      = [];
		var statuses     = ['success', 'failure'];
		var runnerModels = createRunners();
		var feature, status, reason, i;
		runnerModels.forEach(function(runner) {
			for (i = 0; i < NB_FEATURES; i++) {
				feature = {
					runner      : {name: runner.attributes.name, runDate: runner.attributes.runDate},
					description : _s.sprintf('Feature #%d', i + 1),
					status      : statuses[Math.floor(Math.random() * statuses.length)]
				};
				if (feature.status === 'failure') {
					feature.reason = {
						'title'  : _s.sprintf('Failure #%d', i + 1),
						'help'   : '<https://github.com/MattiSG/Watai/wiki/Troubleshooting>',
						'source' : '- Something went wrong'
					};
				}
				feature = features.create(feature);
				created.push(feature);
			}
		});
		logger.info(_s.sprintf('Fixtures: created %d features', created.length));
		return created;
	}

	/**
	* Destroys all fixtures.
	*/
	function destroy() {
		collections.forEach(function(collection) {
			collection.reset();
			collection.localStorage._clear();
		});
	}

	/**
	* Creates fixtures.
	*/
	function create(options) {
		options = _.extend({
			destroy: true,
			namespace: 'fixtures'
		}, options);
		var runnerLS  = new Backbone.LocalStorage(_s.sprintf('watai:soja:%s:runners', options.namespace));
		var featureLS = new Backbone.LocalStorage(_s.sprintf('watai:soja:%s:features', options.namespace));
		RunnerCollection.prototype.localStorage = runnerLS;
		FeatureCollection.prototype.localStorage = featureLS;
		if (options.destroy) destroy();
		return createFeatures();
	}

	return {
		create  : create,
		destroy : destroy
	};
});
