var assert, chai, exam, sentence;

chai = require("chai");

assert = chai.assert;

exam = require("../dist/module");

sentence = "In our village, folks say God crumbles up the old moon into stars.";

describe("Exam.js", function() {
  return describe(sentence, function() {
    describe("exact()", function() {
      return it("Should find 'our', 'moon' amd not find 'vill' as it equals as part only", function() {
        return exam(sentence).exact(["our", "moon", "vill"], function(result) {
          assert.deepEqual(result.found[0], "our");
          assert.deepEqual(result.found[1], "moon");
          assert.deepEqual(result.notfound[2], "vill");
          return console.log(result);
        });
      });
    });
    return describe("atLeast()", function() {
      return it("Should find 'our', 'moon' amd 'vill'", function() {
        return exam(sentence).atLeast(["our", "moon", "vill"], function(result) {
          assert.deepEqual(result.found[0], "our");
          assert.deepEqual(result.found[1], "moon");
          assert.deepEqual(result.found[2], "vill");
          return console.log(result);
        });
      });
    });
  });
});
