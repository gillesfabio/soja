define(
	/**
	* Database View.
	*
	* @exports views/DatabaseView
	*/
	function(require) {

	'use strict';

	var _            = require('underscore');
	var _s           = require('underscore.string');
	var Backbone     = require('backbone');
	var Handlebars   = require('handlebars');
	var logger       = require('loglevel');
	var moment       = require('moment');
	var tpl          = require('text!app/templates/database.hbs');
	var bootstrap    = require('bootstrap');
	var JSZip        = require('jszip');
	var JSZipLoad    = require('jszip-load');
	var jSZipInflate = require('jszip-inflate');

	var RunnerCollection  = require('app/collections/RunnerCollection');
	var FeatureCollection = require('app/collections/FeatureCollection');

	/**
	* @class
	* @requires Underscore
	* @requires Backbone
	* @requires Handlebars
	* @extends Backbone.View
	* @property {object} data - View's template context data.
	*/
	var DatabaseView = Backbone.View.extend(/** @lends module:views/DatabaseView~DatabaseView.prototype */{

		/**
		* The view container ID.
		*
		* @type {string}
		*/
		id: 'database',

		/**
		* The view template.
		*
		* @type {string}
		*/
		template: Handlebars.compile(tpl),

		/**
		* The view events.
		*
		* @type {object}
		*/
		events: {
			'click  .flush' : 'flush',
			'click  .dump'  : 'dump',
			'change .load'  : 'load'
		},

		/**
		* The dump file name.
		*
		* @type {String}
		*/
		DUMP_FILENAME: 'soja-db.json',

		/**
		* Initilizes view.
		*
		* @param {object} options - The view options.
		*/
		initialize: function initialize(options) {
			this.options = _.extend({
				runners  : null,
				features : null
			}, options);
			this.feedback = null;
			this.downloadLink = null;
			this.initCollections();
		},

		/**
		* Initializes view collections.
		*
		* @private
		*/
		initCollections: function initCollections() {
			this.collections = [];
			this.runners = this.options.runners;
			if (this.runners && this.runners instanceof RunnerCollection) this.collections.push(this.runners);
			this.features = this.options.features;
			if (this.features && this.features instanceof FeatureCollection) this.collections.push(this.features);
			return this;
		},

		/**
		* Fetches collections data.
		*/
		fetch: function fetch() {
			if (this.runners)  this.runners.fetch();
			if (this.features) this.features.fetch();
		},

		/**
		* Flushes the application database (then renders the view).
		*/
		flush: function flushDatabase() {
			this.collections.forEach(function(collection) {
				collection.reset();
				collection.localStorage._clear();
			});
			this.feedback = {
				type	: 'success',
				message	: 'Successfully flushed the database.'
			};
			this.render();
			return this;
		},

		/**
		* Dumps the application database.
		*/
		dump: function dump() {
			this.createZip(function(blob) {
				var filename = _s.sprintf('soja-db-%s.zip', moment().format('YYYY-MM-DD'));
				var href = window.URL.createObjectURL(blob);
				this.downloadLink = _s.sprintf('<a href="%s" class="btn btn-square btn-primary" download="%s">Download Zip archive</a>', href, filename);
				this.feedback = {type: 'success', message: 'Successfully exported the database.'};
				this.render();
			}.bind(this));
			return this;
		},

		/**
		* Creates the ZIP archive with the database dump.
		*
		* @param {Function} callback - The callback to returns when blob has been created.
		*/
		createZip: function createZip(callback) {
			var zip  = new JSZip();
			var data = {};
			var blob;
			this.runners.fetch({
				success: function() {
					this.features.fetch({
						success: function() {
							data.runners = this.runners.models;
							data.features = this.features.models;
							zip.file(this.DUMP_FILENAME, JSON.stringify(data));
							blob = zip.generate({type: 'blob'});
							callback(blob);
						}.bind(this)
					});
				}.bind(this)
			});
			return this;

		},

		/**
		* Loads data into the application database.
		*/
		load: function load(event) {
			var file = event.target.files[0];
			var reader = new FileReader();
			if (!file.type.match('application/zip')) {
				this.feedback = {type: 'danger', message: 'Invalid file. You must upload a zip archive.'};
				this.render();
				return this;
			}
			reader.onload = this.readerOnLoad.bind(this);
			reader.readAsBinaryString(file);
			return this;
		},

		/**
		* `FileReader.onload` handler.
		*
		* @private
		* @param {Object} event - The event.
		*/
		readerOnLoad: function readerOnLoad(event) {
			var zip = new JSZip(event.target.result);
			var data;
			if (zip.files && zip.files.hasOwnProperty(this.DUMP_FILENAME)) {
				data = JSON.parse(zip.files[this.DUMP_FILENAME].asText());
				this.restore(data);
			}
			return this;
		},

		/**
		* Restores dumped data.
		*
		* @private
		* @param {Object} data - The dumped data parsed with `JSON.parse()`.
		*/
		restore: function restore(data) {
			if (!data) return this;
			data.runners.forEach(function(runner) {
				this.runners.create(runner);
				logger.info(_s.sprintf('DatabaseView: create runner %s', runner.id));
			}.bind(this));
			data.features.forEach(function(feature) {
				this.features.create(feature);
				logger.info(_s.sprintf('DatabaseView: create feature %s', feature.id));
			}.bind(this));
			this.feedback = {type: 'success', message: 'Successfully imported data in the database.'};
			this.render();
		},

		/**
		* Renders the view.
		*/
		render: function render() {
			$(this.el).html(this.template({
				feedback     : this.feedback,
				downloadLink : this.downloadLink
			}));
			this.feedback = null;
			return this;
		}
	});

	return DatabaseView;

});
