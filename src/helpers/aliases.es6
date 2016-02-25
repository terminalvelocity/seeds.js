'use strict';

var startsWith = require('lodash.startswith');
var partition = require('lodash.partition');

class Aliases {
  constructor(cli) {
    this.cli = cli;
    this.args = this.cli.args;
    this._helpIfNone();
    this.checkFlags();
    this.checkAlias();
  }

  get aliasMap() {
    return new Map([
      ['n', 'new'],
      ['g', 'generate'],
      ['s', 'serve'],
      ['server', 'serve'],
      ['lift', 'serve'],
      ['up', 'serve'],
      ['i', 'install'],
      ['b', 'build'],
      ['h', 'help']
    ]);
  }

  get flagMap() {
    return new Map([
      ['-v', 'version'],
      ['--version', 'version'],
      ['-h', 'help'],
      ['--help', 'help']
    ]);
  }

  get partition() {
    return partition(this.args, this.isFlag);
  }

  isFlag(item) {
    return startsWith(item, '-');
  }

  checkFlags() {
    if (this.partition[0].length) {
      this.args[0] = this.flagMap.get(this.partition[0][0]);
    }
    this.updateArgs();
  }

  checkAlias() {
    if (this.aliasMap.has(this.args[0])) {
      this.args[0] = this.aliasMap.get(this.args[0]);
    }
    return this.updateArgs();
  }

  updateArgs() {
    this.cli.args = this.args;
  }

  static parse(cli) {
    return new Aliases(cli);
  };

  _helpIfNone() {
    if (!Array.isArray(this.args) || !this.args.length) {
      this.args = ['help'];
    }
  }
}

module.exports = Aliases;
