var exec = require('child_process').exec;

/**
 * Parses the given file using JSDoc's parser.
 * Since JSDoc doesn't isn't require-able, we need to get the parse info from the command line.
 *
 * @param  {String}   filename
 * @param  {Function} cb       ({Object}) -> null - Executed with the AST
 */
module.exports = function (filename, cb) {
  // We can't require.resolve('jsdoc')
  var cmd = __dirname + '/node_modules/jsdoc/jsdoc.js -X ' + filename;

  exec(cmd, { maxBuffer: 5120 * 1024 }, function (error, stdout) {
    cb(error, JSON.parse(stdout));
  });
};
