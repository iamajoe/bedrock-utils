'use strict';

import Ajv from 'ajv';
import isArray from 'lodash/isArray.js';
import clone from 'lodash/clone.js';
import merge from 'lodash/merge.js';

const ajv = new Ajv({
    allErrors: true,
    useDefaults: true,
    verbose: true,
    // TODO: We should use this later to cache schemas or maybe that
    // will bring overhead if there are a lot of requests. Something to decide
    addUsedSchema: false,
    cache: undefined
});
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
const validateSchema = (schema, args) => {
    if (typeof schema !== 'function') {
        throw new Error('Schema should be a function to validate');
    } else if (!isArray(args) || !args.length) {
        throw new Error('Arguments should be and array and have more than 0 items');
    }

    // Lets parse arguments
    const argsObj = {};
    for (let i = 0; i < args.length; i += 1) {
        argsObj[`${i}`] = args[i];
    }

    // Finally check the results
    const valid = schema(argsObj);

    // Check for errors
    return !valid && schema.errors;
};

/**
 * Compiles schema
 *
 * @param {object} schema
 * @returns {function}
 */
const compileSchema = (schema) => {
    if (typeof schema !== 'object') {
        throw new Error('Schema should be an object to compile');
    }

    const enforcedSchema = merge(clone(DEFAULT_SCHEMA), schema);
    return ajv.compile(enforcedSchema);
};

/**
 * Gets a schema object
 * @param  {array|object} items
 * @return {object}
 */
const getSchema = (items) => {
    // Check if this function has the right values
    // It doesn't use the validate schema because it
    // takes a speed toll without an actual need for
    if (typeof items !== 'object') {
        throw new Error('Items should be an array with schema items or a schema object');
    } else if (isArray(items) && !items.length) {
        throw new Error('Items should have more than 0 items');
    }

    if (!items.hasOwnProperty('length') || !items.length) {
        return items;
    }

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
    try {
        const isntValid = validateSchema(compileSchema(getSchema(items)), args);
        if (isntValid) {
            /* eslint-disable no-throw-literal */
            throw { name: 'Error', message: 'Wrong data in test!', data: isntValid };
            /* eslint-enable */
        }
    } catch (err) {
        /* eslint-disable no-throw-literal */
        throw { name: 'Error', message: 'Wrong data in validate function', data: err };
        /* eslint-enable */
    }

    // Lets run the function now or just return the data
    return typeof fn === 'function' && fn(...args) || args;
};

// -----------------------------------------
// Export

export { validate, validateSchema, compileSchema, getSchema };

// Just for tests... We will get rid of this on the build process
export const __test__ = { validate, compileSchema, validateSchema, getSchema };
