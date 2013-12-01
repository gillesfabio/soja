/* jshint expr: true */

define(
	/**
	* Runner Info View
	*
	* @exports views/RunnerInfoView
	*/
	function(require) {

	'use strict';

	var _          = require('underscore');
	var Backbone   = require('backbone');
	var Handlebars = require('handlebars');
	var logger     = require('loglevel');
	var moment     = require('moment');
	var tpl        = require('text!app/templates/runner-info.hbs');
	var helpers    = require('app/helpers');

	/**
	* @class
	* @requires Underscore
	* @requires Backbone
	* @requires Handlebars
	* @requires Moment
	* @extends Backbone.View
	*/
	var RunnerInfoView = Backbone.View.extend(/** @lends module:views/RunnerInfoView~RunnerInfoView.prototype */{

		/**
		* The view template.
		*
		* @type {String}
		*/
		template: Handlebars.compile(tpl),

		/**
		* View initialization.
		*
		* @param {Object}            options          - View options
		* @param {WebSocketServer}   options.ws       - The WebSocketServer instance.
		* @param {RunnerCollection}  options.runners  - The runner collection instance.
		* @param {FeatureCollection} options.features - The feature collection instance.
		*/
		initialize: function initialize(options) {
			this.options = _.extend({
				ws       : null,
				runners  : null,
				features : null
			}, options);
			this.connected = false;
			this.ws        = this.options.ws;
			this.runners   = this.options.runners;
			this.features  = this.options.features;
			this.initEvents();
		},

		/**
		* Initializes events.
		*
		* @private
		*/
		initEvents: function initEvents() {
			_.bindAll(this, 'onSocketOpen', 'onSocketClose', 'onSocketMessage', 'render');
			this.listenTo(this.runners, 'change', this.render);
			this.listenTo(this.features, 'change', this.render);
			if (this.ws) {
				this.ws.addEventListener('open', this.onSocketOpen);
				this.ws.addEventListener('close', this.onSocketClose);
				this.ws.addEventListener('message', this.onSocketMessage);
			}
			return this;
		},

		/**
		* Calls on WebSocketServer connection.
		*/
		onSocketOpen: function onSocketOpen() {
			this.connected = true;
			this.render();
			return this;
		},

		/**
		* Calls on WebSocketServer close.
		*/
		onSocketClose: function onSocketClose() {
			this.connected = false;
			this.render();
			return this;
		},

		/**
		* Calls on WebSocketServer message.
		*/
		onSocketMessage: function onSocketMessage() {
			this.connected = true;
			this.render();
			return this;
		},

		/**
		* Renders the view.
		*/
		render: function render() {
			$(this.el).html(this.template({
				connected      : this.connected,
				runner         : this.runners.last() ? this.runners.last().toJSON() : null,
				totalCount     : this.features.latest().size(),
				succeededCount : this.features.latest().succeededCount(),
				failedCount    : this.features.latest().failedCount()
			}));
			return this;
		}
	});

	return RunnerInfoView;

});
