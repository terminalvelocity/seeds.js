'use strict';

const fs = require('fs');
const path = require('path');
const commands = fs.readdirSync(`${__dirname}/commands`);

commands.forEach((command) => {
  module.exports[command.slice(0, -3)] = require(path.resolve(`${__dirname}/commands/${command}`));
});
