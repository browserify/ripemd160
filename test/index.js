'use strict'
var test = require('tape').test
var vectors = require('hash-test-vectors')

var RIPEMD160 = require('../')

vectors.forEach(function (vector, i) {
  var input = new Buffer(vector.input, 'base64')

  test('vector #' + (i + 1) + ' with .update', function (t) {
    t.same(new RIPEMD160().update(input).digest('hex'), vector.ripemd160)
    t.end()
  })

  test('vector #' + (i + 1) + ' with streams', function (t) {
    var hash = new RIPEMD160()
    hash.end(input)
    t.same(hash.read().toString('hex'), vector.ripemd160)
    t.end()
  })
})
