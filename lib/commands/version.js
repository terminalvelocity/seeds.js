'use strict';

var versions = new (require('cli-table'))({ head: ['Package', 'Version'] });

module.exports = function (cli) {
  versions.push(['Seeds', 'v' + cli['package'].version], ['Ember', 'v2.0.2'], ['Ember-Cli', 'v1.13.8'], ['Sails', 'v0.11.0'], ['Semantic UI', 'v2.1.4']);

  cli.ui(versions.toString());
};