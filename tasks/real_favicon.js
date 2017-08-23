/*
 * grunt-real-favicon
 * https://github.com/RealFaviconGenerator/grunt-real-favicon
 *
 * Copyright (c) 2014 Philippe Bernard
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var async = require('async');
  var path = require('path');
  var fs = require('fs');
  var rfg = require('rfg-api').init(grunt);

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
    var options = this.options();
    var source = this.data.src;
    var destination = this.data.dest;
    var done = this.async();
    var html_files = options.html || [];

    // Build favicon generation request
    var request = {};
    request.api_key = 'f26d432783a1856427f32ed8793e1d457cc120f1';
    // Master picture
    request.master_picture = {};
    if (isUrl(source)) {
      request.master_picture.type = 'url';
      request.master_picture.url = source;
    }
    else {
      request.master_picture.type = 'inline';
      request.master_picture.content = rfg.fileToBase64Sync(source);
    }

    // Path
    request.files_location = {};
    if (options.iconsPath === undefined) {
      request.files_location.type = 'root';
    }
    else {
      // Allow iconsPath to be a callback function to dynamically generate path.
      if (typeof options.iconsPath === 'function') {
        options.iconsPathCallback = options.iconsPath;
      }

      // Ensure iconsPath is always set to a special path when iconsPathCallback is present.
      if (typeof options.iconsPathCallback === 'function') {
        options.iconsPath = '{{RFG-PATH-CALLBACK}}';

        // Create a regular expression to use for iconsPathCallback.
        options.iconsPathRegExp = new RegExp(options.iconsPath + '([^"]+)', 'gm');
      }

      request.files_location.type = 'path';
      request.files_location.path = options.iconsPath;
    }

    // Design
    request.favicon_design = normalizeAllMasterPictures(
      rfg.camelCaseToUnderscoreRequest(options.design));

    // Settings
    request.settings = rfg.camelCaseToUnderscoreRequest(options.settings);

    // Versioning
    request.versioning = rfg.camelCaseToUnderscoreRequest(options.versioning);

    grunt.log.write('Generating "' + source + '" favicon...');
    rfg.generateFavicon(request, destination, function(error, favicon) {
      // Indicate error.
      if (error !== undefined) {
        grunt.log.warn();
        grunt.log.error(error);
        grunt.log.debug("The RFG API request was: " + JSON.stringify(favicon));
        throw error;
      }

      // Indicate success.
      grunt.log.ok();

      // Handle dynamic iconsPathCallback for static "json" and "xml" files.
      if (options.iconsPathCallback && options.iconsPathRegExp) {
        var metaFiles = grunt.file.expand({cwd: destination, filter: 'isFile', matchBase: true, nonull: true}, ['*.json', '*.xml']);
        for (var i = 0, l = metaFiles.length; i < l; i++) {
          var file = path.join(destination, metaFiles[i]);
          grunt.verbose.writeln('Post processing "' + metaFiles[i] + '"...');
          var content = grunt.file.read(file);
          grunt.file.write(file, content.replace(options.iconsPathRegExp, function (match, href) {
            return options.iconsPathCallback.call(this, href, file);
          }));
        }
      }

      async.each(grunt.file.expand({nonull: true}, html_files), function(file, callback) {
        // Create a blank file if it does not exist.
        if (!grunt.file.exists(file)) {
          grunt.log.debug('The file "' + file + '" does not exist, creating the file so markup can be injected.');
          grunt.file.write(file, '');
        }

        grunt.log.writeln('Injecting markup into file: ' + file);
        rfg.injectFaviconMarkups(fs.readFileSync(file, 'utf8'), favicon.favicon.html_code, {}, function(error, code) {
          // Handle dynamic iconPathsCallback.
          if (options.iconsPathCallback && options.iconsPathRegExp) {
            code = code.replace(options.iconsPathRegExp, function (match, href) {
              return options.iconsPathCallback.call(this, href, file);
            });
          }
          grunt.file.write(file, code);
          callback();
        });
      },
      function() {
        done();
      });
    });
  };

  grunt.registerMultiTask('realFavicon', 'Generate a multiplatform favicon with RealFaviconGenerator', generateFavicon);
  grunt.registerMultiTask('real_favicon', 'Deprecated, use "realFavicon"', generateFavicon);
};
