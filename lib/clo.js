var fs    = require('fs');
var path  = require('path');
var args = {}
function CLI (args, input, output) {
	this.args = args;
	this.input = input;
	this.output = output;
}

CLI.prototype.listTemplates = function (basepath) {
	rpath = path.resolve(process.cwd, 'lib', 'templates');
	return fs.readdirSync(rpath, function(result) {
		console.log(result);
	});
};

CLI.prototype.cwd = function () {
	return process.cwd();
};

CLI.prototype.args = function () {
	return process.argv;
}

module.exports = CLI;

/*
var clo = require('./lib/clo');
var cli = new clo;
cli.listTemplates(cli.cwd+)
*/
