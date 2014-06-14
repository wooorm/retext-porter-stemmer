# retext-porter-stemmer [![Build Status](https://travis-ci.org/wooorm/retext-porter-stemmer.svg?branch=master)](https://travis-ci.org/wooorm/retext-porter-stemmer) [![Coverage Status](https://img.shields.io/coveralls/wooorm/retext-porter-stemmer.svg)](https://coveralls.io/r/wooorm/retext-porter-stemmer?branch=master)

[![browser support](https://ci.testling.com/wooorm/retext-porter-stemmer.png) ](https://ci.testling.com/wooorm/retext-porter-stemmer)

See [Browser Support](#browser-support) for more information (a.k.a. don’t worry about those grey icons above).

---

**[retext](https://github.com/wooorm/retext "Retext")** implementation of the [Porter stemming algorithm](http://tartarus.org/martin/PorterStemmer/).

## Installation

```sh
$ npm install retext-porter-stemmer
```

## Usage

```js
var Retext = require('retext'),
    visit = require('retext-visit'),
    stemmer = require('retext-porter-stemmer');

var root = new Retext()
    .use(visit)
    .use(stemmer)
    .parse('A simple english sentence.');

root.visitType(root.WORD_NODE, function (node) {
    console.log(node.toString(), node.data.stem);
});
// 'A', 'A'
// 'simple', 'simpl'
// 'english', 'english'
// 'sentence', 'sentenc'
```

This example also uses [retext-visit](https://github.com/wooorm/retext-visit).

## API
None, the plugin automatically stems each word when its created or changed, and stores the stem in `wordNode.data.stem`.

## Browser Support
Pretty much every browser (available through browserstack) runs all retext-porter-stemmer unit tests.

## License

  MIT
