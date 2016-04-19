var assert, chai, exam;

chai = require("chai");

assert = chai.assert;

exam = require("../dist/module");

describe("Exam.js", function() {
  return it("Exam should be a function", function() {
    return assert.isFunction(exam);
  });
});
