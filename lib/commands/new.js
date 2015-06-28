'use strict';

var join = require('path').join;
var copy = require('fs-extra').copySync;
var child = require('child_process');
var spawnSync = child.spawnSync;

module.exports = function (cli) {
  var appName = cli.args[1];
  var appDir = join(cli.cwd, appName);
  var apiDir = join(appDir, cli.apiName);
  var feDir = join(appDir, cli.feName);
  var templatesPath = join(cli.includedBasepath, 'lib', 'templates');

  var createAppFolder = function createAppFolder() {
    cli.debug('createAppFolder', appName);

    if (!appName) {
      cli.error('You must supply a name for your Seeds.js Application.');
      cli.exit(1);
    }

    cli.ui('Generating a new Seed named'.green(), appName.white() + '...'.green());
    cli.mkdir(join(feDir, 'node_modules', '.bin'));
    return cli.mkdir(join(apiDir, 'node_modules', '.bin'));
  };

  var bootstrapApp = function bootstrapApp() {
    cli.debug('bootstrapApp');

    copy(join(templatesPath, '.seedsrc'), join(appDir, '.seedsrc'));
    copy(join(templatesPath, 'package.json'), join(appDir, 'package.json'), { clobber: true });

    spawnSync('npm', ['install'], { cwd: join(cli.cwd, appName) });
    return;
  };

  var setupSails = function setupSails() {
    cli.debug('setupSails');

    var sailsModules = [join('.bin', 'sails'), join('.bin', 'rc'), 'include-all', 'lodash', 'pluralize', 'rc', 'sails', 'sails-disk', 'sails-generate-ember-blueprints', 'sails-hook-apianalytics', 'sails-hook-autoreload', 'sails-hook-dev'];
    spawnSync(join(appDir, 'node_modules', '.bin', 'sails'), ['generate', 'seeds-backend'], { cwd: apiDir });
    sailsModules.forEach(function (pkg) {
      copy(join(appDir, 'node_modules', pkg), join(apiDir, 'node_modules', pkg));
    });
    return;
  };

  var setupEmber = function setupEmber() {
    cli.debug('setupEmber');

    var emberModules = [join('.bin', 'ember'), 'broccoli-asset-rev', 'ember-cli', 'ember-cli-app-version', 'ember-cli-babel', 'ember-cli-content-security-policy', 'ember-cli-dependency-checker', 'ember-cli-htmlbars', 'ember-cli-ic-ajax', 'ember-cli-inject-live-reload', 'ember-cli-qunit', 'ember-cli-seeds-scaffold', 'ember-cli-uglify', 'ember-data', 'ember-disable-proxy-controllers', 'ember-export-application-global', 'semantic-ui-ember'];

    spawnSync(join(appDir, 'node_modules', '.bin', 'sails'), ['generate', 'seeds-frontend'], { cwd: feDir });
    emberModules.forEach(function (pkg) {
      copy(join(appDir, 'node_modules', pkg), join(feDir, 'node_modules', pkg));
    });
    copy(join(appDir, 'node_modules', 'sails-generate-seeds-frontend', 'templates', 'bower_components'), join(feDir, 'bower_components'));
    return;
  };

  var wrapUp = function wrapUp() {
    cli.debug('wrapUp');

    cli.banner(join(cli.includedBasepath, 'lib', 'helpers', 'banner'));
    return;
  };

  createAppFolder().then(function () {
    bootstrapApp();
    setupSails();
    setupEmber();
    wrapUp();
  });
};