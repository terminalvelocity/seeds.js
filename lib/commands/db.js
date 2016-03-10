'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var fs = require('fs');
var join = require('path').join;

module.exports = function (cli) {
  cli.debug('start db', cli.args);

  if (fs.existsSync(cli.apiDir) && fs.existsSync(cli.feDir) || fs.existsSync('.seedsrc')) {
    cli.debug('We\'re in a Seeds app.');

    var command = join(cli.apiDir, 'node_modules', '.bin', 'sails-migrations');
    var dbCommands = new Map([['create', 'db:create'], ['drop', 'db:drop'], ['migrate', 'migrate'], ['rollback', 'rollback'], ['status', 'status'], ['generate', 'generate']]);
    var additionalParams = [].concat(_toConsumableArray(cli.args.slice(2)));

    cli.runExternalCommand(command, [dbCommands.get(cli.args[1])].concat(_toConsumableArray(additionalParams)), { cwd: cli.apiDir });
  } else {
    cli.error('You must be in a Seeds application to run the init command.');
  }
};