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

// cmdDir folder of the cmd
var cmdDir = path.dirname(process.argv[1]);

// -----------------------------------------
// PUBLIC FUNCTIONS

// Init initializes modules
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
        process.chdir(path.dirname(configPath));

        // Lets take care of modules ordering
        for (order = 0; order < configObj.maxOrder; order += 1) {
            tools.log('main', 'Order: ' + order);
            runOrder(order, commandType, configObj, env, sys);
        }

        // Change back the working dir
        process.chdir(oldWd);
    });
}

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
    create.task(configObj.create, commandType, order, env, sys);

//     var wg sync.WaitGroup

//     // Now the routines
//     wg.Add(1)
//     go func() {
//         defer wg.Done()
//         FileTask(config.Copy, "copy", order, env, sys)
//     }()

//     wg.Add(1)
//     go func() {
//         defer wg.Done()
//         FileTask(config.Rename, "rename", order, env, sys)
//     }()

//     wg.Add(1)
//     go func() {
//         defer wg.Done()
//         FileTask(config.Remove, "remove", order, env, sys)
//     }()

//     wg.Add(1)
//     go func() {
//         defer wg.Done()
//         CreateTask(config.Create, commandType, order, env, sys)
//     }()

//     wg.Add(1)
//     go func() {
//         defer wg.Done()
//         RawTask(config.Raw, order, env, sys)
//     }()

//     wg.Add(1)
//     go func() {
//         defer wg.Done()
//         ServerTask(config.Server, commandType, order, env, sys)
//     }()

//     wg.Add(1)
//     go func() {
//         defer wg.Done()
//         ScriptTask(config.Script, order, env, sys)
//     }()

//     // TODO: Style has problems with concurrency because of libsass
//     wg.Add(1)
//     go func() {
//         defer wg.Done()
//         StyleTask(config.Style, order, env, sys)
//     }()

//     // Lets wait now
//     wg.Wait()
}

// -----------------------------------------
// PRIVATE FUNCTIONS

// -----------------------------------------
// EXPORTS

module.exports = init;
