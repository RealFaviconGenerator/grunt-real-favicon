/*
 * grunt-real-favicon
 * https://github.com/RealFaviconGenerator/grunt-real-favicon
 *
 * Copyright (c) 2014 Philippe Bernard
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var api = require('rfg-api').init(grunt);

  function starts_with(str, prefix) {
    return str.lastIndexOf(prefix, 0) === 0;
  }

  function is_url(url_or_path) {
    return starts_with(url_or_path, 'http://') ||
      starts_with(url_or_path, 'https://') ||
      starts_with(url_or_path, '//');
  }

  grunt.registerMultiTask('real_favicon', 'Generate a multiplatform favicon with RealFaviconGenerator', function() {
    var done = this.async();
    var html_files = this.data.html;

    // Build favicon generation request
    var request = {};
    request.api_key = 'f26d432783a1856427f32ed8793e1d457cc120f1';
    // Master picture
    request.master_picture = {};
    if (is_url(this.data.src)) {
      request.master_picture.type = 'url';
      request.master_picture.url = this.data.src;
    }
    else {
      request.master_picture.type = 'inline';
      request.master_picture.content = api.file_to_base64(this.data.src);
    }
    // Path
    request.files_location = {};
    if (this.data.icons_path === undefined) {
      request.files_location.type = 'root';
    }
    else {
      request.files_location.type = 'path';
      request.files_location.path = this.data.icons_path;
    }
    // Design
    request.favicon_design = this.data.design;
    if (request.favicon_design !== undefined) {
      if ((request.favicon_design.ios !== undefined) && (request.favicon_design.ios.picture_aspect === 'dedicated_picture')) {
        request.favicon_design.ios.dedicated_picture = api.file_to_base64(request.favicon_design.ios.dedicated_picture);
      }
      if ((request.favicon_design.windows !== undefined) && (request.favicon_design.windows.picture_aspect === 'dedicated_picture')) {
        request.favicon_design.windows.dedicated_picture = api.file_to_base64(request.favicon_design.windows.dedicated_picture);
      }
    }
    // Settings
    request.settings = this.data.settings;

    api.generate_favicon(request, this.data.dest, function(favicon) {
        html_files.forEach(function(file) {
          grunt.log.writeln("Process " + file);

          if (! grunt.file.exists(file)) {
            grunt.warn("HTML file " + file + " does not exist");
          }

          api.generate_favicon_markups(file, favicon.favicon.html_code, function(code) {
            grunt.file.write(file, code);
          });
        });

        done();
    });
  });

};
