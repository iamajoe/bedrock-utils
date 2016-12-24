# Bedrock: Utils > Validate

Module to validate variables and check if all is as supposed. Uses [JSON Schema draft 4](http://json-schema.org/documentation.html) as the object of validation.
The only modification is the `required` boolean that sets the type index as required.

**Note**

You should be careful using this in production because it may slow down the speed of your application.

My speed tests per single function call:
- `readFile` from [file.js](../src/file.js) -> around `40-50ms`
- `getPwd` from [path.js](../src/path.js) -> around `2-3ms`
- Test below, around `30-40ms`

    ```js
    validate([
        { type: 'string', minLength: 1, required: true },
        { type: 'string', minLength: 1, required: false },
        { type: 'string', minLength: 1, required: true },
        { type: 'string', minLength: 1, required: false },
        { type: 'string', minLength: 1, required: true },
        { type: 'string', minLength: 1, required: false }
    ], null, '1', 'foo', 'small text', 'reallly long text. a lorem ipsum would be better', 'bar', 'what to right now?');
    ```

If you want to get rid of it in production you can use [validate.stub](../src/validate.stub.js) instead as a stub for the import of the module using for example [babel-plugin-module-resolver](https://github.com/tleunen/babel-plugin-module-resolver).
Or even better, use something like [babel-plugin-discard-module-references](https://github.com/ArnaudRinquin/babel-plugin-discard-module-references) and remove the module completely.
The [dist](../dist) already has this module removed from being imported.

Besides that, the [ajv](https://github.com/epoberezkin/ajv) lib used for the actual validation has a steep file size (`123kb`) if included entirely. This is a possible issue when working in a browser. For now... I have two possible solutions for this.
- You could use [babel-plugin-discard-module-references](https://github.com/ArnaudRinquin/babel-plugin-discard-module-references) to discard modules like `./async`, `./keyword`, `./cache` and `./v5`
- You could `defer` the load of the `ajv` and then set it on the window as a global (when calling `validate()` a verification needs to be done though). This way the application will load, the application will be ready to navigate and the validation lib may be loaded underneath.

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

#### Usage of cached variables

You may want to cache schema compilations for better performance also.

```js
import { compileSchema, getSchema } from 'bedrock-utils/src/validate.js';

const items = [{ title: 'bool', type: 'boolean', required: true }];
const validate = compileSchema(getSchema(items));

const bool = true;

// There won't be an error in this case
try {
    validate([bool]);

    try {
        bool = 'string';
        validate([bool]);
    } catch (err) {
        // It will error now
    }
} catch (err) {
    // No error to show
}
```
