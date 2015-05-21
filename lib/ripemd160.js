/*
  CryptoJS v3.1.2 - code.google.com/p/crypto-js
  (c) 2009-2013 by Jeff Mott. All rights reserved.
  code.google.com/p/crypto-js/wiki/License
*/
/** @preserve (c) 2012 by Cédric Mesnil. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// constants table
var zl = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
  3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
  1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
  4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
]

var zr = [
  5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
  6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
  15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
  8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
  12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
]

var sl = [
  11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
  7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
  11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
  11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
  9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
]

var sr = [
  8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
  9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
  9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
  15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
  8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
]

var hl = [0x00000000, 0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xa953fd4e]
var hr = [0x50a28be6, 0x5c4dd124, 0x6d703ef3, 0x7a6d76e9, 0x00000000]

function bytesToWords (bytes) {
  var words = []
  for (var i = 0, b = 0; i < bytes.length; i++, b += 8) {
    words[b >>> 5] |= bytes[i] << (24 - b % 32)
  }
  return words
}

function wordsToBytes (words) {
  var bytes = []
  for (var b = 0; b < words.length * 32; b += 8) {
    bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF)
  }
  return bytes
}

function swapEndian (buffer, length) {
  length = length || buffer.length

  // swap endian
  for (var i = 0; i < length; ++i) {
    var x = buffer[i]

    buffer[i] = (((x << 8) | (x >>> 24)) & 0x00ff00ff) | (((x << 24) | (x >>> 8)) & 0xff00ff00)
  }
}

function f1 (x, y, z) {
  return (x ^ y ^ z)
}

function f2 (x, y, z) {
  return ((x & y) | ((~x) & z))
}

function f3 (x, y, z) {
  return ((x | (~y)) ^ z)
}

function f4 (x, y, z) {
  return ((x & z) | (y & (~z)))
}

function f5 (x, y, z) {
  return (x ^ (y | (~z)))
}

function rotl (x, n) {
  return (x << n) | (x >>> (32 - n))
}

function processBlock (M) {
  // Working variables
  var al, bl, cl, dl, el
  var ar, br, cr, dr, er

  ar = al = this._a | 0
  br = bl = this._b | 0
  cr = cl = this._c | 0
  dr = dl = this._d | 0
  er = el = this._e | 0

  var j = 0
  function loopLow(t) {
    var l = zl[j]

    t += (al + M[l]) | 0
    t = rotl(t | 0, sl[j])
    t = (t + el) | 0

    al = el
    el = dl
    dl = rotl(cl, 10)
    cl = bl
    bl = t
  }

  function loopHigh(t) {
    var l = zr[j]

    t += (ar + M[l]) | 0
    t = rotl(t | 0, sr[j])
    t = (t + er) | 0

    ar = er
    er = dr
    dr = rotl(cr, 10)
    cr = br
    br = t

    j++
  }

  // computation
  while (j < 16) {
    loopLow(f1(bl, cl, dl) + hl[0])
    loopHigh(f5(br, cr, dr) + hr[0])
  }

  while (j < 32) {
    loopLow(f2(bl, cl, dl) + hl[1])
    loopHigh(f4(br, cr, dr) + hr[1])
  }

  while (j < 48) {
    loopLow(f3(bl, cl, dl) + hl[2])
    loopHigh(f3(br, cr, dr) + hr[2])
  }

  while (j < 64) {
    loopLow(f4(bl, cl, dl) + hl[3])
    loopHigh(f2(br, cr, dr) + hr[3])
  }

  while (j < 80) {
    loopLow(f5(bl, cl, dl) + hl[4])
    loopHigh(f1(br, cr, dr) + hr[4])
  }

  // intermediate hash value
  var k = (this._b + cl + dr) | 0
  this._b = (this._c + dl + er) | 0
  this._c = (this._d + el + ar) | 0
  this._d = (this._e + al + br) | 0
  this._e = (this._a + bl + cr) | 0
  this._a = k
}

function ripemd160 (message) {
  if (typeof message === 'string') {
    message = new Buffer(message, 'utf8')
  }

  var m = bytesToWords(message)
  var nBitsLeft = message.length * 8
  var nBitsTotal = message.length * 8

  // Add padding
  m[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32)
  m[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
    (((nBitsTotal << 8) | (nBitsTotal >>> 24)) & 0x00ff00ff) |
    (((nBitsTotal << 24) | (nBitsTotal >>> 8)) & 0xff00ff00)
  )

  // process digest
  var H = {
    _a: 0x67452301,
    _b: 0xefcdab89,
    _c: 0x98badcfe,
    _d: 0x10325476,
    _e: 0xc3d2e1f0
  }

  for (var i = 0; i < m.length; i += 16) {
    var chunk = m.slice(i, i + 16)

    // swap endian
    swapEndian(chunk, 16)

    processBlock.call(H, chunk)
  }

  var h = new Buffer(20)
  h.writeInt32LE(H._a,  0)
  h.writeInt32LE(H._b,  4)
  h.writeInt32LE(H._c,  8)
  h.writeInt32LE(H._d, 12)
  h.writeInt32LE(H._e, 16)
  return h
}

module.exports = ripemd160
