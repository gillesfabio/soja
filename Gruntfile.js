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
		compass: {
			dist: {
				options: {
					sassDir: 'src/app/styles/sass',
					cssDir: 'src/app/styles/css',
					outputStyle: 'expanded',
					noLineComments: true,
					force: true
				},
				files: {
					'src/app/styles/dist/app.css': 'src/app/styles/app/scss'
				}
			}
		},
		watch: {
			compass: {
				files: [
					'src/app/styles/sass/*.scss'
				],
				tasks: ['compass']
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
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-express');

	grunt.registerTask('default', [
		'jshint',
		'watch:compass',
		'compass',
		'express:app'
	]);

	grunt.registerTask('test', [
		'jshint',
		'express:test'
	]);
};
