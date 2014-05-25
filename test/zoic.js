'use strict'
/*globals describe, it */
var chai = require('chai')
var expect = chai.expect
var exported = require('./exporting')
var exported2 = require('./exporting2')

describe('zoic', function () {
  it('should work', function () {
    expect(Object.keys(exported).join(' ')).to.equal('abcFn defFn')
    expect(Object.keys(exported2).join(' ')).to.equal('roar dogg')
  })
})
