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
  var cheerio = require("cheerio");

  function add_favicon_markups(file, html_code) {
    var content = grunt.file.read(file);

    var $ = cheerio.load(content);
    // Removing exists favicon from HTML
    $('link[rel="shortcut icon"]').remove();
    $('link[rel="icon"]').remove();
    $('link[rel="apple-touch-icon"]').remove();
    $('link[rel="apple-touch-icon-precomposed"]').remove();
    $('meta').each(function(i, elem) {
      var name = $(this).attr('name');
      if (name && (name === 'msapplication-TileImage' ||
                name === 'msapplication-TileColor' ||
                name.indexOf('msapplication-square') >= 0)) {
        $(this).remove();
      }
    });

    if ($('head').length > 0) {
      $('head').append(html_code);
    }
    else {
      $.root().append(html_code);
    }

    grunt.file.write(file, $.html());
  }

  grunt.registerMultiTask('real_favicon', 'Generate a multiplatform favicon with RealFaviconGenerator', function() {
    var done = this.async();
    var html_files = this.data.html;

    // Complete favicon spec
    var favicon_spec = this.data.favicon;
    favicon_spec.api_key = '87d5cd739b05c00416c4a19cd14a8bb5632ea563';
    if (favicon_spec.master_picture.content) {
      favicon_spec.master_picture.content = rfg_api.file_to_base64(favicon_spec.master_picture.content);
    }

    rfg_api.generate_favicon(favicon_spec, this.data.dest, function(favicon) {
        html_files.forEach(function(file) {
          grunt.log.writeln("Process " + file);

          if (! grunt.file.exists(file)) {
            grunt.warn("HTML file " + file + " does not exist");
          }

          add_favicon_markups(file, favicon.favicon.html_code);
        });

        done();
    });
  });

};
