
exam(document.body)
	.find(['dolor', 'sit', 'github', 'viktor', 'China'])
	.yep(function() {
		console.log('All filters');
		console.log(this.filters);
		console.log('Detected:');
		console.log(this.detected);
		console.log('Undetected:');
		console.log(this.undetected);
	});

console.log('');

exam('Забытое поле пустыни. А ещё я люблю шоколад.')
	.find(['lorem', 'поле', 'берёзка', 'забытоЕ'])
	.any(function() {
		console.log('All filters');
		console.log(this.filters);
		console.log('Detected:');
		console.log(this.detected);
		console.log('Undetected:');
		console.log(this.undetected);
	});