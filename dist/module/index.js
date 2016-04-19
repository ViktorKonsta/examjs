var Exam;

Exam = require('./Exam');

module.exports = function(args) {
  return new Exam(args);
};
