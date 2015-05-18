var chalk    = require('chalk');
var Sails    = require('sails/lib/app');
var newApp   = new Sails();

module.exports = function(cli) {
  var appName = cli.args[1];
  var nodeBin = `${cli.cwd()}/node_modules/.bin`;

  var feName  = "frontend";
  var feDir = `${appName}/${feName}`;

  var apiName  = "api";
  var apiDir = `${appName}/${apiName}`;

  function createAppFolder() {
    if (appName === undefined) {
      cli.error('You must supply a name for your Seeds.js Application.');
      cli.exit(1);
    }

    return cli.mkdir(appName);
  }

  function bootstrapApp() {
    return cli.cp(`$(cli.dir())/../node_modules`, `${appName}/node_modules`, {clobber: true}, function(err) {
      if (err) { return cli.debug(err); }

      runExternalCommand('npm', ['init', '-f']).then(function(result) {
        cli.chdir(appName, generateAppFiles);
      })
    });
  }

  function generateAppFiles() {
    return cli.exec('npm install').then(function(result) {
      runExternalCommand(`./node_modules/.bin/sails`, ['new', 'api']);
      runExternalCommand(`./node_modules/.bin/ember`, ['new', 'frontend']);
    }).then(copyTemplateFiles);
  }

  function runExternalCommand(command, args, options) {
    options = options || { cwd: `${cli.cwd()}/${appName}` }

    return cli.spawn(command, args, options)
      .then(function(result) {
        cli.debug(`${command} done`, options);
      })
      .fail(function (err) {
        cli.debug(`fail ${command}`, err);
      });
  }

  function copyTemplateFiles() {
    console.log('templateFiles');
  }

  cli.ui(chalk.green('Generating a new Seed named'), chalk.white(appName) + chalk.green('...'));

  createAppFolder().then(bootstrapApp);
}
