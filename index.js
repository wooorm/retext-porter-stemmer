/**
 * @author Titus Wormer
 * @copyright 2014-2015 Titus Wormer
 * @license MIT
 * @module retext:porter-stemmer
 * @fileoverview Retext implementation of the Porter stemming algorithm.
 */

'use strict';

/*
 * Dependencies.
 */

var stemmer = require('stemmer');
var visit = require('unist-util-visit');
var nlcstToString = require('nlcst-to-string');

/**
 * Patch a `stem` property on `node` (a word-node).
 *
 * @param {NLCSTWordNode} node - Node.
 */
function patch(node) {
    var data = node.data || {};

    data.stem = stemmer(nlcstToString(node));

    node.data = data;
}

/**
 * Transformer.
 *
 * @param {NLCSTNode} cst - Syntax tree.
 */
function transformer(cst) {
    visit(cst, 'WordNode', patch);
}

/**
 * Attacher.
 *
 * @return {Function} - `transformer`.
 */
function attacher() {
    return transformer;
}

/*
 * Expose.
 */

module.exports = attacher;
