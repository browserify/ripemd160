var ripemd160 = require('../lib/ripemd160')

require('terst')

describe('+ ripemd160(input)', function() {
  describe('> when input is a string', function() {
    it('should compute the ripemd160 hash', function() {
      var input = "hello"
      EQ (ripemd160(input), "108f07b8382412612c048d07d13f814118445acd")
    }),
	it('should return an array when asked', function() {
		var test = ripemd160('hello', { asBytes:true });
		T (Array.isArray(test));
		EQ (test.join(','), '16,143,7,184,56,36,18,97,44,4,141,7,209,63,129,65,24,68,90,205');
	}),
	it('should return a binary string when asked', function() {
		var test = ripemd160('hello', { asString:true });
		var chars = [16,143,7,184,56,36,18,97,44,4,141,7,209,63,129,65,24,68,90,205];
		EQ (test, chars.reduce(function(prev, cur, index, arr) {
			return prev+String.fromCharCode(cur);
		}, ''));
	})
  })
})


