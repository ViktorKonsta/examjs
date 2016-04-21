var Exam, isArray, isFunction, isPlainObject, isString, ref;

ref = require("lodash"), isArray = ref.isArray, isString = ref.isString, isPlainObject = ref.isPlainObject, isFunction = ref.isFunction;

module.exports = Exam = (function() {
  function Exam(examing) {
    if (isString(examing)) {
      this.examing = examing.toLowerCase();
    } else {
      throw new Error("Examing target must be a String");
    }
  }

  Exam.prototype.getNotFoundList = function() {
    var filter, foundString, i, len, ref1;
    this.notfound = [];
    foundString = this.found.join('');
    ref1 = this.filters;
    for (i = 0, len = ref1.length; i < len; i++) {
      filter = ref1[i];
      if (!foundString.match(filter)) {
        this.notfound.push(filter);
      }
    }
  };

  Exam.prototype.contains = function(filter) {
    if (this.examing.match(filter)) {
      return true;
    }
    return false;
  };

  Exam.prototype.atLeast = function(filters, callback) {
    return this.exact(filters, callback, true);
  };

  Exam.prototype.exact = function(filters, callback, softMode) {
    var filter, i, len, ref1;
    this.found = [];
    this.softMode = softMode || false;
    this.filters = isArray(filters) ? filters : [filters];
    ref1 = this.filters;
    for (i = 0, len = ref1.length; i < len; i++) {
      filter = ref1[i];
      if (this.contains(filter)) {
        this.found.push(filter);
      }
    }
    this.getNotFoundList();
    this.result = {
      found: this.found,
      notfound: this.notfound,
      filters: this.filters,
      examing: this.examing,
      mode: softMode ? "soft" : "strict"
    };
    if (this.found.length > 0 && this.notfound.length === 0) {
      this.result.yep = true;
    }
    if (this.notfound.length > 0 && this.found.length === 0) {
      this.result.nope = true;
    }
    if (callback) {
      callback(this.result);
      return this;
    }
    return new Promise(function(resolve, reject) {
      return resolve(this.result);
    });
  };

  return Exam;

})();
