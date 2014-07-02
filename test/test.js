var parser = require('../'),
    assert = require('assert');

parser(__dirname + '/sample.js', function (err, ast) {
  assert.ok(ast);
  assert.ok(!err);
});