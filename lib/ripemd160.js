/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
/** @preserve
(c) 2012 by Cédric Mesnil. All rights reserved.

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

function f1 (x, y, z) {
  return x ^ y ^ z
}

function f2 (x, y, z) {
  return (x & y) | ((~x) & z)
}

function f3 (x, y, z) {
  return (x | (~y)) ^ z
}

function f4 (x, y, z) {
  return (x & z) | (y & (~z))
}

function f5 (x, y, z) {
  return x ^ (y | (~z))
}

function rotl (x, n) {
  return (x << n) | (x >>> (32 - n))
}

function processBlock (H, words, offset) {
  for (var j = 0; j < 16; ++j) words[offset + j] = words[offset + j] | 0

  // Working variables
  var al, bl, cl, dl, el
  var ar, br, cr, dr, er

  ar = al = H[0]
  br = bl = H[1]
  cr = cl = H[2]
  dr = dl = H[3]
  er = el = H[4]

  // computation
  var t
  for (var i = 0; i < 80; i += 1) {
    if (i < 16) {
      t = (al + words[offset + zl[i]] + f1(bl, cl, dl) + hl[0]) | 0
    } else if (i < 32) {
      t = (al + words[offset + zl[i]] + f2(bl, cl, dl) + hl[1]) | 0
    } else if (i < 48) {
      t = (al + words[offset + zl[i]] + f3(bl, cl, dl) + hl[2]) | 0
    } else if (i < 64) {
      t = (al + words[offset + zl[i]] + f4(bl, cl, dl) + hl[3]) | 0
    } else { // if (i<80) {
      t = (al + words[offset + zl[i]] + f5(bl, cl, dl) + hl[4]) | 0
    }
    t = (rotl(t, sl[i]) + el) | 0
    al = el
    el = dl
    dl = rotl(cl, 10)
    cl = bl
    bl = t

    if (i < 16) {
      t = (ar + words[offset + zr[i]] + f5(br, cr, dr) + hr[0]) | 0
    } else if (i < 32) {
      t = (ar + words[offset + zr[i]] + f4(br, cr, dr) + hr[1]) | 0
    } else if (i < 48) {
      t = (ar + words[offset + zr[i]] + f3(br, cr, dr) + hr[2]) | 0
    } else if (i < 64) {
      t = (ar + words[offset + zr[i]] + f2(br, cr, dr) + hr[3]) | 0
    } else { // if (i<80) {
      t = (ar + words[offset + zr[i]] + f1(br, cr, dr) + hr[4]) | 0
    }
    t = (rotl(t, sr[i]) + er) | 0
    ar = er
    er = dr
    dr = rotl(cr, 10)
    cr = br
    br = t
  }

  // intermediate hash value
  t = (H[1] + cl + dr) | 0
  H[1] = (H[2] + dl + er) | 0
  H[2] = (H[3] + el + ar) | 0
  H[3] = (H[4] + al + br) | 0
  H[4] = (H[0] + bl + cr) | 0
  H[0] = t
}

function ripemd160 (message) {
  if (typeof message === 'string') {
    message = new Buffer(message, 'utf8')
  }

  var words = []
  for (var i = 0, b = 0; i < message.length; i++, b += 8) {
    words[b >>> 5] |= message[i] << b % 32
  }

  // Add padding
  var nBits = message.length * 8
  words[nBits >>> 5] |= 0x80 << nBits % 32
  words[(((nBits + 64) >>> 9) << 4) + 14] = nBits

  var H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0]
  for (var j = 0; j < words.length; j += 16) processBlock(H, words, j)

  var digest = new Buffer(20)
  digest.writeUInt32LE(H[0] >>> 0, 0)
  digest.writeUInt32LE(H[1] >>> 0, 4)
  digest.writeUInt32LE(H[2] >>> 0, 8)
  digest.writeUInt32LE(H[3] >>> 0, 12)
  digest.writeUInt32LE(H[4] >>> 0, 16)
  return digest
}

module.exports = ripemd160
