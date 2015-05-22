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

    runExternalCommand(`${nodeDir}/.bin/sails`, ['lift'], {cwd: `${apiDir}`});
    runExternalCommand(`${feDir}/node_modules/.bin/ember`, ['serve'], {cwd: `${feDir}`});

  } else {
    cli.error('You must be in a Seeds application to run the serve command.');
  }


}


