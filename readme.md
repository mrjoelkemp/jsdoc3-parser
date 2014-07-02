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