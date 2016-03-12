const fs = require('fs');
const join = require('path').join;

module.exports = cli => {
  cli.debug('start serve', cli.args);

  if (fs.existsSync(cli.apiDir) && fs.existsSync(cli.feDir) || fs.existsSync('.seedsrc')) {
    cli.debug('We\'re in a Seeds app.');

    cli.runExternalCommand(join(cli.nodeDir, '.bin', 'sails'), ['lift'], {cwd: cli.apiDir});

    for (var i = 0; i < cli.config.apps.ember.length; i++) {
      const app = cli.config.apps.ember[i];

      cli.debug('preparing to serve ember => ', app.name);

      const appPath = join(cli.cwd, app.name);
      const port = app.port | 4200;
      let args = ['serve', '--port', port];
      if (app.reloadport) {
        args.push('--live-reload-port', app.reloadport);
      }

      cli.runExternalCommand(join(cli.nodeDir, '.bin', 'ember'), args, {cwd: appPath});
    }
  } else {
    cli.error('You must be in a Seeds application to run the serve command.');
  }
};
