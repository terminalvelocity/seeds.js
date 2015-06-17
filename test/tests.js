'use strict';

var expect = require('chai').expect;
var Seeds = require('../lib/cli');
var join = require('path').join;

var mc;
var cli;
var help;
var attrs;
var aliasesClass;
var emberActual;
var emberExpected;
var sailsActual;
var sailsExpected;

describe('Seeds', function () {
  it('should return a function', function () {
    expect(Seeds).to.be.a('function');
  });

  it('should have a default configuration', function () {
    cli = new Seeds();
    expect(cli.config.sails.name).to.equal('api');
    expect(cli.config.sails.port).to.equal('1776');
    expect(cli.config.ember[0].name).to.equal('frontend');
    expect(cli.config.ember[0].port).to.equal('4200');
  });
});

describe('ModelConverter', function () {
  before(function () {
    mc = require(join('..', 'lib', 'helpers', 'convertModels'));
    attrs = ['name:text', 'email:string', 'age:integer', 'birthday:datetime', 'friends:array', 'resume:json', 'image:binary', 'newsletter:boolean'];
    emberActual = mc.convert(attrs, 'ember');
    sailsActual = mc.convert(attrs, 'sails');
    emberExpected = ['name:string', 'email:string', 'age:number', 'birthday:date', 'friends', 'resume', 'image:string', 'newsletter:boolean'];
    sailsExpected = ['name:text', 'email:string', 'age:integer', 'birthday:date', 'friends:array', 'resume:json', 'image:binary', 'newsletter:boolean'];
  });

  it('should have a convert function', function () {
    expect(mc.convert).to.be.a('function');
    expect(emberActual).to.be.an('array');
  });

  it('should properly convert the datatypes for Ember', function () {
    expect(emberActual).to.eql(emberExpected);
  });

  it('for Ember should contain only Ember datatypes', function () {
    expect(emberActual).to.match(/string/i);
    expect(emberActual).to.match(/date/i);
    expect(emberActual).to.match(/number/i);
    expect(emberActual).to.match(/boolean/i);
  });

  it('for Ember should not contain non-Ember datatypes', function () {
    expect(emberActual).not.to.match(/datatime/i);
    expect(emberActual).not.to.match(/binary/i);
    expect(emberActual).not.to.match(/json/i);
    expect(emberActual).not.to.match(/binary/i);
    expect(emberActual).not.to.match(/array/i);
    expect(emberActual).not.to.match(/float/i);
    expect(emberActual).not.to.match(/integer/i);
    expect(emberActual).not.to.match(/text/i);
  });

  it('should properly convert the datatypes for sails', function () {
    expect(sailsActual).to.eql(sailsExpected);
  });

  it('for Sails should have default datatypes that map to Sails', function () {
    expect(sailsActual).not.to.match(/datetime/i);
    expect(sailsActual).not.to.match(/float/i);
    expect(sailsActual).not.to.match(/number/i);
  });

  it('for Sails should contain only Sails datatypes', function () {
    expect(sailsActual).to.match(/binary/i);
    expect(sailsActual).to.match(/json/i);
    expect(sailsActual).to.match(/binary/i);
    expect(sailsActual).to.match(/array/i);
    expect(sailsActual).to.match(/integer/i);
    expect(sailsActual).to.match(/string/i);
    expect(sailsActual).to.match(/date/i);
    expect(sailsActual).to.match(/boolean/i);
  });
});

describe('Aliases', function () {
  before(function () {
    aliasesClass = require(join('..', 'lib', 'settings', 'aliases'));
    help = ['help'];
  });

  it('should be a class function', function () {
    expect(aliasesClass).to.be.a('function');
  });

  it('should accept aliases for server', function () {
    var serve = ['serve'];
    var s = Seeds.cli(['s']).args;
    var server = Seeds.cli(['server']).args;
    var lift = Seeds.cli(['lift']).args;
    var up = Seeds.cli(['up']).args;
    expect(s).to.eql(serve);
    expect(server).to.eql(serve);
    expect(lift).to.eql(serve);
    expect(up).to.eql(serve);
  });

  it('should accept alias for generate', function () {
    var generate = ['generate'];
    var g = Seeds.cli(['g']).args;
    expect(g).to.eql(generate);
  });

  it('should accept alias for new', function () {
    var newArg = ['new'];
    var n = Seeds.cli(['n']).args;
    expect(n).to.eql(newArg);
  });

  it('should accept flags for version', function () {
    var dashV = Seeds.cli(['-v']).args;
    var ddVersion = Seeds.cli(['--version']).args;
    var version = ['version'];
    expect(dashV).to.eql(version);
    expect(ddVersion).to.eql(version);
  });

  it('should accept flags for help', function () {
    var dashH = Seeds.cli(['-h']).args;
    var ddHelp = Seeds.cli(['--help']).args;
    expect(dashH).to.eql(help);
    expect(ddHelp).to.eql(help);
  });

  it('should prioritize flags over aliases/commands', function () {
    var flagOverAlias = Seeds.cli(['n', '--version']).args;
    var flagOA = ['version', '--version'];
    expect(flagOverAlias).to.eql(flagOA);
  });

  it('should return help if no args are passed in', function () {
    var noArgs = Seeds.cli().args;
    expect(noArgs).to.eql(help);
  });
});