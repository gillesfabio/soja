var path = require('path');


module.exports = function(grunt) {

	'use strict';

	grunt.initConfig({
		express: {
			app: {
				options: {
					port         : 8888,
					bases        : ['src'],
					serverreload : true,
					showStack    : true
				}
			},
			test: {
				options: {
					port         : 9999,
					server       : path.resolve('./test/server.js'),
					livereload   : true,
					serverreload : true,
					showStack    : true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-express');

	grunt.registerTask('default', [
		'express:app'
	]);

	grunt.registerTask('test', [
		'express:test'
	]);
};
