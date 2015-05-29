var fs = require('fs');

module.exports = function(cli) {
  cli.debug('start serve', cli.args);

  if (fs.existsSync(cli.apiDir) && fs.existsSync(cli.feDir)) {
    cli.debug("We're in a Seeds app.");

    cli.runExternalCommand(`${cli.nodeDir}/.bin/sails`, ['lift'], {cwd: `${cli.apiDir}`})
    cli.runExternalCommand(`${cli.nodeDir}/.bin/ember`, ['serve'], {cwd: `${cli.feDir}`})

  } else {
    cli.error('You must be in a Seeds application to run the serve command.');
  }


}


