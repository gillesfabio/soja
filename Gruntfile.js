var path = require('path');


module.exports = function(grunt) {

	'use strict';

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
			app: {
				options: {
					port  : 8888,
					bases : ['src', __dirname],
					debug : true
				}
			},
			test: {
				options: {
					port   : 9999,
					server : path.resolve('./test/server.js'),
					debug  : true
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
