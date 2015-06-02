var expect = require('chai').expect;
var Seeds = require('../index');

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

  it('should return help if no args passed in', function() {
    var cli = new Seeds('');
    cli.command();
  });
});