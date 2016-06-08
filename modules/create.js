'use strict';

// -----------------------------------------
// IMPORTS

var path = require('path');
var Joi = require('joi');

var tools = require('./tools/main');
var validate = tools.validate;
var file = require('./file');

// -----------------------------------------
// VARS

var struct = Joi.object().keys({
    dest: Joi.string().required(), // `toml:"destination"`
    type: Joi.string().required(),
    order: Joi.number().default(0),
    env: Joi.string().allow('').default(''),
    sys: Joi.string().default('all')
});

// -----------------------------------------
// PRIVATE FUNCTIONS

// -----------------------------------------
// PUBLIC FUNCTIONS

/**
 * Creates a project
 * @param  {object} module
 */
function project(module) {
    var modules;

    validate.type({ module: module }, { module: struct });

    // Now lets run!
    modules = tools.getGlob(path.join(__dirname, 'external/create', module.type, '**/*'));
    modules.forEach(function (fileObj) {
        var dest = path.join(module.dest, fileObj.relative);

        // Lets copy
        file.copy({
            src: fileObj.absolute,
            dest: tools.getAbsolute(dest)
        });
    });
}

/**
 * Create task for init
 * @param  {object} config
 * @param  {string} commandType
 * @param  {number} order
 * @param  {string} env
 * @param  {string} sys
 */
function task(config, commandType, order, env, sys) {
    validate.type(
        {
            config: config,
            commandType: commandType,
            order: order,
            env: env,
            sys: sys
        }, {
            config: Joi.array().items(struct),
            commandType: Joi.string(),
            order: Joi.number(),
            env: Joi.string().allow(''),
            sys: Joi.string()
        }
    );

    if (commandType !== 'init') {
        return;
    }

    // Go through each task
    config.forEach(function (configTask) {
        var shouldContinue = tools.decide(configTask, order, env, sys);

        if (shouldContinue) {
            return;
        }

        tools.log(configTask.type);
        project(configTask);
    });
}

// -----------------------------------------
// EXPORTS

module.exports = {
    struct: struct,
    task: task,
    project: project
};
