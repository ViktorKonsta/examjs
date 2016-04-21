{ isArray, isString, isPlainObject, isFunction } = require "lodash"

module.exports = class Exam

	constructor: (examing) ->
		if isString examing
			@examing = examing.toLowerCase()
		else
			throw new Error "Examing target must be a String"

	getNotFoundList: ->
		@notfound = []

		foundString = @found.join ''

		for filter in @filters
			if not foundString.match filter
				@notfound.push filter

		return

	contains: (filter) ->
		if @examing.match filter
			return on
		return no

	atLeast: (filters, callback) ->
		@exact filters, callback, on

	exact: (filters, callback, softMode) ->
		@found = []
		@softMode = softMode or no
		@filters = if isArray filters then filters else [filters]

		for filter in @filters
			if @contains filter
				@found.push filter

		do @getNotFoundList

		@result =
			found: @found
			notfound: @notfound
			filters: @filters
			examing: @examing
			mode: if softMode then "soft" else "strict"

		if @found.length > 0 and @notfound.length is 0
			@result.yep = on

		if @notfound.length > 0 and @found.length is 0
			@result.nope = on

		if callback
			callback @result
			return @

		return new Promise (resolve, reject) ->
			resolve @result