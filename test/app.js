
exam('Lorem ipsum dolor sit amet.')
	.find(['lorem', 'sit'])
	.yep(function() {
		console.log('found: ' + this.detected);
	})
	.find(['dolor', 'github'])
	.yep(function() {
		console.log('found: ' + this.detected);
		console.log(this.undetected + '');
	});