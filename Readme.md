# retext-porter-stemmer [![Build Status](https://img.shields.io/travis/wooorm/retext-porter-stemmer.svg?style=flat)](https://travis-ci.org/wooorm/retext-porter-stemmer) [![Coverage Status](https://img.shields.io/coveralls/wooorm/retext-porter-stemmer.svg?style=flat)](https://coveralls.io/r/wooorm/retext-porter-stemmer?branch=master)

**[retext](https://github.com/wooorm/retext "Retext")** implementation of the [Porter stemming algorithm](http://tartarus.org/martin/PorterStemmer/).

## Installation

npm:
```sh
$ npm install retext-porter-stemmer
```

Component:
```sh
$ component install wooorm/retext-porter-stemmer
```

Bower:
```sh
$ bower install retext-porter-stemmer
```

## Usage

```js
var Retext = require('retext');
var visit = require('retext-visit');
var inspect = require('retext-inspect');
var porterStemmer = require('retext-porter-stemmer');

var retext = new Retext()
    .use(inspect)
    .use(visit)
    .use(porterStemmer)

retext.parse('A simple english sentence.', function (err, tree) {
    tree.visit(tree.WORD_NODE, function (node) {
        console.log(node);
    });
    /**
     * WordNode[1] [data={"stem":"a"}]
     * └─ TextNode: 'A'
     * WordNode[1] [data={"stem":"simpl"}]
     * └─ TextNode: 'simple'
     * WordNode[1] [data={"stem":"english"}]
     * └─ TextNode: 'english'
     * WordNode[1] [data={"stem":"sentenc"}]
     * └─ TextNode: 'sentence'
     */
});
```

## API

None, the plugin automatically stems each word (using [wooorm/stemmer](https://github.com/wooorm/stemmer)), and stores the stem in `wordNode.data.stem`.

## Related

- [retext-lancaster-stemmer](https://github.com/wooorm/retext-lancaster-stemmer) — Same workings, but uses the Lancaster (Paice/Husk) stemming algorithm.

## License

MIT © Titus Wormer
