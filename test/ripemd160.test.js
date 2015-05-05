var assert = require('assert')
var ripemd160 = require('../')

// from http://homes.esat.kuleuven.be/~bosselae/ripemd160.html
var fixtures = require('./fixtures')

/* global describe, it */

describe('ripemd160(input)', function () {
  fixtures.valid.forEach(function (f) {
    if (typeof f.data === 'string') {
      if (f.encoding === 'utf8') {
        describe('> when input (' + f.data + ') encoding is utf8', function () {
          it('should accept a native string and produce a result', function () {
            var result = ripemd160(f.data)
            assert.equal(result.toString('hex'), (new Buffer(f.result, 'hex')).toString('hex'))
          })
        })
      }

      describe('> when input (' + (new Buffer(f.data, f.encoding)).toString('hex') + ')is any encoding', function () {
        it('should accept a buffer and produce a result', function () {
          var result = ripemd160(new Buffer(f.data, f.encoding))
          assert.equal(result.toString('hex'), (new Buffer(f.result, 'hex')).toString('hex'))
        })
      })
    }

    if (Array.isArray(f.data)) {
      describe('> when input (' + (new Buffer(f.data)).toString('hex') + ') is an array', function () {
        it('should accept a buffer and produce a result', function () {
          var result = ripemd160(f.data)
          assert.equal(result.toString('hex'), (new Buffer(f.result, 'hex')).toString('hex'))
        })
      })
    }
  })
})
