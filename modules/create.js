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

// cmdDir folder of the cmd
var cmdDir = path.dirname(process.argv[1]);

var struct = Joi.object().keys({
    dest: Joi.string().required(), // `toml:"destination"`
    type: Joi.string().required(),
    order: Joi.number().default(0),
    env: Joi.string().allow('').default(''),
    sys: Joi.string().default('all')
});

// -----------------------------------------
// PUBLIC FUNCTIONS

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
        { config: config, commandType: commandType, order: order, env: env, sys: sys },
        {
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
    config.forEach(function (task) {
        var shouldContinue = tools.decide(task, order, env, sys);

        if (shouldContinue) {
            return;
        }

        tools.log('create', task.type);
        project(task);
    });
}

/**
 * Creates a project
 * @param  {object} module
 */
function project(module) {
    validate.type({ module: module }, { module: struct });

    var modules = tools.getGlob(path.join(__dirname, 'external/create', module.type, '**/*'));

    // Now lets run!
    modules.forEach(function (fileObj) {
        var dest = path.join(module.dest, fileObj.relative);

        // Lets copy
        file.copy({
            src: fileObj.absolute,
            dest: tools.getAbsolute(dest),
            order: module.order,
            env: module.env,
            sys: module.sys
        });
    });
}

// -----------------------------------------
// PRIVATE FUNCTIONS

// -----------------------------------------
// EXPORTS

module.exports = {
    struct: struct,
    task: task,
    project: project
};
