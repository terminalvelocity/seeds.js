/*eslint no-undefined:0 */
'use strict';

var fs = require('fs');
var bower = require('bower');

module.exports = function (cli) {
  cli.debug('start init', cli.args);

  if (fs.existsSync(cli.apiDir) && fs.existsSync(cli.feDir) || fs.existsSync('.seedsrc')) {
    cli.debug('We\'re in a Seeds app.');

    cli.runExternalCommand('npm', ['i'], { cwd: cli.cwd });
    cli.runExternalCommand('npm', ['i'], { cwd: cli.apiDir });
    cli.runExternalCommand('npm', ['i'], { cwd: cli.feDir });
    bower.commands.install(undefined, undefined, { cwd: cli.feDir });
  } else {
    cli.error('You must be in a Seeds application to run the init command.');
  }
};