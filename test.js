'use strict';

/* eslint-env mocha */

/*
 * Dependencies.
 */

var assert = require('assert');
var retext = require('retext');
var visit = require('unist-util-visit');
var stemmer = require('./');

/*
 * Fixtures.
 */

var sentence = 'A simple, English, sentence';
var stems = ['a', 'simpl', 'english', 'sentenc'];

/*
 * Tests.
 */

describe('stemmer()', function () {
    retext().use(stemmer).process(sentence, function (err, file) {
        it('should work', function (done) {
            var index = -1;

            visit(file.namespace('retext').cst, 'WordNode', function (node) {
                assert('stem' in node.data);
                assert.equal(node.data.stem, stems[++index]);
            });

            done(err);
        });
    });
});
