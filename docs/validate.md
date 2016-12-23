# Bedrock: Utils > Validate

Module to validate variables and check if all is as supposed. Uses [JSON Schema draft 4](http://json-schema.org/documentation.html) as the object of validation.
The only modification is the `required` boolean that sets the type index as required.

**Note**

You shouldn't use this in production because it will slow down the speed of your application. Use [validate.stub](../src/validate.stub.js) instead as a stub for the import of the module.
Or even better, use something like [babel-plugin-discard-module-references](https://github.com/ArnaudRinquin/babel-plugin-discard-module-references) and remove the module completely.
The [dist](../dist) already has this module removed from being imported.

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

// You can also pass a full compliant schema instead of passing an array of the items
try {    
    validate({
        $schema: 'http://json-schema.org/draft-04/schema#',
        title: 'Validation data',
        type: 'object',
        additionalItems: false,
        properties: {
            '0': { title: 'bool', type: 'boolean' }
        },
        required: ['0']
    }, null, bool);
} catch (err) {
    // There is no error
}
```
