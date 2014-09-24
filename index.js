'use strict';

var stemmer;

/**
 * Module dependencies.
 */

stemmer = require('stemmer');

/**
 * Define `porterStemmer`;
 */

function porterStemmer() {}

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
 * Define `attach`.
 *
 * @param {Retext} retext - Instance of Retext.
 */

function attach(retext) {
    var WordNode;

    WordNode = retext.parser.TextOM.WordNode;

    WordNode.on('changetextinside', onchangetextinside);
    WordNode.on('removeinside', onchangetextinside);
    WordNode.on('insertinside', onchangetextinside);
}

/**
 * Expose `attach`.
 */

porterStemmer.attach = attach;

/**
 * Expose `porterStemmer`.
 */

module.exports = porterStemmer;
