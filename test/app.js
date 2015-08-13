
exam('Lorem ipsum dolor sit amet.')
	.find(['lorem', 'sit'])
	.yep(function() {
		console.log('All filters');
		console.log(this.filters);
		console.log('Detected:');
		console.log(this.detected);
		console.log('Undetected:');
		console.log(this.undetected);
	})
	.find(['dolor', 'viktor'])
	.yep(function() {
		console.log('All filters');
		console.log(this.filters);
		console.log('Detected:');
		console.log(this.detected);
		console.log('Undetected:');
		console.log(this.undetected);
	})