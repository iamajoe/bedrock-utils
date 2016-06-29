'use strict';

// -----------------------------------------
// IMPORTS

var path = require('path');
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
}).default({});

var containerStruct = Joi.object().keys({
    name: Joi.string(),
    type: Joi.string(),
    port: Joi.string(),
    link: Joi.array().items(Joi.string()).default([]),
    envVar: Joi.array().items(Joi.string()).default([]), // `toml:"env_var"`
    volume: Joi.array().items(Joi.string()).default([]),
    sleep: Joi.number().default(1),
    order: Joi.number().default(0),
    env: Joi.string().allow('').default(''),
    sys: Joi.string().allow('').default('all')
}).default({
    link: [], envVar: [], volume: []
});

var struct = Joi.object().keys({
    php: Joi.array().items(phpStruct).default([]),
    container: Joi.array().items(containerStruct).default([])
}).default({ php: [], container: [] });

// ---------------------------------
// PHP FUNCTIONS

/**
 * Sets the server on
 * @param  {object} server
 */
function phpUp(server) {
    var publicPath;
    var port;

    validate.type({ server: server }, { server: phpStruct });

    publicPath = server.public;
    port = server.port || 8000;

    tools.log('Running server...');
    tools.log('Folder: ' + publicPath);
    tools.log('   Url: localhost:' + port);

    raw.command({
        command: 'php',
        args: ['-S', 'localhost:' + port, '-t', publicPath]
    });

    // TODO: The php server should create a process number,
    // use & to create running on the background script
    // and on stop, stop it
}

/**
 * Sets the server off
 * @param  {object} server
 */
function phpStop(server) {
    validate.type({ server: server }, { server: phpStruct });

    tools.logErr('Sorry. This feature isn\'t available yet');
}

// ---------------------------------
// CONTAINER FUNCTIONS

/**
 * Sets the container init
 * @param  {object} container
 */
function containerInit(container) {
    var scriptPath;
    var cmdString;
    var cmdArg;
    var valMod;
    var val;
    var i;
    var c;

    validate.type({ container: container }, { container: containerStruct });

    cmdString = container.name + ' ' + container.type + ' ' + container.port;
    cmdArg = '';

    // Take care of links
    for (i = 0; i < container.link.length; i += 1) {
        cmdArg += '--link ' + container.link[i] + ' ';
    }

    // Take care of envVar
    for (i = 0; i < container.envVar.length; i += 1) {
        val = container.envVar[i];
        c = val.indexOf('=');
        valMod = val.slice(i + 1, val.length);

        // Lets check if it is a path
        if (valMod.slice(0, 3) === '../' || valMod.slice(0, 2) === './') {
            val = val.slice(0, c) + '=' + tools.getAbsolute(valMod);
        }

        cmdArg += '-e ' + val + ' ';
    }

    // Take care of volume
    for (i = 0; i < container.volume.length; i += 1) {
        val = container.volume[i];
        c = val.indexOf('=');
        if (c === -1) {
            c = val.indexOf(':');
        }

        valMod = val.slice(0, c);

        // Lets check if it is a path
        if (valMod.slice(0, 3) === '../' || valMod.slice(0, 2) === './') {
            val = tools.getAbsolute(valMod) + ':' + val.slice(c + 1, val.length);
        }


        cmdArg += '-v ' + val + ' ';
    }

    // Now lets get the script path...
    scriptPath = path.join(__dirname, 'external/server/do.sh');

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
    config.php.forEach(function (configTask) {
        var shouldContinue = tools.decide(configTask, order, env, sys);

        if (shouldContinue) {
            return;
        }

        tools.log(commandType + ' php');

        switch (commandType) {
        case 'run':
            phpUp(configTask);
            break;
        case 'stop':
            phpStop(configTask);
            break;
        default:
        }
    });

    // Take care of containers
    config.container.forEach(function (configTask) {
        var shouldContinue = tools.decide(configTask, order, env, sys);

        if (shouldContinue) {
            return;
        }

        tools.log(commandType + ' container ' + configTask.type);

        switch (commandType) {
        case 'init':
            containerInit(configTask);
            break;
        case 'run':
            containerUp(configTask);
            break;
        case 'stop':
            containerStop(configTask);
            break;
        case 'destroy':
            containerDestroy(configTask);
            break;
        default:
        }
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
