var assert, chai, exam;

chai = require("chai");

assert = chai.assert;

exam = require("../dist/module");

describe("Exam.js", function() {
  it("Exam should be a function", function() {
    return assert.isFunction(exam);
  });
  return it("Should Exam 'hello world' and find hello", function() {
    return exam("hello world").find(["hello"]).yep(function() {
      console.log(this.found);
      return console.log(this.unfound);
    });
  });
});
