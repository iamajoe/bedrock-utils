# Bedrock: Utils > Path

Module to modify and check paths.

### Usage API
```js
var path = require('bedrock-utils/src/path.js');

path.isUrl('http://google.com'); // Will return true
```

#### Node Usage API
```js
var path = require('bedrock-utils/src/node/path.js');

path.isUrl('http://google.com'); // Will return true
path.getPwd('./'); // Will return current PWD
```
