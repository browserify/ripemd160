# ripemd160

JavaScript component to compute the RIPEMD160 hash of strings or bytes.

## Install

### Node.js/Browserify

    npm install --save ripemd160

### Component

    component install cryptocoinjs/ripemd160

### Bower

    bower install ripemd160

### Script

```html
<script src="/path/to/ripemd160.js"></script>
```


## Usage
Basic usage accepts a string or an array of bytes and outputs a hex-encoded string:

```js
ripemd160('hello'); // "108f07b8382412612c048d07d13f814118445acd"
```

Input is either an array of bytes or a string. **String are always interpreted as binary data**; if you have a hex-encoded string of data to parse, first convert it to a binary string or array of bytes.

Output by default is a hexadecimal-encoded string. Other options are an array of bytes, or a binary-encoded string:

```js
ripemd160('hello');   // "108f07b8382412612c048d07d13f814118445acd" <= Hex-encoded; default
ripemd160('hello', { asBytes: true }); // [16,143,7,184,56,36,18,97,44,4,141,7,209,63,129,65,24,68,90,205] <= Array of bytes
ripemd160('hello', { asString: true }); // "¸8$a,Ñ?ADZÍ" <= Binary-encoded string
```

## Test

Unit tests are written in [Mocha](http://visionmedia.github.io/mocha/). To run the test suite, checkout the git repository, and from within the base folder run:

```sh
$ npm install --dev
$ ./node_modules/mocha/bin/mocha
```

# Credits

Most of the code from CryptoJS https://code.google.com/p/crypto-js/

# License

(MIT License)

Copyright 2013, JP Richardson  <jprichardson@gmail.com>

