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
    cmd: Joi.string().allow('').default(''),
    sys: Joi.string().allow('').default('all')
});

// -----------------------------------------
// PRIVATE FUNCTIONS

// -----------------------------------------
// PUBLIC FUNCTIONS

/**
 * Performs a raw command
 * @param  {object} task
 */
function command(obj) {
    var data;

    validate.type({ obj: obj }, { obj: struct });

    data = exec(obj.command + ' ' + obj.args.join(' '));

    if (data.stderr && data.stderr.length) {
        tools.logErr(data.stderr);
    } else if (data.stdout && data.stdout.length) {
        tools.log(data.stdout);
    }
}

/**
 * Create task for init
 * @param  {object} bedrockObj
 * @param  {object} config
 */
function task(bedrockObj, config) {
    validate.type(
        { config: config },
        { config: Joi.array().items(struct) }
    );

    // Go through each task
    config.forEach(function (configTask) {
        var shouldContinue = tools.decide(bedrockObj, configTask);
        if (shouldContinue) {
            return;
        }

        // Raw command
        tools.log(configTask.command + ' ' + configTask.args.join(' '));
        command(configTask);
    });
}

// -----------------------------------------
// EXPORTS

module.exports = {
    struct: struct,
    task: task,
    command: command
};
