'use strict';

// -----------------------------------------
// IMPORTS

var tools = require('./tools/main');
var Joi = tools.check.Joi;

// -----------------------------------------
// VARS

var struct = Joi.object().keys({
    args: Joi.array().items(Joi.string()),
    order: Joi.number(),
    env: Joi.string(),
    sys: Joi.string()
});

// -----------------------------------------
// PUBLIC FUNCTIONS

// -----------------------------------------
// PRIVATE FUNCTIONS

// -----------------------------------------
// EXPORTS

module.exports = { struct: struct };
