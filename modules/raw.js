'use strict';

// -----------------------------------------
// IMPORTS

var exec = require('sync-exec');
var Joi = require('joi');

var tools = require('./tools/main');
var validate = tools.validate;

// -----------------------------------------
// VARS

var struct = Joi.object().keys({
    command: Joi.string().required(),
    args: Joi.array().items(Joi.string()).default([]),
    order: Joi.number().default(0),
    env: Joi.string().allow('').default(''),
    sys: Joi.string().allow('').default('all')
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
function task(config, order, env, sys) {
    validate.type(
        {
            config: config,
            order: order,
            env: env,
            sys: sys
        }, {
            config: Joi.array().items(struct),
            order: Joi.number(),
            env: Joi.string().allow(''),
            sys: Joi.string()
        }
    );

    // Go through each task
    config.forEach(function (task) {
        var shouldContinue = tools.decide(task, order, env, sys);

        if (shouldContinue) {
            return;
        }

        // Raw command
        tools.log('raw', task.command + ' ' + task.args.join(' '));
        command(task);
    });
}

// -----------------------------------------
// PRIVATE FUNCTIONS

/**
 * Performs a raw command
 * @param  {object} task
 */
function command(task) {
    validate.type({ task: task }, { task: struct });

    var data = exec(task.command + ' ' + task.args.join(' '));

    if (data.stderr && data.stderr.length) {
        tools.logErr('raw', data.stderr);
    } else if (data.stdout && data.stdout.length) {
        tools.log('raw', data.stdout);
    }
}

// -----------------------------------------
// EXPORTS

module.exports = {
    struct: struct,
    task: task,
    command: command
};
