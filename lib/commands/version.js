var fs = require('fs');
var Package = require('../../package');

var version = function(cli) {
  cli.ui(`Seeds v${Package.version}`);
};

module.exports = version;

