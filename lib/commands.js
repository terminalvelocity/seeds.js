'use strict';

var fs = require('fs');
var path = require('path');
var commands = fs.readdirSync(__dirname + '/commands');

commands.forEach(function (command) {
  module.exports[command.slice(0, -3)] = require(path.resolve(__dirname + '/commands/' + command));
});