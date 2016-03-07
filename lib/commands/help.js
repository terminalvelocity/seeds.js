'use strict';

var aliases = new (require('cli-table'))({ head: ['Alias', 'Command'] });

aliases.push(['n', 'new'], ['g', 'generate'], ['s, up, lift, server', 'serve'], ['i', 'install'], ['b', 'build'], ['h', 'help']);

module.exports = function (cli) {
  cli.ui('Usage:'.cyan() + '\n  seeds ' + 'new'.white() + ' [name]                            # Generates a new project with the supplied name.\n  seeds ' + 'serve'.white() + '                                 # Run Frontend at 4200 and API server at 1776.\n  seeds ' + 'generate'.white() + ' <kind> [name] <attrs:type>   # Generates boilerplate for <kind> of [name].\n  seeds ' + 'install'.white() + ' ' + 'ember'.red() + ' <ember-addon>           # Installs <ember-addon> in frontend Ember app.\n  seeds ' + 'install'.white() + ' ' + 'sails'.blue() + ' <sails-package>         # Install <sails-package> in API Sails app.\n  seeds ' + 'init'.white() + '                                  # Installs dependencies for pre-existing seeds applications.\n  seeds ' + 'build'.white() + '                                 # Builds app and places in builds path\n\n\n' + 'Flags:'.cyan() + '\n  -v, [--version]                             # Display version numbers.\n  -h, [--help]                                # Display this help message. Meta, right?\n\n' + aliases.toString() + '\n');
};