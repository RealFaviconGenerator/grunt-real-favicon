/*
 * grunt-real-favicon
 * https://github.com/RealFaviconGenerator/grunt-real-favicon
 *
 * Copyright (c) 2014 Philippe Bernard
 * Licensed under the MIT license.
 */

'use strict';

module.exports.init = function(grunt) {

  var exports = {};

  var Client = require('node-rest-client').Client;
  var http = require('http');
  var fs = require('fs');
  var unzip = require('unzip');
  var fstream = require('fstream');

  exports.file_to_base64 = function(file) {
    return grunt.file.read(file, {encoding: null}).toString('base64');
  }

  exports.generate_favicon = function(favicon_gneration_request, dest, callback) {
    if (! grunt.file.exists(dest)) {
      grunt.file.mkdir(dest);
    }

    var client = new Client();
    var args = {
      data: {
        "favicon_generation": favicon_gneration_request
      },
      headers:{"Content-Type": "application/json"}
    };
    client.post("http://realfavicongenerator.net/api/favicon", args, function(data, response) {
      if (response.statusCode !== 200) {
        grunt.warn(data);
        return;
      }

      var writeStream = fstream.Writer(dest);
      var parserStream = unzip.Parse();
      var request = http.get(data.favicon_generation_result.favicon.package_url, function(response) {
        response.pipe(parserStream).pipe(writeStream);
      });
      writeStream.on('close', function() {
        callback(data.favicon_generation_result);
      });
    });
  }

  return exports;
}
