'use strict';

// -----------------------------------------
// IMPORTS

var Joi = require('joi');

var tools = require('./tools/main');
var validate = tools.validate;
var raw = require('./raw');

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
}).default({ php: [], container: [] });

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
        {
            config: config,
            commandType: commandType,
            order: order,
            env: env,
            sys: sys
        }, {
            config: struct,
            commandType: Joi.string(),
            order: Joi.number(),
            env: Joi.string().allow(''),
            sys: Joi.string()
        }
    );

    // Take care of php
    config.php.forEach(function (task) {
        var shouldContinue = tools.decide(task, order, env, sys);

        if (shouldContinue) {
            return;
        }

        tools.Log('server', commandType + ' php');

        switch (commandType) {
        case 'run':
            phpUp(php);
            break;
        case 'stop':
            phpStop(php);
            break;
        }
    });

    // Take care of containers
    config.container.forEach(function (task) {
        var shouldContinue = tools.decide(task, order, env, sys);

        if (shouldContinue) {
            return;
        }

        tools.Log('server', commandType + ' container ' + container.type);

        switch (commandType) {
        case 'init':
            containerInit(container);
            break;
        case 'run':
            containerUp(container);
            break;
        case 'stop':
            containerStop(container);
            break;
        case 'destroy':
            containerDestroy(container);
            break;
        }
    });
}

// ---------------------------------
// PHP FUNCTIONS

/**
 * Sets the server on
 * @param  {object} server
 */
function phpUp(server) {
    validate.type({ server: server }, { server: phpStruct });

    var publicPath = server.public;
    var port = server.port;

    if (port === 0) {
        port = 8000
    }

    tools.log('server', 'Running server...');
    tools.log('server', 'Folder: ' + publicPath);
    tools.log('server', '   Url: localhost:' + port);

    raw.command({
        command: 'php',
        args: ['-S', 'localhost:' + port, '-t', publicPath],
    });

    // TODO: The php server should create a process number,
    // use & to create running on the background script
    // and on stop, stop it

    return log, err
}

/**
 * Sets the server off
 * @param  {object} server
 */
function phpStop(server) {
    validate.type({ server: server }, { server: phpStruct });

    tools.logErr('server', 'Sorry. This feature isn\'t available yet');
}

// ---------------------------------
// CONTAINER FUNCTIONS

/**
 * Sets the container init
 * @param  {object} container
 */
function containerInit(container) {
    validate.type({ container: container }, { container: containerStruct });

    var cmdString = container.name + ' ' + container.type + ' ' + container.port;
    var cmdArg = '';

    // Take care of links
    cmdArg += container.link.reduce(function (val1, val2) {
        val1 += '--link ' + val2 + ' ';
    });

    // Take care of envVar
    cmdArg += container.envVar.reduce(function (val1, val2) {
        var i = val2.indexOf('=');
        var envVarVal = val2.slice(i + 1, val2.length);

        // Lets check if it is a path
        if (envVarVal.slice(0, 3) === '../' || envVarVal.slice(0, 2) === './') {
            val2 = val2.slice(0, i) + '=' + tools.getAbsolute(envVarVal)
        }

        val1 += '-e ' + val2 + ' ';
    });

    // Take care of volume
    cmdArg += container.volume.reduce(function (val1, val2) {
        var i = val2.indexOf('=');
        var volumeKey = val2.slice(0, i);

        // Lets check if it is a path
        if (volumeKey.slice(0, 3) === '../' || volumeKey.slice(0, 2) === './') {
            val2 = tools.getAbsolute(volumeKey) + ':' + volume.slice(i + 1, volume.length);
        }

        val1 += '-e ' + val2 + ' ';
    });

    // Now lets get the script path...
    var scriptPath = path.join(__dirname, 'external/server/do.sh');

    // ...and run the script
    raw.command({
        command: scriptPath,
        args: ['create', cmdString, cmdArg]
    });
}

/**
 * Sets the container on
 * @param  {object} container
 */
function containerUp(container) {
    var scriptPath = path.join(__dirname, 'external/server/do.sh');

    // Now lets run the script
    raw.command({
        command: scriptPath,
        args: ['run', container.name, String(container.sleep)]
    });
}

/**
 * Sets the container off
 * @param  {object} container
 */
function containerStop(container) {
    var scriptPath = path.join(__dirname, 'external/server/do.sh');

    // Now lets run the script
    raw.command({
        command: scriptPath,
        args: ['stop', container.name]
    });
}

/**
 * Destroys the container
 * @param  {object} container
 */
function containerDestroy(container) {
    var scriptPath = path.join(__dirname, 'external/server/do.sh');

    // Now lets run the script
    raw.command({
        command: scriptPath,
        args: ['destroy', container.name]
    });
}

// -----------------------------------------
// EXPORTS

module.exports = {
    struct: struct,
    task: task,

    phpUp: phpUp,
    phpStop: phpStop,
    containerInit: containerInit,
    containerUp: containerUp,
    containerStop: containerStop,
    containerDestroy: containerDestroy
};
