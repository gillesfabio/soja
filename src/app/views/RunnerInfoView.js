/* jshint expr: true */

define(function(require) {

	'use strict';

	var _          = require('underscore');
	var Backbone   = require('backbone');
	var moment     = require('moment');
	var template   = require('text!app/templates/runner-info.hbs');
	var logger     = require('loglevel');
	var Handlebars = require('handlebars');

	var RunnerInfoView = Backbone.View.extend({

		template: Handlebars.compile(template),

		initialize: function initialize() {
			logger.debug('RunnerInfoView: initialize');
			this.data = {
				connected: false,
				lastRunDate: null
			};
		},

		lastRunDateFormatted: function lastRunDateFormatted() {
			if (this.data.lastRunDate) return moment(this.data.lastRunDate).fromNow();
			return this.data.lastRunDate;
		},

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
