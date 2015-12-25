var assert = require('assert');
var findFilesByContent = require('./../index.js');

describe('findFilesByContent', function () {

  var assets_path = 'test/assets/';

  it('should exist', function () {
    assert.ok(findFilesByContent);
  });

  it('should return empty result when no params are provided', function (done) {
    findFilesByContent(null, null, function (result) {
      assert.deepEqual(result, []);
      done();
    })
  });

  it('should match single string pattern', function (done) {
    var patterns = 'aaa';
    var expectation = [
      assets_path + 'aaa.md',
      assets_path + 'aaa.txt',
      assets_path + 'mixed.txt'
    ];
    findFilesByContent(patterns, assets_path + '**/*.*', function (result) {
      assert.deepEqual(result, expectation);
      done();
    });
  });

  it('should match single regex pattern', function (done) {
    var patterns = /aaa/;
    var expectation = [
      assets_path + 'aaa.md',
      assets_path + 'aaa.txt',
      assets_path + 'mixed.txt'
    ];
    findFilesByContent(patterns, assets_path + '**/*.*', function (result) {
      assert.deepEqual(result, expectation);
      done();
    });
  });

  it('should match array of patterns', function (done) {
    var patterns = [/aaa/, 'bbb'];
    var expectation = [
      assets_path + 'aaa.md',
      assets_path + 'aaa.txt',
      assets_path + 'bbb.txt',
      assets_path + 'mixed.txt'
    ];
    findFilesByContent(patterns, assets_path + '**/*.*', function (result) {
      assert.deepEqual(result, expectation);
      done();
    });
  });

  it('should apply filename match pattern', function (done) {
    var patterns = /aaa/;
    var expectation = [
      assets_path + 'aaa.txt',
      assets_path + 'mixed.txt'
    ];
    findFilesByContent(patterns, assets_path + '**/*.txt', function (result) {
      assert.deepEqual(result, expectation);
      done();
    });
  });

});
