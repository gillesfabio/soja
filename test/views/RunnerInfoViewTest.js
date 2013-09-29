/* jshint expr: true */

define(function(require) {

	'use strict';

	var expect			= require('chai').expect;
	var Backbone        = require('backbone');
	var RunnerInfoView	= require('app/views/RunnerInfoView');


	describe('Views', function() {
		describe('RunnerInfoView', function() {

			beforeEach(function() {
				$('#fixtures').empty();
			});

			afterEach(function() {
				$('#fixtures').empty();
			});

			it('should properly return "connected" template variable', function() {
				var view = new RunnerInfoView();
				expect(view.data.connected).to.equal(false);
				view.data.connected = true;
				expect(view.data.connected).to.equal(true);
			});

			it('should properly return "lastRunDate" template variable (returned by formattedLastRunDate())', function() {
				var view = new RunnerInfoView();
				expect(view.data.lastRunDate).to.be.null;
				view.data.lastRunDate = new Date();
				expect(view.lastRunDateFormatted()).to.equal('a few seconds ago');
			});

			it('should properly render view with: connected:false, lastRunDate: now', function() {
				var view, output;
				view = new RunnerInfoView();
				view.data.connected = false;
				view.data.lastRunDate = new Date();
				output = $('#fixtures').html(view.render().el).html();
				expect(output).to.have.string('<strong>Last run:</strong> a few seconds ago');
				expect(output).to.have.string('<strong>Server:</strong> not connected');
			});

			it('should properly render view with: connected:true, lastRunDate: now', function() {
				var view, output;
				view = new RunnerInfoView();
				view.data.connected = true;
				view.data.lastRunDate = new Date();
				output = $('#fixtures').html(view.render().el).html();
				expect(output).to.have.string('<strong>Last run:</strong> a few seconds ago');
				expect(output).to.have.string('<strong>Server:</strong> connected');
			});

			it('should properly render view with: connected:false, lastRunDate: null', function() {
				var view, output;
				view = new RunnerInfoView();
				output = $('#fixtures').html(view.render().el).html();
				expect(output).to.have.string('<strong>Last run:</strong> never');
				expect(output).to.have.string('<strong>Server:</strong> not connected');
			});
		});
	});

});
