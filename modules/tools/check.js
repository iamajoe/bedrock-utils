'use strict';

// -----------------------------------------
// IMPORTS

var Joi = require('joi');

// -----------------------------------------
// VARS

// -----------------------------------------
// PUBLIC FUNCTIONS

/**
 * Check types
 * @param  {*} val
 * @param  {*} schema
 */
function validate(val, schema) {
    Joi.validate(val, schema, function (err) {
        if (err !== null) {
            throw new Error('Expected ' + val + ' to have the schema ' + schema);
        }
    });
}

// -----------------------------------------
// PRIVATE FUNCTIONS

// -----------------------------------------
// EXPORTS

module.exports = {
    validate: validate,
    Joi: Joi
};
