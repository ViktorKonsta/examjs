# Exam.js
#### It's very lightweight way (1 kb) to examine your content and make right decisions  

**Compatibility**  
*IE9+, Edge, Chrome, Opera, Firefox, Safari*

**Notes**  
- Entirely case insensitive for all arguments and results
- `exam()` Can take string or node element. Will examine all content within that element if it's node element.
- `.find()` Takes the array as argument. Can be reusable.
- within `.yep()` and `.nope()` callbacks you can access `this.filters` (all filters were given), `this.detected` (detected filters in the content) and `this.undetected` (undetected filters in the content).

**Simple use**
```javascript
exam(document.body)
	.find(['badword1', 'badword2', 'badword3']) 
	.yep(function() {
		alert('Bad words here in the text!');
	});
```

**Reuse `.find()` method**  
*Will examine by different filters twice and independently*
```javascript
exam(document.body)
	.find(['badword1', 'badword2', 'badword3']) 
	.yep(function() {
		alert('Bad words here in the text!');
	})
	.find('copyright')
	.yep(function() {
		alert(this.detected + 'detected');
	});
```

**jQuery Ajax**
```javascript
exam(formValueNode)
	.find(badWordsArray)
	.yep(function() {
		// send ajax with special args
	})
	.nope(function() {
		// send ajax without special args
	})
	.find(anotherBadWordsArray)
	.nope(function() {
		// do something if no another bad words were detected
	})
```

Enjoy!