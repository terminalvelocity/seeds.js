'use strict';

var fs = require('fs');
var join = require('path').join;
var convertModels = require(join('..', 'helpers', 'convertModels'));

module.exports = function(cli) {
  cli.debug('generate command start');

  let implementedGenerators = ['scaffold'];
  let generatorType = cli.args[1];
  let resourceName  = cli.args[2];
  let attrsArr      = cli.args.slice(3);
  let attrMap       = new Map();

  if (fs.existsSync('.seedsrc')) {
    if (implementedGenerators.indexOf(generatorType) > -1) {
      if (attrsArr.length > 0) {
        cli.debug('we have attrs', attrsArr);

        attrsArr.forEach(function(value) {
          var attrTypePair = value.split(':');
          attrMap.set(attrTypePair[0], attrTypePair[1]);
        });
        cli.debug('attrMap', attrMap);
      }

      var sailsAttrs = convertModels.convert(attrsArr, 'sails');
      cli.debug(sailsAttrs);

      let sailsModelGenerateCommand = [cli.args[0], 'model', resourceName];
      Array.prototype.push.apply(sailsModelGenerateCommand, sailsAttrs);
      cli.runExternalCommand(join(cli.nodeDir, '.bin', 'sails'), sailsModelGenerateCommand, {cwd: `${cli.apiDir}`});

      let sailsControllerGenerateCommand = [cli.args[0], 'controller', resourceName];
      cli.runExternalCommand(join(cli.nodeDir, '.bin', 'sails'), sailsControllerGenerateCommand, {cwd: `${cli.apiDir}`});

      var emberAttrs = convertModels.convert(attrsArr, 'ember');
      cli.debug(emberAttrs);

      let emberGenerateCommand = [cli.args[0], 'scaffold', resourceName];
      Array.prototype.push.apply(emberGenerateCommand, emberAttrs);
      cli.runExternalCommand(join(cli.feDir, 'node_modules', '.bin', 'ember'), emberGenerateCommand, {cwd: `${cli.feDir}`});
    } else {
      cli.error(`Currently generate only supports: ${implementedGenerators.join(' ')}`);
    }
  } else {
    cli.error('You must be in a Seeds application to run the generate command.');
  }
};
