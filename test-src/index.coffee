chai = require "chai"
{ assert } = chai

exam = require "../dist/module"

sentence = "In our village, folks say God crumbles up the old moon into stars. Перевод недоступен."

describe "Exam.js", ->

	describe sentence, ->

		describe "Should find 'our', 'перевод' amd not find 'vill', 'перев' because of it's partition equality", ->

			searchArray = ["our", "перевод", "vill", "перев"]

			resultFunction = (result) ->
				assert.deepEqual result.found[0], "our"
				assert.deepEqual result.found[1], "перевод"
				assert.deepEqual result.notfound[0], "vill"
				assert.deepEqual result.notfound[1], "перев"
				assert.deepEqual result.mode, "strict"

			it "exact (callback)", ->

				exam(sentence)
					.exact searchArray, resultFunction

			it "exact (promise)", ->

				exam(sentence)
					.exact searchArray
					.then resultFunction

		describe "Should find 'our', 'moon', 'vill' and 'перев'", ->

			searchArray = ["our", "moon", "vill", "перев"]

			resultFunction = (result) ->
				assert.deepEqual result.found[0], "our"
				assert.deepEqual result.found[1], "moon"
				assert.deepEqual result.found[2], "vill"
				assert.deepEqual result.found[3], "перев"
				assert.deepEqual result.notfound, null
				assert.deepEqual result.only.yep, on
				assert.deepEqual result.mode, "soft"

			it "atLeast (callback)", ->

				exam(sentence)
					.atLeast searchArray, resultFunction
					.atLeast searchArray, resultFunction

			it "atLeast (promise)", ->

				exam(sentence)
					.atLeast searchArray
					.then resultFunction