define(function(require) {

	'use strict';

	// Vendor
	var _          = require('underscore');
	var Backbone   = require('backbone');
	var Handlebars = require('handlebars');
	var logger     = require('loglevel');
	var template   = require('text!app/templates/settings.hbs');

	// App
	var RunnerCollection  = require('app/collections/RunnerCollection');
	var FeatureCollection = require('app/collections/FeatureCollection');


	var SettingsView = Backbone.View.extend({

		template: Handlebars.compile(template),

		events: {
			'click .flush-database': 'flushDatabase'
		},

		initialize: function initialize(options) {
			this.options = _.extend({
				runners  : null,
				features : null
			}, options);
			this.initCollections();
		},

		initCollections: function initCollections() {
			logger.debug('SettingsView: initialize collections');
			this.collections = [];
			this.runners = this.options.runners;
			if (this.runners && this.runners instanceof RunnerCollection) {
				logger.debug('SettingsView: added runners (RunnerCollection) to collections');
				this.collections.push(this.runners);
			}
			this.features = this.options.features;
			if (this.features && this.features instanceof FeatureCollection) {
				logger.debug('SettingsView: added features (FeatureCollection) to collections');
				this.collections.push(this.features);
			}
			return this;
		},

		fetch: function fetch() {
			if (this.runners)  this.runners.fetch();
			if (this.features) this.features.fetch();
		},

		flushDatabase: function flushDatabase() {
			logger.debug('SettingsView: flush database');
			this.collections.forEach(function(collection) {
				collection.reset();
				collection.localStorage._clear();
			});
			return this;
		},

		render: function render() {
			logger.debug('SettingsView: render');
			$(this.el).html(this.template());
			return this;
		}
	});

	return SettingsView;

});
