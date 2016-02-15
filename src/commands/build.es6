'use strict';

const fse = require('fs-extra');
const join = require('path').join;
const mkdirp = require('mkdirp');

module.exports = function (cli) {
  cli.debug('start build', cli.args);

  if (fse.existsSync(cli.apiDir) && fse.existsSync(cli.feDir) || fse.existsSync('.seedsrc')) {
    cli.debug('We\'re in a Seeds app.');

    const time = Date.now();
    const buildsDir = `${cli.cwd}/builds`;
    const currentBuildDir = `${buildsDir}/${time}`;
    const previousSymLink = `${buildsDir}/previous`;
    const currentSymLink = `${buildsDir}/current`;

    mkdirp.sync(currentBuildDir);
    fse.copySync(`${cli.apiDir}`, currentBuildDir);

    if (fse.existsSync(previousSymLink)) {
      fse.unlinkSync(previousSymLink);
    }

    if (fse.existsSync(currentSymLink)) {
      const previousBuild = fse.readlinkSync(currentSymLink);
      fse.unlinkSync(currentSymLink);
      fse.symlinkSync(previousBuild, previousSymLink);
    }

    fse.symlinkSync(currentBuildDir, currentSymLink);

    cli.runExternalCommand(join(cli.nodeDir, '.bin', 'ember'), ['build', '--environment=production', `--output-path=${currentBuildDir}/assets`], {cwd: cli.feDir});
  } else {
    cli.error('You must be in a Seeds application to run the build command.');
  }
};


