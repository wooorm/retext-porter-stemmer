(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.retextPorterStemmer = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"nlcst-to-string":2,"stemmer":3,"unist-util-visit":4}],2:[function(require,module,exports){
'use strict';

/**
 * Stringify an NLCST node.
 *
 * @param {NLCSTNode} nlcst
 * @return {string}
 */
function nlcstToString(nlcst) {
    var values,
        length,
        children;

    if (typeof nlcst.value === 'string') {
        return nlcst.value;
    }

    children = nlcst.children;
    length = children.length;

    /**
     * Shortcut: This is pretty common, and a small performance win.
     */

    if (length === 1 && 'value' in children[0]) {
        return children[0].value;
    }

    values = [];

    while (length--) {
        values[length] = nlcstToString(children[length]);
    }

    return values.join('');
}

/*
 * Expose `nlcstToString`.
 */

module.exports = nlcstToString;

},{}],3:[function(require,module,exports){
'use strict';

/*
 * Define few standard suffix manipulations.
 */

var step2list,
    step3list;

step2list = {
    'ational': 'ate',
    'tional': 'tion',
    'enci': 'ence',
    'anci': 'ance',
    'izer': 'ize',
    'bli': 'ble',
    'alli': 'al',
    'entli': 'ent',
    'eli': 'e',
    'ousli': 'ous',
    'ization': 'ize',
    'ation': 'ate',
    'ator': 'ate',
    'alism': 'al',
    'iveness': 'ive',
    'fulness': 'ful',
    'ousness': 'ous',
    'aliti': 'al',
    'iviti': 'ive',
    'biliti': 'ble',
    'logi': 'log'
};

step3list = {
    'icate': 'ic',
    'ative': '',
    'alize': 'al',
    'iciti': 'ic',
    'ical': 'ic',
    'ful': '',
    'ness': ''
};

/*
 * Define few consonant-vowel sequences.
 */

var consonant,
    vowel,
    consonantSequence,
    vowelSequence,
    EXPRESSION_MEASURE_GREATER_THAN_0,
    EXPRESSION_MEASURE_EQUAL_TO_1,
    EXPRESSION_MEASURE_GREATER_THAN_1,
    EXPRESSION_VOWEL_IN_STEM,
    EXPRESSION_CONSONANT_LIKE;

consonant = '[^aeiou]';
vowel = '[aeiouy]';
consonantSequence = '(' + consonant + '[^aeiouy]*)';
vowelSequence = '(' + vowel + '[aeiou]*)';

EXPRESSION_MEASURE_GREATER_THAN_0 = new RegExp(
    '^' + consonantSequence + '?' + vowelSequence + consonantSequence
);

EXPRESSION_MEASURE_EQUAL_TO_1 = new RegExp(
    '^' + consonantSequence + '?' + vowelSequence + consonantSequence +
    vowelSequence + '?$'
);

EXPRESSION_MEASURE_GREATER_THAN_1 = new RegExp(
    '^' + consonantSequence + '?' + '(' + vowelSequence +
    consonantSequence + '){2,}'
);

EXPRESSION_VOWEL_IN_STEM = new RegExp(
    '^' + consonantSequence + '?' + vowel
);

EXPRESSION_CONSONANT_LIKE = new RegExp(
    '^' + consonantSequence + vowel + '[^aeiouwxy]$'
);

/*
 * Define few exception-expressions.
 */

var EXPRESSION_SUFFIX_LL,
    EXPRESSION_SUFFIX_E,
    EXPRESSION_SUFFIX_Y,
    EXPRESSION_SUFFIX_ION,
    EXPRESSION_SUFFIX_ED_OR_ING,
    EXPRESSION_SUFFIX_AT_OR_BL_OR_IZ,
    EXPRESSION_SUFFIX_EED,
    EXPRESSION_SUFFIX_S,
    EXPRESSION_SUFFIX_SSES_OR_IES,
    EXPRESSION_SUFFIX_MULTI_CONSONANT_LIKE,
    EXPRESSION_STEP_2,
    EXPRESSION_STEP_3,
    EXPRESSION_STEP_4;

EXPRESSION_SUFFIX_LL = /ll$/;

EXPRESSION_SUFFIX_E = /^(.+?)e$/;

EXPRESSION_SUFFIX_Y = /^(.+?)y$/;

EXPRESSION_SUFFIX_ION = /^(.+?(s|t))(ion)$/;

EXPRESSION_SUFFIX_ED_OR_ING = /^(.+?)(ed|ing)$/;

EXPRESSION_SUFFIX_AT_OR_BL_OR_IZ = /(at|bl|iz)$/;

EXPRESSION_SUFFIX_EED = /^(.+?)eed$/;

EXPRESSION_SUFFIX_S = /^.+?[^s]s$/;

EXPRESSION_SUFFIX_SSES_OR_IES = /^.+?(ss|i)es$/;

EXPRESSION_SUFFIX_MULTI_CONSONANT_LIKE = /([^aeiouylsz])\1$/;

EXPRESSION_STEP_2 = new RegExp(
    '^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|' +
    'ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|' +
    'biliti|logi)$'
);

EXPRESSION_STEP_3 = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;

EXPRESSION_STEP_4 = new RegExp(
    '^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|' +
    'iti|ous|ive|ize)$'
);

/*
 * Detect the character code for `y`.
 */

var CHARACTER_CODE_Y;

CHARACTER_CODE_Y = 'y'.charCodeAt(0);

/**
 * Stem `value`.
 *
 * @param {string} value
 * @return {string} - Stem corresponding to `value`.
 */
function stemmer(value) {
    var firstCharacterWasLowerCaseY,
        match;

    value = String(value).toLowerCase();

    /*
     * Exit early.
     */

    if (value.length < 3) {
        return value;
    }

    /*
     * Detect initial `y`, make sure it never
     * matches.
     */

    if (value.charCodeAt(0) === CHARACTER_CODE_Y) {
        firstCharacterWasLowerCaseY = true;
        value = 'Y' + value.substr(1);
    }

    /*
     * Step 1a.
     */

    if (EXPRESSION_SUFFIX_SSES_OR_IES.test(value)) {
        /*
         * Remove last two characters.
         */

        value = value.substr(0, value.length - 2);
    } else if (EXPRESSION_SUFFIX_S.test(value)) {
        /*
         * Remove last character.
         */

        value = value.substr(0, value.length - 1);
    }

    /*
     * Step 1b.
     */

    if (match = EXPRESSION_SUFFIX_EED.exec(value)) {
        if (EXPRESSION_MEASURE_GREATER_THAN_0.test(match[1])) {
            /*
             * Remove last character.
             */

            value = value.substr(0, value.length - 1);
        }
    } else if (
        (match = EXPRESSION_SUFFIX_ED_OR_ING.exec(value)) &&
        EXPRESSION_VOWEL_IN_STEM.test(match[1])
    ) {
        value = match[1];

        if (EXPRESSION_SUFFIX_AT_OR_BL_OR_IZ.test(value)) {
            /*
             * Append `e`.
             */

            value += 'e';
        } else if (
            EXPRESSION_SUFFIX_MULTI_CONSONANT_LIKE.test(value)
        ) {
            /*
             * Remove last character.
             */

            value = value.substr(0, value.length - 1);
        } else if (EXPRESSION_CONSONANT_LIKE.test(value)) {
            /*
             * Append `e`.
             */

            value += 'e';
        }
    }

    /*
     * Step 1c.
     */

    if (
        (match = EXPRESSION_SUFFIX_Y.exec(value)) &&
        EXPRESSION_VOWEL_IN_STEM.test(match[1])
    ) {
        /*
         * Remove suffixing `y` and append `i`.
         */

        value = match[1] + 'i';
    }

    /*
     * Step 2.
     */

    if (
        (match = EXPRESSION_STEP_2.exec(value)) &&
        EXPRESSION_MEASURE_GREATER_THAN_0.test(match[1])
    ) {
        value = match[1] + step2list[match[2]];
    }

    /*
     * Step 3.
     */

    if (
        (match = EXPRESSION_STEP_3.exec(value)) &&
        EXPRESSION_MEASURE_GREATER_THAN_0.test(match[1])
    ) {
        value = match[1] + step3list[match[2]];
    }

    /*
     * Step 4.
     */

    if (match = EXPRESSION_STEP_4.exec(value)) {
        if (EXPRESSION_MEASURE_GREATER_THAN_1.test(match[1])) {
            value = match[1];
        }
    } else if (
        (match = EXPRESSION_SUFFIX_ION.exec(value)) &&
        EXPRESSION_MEASURE_GREATER_THAN_1.test(match[1])
    ) {
        value = match[1];
    }

    /*
     * Step 5.
     */

    if (
        (match = EXPRESSION_SUFFIX_E.exec(value)) &&
        (
            EXPRESSION_MEASURE_GREATER_THAN_1.test(match[1]) ||
            (
                EXPRESSION_MEASURE_EQUAL_TO_1.test(match[1]) &&
                !EXPRESSION_CONSONANT_LIKE.test(match[1])
            )
        )
    ) {
        value = match[1];
    }

    if (
        EXPRESSION_SUFFIX_LL.test(value) &&
        EXPRESSION_MEASURE_GREATER_THAN_1.test(value)
    ) {
        value = value.substr(0, value.length - 1);
    }

    /*
     * Turn initial `Y` back to `y`.
     */

    if (firstCharacterWasLowerCaseY) {
        value = 'y' + value.substr(1);
    }

    return value;
}

/*
 * Expose `stemmer`.
 */

module.exports = stemmer;

},{}],4:[function(require,module,exports){
/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer. All rights reserved.
 * @module unist:util:visit
 * @fileoverview Utility to recursively walk over unist nodes.
 */

'use strict';

/**
 * Walk forwards.
 *
 * @param {Array.<*>} values - Things to iterate over,
 *   forwards.
 * @param {function(*, number): boolean} callback - Function
 *   to invoke.
 * @return {boolean} - False if iteration stopped.
 */
function forwards(values, callback) {
    var index = -1;
    var length = values.length;

    while (++index < length) {
        if (callback(values[index], index) === false) {
            return false;
        }
    }

    return true;
}

/**
 * Walk backwards.
 *
 * @param {Array.<*>} values - Things to iterate over,
 *   backwards.
 * @param {function(*, number): boolean} callback - Function
 *   to invoke.
 * @return {boolean} - False if iteration stopped.
 */
function backwards(values, callback) {
    var index = values.length;
    var length = -1;

    while (--index > length) {
        if (callback(values[index], index) === false) {
            return false;
        }
    }

    return true;
}

/**
 * Visit.
 *
 * @param {Node} tree - Root node
 * @param {string} [type] - Node type.
 * @param {function(node): boolean?} callback - Invoked
 *   with each found node.  Can return `false` to stop.
 * @param {boolean} [reverse] - By default, `visit` will
 *   walk forwards, when `reverse` is `true`, `visit`
 *   walks backwards.
 */
function visit(tree, type, callback, reverse) {
    var iterate;
    var one;
    var all;

    if (typeof type === 'function') {
        reverse = callback;
        callback = type;
        type = null;
    }

    iterate = reverse ? backwards : forwards;

    /**
     * Visit `children` in `parent`.
     */
    all = function (children, parent) {
        return iterate(children, function (child, index) {
            return child && one(child, index, parent);
        });
    };

    /**
     * Visit a single node.
     */
    one = function (node, index, parent) {
        var result;

        index = index || (parent ? 0 : null);

        if (!type || node.type === type) {
            result = callback(node, index, parent || null);
        }

        if (node.children && result !== false) {
            return all(node.children, node);
        }

        return result;
    };

    one(tree);
}

/*
 * Expose.
 */

module.exports = visit;

},{}]},{},[1])(1)
});