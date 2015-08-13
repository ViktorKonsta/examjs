# Exam.js
#### It's very lightweight way (1 kb) to examine your content and make right decisions  

###### Compatibility ######
*IE9+, Edge, Chrome, Opera, Firefox, Safari*

###### Notes ######
- Entirely case insensitive for all arguments and results
- `exam()` Can take string or node element. Will examine all content within that element if it's node element. *Will examine whole document if no arguments were given.*
- `.find()` Can take string or array. Reusable. Limited with one argument only.
- within `.yep()` and `.nope()` callbacks you can access `this.filters` (all filters were given), `this.detected` (detected filters in the content) and `this.undetected` (undetected filters in the content).

###### Examples ######

**1. Simple use**
```javascript
exam() // examine document.body by default
	.find(['badword1', 'badword2', 'badword3']) 
	.yep(function() {
		alert('Bad words here in the text!');
	});
```

**2. Reuse `.find()` method**  
*Will examine by different filters twice and independently*
```javascript
exam()
	.find(['badword1', 'badword2', 'badword3']) 
	.yep(function() {
		alert('Bad words here in the text!');
	})
	.find('copyright')
	.yep(function() {
		alert(this.detected + 'detected');
	});
```

**3. jQuery Ajax**
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