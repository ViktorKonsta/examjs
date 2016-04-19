var assert, chai, exam;

chai = require("chai");

assert = chai.assert;

exam = require("../dist/module");

describe("Exam.js", function() {
  it("Exam should be a function", function() {
    return assert.isFunction(exam);
  });
  it("Should Exam 'hello world' and find 'hello'", function() {
    return exam("hello world").find(["hello"]).yep(function() {
      return assert.deepEqual(this.found[0], "hello");
    });
  });
  it("Should Exam 'visit my site' and not find 'shit'", function() {
    return exam("visit my site").find(["shit"]).nope(function() {
      return assert.deepEqual(this.unfound[0], "shit");
    });
  });
  return it("Should Exam 'My life is here' and find 'life' and not find 'lol'", function() {
    return exam("My life is here").find(["life", "lol"]).any(function() {
      assert.deepEqual(this.found[0], "life");
      return assert.deepEqual(this.unfound[0], "lol");
    });
  });
});
