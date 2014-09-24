# retext-porter-stemmer [![Build Status](https://travis-ci.org/wooorm/retext-porter-stemmer.svg?branch=master)](https://travis-ci.org/wooorm/retext-porter-stemmer) [![Coverage Status](https://img.shields.io/coveralls/wooorm/retext-porter-stemmer.svg)](https://coveralls.io/r/wooorm/retext-porter-stemmer?branch=master)

**[retext](https://github.com/wooorm/retext "Retext")** implementation of the [Porter stemming algorithm](http://tartarus.org/martin/PorterStemmer/).

## Installation

NPM:
```sh
$ npm install retext-porter-stemmer
```

Component.js:
```sh
$ component install wooorm/retext-porter-stemmer
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
None, the plugin automatically stems each word (using [wooorm/stemmer](https://github.com/wooorm/stemmer)) when its created or changed, and stores the stem in `wordNode.data.stem`.

## Related

- [retext-lancaster-stemmer](https://github.com/wooorm/retext-lancaster-stemmer) — Same workings, but using the Lancaster (Paice/Husk) stemming algorithm.

## License

MIT © Titus Wormer
