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
var Retext = require('retext'),
    visit = require('retext-visit'),
    porterStemmer = require('retext-porter-stemmer'),
    retext;

retext = new Retext()
    .use(visit)
    .use(porterStemmer)

retext.parse('A simple english sentence.', function (err, tree) {
    tree.visitType(root.WORD_NODE, function (node) {
        console.log(node.toString(), node.data.stem);
    });
    /**
     * 'A', 'A'
     * 'simple', 'simpl'
     * 'english', 'english'
     * 'sentence', 'sentenc'
     */
});
```

The above example uses retext 0.2.0, which is currently in beta. For an example with the stable retext, see [retext-porter-stemmer@0.1.0](https://github.com/wooorm/retext-porter-stemmer/tree/0.1.0).

## API

None, the plugin automatically stems each word (using [wooorm/stemmer](https://github.com/wooorm/stemmer)) when it’s created or changed, and stores the stem in `wordNode.data.stem`.

## Related

- [retext-lancaster-stemmer](https://github.com/wooorm/retext-lancaster-stemmer) — Same workings, but uses the Lancaster (Paice/Husk) stemming algorithm.

## License

MIT © Titus Wormer
