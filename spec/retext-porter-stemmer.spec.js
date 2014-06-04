
var porterStemmer = require('..'),
    Retext = require('retext'),
    visit = require('retext-visit'),
    assert = require('assert'),
    fs = require('fs'),
    inputs, outputs;

inputs = fs.readFileSync('./spec/input.txt', 'utf-8').split('\n');
outputs = fs.readFileSync('./spec/output.txt', 'utf-8').split('\n');

// The the last input item is an empty string, when autostemming an empty
// string the `stem` attribute on `WordNode.data` is reset to `null`.
outputs[outputs.length - 1] = null;

describe('porterStemmer()', function () {
    it('should be of type `function`', function () {
        assert(typeof porterStemmer === 'function');
    });

    var tree = new Retext()
        .use(visit)
        .use(porterStemmer)
        .parse('A simple, english, sentence');

    it('should stem each `WordNode`', function () {
        tree.visitType(tree.WORD_NODE, function (wordNode) {
            assert('stem' in wordNode.data);
        });
    });

    it('should automatically re-stem `WordNode`s when their values change',
        function () {
            var iterator = 1234;
            tree.visitType(tree.WORD_NODE, function (wordNode) {
                wordNode.fromString(inputs[++iterator]);
                assert(wordNode.data.stem === outputs[iterator]);
            });
    });
});

describe('stemming', function () {
    var tree = new Retext().use(porterStemmer).parse('Test'),
        wordNode = tree.head.head.head;

    inputs.forEach(function (input, index) {
        wordNode.fromString(input);
        var output = outputs[index],
            stem = wordNode.data.stem;
        it('should stem `' + input + '` to `' + output + '`', function () {
            assert(stem === output);
        });
    });
});
