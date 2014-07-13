# JSDoc3 Parser [![npm](http://img.shields.io/npm/v/jsdoc3-parser.svg)](https://npmjs.org/package/jsdoc3-parser) [![npm](http://img.shields.io/npm/dm/jsdoc3-parser.svg)](https://npmjs.org/package/jsdoc3-parser)

JSDoc is not currently available as a library, so there's no clean way to access
its parser. You can't `require('jsdoc')`, so you have to hack around it by using
the jsdoc binary's `-X` option and parsing the output.

This is a wrapper around that process.

### Usage

```javascript
var parser = require('jsdoc3-parser');

parser('myfile.js', function(error, ast) {

});
```

### License

MIT