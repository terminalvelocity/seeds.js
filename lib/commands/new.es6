var chalk    = require('chalk');
var join     = require('path').join;

module.exports = function(cli) {
  var appName = cli.args[1];
  var apiDir = join(cli.cwd, appName, cli.apiName);
  var feDir = join(cli.cwd, appName, cli.feName);

  var runExternalCommand = function(command, args, options) {
    cli.debug('runExternalCommand');

    options = options || { };
    if (!options.cwd) {
      options.cwd = join(cli.cwd, appName);
    }

    return cli.spawn(command, args, options)
      .then(function() {
        cli.debug(`${command} done`, options);
      })
      .fail(function (err) {
        cli.debug(`fail ${command}`, err);
      });
  };

  var cleanUpSails = function(){
    cli.debug('cleanUpSails');

    cli.rm(join(apiDir, 'views'));
    cli.rm(join(apiDir, 'tasks'));
    cli.rm(join(apiDir, 'Gruntfile.js'));

    var sailsPackages = ['rm', 'grunt', 'ejs', 'grunt-contrib-clean', 'grunt-contrib-concat',
    'grunt-contrib-copy', 'grunt-contrib-cssmin', 'grunt-contrib-jst', 'grunt-contrib-less',
    'grunt-contrib-uglify', 'grunt-contrib-watch', 'grunt-sails-linker', 'grunt-sync', 'grunt-contrib-coffee',
    '--save'];

    return runExternalCommand('npm', sailsPackages, {
      cwd: apiDir
    });
  };

  var prepareSails = function() {
    cli.debug('prepareSails');
    var sailsPackages = ['i', 'sails-generate-ember-blueprints', 'lodash', 'pluralize',
    'sails-hook-autoreload@~0.11.4', 'balderdashy/sails-hook-dev', 'sails-disk', 'sails-hook-apianalytics', '--save'];

    runExternalCommand('npm', sailsPackages, {
      cwd: apiDir
    }).then(function() {
      runExternalCommand(join(cli.cwd, appName, 'node_modules', '.bin', 'sails'), ['generate', 'ember-blueprints'], {cwd: apiDir});
    });
  };

  var setupSails = function() {
    cli.debug('setupSails');

    cleanUpSails().then(function() {
      cli.debug('Clean up sails finished.');
    }).then(function() {
      cli.debug('prepareSails started.');
      prepareSails();
    }).then(function() {
      cli.copyTemplates(join(cli.includedBasepath, 'lib', 'templates', 'api'), apiDir, {clobber: true}, function(err) {
        if (err) {
          return cli.debug(err);
        }
        cli.debug('Sails templates copied without error.');
      });
    }).done(function(){
      cli.banner(join(cli.includedBasepath, 'lib', 'helpers', 'banner'));
    });
  };

  var createAppFolder = function() {
    console.log(apiDir, feDir);
    if (!appName) {
      cli.error('You must supply a name for your Seeds.js Application.');
      cli.exit(1);
    }
    cli.debug('createAppFolder');

    return cli.mkdir(appName);
  };

  var setupEmber = function() {
    cli.debug('setupEmber');
    var emberPackages = ['install', 'semantic-ui-ember'];

    runExternalCommand(join(feDir, 'node_modules', '.bin', 'ember'), emberPackages, {cwd: feDir});

    emberPackages = ['install', 'ember-cli-seeds-scaffold'];

    return runExternalCommand(join(feDir, 'node_modules', '.bin', 'ember'), emberPackages, {cwd: feDir}).then(function() {
      cli.copyTemplates(join(cli.includedBasepath, 'lib', 'templates', 'frontend'), feDir, {clobber: true}, function(err) {
        if (err) {
          return cli.debug(err);
        }
        cli.debug('Ember templates copied without error.');
      });
    });
  };

  var generateAppFiles = function() {
    cli.debug('generateAppFiles');

    return cli.exec('npm install').then(function() {
      runExternalCommand(join(cli.cwd, appName, 'node_modules', '.bin', 'sails'), ['new', 'api']).then(setupSails);
      runExternalCommand(join(cli.cwd, appName, 'node_modules', '.bin', 'ember'), ['new', 'frontend', '--skip-git']).then(setupEmber);
    });
  };

  var bootstrapApp = function() {
    cli.debug('bootstrapApp');

    return cli.cp(join(cli.includedBasepath, 'node_modules'), join(cli.cwd, appName, 'node_modules'), {clobber: true}, function(err) {
      if (err) {
        return cli.debug(err);
      }

      runExternalCommand('npm', ['init', '-f']).then(function() {
        cli.chdir(appName, generateAppFiles);
      });
    });
  };

  cli.ui(chalk.green('Generating a new Seed named'), chalk.white(appName) + chalk.green('...'));

  createAppFolder().then(bootstrapApp);
};
