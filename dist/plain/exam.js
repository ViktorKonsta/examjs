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

  Exam.prototype._find = function(callback) {
    this.found = [];
    this.unfound = [];
    callback();
    this.undetect();
    return this;
  };

  Exam.prototype.find = function(filters) {
    var filter;
    this.filters = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = filters.length; i < len; i++) {
        filter = filters[i];
        results.push(filter.toLowerCase());
      }
      return results;
    })();
    return this._find((function(_this) {
      return function() {
        var i, item, len, ref, results;
        ref = _this.filters;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          item = ref[i];
          if (_this.examObject.match(item)) {
            results.push(_this.found.push(item));
          }
        }
        return results;
      };
    })(this));
  };

  Exam.prototype.strictFind = function(filters) {
    var filter;
    this.filters = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = filters.length; i < len; i++) {
        filter = filters[i];
        results.push(filter.toLowerCase());
      }
      return results;
    })();
    return this._find((function(_this) {
      return function() {
        var i, item, len, ref, results;
        ref = _this.filters;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          item = ref[i];
          if (_this.examObject.match(new RegExp(item + "\\b", 'gi'))) {
            results.push(_this.found.push(item));
          }
        }
        return results;
      };
    })(this));
  };

  Exam.prototype.yep = function(callback) {
    if (this.found.length > 0) {
      callback({
        found: this.found,
        unfound: this.unfound,
        filters: this.filters
      });
    }
    return this;
  };

  Exam.prototype.nope = function(callback) {
    if (this.unfound.length > 0) {
      callback({
        found: this.found,
        unfound: this.unfound,
        filters: this.filters
      });
    }
    return this;
  };

  Exam.prototype.any = function(callback) {
    callback({
      found: this.found,
      unfound: this.unfound,
      filters: this.filters
    });
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
