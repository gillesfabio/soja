var path = require('path');


module.exports = function(grunt) {

	'use strict';

	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'src/**/*.js',
				'test/**/*.js'
			],
			options: {
				ignores: ['vendor/**/*.js'],
				jshintrc: '.jshintrc'
			}
		},
		express: {
			app: {
				options: {
					port         : 8888,
					bases        : ['src', __dirname],
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

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-express');

	grunt.registerTask('default', [
		'jshint',
		'express:app'
	]);

	grunt.registerTask('test', [
		'jshint',
		'express:test'
	]);
};
