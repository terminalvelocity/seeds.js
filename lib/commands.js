var newCommand = require('./commands/new');
var helpCommand = require('./commands/help');

module.exports = function(args) {
  console.log('args', args);
}

module.exports.new = newCommand;
module.exports.help = helpCommand;
