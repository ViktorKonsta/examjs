isArray = require 'lodash.isarray'
includes = require 'lodash.includes'

module.exports = class Exam

	constructor: (examing) ->
		if typeof examing is 'string'
			@examing = examing.toLowerCase()
			@examingArr = @examing.split " "
		else
			throw new Error "Examing target must be a String"

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
		@notfound = []

		@softMode = softMode or no
		@filters = if isArray filters then filters else [filters]

		for filter in @filters

			if not @different filter
				@found.push filter
			else
				@notfound.push filter

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