define(function(require) {

	'use strict';

	var _        = require('underscore');
	var Backbone = require('backbone');
	var moment   = require('moment');

	var RunnerInfoView = Backbone.View.extend({

		template: _.template($('#runner-info-template').html()),

		initialize: function initialize(options) {
			this.options = options;
			this.data = this.options.data;
		},

		getLastSessionDate: function lastSessionDate() {
			return (_.has(this.data, 'lastSessionDate') && this.data.lastSessionDate) ?
				moment(this.data.lastSessionDate).fromNow() : null;
		},

		getConnected: function connected() {
			if (_.has(this.data, 'connected')) return this.data.connected;
			return null;
		},

		render: function render() {
			$(this.el).html(this.template({
				lastSessionDate: this.getLastSessionDate(),
				connected: this.getConnected(),
			}));
			return this;
		}
	});

	return RunnerInfoView;

});
