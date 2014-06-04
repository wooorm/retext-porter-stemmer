# retext-porter-stemmer [![Build Status](https://travis-ci.org/wooorm/retext-porter-stemmer.png)](https://travis-ci.org/wooorm/retext-porter-stemmer)

**[retext](https://github.com/wooorm/retext "Retext")** implementation of [the Porter stemming algorithm](http://tartarus.org/martin/PorterStemmer/).

## Installation

### With NPM

```sh
$ npm install retext-porter-stemmer
```

### Git

```sh
git clone https://github.com/wooorm/retext-porter-stemmer.git
cd retext-porter-stemmer
```

## Usage

```js
var Retext = require('retext'),
    visit = require('retext-visit');
    porterStemmer = require('retext-porter-stemmer');

var root = new Retext()
    .use(visit)
    .use(porterStemmer)
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

## License

  MIT
