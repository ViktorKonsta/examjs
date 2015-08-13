var Exam, exam;

Exam = (function() {
  function Exam(examObject) {
    if (typeof examObject === 'string') {
      this.examObject = examObject.toLowerCase();
    } else {
      this.examObject = examObject.textContent.toLowerCase();
    }
  }

  Exam.prototype.undetect = function() {
    var detectedString, filter, i, len, ref;
    detectedString = this.detected.join('');
    ref = this.filters;
    for (i = 0, len = ref.length; i < len; i++) {
      filter = ref[i];
      if (!detectedString.match(filter)) {
        this.undetected.push(filter);
      }
    }
  };

  Exam.prototype.find = function(filters) {
    var filter, i, item, len, ref;
    this.detected = [];
    this.undetected = [];
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
        this.detected.push(item);
      }
    }
    this.undetect();
    return this;
  };

  Exam.prototype.yep = function(callback) {
    if (this.detected.length > 0) {
      callback.bind(this)();
    }
    return this;
  };

  Exam.prototype.nope = function(callback) {
    if (this.undetected.length > 0) {
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

exam = function(e) {
  return new Exam(e);
};
