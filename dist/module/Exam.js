var Exam;

module.exports = Exam = (function() {
  function Exam(examObject) {
    if (typeof examObject === 'string') {
      this.examObject = examObject.toLowerCase();
    } else {
      this.examObject = examObject.textContent.toLowerCase();
    }
  }

  Exam.prototype.undetect = function() {
    var filter, foundString, i, len, ref;
    foundString = this.found.join('');
    ref = this.filters;
    for (i = 0, len = ref.length; i < len; i++) {
      filter = ref[i];
      if (!foundString.match(filter)) {
        this.unfound.push(filter);
      }
    }
  };

  Exam.prototype.find = function(filters) {
    var filter, i, item, len, ref;
    this.found = [];
    this.unfound = [];
    this.filters = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = filters.length; i < len; i++) {
        filter = filters[i];
        results.push(filter.toLowerCase());
      }
      return results;
    })();
    ref = this.filters;
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      if (this.examObject.match(item)) {
        this.found.push(item);
      }
    }
    this.undetect();
    return this;
  };

  Exam.prototype.yep = function(callback) {
    if (this.found.length > 0) {
      callback.bind(this)();
    }
    return this;
  };

  Exam.prototype.nope = function(callback) {
    if (this.unfound.length > 0) {
      callback.bind(this)();
    }
    return this;
  };

  Exam.prototype.any = function(callback) {
    callback.bind(this)();
    return this;
  };

  return Exam;

})();
