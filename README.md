# findFilesByContent

Find files that contain specific content.

## Installation

Use NPM:

```
$ npm install find-files-by-content
```

## How to use

```javascript
findFilesByContent(content_pattern, path_pattern, callback);
```

### content_pattern

Either string, regexp, or array containing combination of strings and/or regexps. Files containing them will be matched. If an array is used, it will match files containing ANY of the strings and/or regexps in it.

### path_pattern

String containing match pattern for file paths. It uses [minimatch syntax](https://github.com/isaacs/minimatch).

### callback

Function that will be called when check is done. Array of file paths will be passed as first argument.

## Example

I created this module because I needed a simple way to check my code for common problems before publishing. Here's how I use it: 

```javascript
var findFilesByContent = require('find-files-by-content');

// check if your production files contain forgotten debug messages
findFilesByContent('console.log', 'production/**/*.js', function (files) {
  console.log('Files containing debug messages:', files);
});

// check if all your tests are enabled
findFilesByContent(/^\s*(f|x)(it|describe)\(/, 'test/**/*.js', function (files) {
  console.log('Files containing disabled tests:', files);
});
```

## Bug reports, feature requests and contact

If you found any bugs, if you have feature requests or any questions, please, either [file an issue at GitHub](https://github.com/fczbkk/find-files-by-content/issues) or send me an e-mail at [riki@fczbkk.com](mailto:riki@fczbkk.com).

## License

findFilesByContent is published under the [MIT license](https://github.com/fczbkk/find-files-by-content/blob/master/LICENSE).
