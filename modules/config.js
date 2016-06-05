'use strict';

// -----------------------------------------
// IMPORTS

var fs = require('fs');
var toml = require('toml');

var tools = require('./tools/main');
var Joi = tools.check.Joi;

var create = require('./create');
var file = require('./file');
var style = require('./style');
var script = require('./script');
var raw = require('./raw');
var server = require('./server');

// -----------------------------------------
// VARS

var struct = Joi.object().keys({
    maxOrder: Joi.number(), // `toml:"max_order"`
    copy: Joi.array().items(file.struct),
    rename: Joi.array().items(file.struct),
    remove: Joi.array().items(file.struct),
    create: Joi.array().items(create.struct),
    style: Joi.array().items(style.struct),
    script: Joi.array().items(script.struct),
    raw: Joi.array().items(raw.struct),
    server: server.struct
});

// -----------------------------------------
// PUBLIC FUNCTIONS

// ConfigGet copies * from source to destination
function config(file) {
    check.validate(
        { file: file },
        { file: check.Joi.string() }
    );

    var configPath = tools.getAbsolute(file);

    if (tools.notExist(configPath)) {
        return tools.logErr('Config file doesn\'t exist!');
    }

    // Read the config file
    var file = fs.readFileSync(configPath);
    var obj = toml.parse(file);

    fs.writeFileSync('tmp.json', obj);

    // Set a default
    if (!obj.maxOrder) {
        obj.maxOrder = 30;
    }

    // Check the final object
    check.validate(
        { config: obj },
        { config: struct }
    );

    // Now lets return the config obj
    return obj;
}

// -----------------------------------------
// PRIVATE FUNCTIONS

// -----------------------------------------
// EXPORTS

module.exports = config;
