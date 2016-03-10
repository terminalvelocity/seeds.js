'use strict';

var fs = require('fs');
var join = require('path').join;

module.exports = function (cli) {
  cli.debug('start serve', cli.args);

  if (fs.existsSync(cli.apiDir) && fs.existsSync(cli.feDir) || fs.existsSync('.seedsrc')) {
    cli.debug('We\'re in a Seeds app.');

    cli.runExternalCommand(join(cli.nodeDir, '.bin', 'sails'), ['lift'], { cwd: cli.apiDir });

    var emberApps = cli.config.apps.ember;
    emberApps.forEach(function (app) {
      cli.runExternalCommand(join(cli.nodeDir, '.bin', 'ember'), ['serve', '--port', app.port, '--live-reload-port', app.liveReloadPort], { cwd: app.name });
    });
  } else {
    cli.error('You must be in a Seeds application to run the serve command.');
  }
};