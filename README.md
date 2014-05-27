# Zoic js
#### Implicit function exports

`npm install zoic`


```js
// module.js
require('zoic')

function abc() {

}

function _private() {

}
```

```js
require('./module').abc // [Function abc]
require('./module')._private // undefined
```
