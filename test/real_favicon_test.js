'use strict';

var grunt = require('grunt');
var fs = require('fs');

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

function assertFileExists(file, test) {
  test.ok(grunt.file.exists(file), 'File ' + file + ' does not exist');
}

function getFileSize(file) {
  return fs.statSync(file).size;
}

function assertPicture(actual, expected, test) {
  assertFileExists(actual, test);
  assertFileExists(expected, test);
  test.equal(getFileSize(actual), getFileSize(expected));
}


exports.real_favicon = {
  setUp: function(done, test) {
    done();
  },
  screnario_1: function(test) {
    test.expect(3);

    assertPicture("tmp/scenario_1/pics/favicon.ico", 'test/expected/favicon.ico', test);

    test.done();
  }
};
