var tap = require('tap')
var ripemd160 = require('../')

// from http://homes.esat.kuleuven.be/~bosselae/ripemd160.html
var fixtures = require('./fixtures')

tap.test('ripemd160(input)', function (t) {
  fixtures.valid.forEach(function (f) {
    if (typeof f.data === 'string') {
      if (f.encoding === 'utf8') {
        t.test('> when input (' + f.data + ') encoding is utf8', function (t) {
          t.test('should accept a native string and produce a result', function (t) {
            var result = ripemd160(f.data)
            t.same(result.toString('hex'), (new Buffer(f.result, 'hex')).toString('hex'))
            t.end()
          })

          t.end()
        })
      }

      t.test('> when input (' + (new Buffer(f.data, f.encoding)).toString('hex') + ')is any encoding', function (t) {
        t.test('should accept a buffer and produce a result', function (t) {
          var result = ripemd160(new Buffer(f.data, f.encoding))
          t.same(result.toString('hex'), (new Buffer(f.result, 'hex')).toString('hex'))
          t.end()
        })

        t.end()
      })
    }

    if (Array.isArray(f.data)) {
      t.test('> when input (' + (new Buffer(f.data)).toString('hex') + ') is an array', function (t) {
        t.test('should accept a buffer and produce a result', function (t) {
          var result = ripemd160(f.data)
          t.same(result.toString('hex'), (new Buffer(f.result, 'hex')).toString('hex'))
          t.end()
        })

        t.end()
      })
    }
  })

  t.end()
})
