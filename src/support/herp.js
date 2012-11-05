/**
 *  A simple module for herping a sentence.
 */
define([], function() {
    'use strict';

    function standardRng(max) {
        return Math.floor(Math.random() * max);
    }

    function choice(choices, rng) {
        return function() {
            return choices[rng(choices.length)];
        }
    }

    function wordHerper(chooser) {
        return function(word) {
            if (word.length < 4) {
                return word;
            }
            var herped = chooser();
            if (word.charAt(word.length - 1) === 's') {
                herped += 's';
            }
            return herped;
        }
    }

    function sentenceHerper(herpedWord) {
        return function(sentence) {
            var replacements = sentence.replace(/(\b[\w\-]+)/gi, herpedWord);
            return replacements;
        }
    }

    return {
        _choice: choice,
        _wordHerper: wordHerper,
        _sentenceHerper: sentenceHerper,
        herp: function(wordList) {
            var chooser        = choice(wordList, standardRng),
                herpedWord     = wordHerper(chooser),
                herpedSentence = sentenceHerper(herpedWord);

            return herpedSentence;
        }
    }
});