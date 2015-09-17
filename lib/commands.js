'use strict';

var commands = ['new', 'help', 'version', 'serve', 'generate', 'install'];

commands.map(function (command) {
  module.exports[command] = require('./commands/' + command);
});