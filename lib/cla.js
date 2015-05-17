"use strict"

var banner = require('./helpers/banner');
var commands = require('./commands');

class CLI {
  //TODO: if -v is passed to CLI, set debug_flag to true
  constructor(args, debug_flag) {
    this.args = [args];
    this.debug_flag = debug_flag || false;
  }

  dir() {
    this.debug('dir', __dirname);
    return __dirname;
  }

  cwd() {
    this.debug('cwd', process.cwd());
    return process.cwd();
  }

  command() {
    if (this.args === undefined) {
      this.args = ['help'];
    }
    this.debug('commands', commands);
    return commands[this.args[0]]();
  }

  copyTemplates() {
    this.debug('copyTemplates');
    return true;
  }

  treeBanner() {
    this.debug('treeBanner', banner);
    return console.log(banner);
  }

  debug(message, obj) {
    obj = obj || undefined;
    if (this.debug_flag === true) {
      return console.log(message, obj);
    }
  }
}

module.exports = CLI;

/*
var CLI = require('./lib/cla');
var cli = new CLI('help', false);
cli.command();
*/
