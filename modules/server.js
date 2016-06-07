'use strict';

// -----------------------------------------
// IMPORTS

var Joi = require('joi');

// -----------------------------------------
// VARS

var phpStruct = Joi.object().keys({
    public: Joi.string(),
    port: Joi.number(),
    order: Joi.number().default(0),
    env: Joi.string().allow('').default(''),
    sys: Joi.string().allow('').default('all')
});

var containerStruct = Joi.object().keys({
    name: Joi.string(),
    type: Joi.string(),
    port: Joi.string(),
    link: Joi.array().items(Joi.string()),
    envVar: Joi.array().items(Joi.string()), // `toml:"env_var"`
    volume: Joi.array().items(Joi.string()),
    sleep: Joi.number(),
    order: Joi.number().default(0),
    env: Joi.string().allow('').default(''),
    sys: Joi.string().allow('').default('all')
});

var struct = Joi.object().keys({
    php: Joi.array().items(phpStruct).default([]),
    container: Joi.array().items(containerStruct).default([])
});

// -----------------------------------------
// PUBLIC FUNCTIONS

// -----------------------------------------
// PRIVATE FUNCTIONS

// -----------------------------------------
// EXPORTS

module.exports = { struct: struct };
