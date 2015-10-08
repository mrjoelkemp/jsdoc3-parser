var execFile = require('child_process').execFile,
    fs = require('fs'),
    os = require('os'),
    path = require('path');

/**
 * Locates the JSDoc executable command. Since a module is not provided,
 * `require.resolve('jsdoc')` does not work and must be done manually.
 *
 * @param {String}  dir - The starting directory to search.
 * @return {String} The executable path, or null if not found.
 */
function locateJSDocCommand(dir) {
  var executable = os.platform() === 'win32' ? 'jsdoc.cmd' : 'jsdoc',
      cmd;

  dir = path.resolve(dir);

  while (dir) {
    try {
      cmd = path.join(dir, 'node_modules', '.bin', executable);
      // End the search if the command is found.
      // If not found, an exception is thrown.
      fs.statSync(cmd);
      break;

    } catch (ex) {
      cmd = null;

      // Otherwise, iterate to the parent directory, if possible.
      if (path.dirname(dir) === dir) {
        break;
      }

      dir = path.resolve(path.dirname(dir));
    }
  }

  return cmd;
}

/**
 * Parses the given file using JSDoc's parser.
 * Since JSDoc doesn't isn't require-able, we need to get the parse info from
 * the command line.
 *
 * @param  {String}   filename
 * @param  {Function} cb       ({Object}) -> null - Executed with the AST
 */
function jsdocParser(filename, cb) {
  var cmd = locateJSDocCommand(__dirname);

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
