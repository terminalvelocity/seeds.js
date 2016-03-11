'use strict';

var fs = require('fs');
var join = require('path').join;

module.exports = function (cli) {
  cli.debug('start serve', cli.args);

  if (fs.existsSync(cli.apiDir) && fs.existsSync(cli.feDir) || fs.existsSync('.seedsrc')) {
    cli.debug('We\'re in a Seeds app.');

    cli.runExternalCommand(join(cli.nodeDir, '.bin', 'sails'), ['lift'], { cwd: cli.apiDir });

    for (var i = 0; i < cli.config.apps.ember.length; i++) {
      var app = cli.config.apps.ember[i];

      cli.debug('starting to serve ember => ', app.name);

      var appPath = join(cli.cwd, app.name);
      var port = app.port | 4200;

      cli.runExternalCommand(join(cli.nodeDir, '.bin', 'ember'), ['serve', '--port', port, '--live-reload-port', app.reload], { cwd: appPath });
    }
  } else {
    cli.error('You must be in a Seeds application to run the serve command.');
  }
};