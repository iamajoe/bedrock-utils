'use strict';

// -----------------------------------------
// IMPORTS

var tools = require('./tools/main');
var Joi = tools.check.Joi;

// -----------------------------------------
// VARS

var struct = Joi.object().keys({
    src: Joi.string(), // `toml:"source"`
    dest: Joi.string(), // `toml:"destination"`
    ignore: Joi.string(),
    force: Joi.boolean(),
    order: Joi.number(),
    Env: Joi.string(),
    Sys: Joi.string()
});

// -----------------------------------------
// PUBLIC FUNCTIONS

// -----------------------------------------
// PRIVATE FUNCTIONS

// -----------------------------------------
// EXPORTS

module.exports = { struct: struct };
