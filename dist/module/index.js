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
