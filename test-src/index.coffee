chai = require "chai"
{ assert } = chai

exam = require "../dist/module"

sentence = "In our village, folks say God crumbles up the old moon into stars. Перевод недоступен."

describe "Exam.js", ->

	describe sentence, ->

		describe "exact (callback)", ->

			it "Should find 'our', 'перевод' amd not find 'vill', 'перев' because of it's partition equality", ->

				exam(sentence)
					.exact ["our", "перевод", "vill", "перев"], (result) ->
						assert.deepEqual result.found[0], "our"
						assert.deepEqual result.found[1], "перевод"
						assert.deepEqual result.notfound[0], "vill"
						assert.deepEqual result.notfound[1], "перев"
						assert.deepEqual result.mode, "strict"
						console.log result

				exam(sentence)
					.exact ["our", "moon", "vill"]

		describe "atLeast (callback)", ->

			it "Should find 'our', 'moon' amd 'vill'", ->

				exam(sentence)
					.atLeast ["our", "moon", "vill"], (result) ->
						assert.deepEqual result.found[0], "our"
						assert.deepEqual result.found[1], "moon"
						assert.deepEqual result.found[2], "vill"
						assert.deepEqual result.notfound, null
						assert.deepEqual result.only.yep, on
						assert.deepEqual result.mode, "soft"