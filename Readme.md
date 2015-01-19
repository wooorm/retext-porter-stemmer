# retext-porter-stemmer [![Build Status](https://img.shields.io/travis/wooorm/retext-porter-stemmer.svg?style=flat)](https://travis-ci.org/wooorm/retext-porter-stemmer) [![Coverage Status](https://img.shields.io/coveralls/wooorm/retext-porter-stemmer.svg?style=flat)](https://coveralls.io/r/wooorm/retext-porter-stemmer?branch=master)

**[retext](https://github.com/wooorm/retext)** implementation of the [Porter stemming algorithm](http://tartarus.org/martin/PorterStemmer/).

## Installation

[npm](https://docs.npmjs.com/cli/install):

```bash
$ npm install retext-porter-stemmer
```

[Component.js](https://github.com/componentjs/component):

```bash
$ component install wooorm/retext-porter-stemmer
```

[Bower](http://bower.io/#install-packages):

```bash
$ bower install retext-porter-stemmer
```

## Usage

```javascript
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

None, **retext-porter-stemmer** automatically detects the stem of each [`WordNode`](https://github.com/wooorm/textom#textomwordnode-nlcstwordnode) (using **[wooorm/stemmer](https://github.com/wooorm/stemmer)**), and stores the stem in `node.data.stem`.


## Performance

On a MacBook Air, **retext** performs about 11% slower with **retext-porter-stemmer**.

```text
           retext w/o retext-porter-stemmer
  221 op/s » A paragraph (5 sentences, 100 words)
   24 op/s » A section (10 paragraphs, 50 sentences, 1,000 words)

           retext w/ retext-porter-stemmer
  197 op/s » A paragraph (5 sentences, 100 words)
   20 op/s » A section (10 paragraphs, 50 sentences, 1,000 words)
```

## Related

- [retext-lancaster-stemmer](https://github.com/wooorm/retext-lancaster-stemmer) — Same workings, but uses the Lancaster (Paice/Husk) stemming algorithm.

## License

MIT © [Titus Wormer](http://wooorm.com)
