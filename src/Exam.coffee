module.exports = class Exam

	constructor: (examObject) ->
		if typeof examObject is 'string' then @examObject = do examObject.toLowerCase
		else @examObject = do examObject.textContent.toLowerCase

	undetect: ->
		detectedString = @detected.join ''
		for filter in @filters when not detectedString.match filter
			@undetected.push filter
		return

	find: (filters) ->
		@detected = []
		@undetected = []
		@filters = (do filter.toLowerCase for filter in filters)
		for item in @filters when @examObject.match item 
			@detected.push item
		do @undetect
		return @

	yep: (callback) ->
		do callback.bind @ if @detected.length > 0
		return @

	nope: (callback) ->
		do callback.bind @ if @undetected.length > 0
		return @

	any: (callback) ->
		do callback.bind @
		return @