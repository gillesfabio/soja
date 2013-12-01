/* jshint expr: true */

define(
	/**
	* Stats View
	*
	* @exports views/StatsView
	*/
	function(require) {

	'use strict';

	var _          = require('underscore');
	var Backbone   = require('backbone');
	var Handlebars = require('handlebars');
	var logger     = require('loglevel');
	var moment     = require('moment');
	var tpl        = require('text!app/templates/stats.hbs');

	/**
	* @class
	* @requires Underscore
	* @requires Backbone
	* @requires Handlebars
	* @extends Backbone.View
	*/
	var StatsView = Backbone.View.extend(/** @lends module:views/StatsView~StatsView.prototype */{

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
		},

		fetch: function fetch() {
		},

		/**
		* Renders the view with the following context:
		*/
		render: function render() {
			$(this.el).html(this.template());
			return this;
		}
	});

	return StatsView;

});
