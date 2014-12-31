var assert = require('assert')
var ripemd160 = require('../lib/ripemd160')

require('terst')

describe('+ ripemd160(input)', function() {
  describe('> when input is a string', function() {
    it('should compute the ripemd160 hash', function() {
      var input = "hello";
      assert.equal(ripemd160(input).toString('hex'), "108f07b8382412612c048d07d13f814118445acd")
    })
  })

  describe('> when input is a buffer', function() {
    it('should compute the ripemd160 hash', function() {
      var input = new Buffer("hello");
      assert.equal(ripemd160(input).toString('hex'), "108f07b8382412612c048d07d13f814118445acd")
    })
  })
})


