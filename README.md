# Exam.js

### You can use this library for examing something for something :)

### Compatibility

- IE9+, Edge, Chrome, Opera, Firefox, Safari
- Node.js

### Notes

- Entirely case insensitive for all arguments and results
- `exam()` Can take string or node element (object). Will examine all content within that element if it's node element.
- `.find()` Takes the array as argument. Can be reusable.
- within `.yep()`, `.nope()` and `.any()` callbacks you can access (return arrays only)
	- `this.filters` return filters you set
	- `this.found` return found words
	- `this.unfound` return unfound words

### Simple use

```js
exam(document.body)
	.find(['badword1', 'badword2', 'badword3']) 
	.yep( => {
		// Should use 'yep' only if something out there
	})
	.nope( => {
		// Should use 'nope' if nothing out there
	})
	.any( => {
		// Should use 'any' if you want just get 'found', 'unfound' and 'filters'
	})
```

### Reuse `.find()` method

**NB!** Will examine by different filters twice and independently  

```js
exam(document.body)
	.find(['badword1', 'badword2', 'badword3']) 
	.any( => {
		// we can reuse filters we set
		console.log(this.filters)
		// and be ready that these badwords we will find
		console.log(this.found)
	})
	.find(['copyright'])
	.yep( => {
		// copyright is out there
		console.log(this.found)
	})
```

Enjoy!