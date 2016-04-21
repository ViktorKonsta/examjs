module.exports = class Exam

	constructor: (examObject) ->
		if typeof examObject is 'string' then @examObject = do examObject.toLowerCase
		else @examObject = do examObject.textContent.toLowerCase

	undetect: ->
		foundString = @found.join ''
		for filter in @filters when not foundString.match filter
			@unfound.push filter
		return

	_find: (callback) ->
		@found = []
		@unfound = []
		do callback
		do @undetect
		return @

	find: (filters) ->
		@filters = (do filter.toLowerCase for filter in filters)
		@_find =>
			for item in @filters when @examObject.match item 
				@found.push item

	strictFind: (filters) ->
		@filters = (do filter.toLowerCase for filter in filters)
		@_find =>
			for item in @filters when @examObject.match new RegExp "#{item}\\b", 'gi' 
				@found.push item		

	yep: (callback) ->
		if @found.length > 0
			callback found: @found, unfound: @unfound, filters: @filters
		return @

	nope: (callback) ->
		if @unfound.length > 0
			callback found: @found, unfound: @unfound, filters: @filters
		return @

	any: (callback) ->
		callback found: @found, unfound: @unfound, filters: @filters
		return @