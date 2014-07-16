var execFile = require('child_process').execFile,
    path = require('path'),
    win32 = require('os').platform() === 'win32'

/**
 * Parses the given file using JSDoc's parser.
 * Since JSDoc doesn't isn't require-able, we need to get the parse info from the command line.
 *
 * @param  {String}   filename
 * @param  {Function} cb       ({Object}) -> null - Executed with the AST
 */
module.exports = function (filename, cb) {
  // We can't require.resolve('jsdoc')
  // since jsdoc exposes jsdoc & jsdoc.cmd to .bin folder we can use them on any platform
  var cmd = path.join(__dirname, 'node_modules', '.bin', win32 ? 'jsdoc.cmd' : 'jsdoc');

  execFile(cmd, ['-X', filename], { maxBuffer: 5120 * 1024 }, function (error, stdout) {
    cb(error, JSON.parse(stdout));
  });
};
