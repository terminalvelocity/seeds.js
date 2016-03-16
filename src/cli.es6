'use strict';

var Cli = require('soil-cli');
var join = require('path').join;
var aliases = require(join(__dirname, 'helpers', 'aliases'));

class SeedsCLI extends Cli {

  constructor(args, options) {
    super(args, options);
    this.debugFlag = this.config.debug;

    this.nodeDir = join(this.cwd, 'node_modules');

    this.feName = this.config.apps.ember[0].name;
    this.feDir =  join(this.cwd, this.feName);

    this.apiName = this.config.apps.sails[0].name;
    this.apiDir = join(this.cwd, this.apiName);
    aliases.parse(this);
  }

  get config() {
    return require('rc')('seeds', {
      apps: {
        sails: [
          {
            name: 'api',
            port: 1776
          }
        ],
        ember: [
          {
            name: 'frontend',
            port: 4200,
            reloadport: 49154
          }
        ]
      },
      debug: false
    });
  }

  get package() {
    return require(join('..', 'package'));
  }

  runExternalCommand(command, args, options) {
    this.debug('runExternalCommand', command);
    options = options || {cwd: `${this.cwd}`};
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
