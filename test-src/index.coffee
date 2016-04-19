
chai = require "chai"
{ assert } = chai

exam = require "../dist/module"

describe "Exam.js", ->

	it "Exam should be a function", ->

		assert.isFunction exam

	it "Should Exam 'hello world' and find 'hello'", ->

		exam "hello world"
			.find ["hello"]
			.yep ->
				assert.deepEqual @found[0], "hello"

	it "Should Exam 'visit my site' and not find 'shit'", ->

		exam "visit my site"
			.find ["shit"]
			.nope ->
				assert.deepEqual @unfound[0], "shit"

	it "Should Exam 'My life is here' and find 'life' and not find 'lol'", ->

		exam "My life is here"
			.find ["life", "lol"]
			.any ->
				assert.deepEqual @found[0], "life"
				assert.deepEqual @unfound[0], "lol"