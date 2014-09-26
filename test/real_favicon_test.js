'use strict';

var grunt = require('grunt');
var fs = require('fs');
var cheerio = require("cheerio");

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

function assert_file_exists(file, test) {
  test.ok(grunt.file.exists(file), 'File ' + file + ' does not exist');
}

function get_file_size(file) {
  return fs.statSync(file).size;
}

function assert_file(actual, expected, test) {
  assert_file_exists(actual, test);
  assert_file_exists(expected, test);

  var ext = actual.split('.').pop();
  if (ext === 'png') {
    var as = get_file_size(actual);
    var es = get_file_size(expected);
    test.equal(as, es, actual + ' (' + as + ' bytes) and ' + expected + ' (' + es + ') should have the same size');
  }
  else {
    test.equal(grunt.file.read(actual), grunt.file.read(expected), actual + ' should be identical to ' + expected);
  }
}

exports.real_favicon = {
  setUp: function(done, test) {
    done();
  },
  scenario_1: function(test) {
    test.expect(75);

    grunt.file.expand('test/expected/scenario_1/*').forEach(function(file) {
      var filename = file.replace(/^.*[\\\/]/, '');
      assert_file('tmp/scenario_1/' + filename, file, test);
    });

    test.done();
  },
  scenario_2: function(test) {
    test.expect(75);

    grunt.file.expand('test/expected/scenario_2/*').forEach(function(file) {
      var filename = file.replace(/^.*[\\\/]/, '');
      assert_file('tmp/scenario_2/' + filename, file, test);
    });

    test.done();
  },
  scenario_3: function(test) {
    test.expect(75);

    grunt.file.expand('test/expected/scenario_3/*').forEach(function(file) {
      var filename = file.replace(/^.*[\\\/]/, '');
      assert_file('tmp/scenario_3/' + filename, file, test);
    });

    test.done();
  }
/*
  // This is not a real test scenario.
  // When running it, the favicon task itself fails,
  // thus making the Grunt execution fail, too.
  ,
  scenario_4: function(test) {
    test.ok(false, "This test is not supposed to pass");
    test.done();
  }
*/
};
