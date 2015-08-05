# examjs
Examin your blog content for bad words

**Simple use:**
```
exam('Lorem ipsum dolor sit amet')
	.for(['ipsum', 'sit'])
	.then(function() { alert('There are some bad words') })
	.or(function() { alert('There are no bad words') });
```

**Using examjs with jQuery Ajax**
```
exam(myParagraphNode)
	.for(badWordsArray)
	.then(function() {
		// ajax post with special flags
	})
	.or(function() {
		// ajax post without special flags
	});
```