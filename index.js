var fs = require('fs');
var glob = require('glob');
var async = require('async');


function isArray (obj) {
  if (Array.isArray) {
    return Array.isArray(obj);
  } else {
    return Object.prototype.toString.call(obj) === '[object Array]';
  }
}


function mergePatterns (patterns) {

  // convert single object to array
  if (!isArray(patterns)) {
    patterns = [patterns];
  }

  // join all patterns (strings and regexps) to a single regexp
  var sanitized_patterns = patterns.map(function (pattern) {
    return '(' + (pattern.source || pattern) + ')';
  });
  var single_pattern = sanitized_patterns.join('|');

  return new RegExp(single_pattern);

}


function findFilesByContent (content_patterns, files_pattern, callback) {

  // if no patterns are provided, don't bother, just return empty result
  if (!content_patterns || !files_pattern) {
    callback([]);
  } else {

    glob(files_pattern, {}, function (error, files) {
      if (error) {throw error;}

      var match_pattern = mergePatterns(content_patterns);

      var match_iterator = function (file_path, callback) {
        fs.readFile(file_path, 'utf8', function (error, file_content) {
          if (error) {callback(false);}
          callback(match_pattern.test(file_content));
        });
      }

      async.filter(files, match_iterator, callback);

    });

  }

}

module.exports = findFilesByContent;
