var Exam, includes, isArray;

isArray = require('lodash.isarray');

includes = require('lodash.includes');

module.exports = Exam = (function() {
  function Exam(examing) {
    if (typeof examing === 'string') {
      this.examing = examing.toLowerCase();
      this.examingArr = this.examing.split(" ");
    } else {
      throw new Error("Examing target must be a String");
    }
  }

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
    var filter, i, len, ref;
    this.found = [];
    this.notfound = [];
    this.softMode = softMode || false;
    this.filters = isArray(filters) ? filters : [filters];
    ref = this.filters;
    for (i = 0, len = ref.length; i < len; i++) {
      filter = ref[i];
      if (!this.different(filter)) {
        this.found.push(filter);
      } else {
        this.notfound.push(filter);
      }
    }
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
    if (callback != null) {
      callback(this.result);
      return this;
    }
    if (typeof Promise !== "undefined" && Promise !== null) {
      return new Promise((function(_this) {
        return function(resolve, reject) {
          return resolve(_this.result);
        };
      })(this));
    }
    return this;
  };

  return Exam;

})();
