var ripemd160 = require('../lib/ripemd160')

require('terst')

describe('+ ripemd160(input)', function() {
  describe('> when input is a string', function() {
    it('should compute the ripemd160 hash', function() {
      var input = "hello"
      EQ (ripemd160(input), "108f07b8382412612c048d07d13f814118445acd")
    })
  })
})


