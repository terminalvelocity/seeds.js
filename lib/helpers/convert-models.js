'use strict';

module.exports = {

  ember: new Map([
    ['text', 'string'],
    ['integer', 'number'],
    ['float', 'number'],
    ['datetime', 'date'],
    ['binary', 'string'],
    ['array', ''],
    ['json', ''],
  ]),

  sails: new Map([
    ['number', 'float'],
    ['datetime', 'date']
  ]),

  convert: function(attributes, to) {
    var attributesCopy = attributes.slice(0);
    for(var i in attributesCopy) {
      var attrArray = attributesCopy[i].split(':');
      if (attrArray.length > 1) {
        var attrType = attrArray.pop();
        attrArray.push(this[to].has(attrType) ? `${this[to].get(attrType)}` : `${attrType}`);
        attributesCopy[i] = !attrArray[1] ? attrArray.join('') : attrArray.join(':');
      }
    }
    return attributesCopy;
  }
}