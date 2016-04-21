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

- `exact` and `atLeast` returns `Promise` if you didn't specify the callback as a second argument