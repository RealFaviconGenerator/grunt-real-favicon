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
    realFavicon: {
      options: {
        // For scenario 1
        iconsPath: '/path/to/icons',
        // For scenario 3
        html: ['tmp/scenario_3/page1.html', 'tmp/scenario_3/page2.html'],
        // For scenario 2
        design: {
          ios: {
            pictureAspect: 'backgroundAndMargin',
            backgroundColor: '#ff55cc',
            margin: 4
          },
          windows: {
            masterPicture: {
              type: 'inline',
              content: 'test/fixtures/sample_picture_2.png'
            },
            pictureAspect: 'no_change'
          },
          androidChrome: {
            pictureAspect: 'shadow',
            manifest: {
              name: 'Sample application',
              display: 'browser'
            },
            themeColor: '#798546'
          }
        }
      },
      scenario_1: {
        src: 'test/fixtures/sample_picture_2.png',
        dest: 'tmp/scenario_1',
        options: {
          html: ['tmp/scenario_1/page1.html', 'tmp/scenario_1/page2.html', 'tmp/scenario_1/standalone.txt'],
          design: {
            desktopBrowser: {},
            ios: {
              pictureAspect: 'backgroundAndMargin',
              backgroundColor: '#654321',
              margin: 4
            },
            windows: {
              pictureAspect: 'whiteSilhouette',
              backgroundColor: '#123456'
            },
            coast: {
              pictureAspect: 'backgroundAndMargin',
              backgroundColor: '#469752',
              margin: '12%'
            },
            openGraph: {
              pictureAspect: 'backgroundAndMargin',
              backgroundColor: '#ab91ef',
              margin: '8%',
              ratio: '1.91:1',
              siteUrl: "http://example.com/"
            },
            yandexBrowser: {
              backgroundColor: "#ab56cd",
              manifest: {
                version: "1.0",
                showTitle: true
              }
            }
          },
          settings: {
            compression: 5
          }
        }
      },
      scenario_2: {
        src: 'http://realfavicongenerator.net/demo_favicon.png',
        dest: 'tmp/scenario_2',
        options: {
          iconsPath: undefined,
          html: ['tmp/scenario_2/page1.html', 'tmp/scenario_2/page2.html'],
          settings: {
            scalingAlgorithm: 'NearestNeighbor'
          }
        }
      },
      scenario_3: {
        src: 'test/fixtures/sample_picture.png',
        dest: 'tmp/scenario_3',
        options: {
          iconsPath: '/yet/another/path',
          design: {
            ios: {
              masterPicture: {
                content: 'test/fixtures/sample_picture_2.png'
              },
              pictureAspect: 'no_change'
            },
            windows: {
              pictureAspect: 'no_change',
              backgroundColor: '#aabbcc'
            },
            firefoxApp: {
              pictureAspect: 'circle',
              margin: 0,
              circleInnerMargin: 1,
              keepPictureInCircle: true,
              overlay: true,
              developerName: "Philippe",
              developerUrl: "http://philippebernard.fr",
              appName: "Sample app",
              appDescription:" Oh my sample app"
            }
          },
          settings: {
            compression: 3,
            scalingAlgorithm: 'Cubic'
          },
          versioning: {
            paramName: 'theVersion',
            paramValue: '123456'
          }
        }
      },
/*
      scenario_4: {
        src: 'http://realfavicongenerator.net/no_such_picture.png',
        dest: 'tmp/scenario_2',
        options: {
          iconsPath: undefined,
          html: ['tmp/scenario_2/page1.html', 'tmp/scenario_2/page2.html'],
          design: {
            ios: {
              pictureAspect: 'this_option_does_not_make_sense',
            }
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
  grunt.registerTask('test', ['clean', 'copy', 'realFavicon', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);
};
