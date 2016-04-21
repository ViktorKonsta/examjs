var assert, chai, exam, sentence;

chai = require("chai");

assert = chai.assert;

exam = require("../dist/module");

sentence = "In our village, folks say God crumbles up the old moon into stars. Перевод недоступен... Really?";

describe("Exam.js", function() {
  return describe(sentence, function() {
    describe("Should find 'our', 'перевод' amd not find 'vill', 'перев' because of it's partition equality", function() {
      var resultFunction, searchArray;
      searchArray = ["our", "перевод", "vill", "перев"];
      resultFunction = function(result) {
        assert.deepEqual(result.found[0], "our");
        assert.deepEqual(result.found[1], "перевод");
        assert.deepEqual(result.notfound[0], "vill");
        assert.deepEqual(result.notfound[1], "перев");
        return assert.deepEqual(result.mode, "strict");
      };
      it("exact (callback)", function() {
        return exam(sentence).exact(searchArray, resultFunction);
      });
      return it("exact (promise)", function() {
        return exam(sentence).exact(searchArray).then(resultFunction);
      });
    });
    describe("Should find 'our', 'moon', 'vill' and 'перев'", function() {
      var resultFunction, searchArray;
      searchArray = ["our", "moon", "vill", "перев"];
      resultFunction = function(result) {
        assert.deepEqual(result.found[0], "our");
        assert.deepEqual(result.found[1], "moon");
        assert.deepEqual(result.found[2], "vill");
        assert.deepEqual(result.found[3], "перев");
        assert.deepEqual(result.notfound, null);
        assert.deepEqual(result.only.yep, true);
        return assert.deepEqual(result.mode, "soft");
      };
      it("atLeast (callback)", function() {
        return exam(sentence).atLeast(searchArray, resultFunction).atLeast(searchArray, resultFunction);
      });
      return it("atLeast (promise)", function() {
        return exam(sentence).atLeast(searchArray).then(resultFunction);
      });
    });
    return describe("Should return a result of '?' and '...' searching", function() {
      return it("atLeast (promise)", function() {
        return exam("a... you? me! so. boring, bring me a coffee??").exact(["...", "!", ".", ",", "?"]).then(function(result) {
          return assert.deepEqual(result.decoded[result.decoded.length - 1], "??");
        });
      });
    });
  });
});
