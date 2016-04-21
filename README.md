# Exam.js

### You can use this library for examing something for something :)

### Compatibility

- IE9+, Edge, Chrome, Opera, Firefox, Safari
- Node.js

### Notes

- Entirely case insensitive for all arguments and results
- `exam()` Can take string or node element (object). Will examine all content within that element if it's node element.
- `.find()` Takes the array as argument. Can be reusable.
- `.strictFind()` is the same as `find()`, but checks everything with regexp
- within `.yep()`, `.nope()` and `.any()` callbacks you will get entire 'result' object with
	- `filters` filters you set
	- `found` found words
	- `unfound` unfound words

### Simple use

```js
exam("Could you find my name here?")
	.find(["could"])
	.yep( result => {
		// Should use 'yep' only if
		// you expect something to be here
		console.log(result.found)
	})
	.nope( result => {
		// Should use 'nope' only if
		// you expect something not to be here
		console.log(result.unfound)
	})
	.any( result => {
		// Should use 'any' if
		// you don't know what to expect
		console.log(result)
	})
```

### Reuse methods

**NB!** Will examine by different filters twice and independently

```js
exam("How about that, huh?")
	.find(["abou"]) 
	.any( result => {
		// we can reuse filters we set
		console.log(result.filters)
		// and be ready that these badwords we will find
		console.log(result.found)
		// also we have all results within any of the callback
		console.log(result.unfound)
	})
	.strictFind(["about"])
	.yep( result => {
		// word 'about' is fully out there
		console.log(this.found)
	})
```

Enjoy!