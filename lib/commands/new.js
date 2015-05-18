var chalk    = require('chalk');

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

      runExternalCommand('npm', ['init', '-f']).then(function() {
        cli.chdir(appName, generateAppFiles);
      })
    });
  }

  function generateAppFiles() {
    return cli.exec('npm install').then(function() {
      runExternalCommand(`./node_modules/.bin/sails`, ['new', 'api']);
      runExternalCommand(`./node_modules/.bin/ember`, ['new', 'frontend', '--skip-git']).then(setupSails);
    });
  }

  function runExternalCommand(command, args, options) {
    options = options || { cwd: `${cli.cwd()}/${appName}` }

    return cli.spawn(command, args, options)
      .then(function() {
        cli.debug(`${command} done`, options);
      })
      .fail(function (err) {
        cli.debug(`fail ${command}`, err);
      });
  }

  function setupSails() {
    cleanUpSails().then(function() {
      cli.debug('Clean up sails finished.');
    }).then(function() {
      cli.debug('prepareSails started.');
      prepareSails();
    }).then(function() {
      cli.copyTemplates(`${cli.basepath()}/lib/templates`, `${cli.cwd()}/${appName}`, {clobber: true}, function(err) {
        if (err) { return cli.debug(err); }
        cli.debug('Templates copied without error.');
      });
    });
  }

  function cleanUpSails(){
    cli.rm(`${appName}/api/views`);
    cli.rm(`${appName}/api/tasks`);
    cli.rm(`${appName}/api/Gruntfile.js`);

    var sailsPackages = ['rm', 'grunt', 'ejs', 'grunt-contrib-clean', 'grunt-contrib-concat',
    'grunt-contrib-copy', 'grunt-contrib-cssmin', 'grunt-contrib-jst', 'grunt-contrib-less',
    'grunt-contrib-uglify', 'grunt-contrib-watch', 'grunt-sails-linker', 'grunt-sync', 'grunt-contrib-coffee',
    '--save'];

    return runExternalCommand('npm', sailsPackages, { cwd: `${cli.cwd()}/${appName}/api` });
  }

  function prepareSails() {
    var sailsPackages = ['i','sails-generate-ember-blueprints', 'lodash', 'pluralize',
    'sails-hook-autoreload@~0.11.4', 'balderdashy/sails-hook-dev', 'sails-disk', '--save'];

    runExternalCommand('npm', sailsPackages, { cwd: `${cli.cwd()}/${appName}/api` }).then(function() {
    runExternalCommand('npm', ['install'], { cwd: `${cli.cwd()}/${appName}/api` }).then(function() {
    runExternalCommand(`${cli.dir()}/../node_modules/.bin/sails`, ["generate", "ember-blueprints"], { cwd: `${cli.cwd()}/${appName}/api` });
      })
    })
  }

  cli.ui(chalk.green('Generating a new Seed named'), chalk.white(appName) + chalk.green('...'));

  createAppFolder().then(bootstrapApp);
}
