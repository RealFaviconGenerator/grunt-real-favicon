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
        src: 'test/fixtures/sample_picture_2.png',
        dest: 'tmp/scenario_1',
        icons_path: '/path/to/icons',
        html: ['tmp/scenario_1/page1.html', 'tmp/scenario_1/page2.html'],
        design: {
            ios: {
              picture_aspect: 'background_and_margin',
              background_color: '#654321',
              margin: 4
            },
            windows: {
              picture_aspect: 'white_silhouette',
              background_color: '#123456'
            },
            coast: {
              picture_aspect: 'background_and_margin',
              background_color: '#469752',
              margin: '12%'
            },
            open_graph: {
              picture_aspect: 'background_and_margin',
              background_color: '#ab91ef',
              margin: '8%',
              ratio: '1.91:1',
              site_url: "http://example.com/"
            },
            yandex_browser: {
              background_color: "#ab56cd",
              manifest: {
                version: "1.0",
                show_title: true
              }
            }
        },
        settings: {
          compression: 5
        }
      },
      scenario_2: {
        src: 'http://realfavicongenerator.net/demo_favicon.png',
        dest: 'tmp/scenario_2',
        icons_path: undefined,
        html: ['tmp/scenario_2/page1.html', 'tmp/scenario_2/page2.html'],
        design: {
          ios: {
            picture_aspect: 'background_and_margin',
            background_color: '#ff55cc',
            margin: 4
          },
          windows: {
            master_picture: {
              type: 'inline',
              content: 'test/fixtures/sample_picture_2.png'
            },
            picture_aspect: 'no_change'
          },
          android_chrome: {
            picture_aspect: 'shadow',
            manifest: {
              name: 'Sample application',
              display: 'browser'
            },
            theme_color: '#798546'
          }
        },
        settings: {
          scaling_algorithm: 'NearestNeighbor'
        }
      },
      scenario_3: {
        src: 'test/fixtures/sample_picture.png',
        dest: 'tmp/scenario_3',
        icons_path: '/yet/another/path',
        html: ['tmp/scenario_3/page1.html', 'tmp/scenario_3/page2.html'],
        design: {
          ios: {
            master_picture: {
              content: 'test/fixtures/sample_picture_2.png'
            },
            picture_aspect: 'no_change'
          },
          windows: {
            picture_aspect: 'no_change',
            background_color: '#aabbcc'
          },
          firefox_app: {
            picture_aspect: 'circle',
            margin: 0,
            circle_inner_margin: 1,
            keep_picture_in_circle: true,
            overlay: true,
            developer_name: "Philippe",
            developer_url: "http://philippebernard.fr",
            app_name: "Sample app",
            app_description:" Oh my sample app"
          }
        },
        settings: {
          compression: 3,
          scaling_algorithm: 'Cubic'
        }
      },
/*
      scenario_4: {
        src: 'http://realfavicongenerator.net/no_such_picture.png',
        dest: 'tmp/scenario_2',
        icons_path: undefined,
        html: ['tmp/scenario_2/page1.html', 'tmp/scenario_2/page2.html'],
        design: {
          ios: {
            picture_aspect: 'this_option_does_not_make_sense',
          }
        }
      }
*/
    },

    // Copy HTML files (they are modified in place)
    copy: {
      scenario_1: {
        files: [
          {expand: true, cwd: 'test/fixtures', src: ['*.html'], dest: 'tmp/scenario_1/'}
        ]
      },
      scenario_2: {
        files: [
        {expand: true, cwd: 'test/fixtures', src: ['*.html'], dest: 'tmp/scenario_2/'}
        ]
      },
      scenario_3: {
        files: [
        {expand: true, cwd: 'test/fixtures', src: ['*.html'], dest: 'tmp/scenario_3/'}
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
