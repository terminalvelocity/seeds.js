var newCommand = require('./commands/new');
var helpCommand = require('./commands/help');
var serveCommand = require('./commands/serve');
var generateCommand = require('./commands/generate');

module.exports = function(args) {
  console.log('args', args);
}

module.exports.new = newCommand;
module.exports.help = helpCommand;
module.exports.serve = serveCommand;
module.exports.generate = generateCommand;
