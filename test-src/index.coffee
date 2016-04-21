chai = require "chai"
{ assert } = chai

exam = require "../dist/module"

sentence = "In our village, folks say God crumbles up the old moon into stars."

describe "Exam.js", ->

	describe sentence, ->

		describe "exact()", ->

			it "Should find 'our', 'moon' amd not find 'vill' as it equals as part only", ->
				exam(sentence)
					.exact ["our", "moon", "vill"], (result) ->
						assert.deepEqual result.found[0], "our"
						assert.deepEqual result.found[1], "moon"
						assert.deepEqual result.notfound[0], "vill"
						console.log result

		describe "atLeast()", ->

			it "Should find 'our', 'moon' amd 'vill'", ->
				exam(sentence)
					.atLeast ["our", "moon", "vill"], (result) ->
						assert.deepEqual result.found[0], "our"
						assert.deepEqual result.found[1], "moon"
						assert.deepEqual result.found[2], "vill"
						console.log result