const versions = new (require('cli-table'))({head: ['Package', 'Version']});

module.exports = cli => {
  versions.push(
    ['Seeds', `v${cli.package.version}`],
    ['Ember', `v2.4.1`],
    ['Ember-Cli', `v2.4.1`],
    ['Sails', `v0.11.5`],
    ['Semantic UI', `v2.1.8`]
  );

  cli.ui(versions.toString());
};
