'use strict';

var stemmer;

/**
 * Module dependencies.
 */

stemmer = require('stemmer');

/**
 * `changetextinside` handler;
 *
 * @this Node
 */

function onchangetextinside() {
    var value;

    value = this.toString();

    this.data.stem = value ? stemmer(value) : null;
}

/**
 * Define `porterStemmer`.
 *
 * @param {Retext} retext - Instance of Retext.
 */

function porterStemmer(retext) {
    var WordNode;

    WordNode = retext.parser.TextOM.WordNode;

    WordNode.on('changetextinside', onchangetextinside);
    WordNode.on('removeinside', onchangetextinside);
    WordNode.on('insertinside', onchangetextinside);
}

/**
 * Expose `porterStemmer`.
 */

module.exports = porterStemmer;
