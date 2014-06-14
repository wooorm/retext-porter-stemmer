'use strict';

var porterStemmer, Retext, visit, assert, tree, otherWords, otherStems;

porterStemmer = require('..');
Retext = require('retext');
visit = require('retext-visit');
assert = require('assert');

tree = new Retext()
    .use(visit)
    .use(porterStemmer)
    .parse('A simple, english, sentence');

otherWords = ['An', 'easy', 'normal', 'paragraph'];
otherStems = ['An', 'easi', 'normal', 'paragraph'];

describe('porterStemmer()', function () {
    it('should be of type `function`', function () {
        assert(typeof porterStemmer === 'function');
    });

    it('should stem each `WordNode`', function () {
        tree.visitType(tree.WORD_NODE, function (wordNode) {
            assert('stem' in wordNode.data);
        });
    });

    it('should set each stem to `null` when a WordNode (no longer?) has ' +
        'a value', function () {
            tree.visitType(tree.WORD_NODE, function (wordNode) {
                wordNode.fromString();
                assert(wordNode.data.stem === null);
            });
    });

    it('should automatically re-stem `WordNode`s when their values change',
        function () {
            var iterator = -1;
            tree.visitType(tree.WORD_NODE, function (wordNode) {
                wordNode.fromString(otherWords[++iterator]);
                assert(wordNode.data.stem === otherStems[iterator]);
            });
    });
});
