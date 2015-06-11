'use strict';

var Cli = require('soil-cli');

class SeedsCLI extends Cli {

  constructor(args, options) {
    super(args, options);

    this.nodeDir = `${this.cwd()}/node_modules`;
    this.package = require('../package');

    this.feName = 'frontend';
    this.feDir = `${this.cwd()}/${this.feName}`;

    this.apiName = 'api';
    this.apiDir = `${this.cwd()}/${this.apiName}`;
  }

  get config() {
    return require('rc')('seeds', {
      api: {
        name: 'api',
        port: '1776'
      },
      frontend: {
        name: 'frontend',
        port: '4200'
      },
      debug: false
    });
  }

  runExternalCommand(command, args, options) {
    this.debug('runExternalCommand');

    options = options || {cwd: `${this.cwd()}`};

    return this.spawn(command, args, options)
      .progress(function(childProcess) {
        childProcess.stdout.on('data', function (data) {
          console.log(`${data.toString()}`);
        });
        childProcess.stderr.on('data', function (data) {
          console.log(`${data.toString()}`);
        });
      })
      .then(function(resolve) {
        this.debug(`${command} done`, options);
        resolve();
      })
      .fail(function(err) {
        this.debug(`fail ${command}`, err);
      });
  }

  static cli(args, options) {
    return new SeedsCLI(args, options);
  }
}

module.exports = SeedsCLI;
