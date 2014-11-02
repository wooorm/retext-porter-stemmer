var porterStemmer = require('retext-porter-stemmer'),
    visit = require('retext-visit'),
    dom = require('retext-dom'),
    Retext = require('retext'),
    retext = new Retext().use(visit).use(porterStemmer).use(dom),
    inputElement = document.getElementsByTagName('textarea')[0],
    outputElement = document.getElementsByTagName('div')[0],
    style = document.styleSheets[0],
    stems = {}, currentDOMTree;

function hashCode(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}

function intToARGB(i){
    return ((i>>24)&0xFF).toString(16) +
           ((i>>16)&0xFF).toString(16) +
           ((i>>8)&0xFF).toString(16) +
           (i&0xFF).toString(16);
}

function getColourFromString(value) {
    value = intToARGB(hashCode(value)).slice(0, 6);

    while (value.length < 6) {
        value = '0' + value;
    }

    return '#' + value;
}

function addCSSRule(sheet, selector, rules) {
    if(sheet.insertRule) {
        sheet.insertRule(selector + '{' + rules + '}');
    } else {
        sheet.addRule(selector, rules);
    }
}

function onstem(stem) {
    var colour;

    if (stem in stems) {
        return;
    }

    colour = getColourFromString(stem)
    stems[stem] = colour;

    addCSSRule(style, '[data-stem="' + stem + '"]', 'color:' + colour);
}

function stemAll() {
    value = inputElement.value;

    if (currentDOMTree) {
        currentDOMTree.parentNode.removeChild(currentDOMTree);
    }

    retext.parse(value, function (err, tree) {
        if (err) {
            throw err;
        }

        tree.visit(function (node) {
            var stem;

            if (!node.DOMTagName || !node.data.stem) {
                return;
            }

            stem = node.data.stem.toLowerCase();

            onstem(stem);

            node.toDOMNode().setAttribute('data-stem', stem);
        });

        currentDOMTree = tree.toDOMNode();

        outputElement.appendChild(currentDOMTree);
    });
}

inputElement.addEventListener('input', stemAll);

stemAll();
