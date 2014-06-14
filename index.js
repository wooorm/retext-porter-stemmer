'use strict';

exports = module.exports = function () {};

var stemmer = require('stemmer');

function onchangetext(value) {
    this.data.stem = value ? stemmer(value) : null;
}

function attach(retext) {
    retext.parser.TextOM.WordNode.on('changetext', onchangetext);
}

exports.attach = attach;
