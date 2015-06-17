'use strict';

/*
 * Converts ember model attributes to sails model attributes and vice versa
 * Sails supports: string, text, integer, float, date, datetime, boolean, binary, array, json
 * Ember Data supports: string, number, boolean, and date
 */

module.exports = {

  ember: new Map([
    ['text', 'string'],
    ['integer', 'number'],
    ['float', 'number'],
    ['datetime', 'date'],
    ['binary', 'string'],
    ['array', ''],
    ['json', '']
  ]),

  sails: new Map([
    ['number', 'float'],
    ['datetime', 'date']
  ]),

  convert: function(attributes, to) {
    var attributesCopy = attributes.slice(0);
    for (let i in attributesCopy) {
      if (attributesCopy.hasOwnProperty(i)) {
        var attrArray = attributesCopy[i].split(':');
        if (attrArray.length > 1) {
          var attrType = attrArray.pop();
          attrArray.push(this[to].has(attrType) ? `${this[to].get(attrType)}` : `${attrType}`);
          attributesCopy[i] = !attrArray[1] ? attrArray.join('') : attrArray.join(':');
        }
      }
    }
    return attributesCopy;
  }
};
