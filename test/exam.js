var Exam, exam;

Exam = (function() {
  function Exam(examObject) {
    if (examObject == null) {
      examObject = document.body;
    }
    if (typeof examObject === 'string') {
      this.examObject = this.setLowerCase(examObject);
    } else {
      this.examObject = this.setLowerCase(examObject.textContent);
    }
  }

  Exam.prototype.undetect = function() {
    var b, filter, i, len, ref;
    b = this.detected.join('');
    ref = this.filters;
    for (i = 0, len = ref.length; i < len; i++) {
      filter = ref[i];
      if (!b.match(filter)) {
        this.undetected.push(filter);
      }
    }
  };

  Exam.prototype.setLowerCase = function(data) {
    var i, item, len, results;
    if (typeof data === 'string') {
      return data = data.toLowerCase();
    } else {
      results = [];
      for (i = 0, len = data.length; i < len; i++) {
        item = data[i];
        results.push(item = item.toLowerCase());
      }
      return results;
    }
  };

  Exam.prototype.find = function(filters) {
    var i, item, len, ref;
    if (filters == null) {
      filters = [];
    }
    this.detected = [];
    this.undetected = [];
    this.filters = this.setLowerCase(filters);
    if (typeof this.filters === 'string') {
      if (this.examObject.match(this.filters)) {
        this.detected.push(this.filters);
      } else {
        this.undetected = [this.filters];
      }
      this.filters = [this.filters];
    } else {
      ref = this.filters;
      for (i = 0, len = ref.length; i < len; i++) {
        item = ref[i];
        if (this.examObject.match(item)) {
          this.detected.push(item);
        }
      }
      this.undetect();
    }
    return this;
  };

  Exam.prototype.yep = function(callback) {
    if (this.detected.length > 0 && (callback != null)) {
      callback.bind(this)();
    }
    return this;
  };

  Exam.prototype.nope = function(callback) {
    if (this.detected.length === 0 && (callback != null)) {
      callback.bind(this)();
    }
    return this;
  };

  return Exam;

})();

exam = function(examObj) {
  return new Exam(examObj);
};
