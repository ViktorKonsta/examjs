module.exports = class Exam

	constructor: (examObject) ->
		if typeof examObject is 'string' then @examObject = do examObject.toLowerCase
		else @examObject = do examObject.textContent.toLowerCase

	undetect: ->
		foundString = @found.join ''
		for filter in @filters when not foundString.match filter
			@unfound.push filter
		return

	find: (filters) ->
		@found = []
		@unfound = []
		@filters = (do filter.toLowerCase for filter in filters)
		for item in @filters when @examObject.match item 
			@found.push item
		do @undetect
		return @

	yep: (callback) ->
		if @found.length > 0
			do callback.bind @
		return @

	nope: (callback) ->
		if @unfound.length > 0
			do callback.bind @
		return @

	any: (callback) ->
		do callback.bind @
		return @