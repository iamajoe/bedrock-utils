# Bedrock: Utils > Validate

Module to validate variables and check if all is as supposed. Uses [JSON Schema]() validation.
The only modification is the `required` boolean that sets the type index as required.

### Usage API
```js
import { validate } from 'bedrock-utils/src/validate.js';

const bool = true;

// There won't be an error in this case
try {
    validate([{ title: 'bool', type: 'boolean', required: true }], null, bool);
} catch (err) {
    // No error to show
}

// There won't be an error in this case
try {
    validate([{ title: 'bool', type: 'string', required: true }], null, bool);
} catch (err) {
    // An error will be present with a message and data.
}

// You can also pass a function to act after all is done. Useful for bounds for example.
const isFoo = validate.bind(null, [
    { title: 'bool', type: 'boolean', required: true }
], (str) => str === 'foo');

try {
    isFoo('foo');
} catch (err) {
    // There is no error
}
```
