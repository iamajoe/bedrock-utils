'use strict';

// -----------------------------------------
// IMPORTS

var Joi = require('joi');

// -----------------------------------------
// VARS

var optionsStruct = Joi.object().keys({
    minify: Joi.boolean(),
    autoprefixer: Joi.string(),

    precision: Joi.number(), // `toml:"precision"`
    comments: Joi.boolean(), // `toml:"comments"`
    includePaths: Joi.array().items(Joi.string()), // `toml:"include_paths"`
    httpPath: Joi.string(), // `toml:"http_path"`
    sourceMap: Joi.boolean(), // `toml:"source_map"`
    basePath: Joi.string() // `toml:"base_path"`
});

var struct = Joi.object().keys({
    src: Joi.string().required(), // `toml:"source"`
    dest: Joi.string().required(), // `toml:"destination"`
    ignore: Joi.string().default(''),
    order: Joi.number().default(0),
    env: Joi.string().allow('').default(''),
    sys: Joi.string().allow('').default('all'),
    options: optionsStruct
});

// -----------------------------------------
// PUBLIC FUNCTIONS

// -----------------------------------------
// PRIVATE FUNCTIONS

// -----------------------------------------
// EXPORTS

module.exports = { struct: struct };
