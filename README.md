# Zoic
#### Implicit function exports

```js
// module.js
module.exports = eval(require('zoic'))

function abc() {

}

function _private() {

}
```

```js
require('./module').abc // [Function abc]
require('./module._private') // undefined
```