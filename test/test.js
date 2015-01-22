var parser = require('../'),
    assert = require('assert');

describe('jsdoc3-parser', function() {
  it('returns the JSDoc AST for a given JS file', function(done) {
    parser(__dirname + '/sample.js', function(err, ast) {
      assert.ok(ast);
      assert.ok(!err);
      done();
    });
  });

  it('propagates errors from the cli', function(done) {
    parser(__dirname + '/error.js', function(err, ast) {
      assert.ok(err);
      assert.ok(!ast);
      done();
    });
  });

  it('returns an error on non-ast jsdoc output', function() {
    parser._onComplete(function(error, stdout) {
      assert.ok(error);
      assert.ok(!stdout);
    }, null, 'omg error');
  });
});
