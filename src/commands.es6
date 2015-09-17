'use strict';

const commands = ['new', 'help', 'version', 'serve', 'generate', 'install'];

commands.map((command) => {
  module.exports[command] = require(`./commands/${command}`);
});
