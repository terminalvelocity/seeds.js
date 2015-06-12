'use strict';

var expect = require('chai').expect;
var Seeds = require('../lib/cli');
var join = require('path').join;

var mc;
var cli;
var attrs;
var emberActual;
var emberExpected;
var sailsActual;
var sailsExpected;

describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      expect(-1).to.equal([1, 2, 3].indexOf(5));
      expect(-1).to.equal([1, 2, 3].indexOf(0));
    });

    it('should return the proper index when the value is present', function(){
      expect(0).equal([1, 2, 3].indexOf(1));
    });
  });
});

describe('Seeds', function() {
  it('should return a function', function() {
    expect(Seeds).to.be.a('function');
  });

  it('should have a default configuration', function() {
    cli = new Seeds();
    expect(cli.config.api.name).to.equal('api');
    expect(cli.config.api.port).to.equal('1776');
    expect(cli.config.frontend.name).to.equal('frontend');
    expect(cli.config.frontend.port).to.equal('4200');
  });
});


describe('ModelConverter', function() {
  before(function() {
    mc = require(join('..', 'lib', 'helpers', 'convertModels'));
    attrs = ['name:text', 'email:string', 'age:integer', 'birthday:datetime', 'friends:array', 'resume:json', 'image:binary', 'newsletter:boolean'];
    emberActual = mc.convert(attrs, 'ember');
    sailsActual = mc.convert(attrs, 'sails');
    emberExpected = ['name:string', 'email:string', 'age:number', 'birthday:date', 'friends', 'resume', 'image:string', 'newsletter:boolean'];
    sailsExpected = ['name:text', 'email:string', 'age:integer', 'birthday:date', 'friends:array', 'resume:json', 'image:binary', 'newsletter:boolean'];
  });

  it('should have a convert function', function() {
    expect(mc.convert).to.be.a('function');
    expect(emberActual).to.be.an('array');
  });

  it('should properly convert the datatypes for Ember', function() {
    expect(emberActual).to.eql(emberExpected);
  });

  it('for Ember should contain only Ember datatypes', function() {
    expect(emberActual).not.to.match(/datatime/i);
    expect(emberActual).not.to.match(/binary/i);
    expect(emberActual).not.to.match(/json/i);
    expect(emberActual).not.to.match(/binary/i);
    expect(emberActual).not.to.match(/array/i);
    expect(emberActual).not.to.match(/float/i);
    expect(emberActual).not.to.match(/integer/i);
    expect(emberActual).not.to.match(/text/i);
    expect(emberActual).to.match(/string/i);
    expect(emberActual).to.match(/date/i);
    expect(emberActual).to.match(/number/i);
    expect(emberActual).to.match(/boolean/i);
  });

  it('should properly convert the datatypes for sails', function() {
    expect(sailsActual).to.eql(sailsExpected);
  });

  it('for Sails should contain only Sails datatypes', function() {
    expect(sailsActual).not.to.match(/datetime/i);
    expect(sailsActual).not.to.match(/float/i);
    expect(sailsActual).not.to.match(/number/i);
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

