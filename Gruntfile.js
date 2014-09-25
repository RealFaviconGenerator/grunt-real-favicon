/*
 * grunt-real-favicon
 * https://github.com/RealFaviconGenerator/grunt-real-favicon
 *
 * Copyright (c) 2014 Philippe Bernard
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    real_favicon: {
      scenario_1: {
        favicon: {
          master_picture: {
            type: "inline",
            content: 'test/fixtures/sample_picture.png',
          },
          files_location: {
            type: "path",
            path: "/path/to/icons"
          },
          favicon_design: {
            ios: {
              picture_aspect: 'background_and_margin',
              background_color: '#654321',
              margin: 4
            },
            windows: {
              picture_aspect: 'no_change',
              background_color: '#123456'
            }
          }
        },
        dest: 'tmp/scenario_1',
        html: ['tmp/scenario_1/page1.html', 'tmp/scenario_1/page2.html']
      }
    },

    // Copy HTML files (they are modified in place)
    copy: {
      scenario_1: {
        files: [
          {expand: true, cwd: 'test/fixtures', src: ['*.html'], dest: 'tmp/scenario_1/'}
        ]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'copy', 'real_favicon', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);
};
