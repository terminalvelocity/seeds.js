const fs = require('fs');
const join = require('path').join;

module.exports = cli => {
  cli.debug('start serve', cli.args);

  if (fs.existsSync(cli.apiDir) && fs.existsSync(cli.feDir) || fs.existsSync('.seedsrc')) {
    cli.debug('We\'re in a Seeds app.');

    cli.runExternalCommand(join(cli.nodeDir, '.bin', 'sails'), ['lift'], {cwd: cli.apiDir});
    cli.runExternalCommand(join(cli.nodeDir, '.bin', 'ember'), ['serve'], {cwd: cli.feDir});
  } else {
    cli.error('You must be in a Seeds application to run the serve command.');
  }
};


