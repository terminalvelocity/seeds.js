const aliases = new (require('cli-table'))({head: ['Alias', 'Command']});

aliases.push(
  ['n', 'new'],
  ['g', 'generate'],
  ['s, up, lift, server', 'serve'],
  ['i', 'install'],
  ['b', 'build'],
  ['h', 'help']
);

module.exports = function(cli) {
  cli.ui(`${'Usage:'.cyan()}
  seeds ${'new'.white()} [name]                            # Generates a new project with the supplied name.
  seeds ${'serve'.white()}                                 # Run Frontend at 4200 and API server at 1776.
  seeds ${'generate'.white()} <kind> [name] <attrs:type>   # Generates boilerplate for <kind> of [name].
  seeds ${'install'.white()} ${'ember'.red()} <ember-addon>           # Installs <ember-addon> in frontend Ember app.
  seeds ${'install'.white()} ${'sails'.blue()} <sails-package>         # Install <sails-package> in API Sails app.
  seeds ${'init'.white()}                                  # Installs dependencies for pre-existing seeds applications.
  seeds ${'build'.white()}                                 # Builds app and places in builds path


${'Flags:'.cyan()}
  -v, [--version]                             # Display version numbers.
  -h, [--help]                                # Display this help message. Meta, right?

${aliases.toString()}
`);
};
