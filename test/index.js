var assert, chai, exam;

chai = require("chai");

assert = chai.assert;

exam = require("../dist/module");

describe("Exam.js", function() {
  it("Exam should be a function", function() {
    return assert.isFunction(exam);
  });
  it("Should Exam 'hello world' and find 'hello'", function() {
    return exam("hello world").find(["hello"]).yep(function(result) {
      var filters, found, unfound;
      found = result.found, unfound = result.unfound, filters = result.filters;
      return assert.deepEqual(found[0], "hello");
    });
  });
  it("Should Exam 'visit my site' and not find 'shit'", function() {
    return exam("visit my site").find(["shit"]).nope(function(result) {
      var filters, found, unfound;
      found = result.found, unfound = result.unfound, filters = result.filters;
      return assert.deepEqual(unfound[0], "shit");
    });
  });
  it("Should Exam 'My life is here' and find 'life' and not find 'lol'", function() {
    return exam("My life is here").find(["life", "lol"]).any(function(result) {
      var filters, found, unfound;
      found = result.found, unfound = result.unfound, filters = result.filters;
      assert.deepEqual(found[0], "life");
      return assert.deepEqual(unfound[0], "lol");
    });
  });
  it("Should Exam 'My name is Viktor, I am 21.' and find different words, so make first - find 'name' and second - not find 'lol'", function() {
    return exam("My name is Viktor, I am 21.").find(["name"]).yep(function(result) {
      var filters, found, unfound;
      found = result.found, unfound = result.unfound, filters = result.filters;
      return assert.deepEqual(found[0], "name");
    }).find(["lol"]).nope(function(result) {
      var filters, found, unfound;
      found = result.found, unfound = result.unfound, filters = result.filters;
      return assert.deepEqual(unfound[0], "lol");
    });
  });
  it("Should Exam 'Yo, what's up' try to find 'yo' and this.filter should be equal to 'yo'", function() {
    return exam("Yo, what's up").find(["yo"]).any(function(result) {
      var filters, found, unfound;
      found = result.found, unfound = result.unfound, filters = result.filters;
      return assert.deepEqual(filters[0], "yo");
    });
  });
  return it("Should Exam 'My name is Viktor' and strictly not find 'na', 'm', 'vik'", function() {
    return exam("My name is Viktor").strictFind(["na", 'm', 'vik']).any(function(result) {
      var filters, found, unfound;
      found = result.found, unfound = result.unfound, filters = result.filters;
      assert.deepEqual(unfound[0], 'na');
      assert.deepEqual(unfound[1], 'm');
      return assert.deepEqual(unfound[2], 'vik');
    });
  });
});
