'use strict';

var fs = require('fs');

module.exports = function(cli) {
  cli.debug('generate command start');

  let implementedGenerators = ['scaffold'];
  let generatorType = cli.args[1];
  let resourceName  = cli.args[2];
  let attrsArr      = cli.args.slice(3);
  let attrMap       = new Map();

  if (fs.existsSync(cli.apiDir) && fs.existsSync(cli.feDir)) {
    if (implementedGenerators.indexOf(generatorType) > -1) {
      if (attrsArr.length > 0) {
        cli.debug('we have attrs', attrsArr);

        attrsArr.forEach(function(value) {
          var attrTypePair = value.split(':');
          attrMap.set(attrTypePair[0], attrTypePair[1]);
        });
        cli.debug('attrMap', attrMap);
      }

      let sailsModelGenerateCommand = [cli.args[0], 'model', resourceName];
      Array.prototype.push.apply(sailsModelGenerateCommand, attrsArr);
      cli.runExternalCommand(`${cli.nodeDir}/.bin/sails`, sailsModelGenerateCommand, {cwd: `${cli.apiDir}`});

      let sailsControllerGenerateCommand = [cli.args[0], 'controller', resourceName];
      cli.runExternalCommand(`${cli.nodeDir}/.bin/sails`, sailsControllerGenerateCommand, {cwd: `${cli.apiDir}`});

      let emberGenerateCommand = [cli.args[0], 'scaffold', resourceName];
      Array.prototype.push.apply(emberGenerateCommand, attrsArr);
      cli.runExternalCommand(`${cli.feDir}/node_modules/.bin/ember`, emberGenerateCommand, {cwd: `${cli.feDir}`}).
        then(function() {
          // cli.rm(`${cli.feDir}`)
          cli.debug('then function called after emberGenerateCommand');
        });
    } else {
      cli.error(`Currently generate only supports: ${implementedGenerators.join(' ')}`);
    }
  } else {
    cli.error('You must be in a Seeds application to run the serve command.');
  }
};
