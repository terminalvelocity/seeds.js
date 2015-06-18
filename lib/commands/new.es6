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

  var createAppFolder = function() {
    if (!appName) {
      cli.error('You must supply a name for your Seeds.js Application.');
      cli.exit(1);
    }
    cli.debug('createAppFolder', appName);
    cli.ui('Generating a new Seed named'.green(), appName.white() + '...'.green());

    return cli.mkdir(apiDir);
  };

  var setupEmber = function() {
    cli.debug('setupEmber');
    var emberPackages = ['install', 'semantic-ui-ember'];

    runExternalCommand(join(feDir, 'node_modules', '.bin', 'ember'), emberPackages, {cwd: feDir});

    emberPackages = ['install', 'ember-cli-seeds-scaffold'];

    return runExternalCommand(join(feDir, 'node_modules', '.bin', 'ember'), emberPackages, {cwd: feDir}).then(function() {
      cli.copyTemplates(join(cli.includedBasepath, 'lib', 'templates', 'frontend'), feDir, {cwd: feDir, clobber: true}, function(err) {
        if (err) {
          return cli.debug(err);
        }
        cli.debug('Ember templates copied without error.');
      });
    });
  };

  var setupSails = function() {
    cli.debug('generateAppFiles');

    return runExternalCommand('npm', ['install'], {cwd: apiDir});
  };

  var generateAppFiles = function() {
    cli.debug('generateAppFiles');

    return cli.exec('npm install').then(function() {
      runExternalCommand(join(cli.cwd, appName, 'node_modules', '.bin', 'sails'), ['generate', 'seeds-backend'], {cwd: apiDir}).then(setupSails);
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

  createAppFolder().then(bootstrapApp);
};
