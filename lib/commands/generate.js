var fs = require('fs');

module.exports = function(cli) {
  cli.debug('generate command start');

  var implementedGenerators = ["scaffold"]
  var generatorType = cli.args[1];
  var resourceName  = cli.args[2];
  var attrsArr      = cli.args.slice(3);
  var attrMap       = new Map();

  if (fs.existsSync(cli.apiDir) && fs.existsSync(cli.feDir)) {

    if (implementedGenerators.indexOf(generatorType) > -1) {

      if (attrsArr.length > 0) {
        cli.debug('we have attrs', attrsArr);

        attrsArr.forEach(function(value, index, object) {
          var attrTypePair = value.split(":");
          attrMap.set(attrTypePair[0], attrTypePair[1])
        });
        cli.debug('attrMap', attrMap);
      }

      sailsModelGenerateCommand = [cli.args[0], 'model', resourceName];
      Array.prototype.push.apply(sailsModelGenerateCommand, attrsArr);
      cli.runExternalCommand(`${cli.nodeDir}/.bin/sails`, sailsModelGenerateCommand, {cwd: `${cli.apiDir}`})

      sailsControllerGenerateCommand = [cli.args[0], 'controller', resourceName];
      cli.runExternalCommand(`${cli.nodeDir}/.bin/sails`, sailsControllerGenerateCommand, {cwd: `${cli.apiDir}`})

      emberGenerateCommand = [cli.args[0], 'scaffold', resourceName];
      Array.prototype.push.apply(emberGenerateCommand, attrsArr);
      cli.runExternalCommand(`${cli.feDir}/node_modules/.bin/ember`, emberGenerateCommand, {cwd: `${cli.feDir}`}).
        then(function() {
          // cli.rm(`${cli.feDir}`)
          cli.debug('then function called after emberGenerateCommand');
        });

    } else {
      cli.error(`Currently generate only supports: ${implementedGenerators.join(" ")}`);
    }
  } else {
    cli.error('You must be in a Seeds application to run the serve command.');
  }
}
