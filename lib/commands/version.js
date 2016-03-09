'use strict';

var versions = new (require('cli-table'))({ head: ['Package', 'Version'] });

module.exports = function (cli) {
  versions.push(['Seeds', 'v' + cli['package'].version], ['Ember', 'v2.4.1'], ['Ember-Cli', 'v2.4.1'], ['Sails', 'v0.12.1'], ['Semantic UI', 'v2.1.8']);

  cli.ui(versions.toString());
};