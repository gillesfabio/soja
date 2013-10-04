var path = require('path');


module.exports = function(grunt) {

	'use strict';

	grunt.initConfig({
		shell: {
			npmInstall     : { command: 'npm install' },
			bowerInstall   : { command: 'bower install' },
			compassInstall : { command: 'gem install compass' },
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
	grunt.loadNpmTasks('grunt-shell');

	grunt.registerTask('default', [
		'jshint',
		'compass',
		'express:app'
	]);

	grunt.registerTask('install', [
		'shell:npmInstall',
		'shell:bowerInstall',
		'shell:compassInstall'
	]);

	grunt.registerTask('doc', [
		'shell:cleanDoc',
		'shell:generateDoc',
		'shell:openDoc'
	]);

	grunt.registerTask('test', [
		'jshint',
		'express:test'
	]);
};
