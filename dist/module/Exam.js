var Exam, includes, isArray, isFunction, isPlainObject, isString, ref;

ref = require("lodash"), isArray = ref.isArray, isString = ref.isString, isPlainObject = ref.isPlainObject, isFunction = ref.isFunction, includes = ref.includes;

module.exports = Exam = (function() {
  function Exam(examing) {
    if (isString(examing)) {
      this.examing = examing.toLowerCase();
      this.examingArr = this.examing.split(" ");
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

  Exam.prototype.different = function(filter) {
    if (this.softMode) {
      if (this.examing.match(filter)) {
        return false;
      }
    } else {
      if (includes(this.examingArr, filter)) {
        return false;
      }
    }
    return true;
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
      if (!this.different(filter)) {
        this.found.push(filter);
      }
    }
    this.getNotFoundList();
    this.result = {
      found: this.found.length > 0 ? this.found : null,
      notfound: this.notfound.length > 0 ? this.notfound : null,
      filters: this.filters,
      examing: this.examing,
      mode: softMode ? "soft" : "strict"
    };
    if (this.found.length > 0 && this.notfound.length === 0) {
      this.result.only = {};
      this.result.only.yep = true;
    }
    if (this.notfound.length > 0 && this.found.length === 0) {
      this.result.only = {};
      this.result.only.nope = true;
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
