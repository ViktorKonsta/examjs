{ isArray, isString, isPlainObject, isFunction, includes } = require "lodash"

module.exports = class Exam

	constructor: (examing) ->
		if isString examing
			@examing = examing.toLowerCase()
			@examingArr = @examing.split " "
		else
			throw new Error "Examing target must be a String"

	getNotFoundList: ->
		@notfound = []

		foundString = @found.join ''

		for filter in @filters
			if not foundString.match filter
				@notfound.push filter

		return

	different: (filter) ->
		if @softMode
			if @examing.match filter
				return no
		else
			if includes @examingArr, filter
				return no
		return on

	atLeast: (filters, callback) ->
		@exact filters, callback, on

	exact: (filters, callback, softMode) ->
		@found = []
		@softMode = softMode or no
		@filters = if isArray filters then filters else [filters]

		for filter in @filters
			if not @different filter
				@found.push filter

		do @getNotFoundList

		@result =
			found: if @found.length > 0 then @found else null
			notfound: if @notfound.length > 0 then @notfound else null
			filters: @filters
			examing: @examing
			mode: if softMode then "soft" else "strict"

		if @found.length > 0 and @notfound.length is 0
			@result.only = {}
			@result.only.yep = on

		if @notfound.length > 0 and @found.length is 0
			@result.only = {}
			@result.only.nope = on

		if callback
			callback @result
			return @

		return new Promise (resolve, reject) ->
			resolve @result