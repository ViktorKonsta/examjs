
chai = require "chai"
{ assert } = chai

exam = require "../dist/module"

describe "Exam.js", ->

	it "Exam should be a function", ->

		assert.isFunction exam

	it "Should Exam 'hello world' and find hello", ->

		exam "hello world"
			.find ["hello"]
			.yep ->
				console.log @found
				console.log @unfound