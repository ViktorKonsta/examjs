var assert, chai, exam;

chai = require("chai");

assert = chai.assert;

exam = require("../dist/module");

describe("Exam.js", function() {
  return it("Exam should be a function", function() {
    assert.isFunction(exam);
    return exam("My name is Viktor").find(["name"]).yep(function() {
      console.log(this.detected);
      return console.log(this.undetected);
    });
  });
});
