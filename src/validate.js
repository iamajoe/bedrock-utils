'use strict';

import Ajv from 'ajv';
import isArray from 'lodash/isArray.js';
import clone from 'lodash/clone.js';
import merge from 'lodash/merge.js';

const DEFAULT_SCHEMA = {
    $schema: 'http://json-schema.org/draft-04/schema#',
    title: 'Validation data',
    type: 'object',
    additionalItems: false
};

// -----------------------------------------
// Functions

/**
 * Validates schema
 *
 * @param {object} schema
 * @param {array} args
 * @returns {object}
 */
const _validateSchema = (schema, args) => {
    const enforcedSchema = merge(clone(DEFAULT_SCHEMA), schema);

    // Lets parse arguments
    const argsObj = {};
    for (let i = 0; i < args.length; i += 1) {
        argsObj[`${i}`] = args[i];
    }

    // Finally check the results
    const ajv = new Ajv({ allErrors: true });
    const valid = ajv.validate(enforcedSchema, argsObj);

    // Check for errors
    return !valid && ajv.errors;
};

/**
 * Validates function arguments in private
 * @param  {array} items
 * @return {object}
 */
const _getSchema = (items) => {
    const schema = { properties: {} };
    const required = [];

    // Lets parse all items
    for (let i = 0; i < items.length; i += 1) {
        const item = items[i];

        // Lets cache required. Not json schema valid
        item.required && required.push(`${i}`);

        // Always force to delete it
        delete item.required;

        // Set on the schema
        schema.properties[`${i}`] = item;
    }

    // Check if there are requireds
    if (required.length) { schema.required = required; }

    // Check for errors
    return schema;
};

/**
 * Validates function arguments
 * @param  {array} items
 * @param  {function} fn
 * @param  {array} args
 * @return {string}
 */
const validate = (items, fn, ...args) => {
    let isntValid;

    // Check if this function has the right values
    // It doesn't use the validate schema because it
    // takes a speed toll without an actual need for
    if (typeof items !== 'object') {
        isntValid = 'Items should be an array with schema items or a schema object';
    } else if (isArray(items) && !items.length) {
        isntValid = 'Items should have more than 0 items';
    } else if (!isArray(args) || !args.length) {
        isntValid = 'Arguments should be and array and have more than 0 items';
    }

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
    const hasSchema = !items.hasOwnProperty('length') || !items.length;
    const schema = hasSchema ? items : _getSchema(items);
    isntValid = _validateSchema(schema, args);
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
export const __test__ = { _validateSchema, _getSchema, validate };
