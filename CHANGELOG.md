# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v2.0.2](https://github.com/browserify/ripemd160/compare/2.0.1...v2.0.2) - 2018-04-19

### Merged

- Don't use the deprecated Buffer() constructor [`#20`](https://github.com/browserify/ripemd160/pull/20)
- code optimization (30%) [`#14`](https://github.com/browserify/ripemd160/pull/14)
- Not a markdown file [`#18`](https://github.com/browserify/ripemd160/pull/18)

### Commits

- Explicitly require 'buffer' [`651ae24`](https://github.com/browserify/ripemd160/commit/651ae24445a9486fdea1707e45309b28fee35cfa)

<!-- auto-changelog-above -->

2.0.1 / 2016-06-22
------------------
- added LICENSE file.

2.0.0 / 2016-04-11
------------------
- rewritten, license change BSD-3 to MIT. [#13][#13]
- stream support [#13][#13]

1.0.1 / 2015-05-05
------------------
- standard formatting

1.0.0 / 2015-01-14
------------------
- updated dev deps
- added more test fixtures
- updated readme with usage, testing, etc
- moved from https://github.com/cryptocoinjs/ripemd160 to https://github.com/crypto-browserify/ripemd160

0.2.1 / 2014-12-31
------------------
- made license clear in `package.json`
- deleted `Makefile`, moved targets to `package.json`
- removed `terst` for `assert`

0.2.0 / 2014-03-09
------------------
* removed bower.json and component.json
* changed 4 spacing to 2
* returns `Buffer` type now, input must be Array, Uint8Array, Buffer, or string
* remove deps: `convert-hex` and `convert-string`

0.1.0 / 2013-11-20
------------------
* changed package name
* removed AMD support

0.0.2 / 2013-11-06
------------------
* fixed component.json file

0.0.1 / 2013-11-03
------------------
* initial release

<!--- add streams support, unroll loops [enhancement] -->
[#13]: https://github.com/crypto-browserify/ripemd160/pull/13
<!--- Update all dependencies 🌴 [greenkeeper] -->
[#12]: https://github.com/crypto-browserify/ripemd160/pull/12
<!--- little optimizations [enhancement] -->
[#11]: https://github.com/crypto-browserify/ripemd160/pull/11
<!--- Added LICENSE file to repo -->
[#10]: https://github.com/crypto-browserify/ripemd160/pull/10
<!--- Add LICENCE file -->
[#9]: https://github.com/crypto-browserify/ripemd160/pull/9
<!--- Support streaming [enhancement] -->
[#8]: https://github.com/crypto-browserify/ripemd160/issues/8
<!--- Unroll loops [enhancement] -->
[#7]: https://github.com/crypto-browserify/ripemd160/pull/7
<!--- Use SPDX-standard license naming -->
[#6]: https://github.com/crypto-browserify/ripemd160/pull/6
<!--- License -->
[#5]: https://github.com/crypto-browserify/ripemd160/issues/5
<!--- Add BSD license to package.json -->
[#4]: https://github.com/crypto-browserify/ripemd160/pull/4
<!--- Indicate byte array inputs are supported too -->
[#3]: https://github.com/crypto-browserify/ripemd160/pull/3
<!--- Node-specific implementation -->
[#2]: https://github.com/crypto-browserify/ripemd160/pull/2
<!--- Incorrect name of convert-string dependency in bower.json -->
[#1]: https://github.com/crypto-browserify/ripemd160/pull/1
