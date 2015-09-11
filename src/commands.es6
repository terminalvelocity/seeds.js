'use strict';

const newCommand = require('./commands/new');
const helpCommand = require('./commands/help');
const versionCommand = require('./commands/version');
const serveCommand = require('./commands/serve');
const generateCommand = require('./commands/generate');
const installCommand = require('./commands/install');

module.exports = args => {
  console.log('args', args);
};

module.exports.new = newCommand;
module.exports.help = helpCommand;
module.exports.version = versionCommand;
module.exports.serve = serveCommand;
module.exports.generate = generateCommand;
module.exports.install = installCommand;
