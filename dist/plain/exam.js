(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
var Exam, main;

Exam = require('./Exam');

main = function(args) {
  return new Exam(args);
};

if (typeof module !== "undefined" && module !== null) {
  return module.exports = main;
}

if (typeof window !== "undefined" && window !== null) {
  return window.exam = main;
}

},{"./Exam":1}]},{},[2]);
