
chai = require "chai"
{ assert } = chai

exam = require "../dist/module"

describe "Exam.js", ->

	it "Exam should be a function", ->
		assert.isFunction exam
		exam("My name is Viktor")
			.find(["name"])
			.yep ->
				console.log(@detected)
				console.log(@undetected)