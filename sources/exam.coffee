
class Exam

	constructor: (examObject = document.body) ->
		if typeof examObject is 'string' then @examObject = @setLowerCase examObject
		else @examObject = @setLowerCase examObject.textContent
		@detected = []
		@undetected = []
		@filters = []

	undetect: ->
		b = @detected.join ''
		for filter in @filters when not b.match filter
			@undetected.push filter
		return

	setLowerCase: (data) ->
		if typeof data is 'string' then data = data.toLowerCase()
		else item = item.toLowerCase() for item in data

	find: (filters = []) ->
		@filters = @setLowerCase(filters)
		if typeof @filters is 'string'
			if @examObject.match @filters then @detected.push @filters
			else @undetected = [@filters]
			@filters = [@filters]
		else
			for item in @filters when @examObject.match item
				@detected.push item
			do @undetect
		@

	yep: (callback) ->
		do callback.bind @ if @detected.length > 0 and callback?
		@

	nope: (callback) ->
		do callback.bind @ if @detected.length is 0 and callback?
		@

exam = (examObj) -> new Exam examObj