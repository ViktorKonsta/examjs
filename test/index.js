var assert, chai, exam, sentence;

chai = require("chai");

assert = chai.assert;

exam = require("../dist/module");

sentence = "In our village, folks say God crumbles up the old moon into stars. Перевод недоступен.";

describe("Exam.js", function() {
  return describe(sentence, function() {
    describe("exact (callback)", function() {
      return it("Should find 'our', 'перевод' amd not find 'vill', 'перев' because of it's partition equality", function() {
        exam(sentence).exact(["our", "перевод", "vill", "перев"], function(result) {
          assert.deepEqual(result.found[0], "our");
          assert.deepEqual(result.found[1], "перевод");
          assert.deepEqual(result.notfound[0], "vill");
          assert.deepEqual(result.notfound[1], "перев");
          assert.deepEqual(result.mode, "strict");
          return console.log(result);
        });
        return exam(sentence).exact(["our", "moon", "vill"]);
      });
    });
    return describe("atLeast (callback)", function() {
      return it("Should find 'our', 'moon' amd 'vill'", function() {
        return exam(sentence).atLeast(["our", "moon", "vill"], function(result) {
          assert.deepEqual(result.found[0], "our");
          assert.deepEqual(result.found[1], "moon");
          assert.deepEqual(result.found[2], "vill");
          assert.deepEqual(result.notfound, null);
          assert.deepEqual(result.only.yep, true);
          return assert.deepEqual(result.mode, "soft");
        });
      });
    });
  });
});
