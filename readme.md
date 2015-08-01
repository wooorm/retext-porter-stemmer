# retext-porter-stemmer [![Build Status](https://img.shields.io/travis/wooorm/retext-porter-stemmer.svg)](https://travis-ci.org/wooorm/retext-porter-stemmer) [![Coverage Status](https://img.shields.io/codecov/c/github/wooorm/retext-porter-stemmer.svg)](https://codecov.io/github/wooorm/retext-porter-stemmer)

[**retext**](https://github.com/wooorm/retext) implementation of the [Porter stemming algorithm](http://tartarus.org/martin/PorterStemmer/).

## Installation

[npm](https://docs.npmjs.com/cli/install):

```bash
npm install retext-porter-stemmer
```

**retext-porter-stemmer** is also available for [bower](http://bower.io/#install-packages),
[component](https://github.com/componentjs/component), and
[duo](http://duojs.org/#getting-started), and as an AMD, CommonJS, and globals
module, [uncompressed](retext-porter-stemmer.js) and
[compressed](retext-porter-stemmer.min.js).

## Usage

```js
var retext = require('retext');
var inspect = require('unist-util-inspect');
var stemmer = require('retext-porter-stemmer');

retext().use(stemmer).use(function () {
    return function (cst) {
        console.log(inspect(cst));
    };
}).process('A simple English sentence.');
```

Yields:

```text
RootNode[1]
└─ ParagraphNode[1]
   └─ SentenceNode[8]
      ├─ WordNode[1] [data={"stem":"a"}]
      │  └─ TextNode: 'A'
      ├─ WhiteSpaceNode: ' '
      ├─ WordNode[1] [data={"stem":"simpl"}]
      │  └─ TextNode: 'simple'
      ├─ WhiteSpaceNode: ' '
      ├─ WordNode[1] [data={"stem":"english"}]
      │  └─ TextNode: 'English'
      ├─ WhiteSpaceNode: ' '
      ├─ WordNode[1] [data={"stem":"sentenc"}]
      │  └─ TextNode: 'sentence'
      └─ PunctuationNode: '.'
```

## API

None, **retext-porter-stemmer** automatically detects the stem of each
[`WordNode`](https://github.com/wooorm/nlcst#wordnode) (using
[**wooorm/stemmer**](https://github.com/wooorm/stemmer)), and stores the stem
in `node.data.stem`.

## Related

*   [retext-lancaster-stemmer](https://github.com/wooorm/retext-lancaster-stemmer)
    — Uses the Lancaster (Paice/Husk) stemming algorithm.

## License

[MIT](LICENSE) © [Titus Wormer](http://wooorm.com)
