var execFile = require('child_process').execFile,
    fs = require('fs'),
    os = require('os'),
    path = require('path'),
    resolveJsdocBin = require('resolve-jsdoc-bin');

/**
 * Parses the given file using JSDoc's parser.
 * Since JSDoc doesn't isn't require-able, we need to get the parse info from
 * the command line.
 *
 * @param  {String}   filename
 * @param  {Function} cb       ({Object}) -> null - Executed with the AST
 */
function jsdocParser(filename, cb) {
  var cmd = resolveJsdocBin.resolve(__dirname);

  if (!cmd) {
    cb(new Error('Could not find jsdoc command.'), null);
    return;
  }

  execFile(cmd, ['-X', filename], {maxBuffer: 5120 * 1024},
           jsdocParser._onComplete.bind(null, cb));
}

/**
 * Exposed for testing
 *
 * @private
 * @param  {Function} cb
 * @param  {Object}   error
 * @param  {String}   stdout
 */
jsdocParser._onComplete = function(cb, error, stdout) {
  if (error) {
    cb(error, null);
    return;
  }

  var parsed;

  try {
    parsed = JSON.parse(stdout);
  } catch (ex) {
    parsed = null;
    error = ex;
  }

  cb(error, parsed);
};

module.exports = jsdocParser;
