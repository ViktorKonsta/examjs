var Exam, includes, isArray;

isArray = require('lodash.isarray');

includes = require('lodash.includes');

module.exports = Exam = (function() {

  /**
  		* Represents the Exam Constructor
  		* @constructor
  		* @param {string} examing - String that will be check
   */
  function Exam(examing) {
    if (typeof examing === 'string') {
      this.examing = examing.toLowerCase();
      this._decode();
    } else {
      throw new Error("Examing target must be a String");
    }
  }


  /**
  		* Converting the initial string to the array
   */

  Exam.prototype._decode = function() {
    var i, len, one, ref, reg;
    reg = /["'?!;:,.]+/gim;
    this.examingArr = [];
    ref = this.examing.split(" ");
    for (i = 0, len = ref.length; i < len; i++) {
      one = ref[i];
      if (one.match(reg)) {
        this.examingArr.push(one.slice(0, -one.match(reg).join().length));
        this.examingArr.push(one.match(reg).join());
        continue;
      }
      this.examingArr.push(one);
    }
    return this.examingArr;
  };


  /**
  		* Returns false if filter is different
  		* from the decoded examine string
  		* @param {string} filter - an iteration string
   */

  Exam.prototype._different = function(filter) {
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


  /**
  		* atLeast is the exact function with soft mode
  		* @param {array} filters - array of filters
  		* @param {function} callback - callback
   */

  Exam.prototype.atLeast = function(filters, callback) {
    return this.exact(filters, callback, true);
  };


  /**
  		* Does the rest things
  		* @param {array} filters - array of filters
  		* @param {function} callback - callback
  		* @param {boolean} softMode - softMode disabled by default
   */

  Exam.prototype.exact = function(filters, callback, softMode) {
    var filter, i, len, ref;
    this.found = [];
    this.notfound = [];
    this.softMode = softMode || false;
    this.filters = isArray(filters) ? filters : [filters];
    ref = this.filters;
    for (i = 0, len = ref.length; i < len; i++) {
      filter = ref[i];
      if (!this._different(filter)) {
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
      decoded: this.examingArr,
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
