ripemd160
=========

[![NPM Package](https://img.shields.io/npm/v/ripemd160.svg?style=flat-square)](https://www.npmjs.org/package/ripemd160)
[![Build Status](https://img.shields.io/travis/crypto-browserify/ripemd160.svg?branch=master&style=flat-square)](https://travis-ci.org/crypto-browserify/ripemd160)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

JavaScript component to compute the RIPEMD-160 hash of strings or bytes. This hash is commonly used in crypto currencies
like Bitcoin.

Usage
-----

### Install

    npm install --save ripemd160


### ripemd160(input)

`input` should be either a `string`, `Buffer`, or an `Array`. It returns a `Buffer`.

**example 1**:

```js
var ripemd16 = require('ripemd160')

var data = 'hello'
var result = ripemd160(data)
console.log(result.toString('hex'))
// => 108f07b8382412612c048d07d13f814118445acd
```

**example 2**:

```js
var ripemd16 = require('ripemd160')

var data = new Buffer('hello', 'utf8')
var result = ripemd160(data)
console.log(result.toString('hex'))
// => 108f07b8382412612c048d07d13f814118445acd
```


#### Converting Buffers

If you're not familiar with the Node.js ecosystem, type `Buffer` is a common way that a developer can pass around
binary data. `Buffer` also exists in the [Browserify](http://browserify.org/) environment. Converting to and from Buffers is very easy.

##### To buffer

```js
// from string
var buf = new Buffer('some string', 'utf8')

// from hex string
var buf = new Buffer('3f5a4c22', 'hex')

// from array
var buf = new Buffer([1, 2, 3, 4])
```

#### From buffer

```js
// to string
var str = buf.toString('utf8')

// to hex string
var hex = buf.toString('hex')

// to array
var arr = [].slice.call(buf)
```

License
-------

Licensed: MIT License
