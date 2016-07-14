'use strict';

// -----------------------------------------
// IMPORTS

var Joi = require('joi');
var tools = require('./tools/main');
var config = require('./config');

var create = require('./create');
var file = require('./file');
var raw = require('./raw');
var script = require('./script');
var server = require('./server');
var style = require('./style');
var sprite = require('./sprite');

// -----------------------------------------
// VARS

var struct = Joi.object().keys({
    cmd: Joi.string().default('all'),
    order: Joi.number().default(0),
    env: Joi.string().allow('').default(''),
    sys: Joi.string().default('all')
});

// -----------------------------------------
// PUBLIC FUNCTIONS

/**
 * Initializes a module
 * @param  {string} cmd
 * @param  {string} configPath
 * @param  {string} env
 * @param  {string} sys
 */
function init(cmd, configPath, env, sys) {
    tools.setProject('project');
    tools.setModule('main');

    tools.validate.type(
        { cmd: cmd, configPath: configPath, env: env, sys: sys },
        {
            cmd: Joi.string(),
            configPath: Joi.string(),
            env: Joi.string().allow(''),
            sys: Joi.string()
        }
    );

    // Check if there is a config file and load it
    tools.setModule('config');
    config.get(configPath).then(function (configObj) {
        var bedrockObj;
        var oldWd;
        var order;

        // Change working dir so that paths may be relative
        oldWd = process.cwd();
        process.chdir(tools.getDir(configPath));

        // Lets take care of modules ordering
        for (order = 0; order < configObj.maxOrder; order += 1) {
            tools.setModule('main');
            tools.log('Order: ' + order);

            // Lets create the bedrock object
            bedrockObj = { order: order, env: env, sys: sys, cmd: cmd };

            runOrder(bedrockObj, configObj);
        }

        // Change back the working dir
        process.chdir(oldWd);
    });
}

// -----------------------------------------
// PRIVATE FUNCTIONS

/**
 * Runs each instance per order
 * @param  {object} bedrockObj
 * @param  {object} configObj
 */
function runOrder(bedrockObj, configObj) {
    tools.validate.type(
        { bedrockObj: bedrockObj, config: configObj },
        { bedrockObj: struct, config: config.struct }
    );

    // Lets run the tasks
    tools.setModule('copy');
    file.task(bedrockObj, configObj.copy, 'copy');

    tools.setModule('rename');
    file.task(bedrockObj, configObj.rename, 'rename');

    tools.setModule('remove');
    file.task(bedrockObj, configObj.remove, 'remove');

    tools.setModule('create');
    create.task(bedrockObj, configObj.create);

    tools.setModule('sprite');
    sprite.task(bedrockObj, configObj.sprite);

    tools.setModule('style');
    style.task(bedrockObj, configObj.style);

    tools.setModule('script');
    script.task(bedrockObj, configObj.script);

    tools.setModule('raw');
    raw.task(bedrockObj, configObj.raw);

    tools.setModule('server');
    server.task(bedrockObj, configObj.server);
}

// -----------------------------------------
// EXPORTS

module.exports = init;
