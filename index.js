'use strict';

exports = module.exports = function () {};

var stemmer = require('stemmer');

function onchangetextinside() {
    var value = this.toString();
    this.data.stem = value ? stemmer(value) : null;
}

function attach(retext) {
    retext.parser.TextOM.WordNode.on('changetextinside', onchangetextinside);
    retext.parser.TextOM.WordNode.on('removeinside', onchangetextinside);
    retext.parser.TextOM.WordNode.on('insertinside', onchangetextinside);
}

exports.attach = attach;
