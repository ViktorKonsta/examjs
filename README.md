# Exam.js
### It's very lightweight way (1 kb) to examine your content and make right decisions  

Compatibility *IE9+, Edge, Chrome, Opera, Firefox, Safari*

**Simple use:**

*Will show `['lorem']` as found in this text*
```
exam('LOREM ipsum dolor sit amet, consectetur adipisicing elit. Nobis, nulla?')
	.find('lorEm')
	.yep(function() {
		console.log(this.detected)
	});
```

*Will log "It's realy clean and nice text" because no bad words were found there*
```
exam('Lorem ipsum dolor sit amet.')
	.find(['bad-word1', 'bad-word2', 'bad-word3'])
	.yep(function() {
		console.log(this.detected)
	})
	.nope(function() {
		console.log("It's realy clean and nice text")
	});
```

*API avaliable within custom callbacks*
```
exam()
	.find(['lorem', 'dolor', 'sit', 'Viktor', 'copyright', 'amet', 'Github', 'Exam', '.js'])
		console.log('All filters');
		console.log(this.filters);
		console.log('Detected:');
		console.log(this.detected);
		console.log('Undetected:');
		console.log(this.undetected);
	});
```

**Using with jQuery Ajax**
```
exam(myParagraphNode)
	.for(badWordsArray)
	.yep(function() {
		// ajax post with special flags
	})
	.nope(function() {
		// ajax post without special flags
	});
```

**Notes**
- Entirely case insensitive for all arguments and results
- `exam()` Can take string or node element. If it's node element then will examine all content within that element (include all child nodes content). *Will examine whole document if no arguments were given.* 
- `.for()` Can take both: string and array. But can have one argument only.
- within `.yep()` and `.nope()` callbacks you can access `this.filters`, `this.detected` and `this.undetected` variables that contain all filters given in `.for()`, detected words in text and undetected words in text.