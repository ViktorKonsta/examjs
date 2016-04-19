
Exam = require './Exam'

main = (args) -> new Exam args

if module?
	return module.exports = main

if window?
	return window.exam = main