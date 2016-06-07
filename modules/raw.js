'use strict';

// -----------------------------------------
// IMPORTS

var Joi = require('joi');

// -----------------------------------------
// VARS

var struct = Joi.object().keys({
    args: Joi.array().items(Joi.string()).default([]),
    order: Joi.number().default(0),
    env: Joi.string().allow('').default(''),
    sys: Joi.string().allow('').default('all')
});

// -----------------------------------------
// PUBLIC FUNCTIONS

// -----------------------------------------
// PRIVATE FUNCTIONS

// -----------------------------------------
// EXPORTS

module.exports = { struct: struct };
