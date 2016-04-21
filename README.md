# Exam.js

### You can use this library for examing something for something :)

### Installation & Usage

```
npm install --save examjs
```

```js
let exam = require("examjs")
```

### Compatibility

- IE9+, Edge, Chrome, Opera, Firefox, Safari
- Node.js

### API

Method | Description | Params | Code
--- | --- | --- | ---
`exam` | inital method | String | `exam("You want to check this string?")`
`exact` | find for exact, letter to letter matches | Array [, callback] | `exam("Some string in there").exact(["some", "in", "no"])`
`atLeast` | find for at least some matches | Array [, callback] | `exam("Some string in there").atLeast(["some", "in", "no"])`



### Notes

- `exact` and `atLeast` functions returns `Promise` if you didn't specify the `callback` as a second argument
- all results are case insensitive

### Simple usage

```js
exam("In our village, folks say God crumbles up the old moon into stars. Перевод недоступен.")
	.atLeast(["our", "moon", "vill", "перев"], result => {
		console.log(result)
		/* -->
			{
				found: [ 'our', 'moon', 'vill', 'перев' ],
				notfound: null,
				filters: [ 'our', 'moon', 'vill', 'перев' ],
				examing: 'in our village, folks say god crumbles up the old moon into stars. перевод недоступен.',
				mode: 'soft',
				only: { yep: true }
			}
		*/
	})
```

```js
exam("In our village, folks say God crumbles up the old moon into stars. Перевод недоступен.")
	.exact(["our", "перевод", "vill", "перев"])
	.then( result => {
		console.log(result)
		/* -->
			{
				found: [ 'our', 'перевод' ],
				notfound: [ 'vill', 'перев' ],
				filters: [ 'our', 'перевод', 'vill', 'перев' ],
				examing: 'in our village, folks say god crumbles up the old moon into stars. перевод недоступен.',
				mode: 'strict'
			}
		*/
	})
```