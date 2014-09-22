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

    rfg_api.generate_favicon({
        api_key: "87d5cd739b05c00416c4a19cd14a8bb5632ea563",
        master_picture: {
          type: "inline",
          content: rfg_api.file_to_base64('test/fixtures/sample_picture.png'),
        },
        files_location: {
          type: "path",
          path: "/path/to/icons"
        }
      }, this.data.dest, function(favicon) {

      // TODO: Process the HTML

      grunt.log.writeln("Done!");

      done();
    });
  });

};
