'use strict';

var stemmer;

/*
 * Module dependencies.
 */

stemmer = require('stemmer');

/**
 * `changetextinside` handler;
 *
 * @this Node
 */
function onchangeinside() {
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
    retext.TextOM.WordNode.on('changeinside', onchangeinside);
}

/*
 * Expose `porterStemmer`.
 */

module.exports = porterStemmer;
