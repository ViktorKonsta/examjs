
chai = require "chai"
{ assert } = chai

exam = require "../dist/module"

describe "Exam.js", ->

	it "Exam should be a function", ->

		assert.isFunction exam

	it "Should Exam 'hello world' and find 'hello'", ->

		exam "hello world"
			.find ["hello"]
			.yep (result) ->
				{ found, unfound, filters } = result
				assert.deepEqual found[0], "hello"

	it "Should Exam 'visit my site' and not find 'shit'", ->

		exam "visit my site"
			.find ["shit"]
			.nope (result) ->
				{ found, unfound, filters } = result
				assert.deepEqual unfound[0], "shit"

	it "Should Exam 'My life is here' and find 'life' and not find 'lol'", ->

		exam "My life is here"
			.find ["life", "lol"]
			.any (result) ->
				{ found, unfound, filters } = result
				assert.deepEqual found[0], "life"
				assert.deepEqual unfound[0], "lol"

	it "Should Exam 'My name is Viktor, I am 21.' and find different words, so make first - find 'name' and second - not find 'lol'", ->

		exam "My name is Viktor, I am 21."
			.find ["name"]
			.yep (result) ->
				{ found, unfound, filters } = result
				assert.deepEqual found[0], "name"
			.find ["lol"]
			.nope (result) ->
				{ found, unfound, filters } = result
				assert.deepEqual unfound[0], "lol"

	it "Should Exam 'Yo, what's up' try to find 'yo' and this.filter should be equal to 'yo'", ->

		exam "Yo, what's up"
			.find ["yo"]
			.any (result) ->
				{ found, unfound, filters } = result
				assert.deepEqual filters[0], "yo"

	it "Should Exam 'My name is Viktor' and strictly not find 'na', 'm', 'vik'", ->

		exam "My name is Viktor"
			.strictFind ["na", 'm', 'vik']
			.any (result) ->
				{ found, unfound, filters } = result
				assert.deepEqual unfound[0], 'na'
				assert.deepEqual unfound[1], 'm'
				assert.deepEqual unfound[2], 'vik'