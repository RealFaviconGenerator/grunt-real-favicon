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

  exports.generate_favicon = function(dest, completed) {
    if (! grunt.file.exists(dest)) {
      grunt.file.mkdir(dest);
    }

    var client = new Client();
    var args = {
      data: {
        "favicon_generation": {
          "api_key": "87d5cd739b05c00416c4a19cd14a8bb5632ea563",
          "master_picture": {
            "type": "inline",
            "content": exports.file_to_base64('test/fixtures/sample_picture.png'),
          },
          "files_location": {
            "type": "path",
            "path": "/path/to/icons"
          }
        }
      },
      headers:{"Content-Type": "application/json"}
    };
    client.post("http://realfavicongenerator.net/api/favicon", args, function(data, response) {
      var writeStream = fstream.Writer(dest);
      var parserStream = unzip.Parse();
      var request = http.get(data.favicon_generation_result.favicon.package_url, function(response) {
        response.pipe(parserStream).pipe(writeStream);
      });
      writeStream.on('close', function() {
        completed(data, response);
      });
    });
  }

  return exports;
}
