var fs = require('fs');

module.exports = function(cli) {
  cli.debug('start serve', cli.args);

  if (fs.existsSync(cli.apiDir) && fs.existsSync(cli.feDir)) {
    cli.debug("We're in a Seeds app.");

    cli.runExternalCommand(`${cli.nodeDir}/.bin/sails`, ['lift'], {cwd: `${cli.apiDir}`})
    cli.ui('API Server started on port 1776');
    cli.runExternalCommand(`${cli.feDir}/node_modules/.bin/ember`, ['serve'], {cwd: `${cli.feDir}`})
    cli.ui('Frontend Server started on port 4200');

  } else {
    cli.error('You must be in a Seeds application to run the serve command.');
  }


}


