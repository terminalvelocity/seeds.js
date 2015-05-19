'use strict';
var assert = require('assert');
var camelcase = require('./lib/helpers/camelcase');

// it('should ', function () {
  assert.strictEqual(camelcase('unicorn-rainbows'), 'unicornRainbows');
// });