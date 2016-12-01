# Bedrock: Utils > Is

Module to check stuff.

### Usage API
```js
var is = require('bedrock-utils/src/is.js');

is.node(); // Will return true if node process
is.browser(); // Will return true if is a browser
is.ie(); // Will return if is ie
is.edge(); // Will return if is edge
is.mobile(); // Will return if is mobile
is.touch(); // Will return if has touch

// This one only works with jquery for now
is.media('mobile'); // Will return if media is mobile. Options: [mobile, tablet, desktop, over]
```
