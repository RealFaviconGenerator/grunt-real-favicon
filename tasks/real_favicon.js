/*
 * grunt-real-favicon
 * https://github.com/RealFaviconGenerator/grunt-real-favicon
 *
 * Copyright (c) 2014 Philippe Bernard
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var rfg = require('rfg-api').init(grunt);
  var async = require('async');

  function startsWith(str, prefix) {
    return str.lastIndexOf(prefix, 0) === 0;
  }

  function isUrl(url_or_path) {
    return startsWith(url_or_path, 'http://') ||
      startsWith(url_or_path, 'https://') ||
      startsWith(url_or_path, '//');
  }

  function normalizeMasterPicture(master_picture) {
    if ((master_picture.type === 'inline') || (master_picture.content !== undefined)) {
      master_picture.content = rfg.fileToBase64Sync(master_picture.content);
    }
    return master_picture;
  }

  function normalizeAllMasterPictures(request) {
    if (request.constructor === Array) {
      for (var i = 0; i < request.length; i++) {
        request[i] = normalizeAllMasterPictures(request[i]);
      }
    }
    else if (request.constructor === Object) {
      var keys = Object.keys(request);
      for (var j = 0; j < keys.length; j++) {
        if (keys[j] === 'master_picture') {
          request[keys[j]] = normalizeMasterPicture(request[keys[j]]);
        }
        else {
          request[keys[j]] = normalizeAllMasterPictures(request[keys[j]]);
        }
      }
      return request;
    }
    else {
      return request;
    }
  }

  var generateFavicon = function() {
    var done = this.async();
    var html_files = this.options().html || [];

    // Build favicon generation request
    var request = {};
    request.api_key = 'f26d432783a1856427f32ed8793e1d457cc120f1';
    // Master picture
    request.master_picture = {};
    if (isUrl(this.data.src)) {
      request.master_picture.type = 'url';
      request.master_picture.url = this.data.src;
    }
    else {
      request.master_picture.type = 'inline';
      request.master_picture.content = rfg.fileToBase64Sync(this.data.src);
    }
    // Path
    request.files_location = {};
    if (this.options().iconsPath === undefined) {
      request.files_location.type = 'root';
    }
    else {
      request.files_location.type = 'path';
      request.files_location.path = this.options().iconsPath;
    }
    // Design
    request.favicon_design = normalizeAllMasterPictures(
      rfg.camelCaseToUnderscoreRequest(this.options().design));

    // Settings
    request.settings = rfg.camelCaseToUnderscoreRequest(this.options().settings);

    // Versioning
    request.versioning = rfg.camelCaseToUnderscoreRequest(this.options().versioning);

    rfg.generateFavicon(request, this.data.dest, function(error, favicon) {
      if (error !== undefined) {
        grunt.log.error(error);
        grunt.log.debug("The RFG API request was: " + JSON.stringify(favicon));

        throw error;
      }

      async.each(html_files, function(file, callback) {
        grunt.log.writeln("Process " + file);

        if (! grunt.file.exists(file)) {
          grunt.file.write(file, favicon.favicon.html_code);
          callback();
        }
        else {
          rfg.injectFaviconMarkups(file, favicon.favicon.html_code, {}, function(error, code) {
            grunt.file.write(file, code);
            callback();
          });
        }
      },
      function() {
        done();
      });
    });
  };

  grunt.registerMultiTask('realFavicon', 'Generate a multiplatform favicon with RealFaviconGenerator', generateFavicon);
  grunt.registerMultiTask('real_favicon', 'Deprecated, use "realFavicon"', generateFavicon);
};
