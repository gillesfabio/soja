'use strict';

var path = require('path');

var APP_PORT = 8888,
	APP_TEST_PORT = 9999,
	SERVERS_RELATIVE_PATH = './servers/';


module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		shell: {
			cleanDoc       : { command: 'rm -rf ./doc' },
			generateDoc    : { command: './node_modules/jsdoc/jsdoc -c jsdoc.json' },
			openDoc        : { command: 'open ./doc/index.html' }
		},

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

		watch : {},

		express: {
			options: {
			},
			app: {
				options: {
					hostname : '*',
					server   : path.resolve(SERVERS_RELATIVE_PATH + 'app'),
					port     : APP_PORT,
					bases    : ['src', __dirname],
					debug    : true
				}
			},
			test: {
				options: {
					hostname : '*',
					server   : path.resolve(SERVERS_RELATIVE_PATH + 'test'),
					port     : APP_TEST_PORT,
					debug    : true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-express');
	grunt.loadNpmTasks('grunt-shell');

	grunt.registerTask('lint', [
		'jshint'
	]);

	grunt.registerTask('build', [
		'lint'
	]);

	grunt.registerTask('server', [
		'build',
		'express:app',
		'watch'
	]);

	grunt.registerTask('doc', [
		'shell:cleanDoc',
		'shell:generateDoc',
		'shell:openDoc'
	]);

	grunt.registerTask('test', [
		'lint',
		'express:test',
		'watch'
	]);
};
