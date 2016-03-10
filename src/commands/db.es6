const fs = require('fs');
const join = require('path').join;

module.exports = cli => {
  cli.debug('start db', cli.args);

  if (fs.existsSync(cli.apiDir) && fs.existsSync(cli.feDir) || fs.existsSync('.seedsrc')) {
    cli.debug('We\'re in a Seeds app.');

    const command = join(cli.apiDir, 'node_modules', '.bin', 'sails-migrations');
    const dbCommands = new Map([
      ['create', 'db:create'],
      ['drop', 'db:drop'],
      ['migrate', 'migrate'],
      ['rollback', 'rollback'],
      ['status', 'status'],
      ['generate', 'generate']
    ]);
    const additionalParams = [...cli.args.slice(2)];

    cli.runExternalCommand(command, [dbCommands.get(cli.args[1]), ...additionalParams], {cwd: cli.apiDir});
  } else {
    cli.error('You must be in a Seeds application to run the db command.');
  }
};
