var fs = require('fs');

module.exports = function(cli) {
  cli.debug('start serve', cli.args);

  var nodeDir = `${cli.cwd()}/node_modules`;

  var feName  = "frontend";
  var feDir = `${cli.cwd()}/${feName}`;

  var apiName  = "api";
  var apiDir = `${cli.cwd()}/${apiName}`;

  function runExternalCommand(command, args, options) {
    cli.debug('runExternalCommand');

    options = options || { cwd: `${cli.cwd()}` }

    return cli.spawn(command, args, options)
      .then(function() {
        cli.debug(`${command} done`, options);
      })
      .fail(function (err) {
        cli.debug(`fail ${command}`, err);
      });
  }

  if (fs.existsSync(apiDir) && fs.existsSync(feDir)) {
    cli.debug("We're in a Seeds app.");

    runExternalCommand(`${nodeDir}/.bin/sails`, ['lift'], {cwd: `${apiDir}`}).then(function() {
      cli.ui('API Server started on port 1776');
    });
    runExternalCommand(`${feDir}/node_modules/.bin/ember`, ['serve'], {cwd: `${feDir}`}).then(function() {
      cli.ui('Frontend Server started on port 4200');
    });

  } else {
    cli.error('You must be in a Seeds application to run the serve command.');
  }


}


