isArray = require 'lodash.isarray'
includes = require 'lodash.includes'

module.exports = class Exam

	###*
		* Represents the Exam Constructor
		* @constructor
		* @param {string} examing - String that will be check
	###

	constructor: (examing) ->
		if typeof examing is 'string'
			@examing = examing.toLowerCase()
			do @_decode
		else
			throw new Error "Examing target must be a String"

	###*
		* Converting the initial string to the array
	###

	_decode: ->
		reg = /["'?!;:,.]+/gim
		@examingArr = []
		for one in @examing.split(" ")
			if one.match reg
				@examingArr.push one[...-one.match(reg).join().length]
				@examingArr.push one.match(reg).join()
				continue
			@examingArr.push one
		return @examingArr

	###*
		* Returns false if filter is different
		* from the decoded examine string
		* @param {string} filter - an iteration string
	###

	_different: (filter) ->
		if @softMode
			if @examing.match filter
				return no
		else
			if includes @examingArr, filter
				return no
		return on

	###*
		* atLeast is the exact function with soft mode
		* @param {array} filters - array of filters
		* @param {function} callback - callback
	###

	atLeast: (filters, callback) ->
		@exact filters, callback, on

	###*
		* Does the rest things
		* @param {array} filters - array of filters
		* @param {function} callback - callback
		* @param {boolean} softMode - softMode disabled by default
	###

	exact: (filters, callback, softMode) ->
		@found = []
		@notfound = []

		@softMode = softMode or no
		@filters = if isArray filters then filters else [filters]

		for filter in @filters

			if not @_different filter
				@found.push filter
			else
				@notfound.push filter

		@result =
			found: if @found.length > 0 then @found else null
			notfound: if @notfound.length > 0 then @notfound else null
			filters: @filters
			examing: @examing
			decoded: @examingArr
			mode: if softMode then "soft" else "strict"

		if @found.length > 0 and @notfound.length is 0
			@result.only = {}
			@result.only.yep = on

		if @notfound.length > 0 and @found.length is 0
			@result.only = {}
			@result.only.nope = on

		if callback?
			callback @result
			return @

		if Promise?
			return new Promise (resolve, reject) =>
				resolve @result

		return @