'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var startsWith = require('lodash.startswith');
var partition = require('lodash.partition');

var Aliases = (function () {
  function Aliases(cli) {
    _classCallCheck(this, Aliases);

    this.cli = cli;
    this.args = this.cli.args;
    this._helpIfNone();
    this.checkFlags();
    this.checkAlias();
  }

  _createClass(Aliases, [{
    key: 'isFlag',
    value: function isFlag(item) {
      return startsWith(item, '-');
    }
  }, {
    key: 'checkFlags',
    value: function checkFlags() {
      if (this.partition[0].length) {
        this.args[0] = this.flagMap.get(this.partition[0][0]);
      }
      this.updateArgs();
    }
  }, {
    key: 'checkAlias',
    value: function checkAlias() {
      if (this.aliasMap.has(this.args[0])) {
        this.args[0] = this.aliasMap.get(this.args[0]);
      }
      return this.updateArgs();
    }
  }, {
    key: 'updateArgs',
    value: function updateArgs() {
      this.cli.args = this.args;
    }
  }, {
    key: '_helpIfNone',
    value: function _helpIfNone() {
      if (!Array.isArray(this.args) || !this.args.length) {
        this.args = ['help'];
      }
    }
  }, {
    key: 'aliasMap',
    get: function get() {
      return new Map([['n', 'new'], ['g', 'generate'], ['s', 'serve'], ['server', 'serve'], ['lift', 'serve'], ['up', 'serve'], ['i', 'install']]);
    }
  }, {
    key: 'flagMap',
    get: function get() {
      return new Map([['-v', 'version'], ['--version', 'version'], ['-h', 'help'], ['--help', 'help']]);
    }
  }, {
    key: 'partition',
    get: function get() {
      return partition(this.args, this.isFlag);
    }
  }], [{
    key: 'parse',
    value: function parse(cli) {
      return new Aliases(cli);
    }
  }]);

  return Aliases;
})();

module.exports = Aliases;