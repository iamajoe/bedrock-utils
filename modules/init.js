'use strict';

// -----------------------------------------
// IMPORTS

var path = require('path');
var Joi = require('joi');
var tools = require('./tools/main');
var config = require('./config');

var create = require('./create');
var file = require('./file');
var raw = require('./raw');
var script = require('./script');
var server = require('./server');
var style = require('./style');

// -----------------------------------------
// VARS

// -----------------------------------------
// PUBLIC FUNCTIONS

/**
 * Initializes a module
 * @param  {string} commandType
 * @param  {string} configPath
 * @param  {string} env
 * @param  {string} sys
 */
function init(commandType, configPath, env, sys) {
    tools.validate.type(
        { commandType: commandType, configPath: configPath, env: env },
        {
            commandType: Joi.string(),
            configPath: Joi.string(),
            env: Joi.string().allow(''),
            sys: Joi.string()
        }
    );

    // Check if there is a config file and load it
    config.get(configPath).then(function (configObj) {
        var oldWd;
        var order;

        // Change working dir so that paths may be relative
        oldWd = process.cwd();
        process.chdir(tools.getDir(configPath));

        // Lets take care of modules ordering
        for (order = 0; order < configObj.maxOrder; order += 1) {
            tools.log('main', 'Order: ' + order);
            runOrder(order, commandType, configObj, env, sys);
        }

        // Change back the working dir
        process.chdir(oldWd);
    });
}

// -----------------------------------------
// PRIVATE FUNCTIONS

/**
 * Runs each instance per order
 * @param  {number} order
 * @param  {string} commandType
 * @param  {object} config
 * @param  {string} env
 * @param  {string} sys
 */
function runOrder(order, commandType, configObj, env, sys) {
    tools.validate.type(
        { order: order, commandType: commandType, config: configObj, env: env, sys: sys },
        {
            order: Joi.number(),
            commandType: Joi.string(),
            config: config.struct,
            env: Joi.string().allow(''),
            sys: Joi.string()
        }
    );

    // Lets run the tasks
    file.task(configObj.copy, "copy", order, env, sys);
    file.task(configObj.rename, "rename", order, env, sys);
    file.task(configObj.remove, "remove", order, env, sys);
    create.task(configObj.create, commandType, order, env, sys);
    style.task(configObj.style, order, env, sys);
    script.task(configObj.script, order, env, sys);
    raw.task(configObj.raw, order, env, sys);
    server.task(configObj.server, commandType, order, env, sys);
}

// -----------------------------------------
// EXPORTS

module.exports = init;
