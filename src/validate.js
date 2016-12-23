'use strict';

import Ajv from 'ajv';
import cloneDeep from 'lodash/cloneDeep.js';

// -----------------------------------------
// Functions

/**
 * Validates function arguments in private
 * @param  {array} items
 * @param  {array} args
 * @return {string}
 */
const _validate = (items, args) => {
    // TODO: Should check for dev env vars and remove all this and the lib from import
    const schema = {
        $schema: 'http://json-schema.org/draft-04/schema#',
        title: 'Validation data',
        type: 'object',
        properties: {},
        additionalItems: false
    };
    const required = [];

    // Lets parse all items
    for (let i = 0; i < items.length; i += 1) {
        const item = cloneDeep(items[i]);

        // Lets cache required. Not json schema valid
        item.required && required.push(`${i}`);

        // Always force to delete it
        delete item.required;

        // Set on the schema
        schema.properties[`${i}`] = item;
    }

    // Check if there are requireds
    if (required.length) { schema.required = required; }

    // Lets parse arguments
    const argsObj = {};
    for (let i = 0; i < args.length; i += 1) {
        argsObj[`${i}`] = args[i];
    }

    // Finally check the results
    const ajv = new Ajv({ allErrors: true });
    const valid = ajv.validate(schema, argsObj);

    // Check for errors
    return !valid && ajv.errors;
};

/**
 * Validates function arguments
 * @param  {array} items
 * @param  {function} fn
 * @param  {array} args
 * @return {string}
 */
const validate = (items, fn, ...args) => {
    // Check if this function has the right values
    let isntValid = _validate([
        { title: 'items', type: 'array', items: { type: 'object' }, minItems: 1, required: true },
        { title: 'args', type: 'array', minItems: 1, required: true }
    ], [items, args]);

    // This function isn't valid
    if (isntValid) {
        /* eslint-disable no-throw-literal */
        throw {
            name: 'Error',
            message: 'Wrong data in validate function',
            data: isntValid
        };
        /* eslint-enable */
    }

    // Lets check the real one now
    isntValid = _validate(items, args);
    if (isntValid) {
        /* eslint-disable no-throw-literal */
        throw {
            name: 'Error',
            message: 'Wrong data in test!',
            data: isntValid
        };
        /* eslint-enable */
    }

    // Lets run the function now or just return the data
    return typeof fn === 'function' && fn(...args);
};

// -----------------------------------------
// Export

export { validate };

// Just for tests... We will get rid of this on the build process
export const __test__ = { _validate, validate };
