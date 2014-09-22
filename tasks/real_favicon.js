/*
 * grunt-real-favicon
 * https://github.com/RealFaviconGenerator/grunt-real-favicon
 *
 * Copyright (c) 2014 Philippe Bernard
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var rfg_api = require('./lib/rfg_api.js').init(grunt);

  grunt.registerMultiTask('real_favicon', 'Generate a multiplatform favicon with RealFaviconGenerator', function() {
    var done = this.async();

    rfg_api.generate_favicon(this.data.dest, function(data, response) {
      // TODO: Process the HTML

      grunt.log.writeln("Done!");

      done();
    });
  });

};
