var chalk    = require('chalk');

module.exports = function(cli) {
  var appName = cli.args[1];
  var nodeBin = `${cli.includedBasepath}/node_modules/.bin`;

  var feName  = "frontend";
  var feDir = `${cli.cwd()}/${appName}/${feName}`;

  var apiName  = "api";
  var apiDir = `${cli.cwd()}/${appName}/${apiName}`;

  function runExternalCommand(command, args, options) {
    cli.debug('runExternalCommand');

    options = options || { }
    if (!options.cwd) {
      options.cwd = `${cli.cwd()}/${appName}`;
    }

    return cli.spawn(command, args, options)
      .then(function() {
        cli.debug(`${command} done`, options);
      })
      .fail(function (err) {
        cli.debug(`fail ${command}`, err);
      });
  }

  function createAppFolder() {
    if (appName === undefined) {
      cli.error('You must supply a name for your Seeds.js Application.');
      cli.exit(1);
    }
    cli.debug('createAppFolder');

    return cli.mkdir(appName);
  }

  function bootstrapApp() {
    cli.debug('bootstrapApp');

    return cli.cp(`${cli.includedBasepath}/node_modules`, `${cli.cwd()}/${appName}/node_modules`, {clobber: true}, function(err) {
      if (err) { return cli.debug(err); }

      runExternalCommand('npm', ['init', '-f']).then(function() {
        cli.chdir(appName, generateAppFiles);
      })
    });
  }

  function generateAppFiles() {
    cli.debug('generateAppFiles');

    return cli.exec('npm install').then(function() {
      runExternalCommand(`${cli.cwd()}/${appName}/node_modules/.bin/sails`, ['new', 'api', '--no-frontend']).then(setupSails);
      runExternalCommand(`${cli.cwd()}/${appName}/node_modules/.bin/ember`, ['new', 'frontend', '--skip-git']).then(setupEmber);
    });
  }

  function setupSails() {
    cli.debug('setupSails');

    prepareSails().then(function() {
      cli.copyTemplates(`${cli.includedBasepath}/lib/templates/api`, `${apiDir}`, {clobber: true}, function(err) {
        if (err) { return cli.debug(err); }
        cli.debug('Sails templates copied without error.');
      });
    }).done(function(){
      cli.banner(`${cli.includedBasepath}/lib/helpers/banner`);
    });
  }

  function prepareSails() {
    cli.debug('prepareSails');
    var sailsPackages = ['i','sails-generate-ember-blueprints', 'lodash', 'pluralize',
    'sails-hook-autoreload@~0.11.4', 'balderdashy/sails-hook-dev', 'sails-disk', 'sails-hook-apianalytics', '--save'];

    runExternalCommand('npm', sailsPackages, { cwd: `${apiDir}` }).then(function() {
      runExternalCommand(`${cli.cwd()}/${appName}/node_modules/.bin/sails`, ["generate", "ember-blueprints"], { cwd: `${apiDir}` });
    })
  }

  function setupEmber() {
    cli.debug('setupEmber');
    var emberPackages = ['install','semantic-ui-ember'];

    runExternalCommand(`${feDir}/node_modules/.bin/ember`, emberPackages, { cwd: `${feDir}` })

    emberPackages = ['install', 'ember-cli-seeds-scaffold'];

    return runExternalCommand(`${feDir}/node_modules/.bin/ember`, emberPackages, { cwd: `${feDir}` }).then(function() {
      cli.copyTemplates(`${cli.includedBasepath}/lib/templates/frontend`, `${feDir}`, {clobber: true}, function(err) {
        if (err) { return cli.debug(err); }
        cli.debug('Ember templates copied without error.');
      });
    })
  }

  cli.ui(chalk.green('Generating a new Seed named'), chalk.white(appName) + chalk.green('...'));

  createAppFolder().then(bootstrapApp);
}
