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

	/**
	* @class
	* @requires Underscore
	* @requires Backbone
	* @requires Handlebars
	* @requires Moment
	* @extends Backbone.View
	* @property {object} data - View's template context data.
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
		*/
		initialize: function initialize() {
			logger.debug('RunnerInfoView: initialize');
			this.data = {
				connected: false,
				lastRunDate: null
			};
		},

		/**
		* Returns the last run date formatted with Moment.js
		* `fromNow` method (example: "a few seconds ago").
		*
		* If `lastRunDate` instance variable is not defined, returns
		* `null` (and not `undefined`), which is the default value.
		*
		* @return {string|null}
		*/
		lastRunDateFormatted: function lastRunDateFormatted() {
			if (this.data.lastRunDate) return moment(this.data.lastRunDate).fromNow();
			return this.data.lastRunDate;
		},

		/**
		* Renders the view with the following context:
		*
		*    - `lastRunDate`: the last run date formatted with Moment.js
		*    - `connected`: Boolean representing the current server connection status.
		*/
		render: function render() {
			logger.debug('RunnerInfoView: render');
			$(this.el).html(this.template({
				lastRunDate : this.lastRunDateFormatted(),
				connected   : this.data.connected
			}));
			return this;
		}
	});

	return RunnerInfoView;

});
