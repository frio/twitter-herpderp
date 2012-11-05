define(['src/support/herp.js'], function(H) {
    // our random generator normally should use Math.random() to return something,
    // but we want to test deterministically
    function mockRandomGenerator(length) {
        return 0;
    }

    describe("the herp module", function() {
        'use strict';

        it("provides a function which returns a random word", function() {
            // we use the mock random generator here, so that we can test deterministically
            var chooser = H._choice(["herp", "derp"], mockRandomGenerator);
            expect(chooser()).toBe("herp");
        });

        describe("the word herper", function() {
            var chooser,
                herped;

            beforeEach(function() {
                chooser = H._choice(["herp"], mockRandomGenerator);
                herped  = H._wordHerper(chooser);
            });

            it("won't convert words less than length 4", function() {
                expect(herped("a")).toBe("a");
                expect(herped("it")).toBe("it");
                expect(herped("the")).toBe("the");
            });

            it("will herp singular words of length 4 or over", function() {
                expect(herped("schrodinger")).toBe("herp");
                expect(herped("mozart")).toBe("herp");
                expect(herped("feynman")).toBe("herp");
            });

            it("will leave plurals as plurals", function() {
                expect(herped("musicians")).toBe("herps");
                expect(herped("philosphers")).toBe("herps");
                expect(herped("scientists")).toBe("herps");
            });
        });

        describe("the sentence herper", function() {
            var chooser,
                herpedWord,
                herpedSentence;

            beforeEach(function() {
                chooser        = H._choice(["herp"], mockRandomGenerator);
                herpedWord     = H._wordHerper(chooser);
                herpedSentence = H._sentenceHerper(herpedWord);
            });

            it("will herp a sentence as per the word herper!", function() {
                expect(herpedSentence("the scientist named feynman is amazing")).toBe("the herp herp herp is herp");
            });

            it("won't herp hashtags", function() {
                expect(herpedSentence("wow so impressive #science")).toBe("wow so herp #herp");
            });
        });

        describe("and when we integrate everything, Herper will...", function() {
            it("can herp a sentence, with a simple API!", function() {
                var herp = H.herp(["herp"]);
                expect(herp("geekzone is one of the best sites on the internet")).
                    toBe("herp is one of the herp herps on the herp");
            });
        })
        
    });

});
