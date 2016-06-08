'use strict';

// -----------------------------------------
// IMPORTS

var Promise = require('bluebird');
var Joi = require('joi');

// -----------------------------------------
// VARS

// -----------------------------------------
// PUBLIC FUNCTIONS

/**
 * Check types
 * @param  {*} val
 * @param  {*} schema
 * @param  {bool} returnData
 * @return {promise}
 */
function type(val, schema, returnData) {
    var promise = new Promise(function (resolve, reject) {
        Joi.validate(val, schema, function (err, value) {
            if (err !== null) {
                reject(err);

                if (!returnData) {
                    throw new Error(err);
                }
            }

            // Retrieve the value
            resolve(value);
        });
    });

    return promise;
}

// -----------------------------------------
// PRIVATE FUNCTIONS

// -----------------------------------------
// EXPORTS

module.exports = {
    type: type
};
