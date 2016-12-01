# Bedrock: Utils > String

Module to modify strings.

### Usage API
```js
var string = require('bedrock-utils/src/string.js');

string.normalize('foo '); // Will return "foo"
string.dashize('foo_bar-foobar Foo'); // Will return "foo_bar-foobar-foo"
string.camelcase('foo_bar-foobar Foo'); // will return "fooBarFoobarFoo"
```
