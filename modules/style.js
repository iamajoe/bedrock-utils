'use strict';

// -----------------------------------------
// IMPORTS

var path = require('path');
var Joi = require('joi');

var tools = require('./tools/main');
var validate = tools.validate;
var file = require('./file');
var raw = require('./raw');

// -----------------------------------------
// VARS

var optionsStruct = Joi.object().keys({
    minify: Joi.boolean().default(false),
    autoprefixer: Joi.string().default('').allow(''),
    sourceMap: Joi.boolean().default(false) // `toml:"source_map"`
}).default({ minify: false, autoprefixer: '', sourceMap: false });

var struct = Joi.object().keys({
    src: Joi.string().required(), // `toml:"source"`
    dest: Joi.string().required(), // `toml:"destination"`
    ignore: Joi.string().default('').allow(''),
    order: Joi.number().default(0),
    env: Joi.string().allow('').default(''),
    sys: Joi.string().allow('').default('all'),
    options: optionsStruct
});

// -----------------------------------------
// PRIVATE FUNCTIONS

/**
 * Bundles the scss file
 * @param  {object} fileObj
 */
function scssFile(fileObj) {
    var vendorPath;
    var scriptPath;
    var options;

    validate.type({ fileObj: fileObj }, { fileObj: struct });

    // Install dependencies
    tools.npmInstall(['node-sass@3.4.2']);

    // Lets get the paths for the script
    options = JSON.stringify(JSON.stringify(fileObj.options));
    vendorPath = tools.npmFindModules();
    scriptPath = path.join(__dirname, 'external/style/sass.js');

    // Now lets run the script
    raw.command({
        command: 'node',
        args: [scriptPath, vendorPath, fileObj.src, fileObj.dest, options]
    });
}

/**
 * Bundles the less file
 * @param  {object} fileObj
 */
function lessFile(fileObj) {
    var vendorPath;
    var scriptPath;
    var options;

    validate.type({ fileObj: fileObj }, { fileObj: struct });

    // Install dependencies
    tools.npmInstall(['less@2.6.1']);

    // Lets get the paths for the script
    options = JSON.stringify(JSON.stringify(fileObj.options));
    vendorPath = tools.npmFindModules();
    scriptPath = path.join(__dirname, 'external/style/less.js');

    // Now lets run the script
    raw.command({
        command: 'node',
        args: [scriptPath, vendorPath, fileObj.src, fileObj.dest, options]
    });
}

/**
 * Bundles the css file
 * @param  {object} file
 */
function cssFile(fileObj) {
    validate.type({ fileObj: fileObj }, { fileObj: struct });

    tools.logErr('CSS module isn\'t implemented yet');
}

/**
 * Autoprefixes css file
 * @param  {object} file
 */
function autoprefix(fileObj) {
    var vendorPath;
    var scriptPath;
    var options;

    validate.type({ fileObj: fileObj }, { fileObj: struct });

    // Install dependencies
    tools.npmInstall(['postcss@5.0.21', 'autoprefixer@6.3.6']);

    // Lets get the paths for the script
    options = JSON.stringify(fileObj.options.autoprefixer);
    vendorPath = tools.npmFindModules();
    scriptPath = path.join(__dirname, 'external/style/autoprefix.js');

    // Now lets run the script
    raw.command({
        command: 'node',
        args: [scriptPath, vendorPath, fileObj.dest, options]
    });
}

/**
 * Minifies css file
 * @param  {object} fileObj
 */
function minify(fileObj) {
    var vendorPath;
    var scriptPath;

    validate.type({ fileObj: fileObj }, { fileObj: struct });

    // Install dependencies
    tools.npmInstall(['postcss@5.0.21', 'cssnano@3.5.2']);

    // Lets get the paths for the script
    vendorPath = tools.npmFindModules();
    scriptPath = path.join(__dirname, 'external/style/minify.js');

    // Now lets run the script
    raw.command({
        command: 'node',
        args: [scriptPath, vendorPath, fileObj.dest]
    });
}

// -----------------------------------------
// PUBLIC FUNCTIONS

/**
 * Compiles file
 * @param  {object} fileObj
 */
function compile(fileObj) {
    var extension;

    validate.type({ fileObj: fileObj }, { fileObj: struct });

    if (tools.notExist(fileObj.src)) {
        return tools.logErr('File doesn\'t exist');
    }

    // First ensure the path
    tools.ensurePath(fileObj.dest);

    // Remove file if exists
    if (!tools.notExist(fileObj.dest)) {
        file.remove({ src: fileObj.dest });
    }

    // Now we need to go through the compiler
    extension = path.extname(fileObj.src);
    if (extension === '.sass' || extension === '.scss') {
        scssFile(fileObj);
    } else if (extension === '.less') {
        lessFile(fileObj);
    } else {
        cssFile(fileObj);
    }

    // Now post process
    if (fileObj.options.autoprefixer.length) {
        autoprefix(fileObj);
    }

    if (fileObj.options.minify) {
        minify(fileObj);
    }
}

/**
 * Create task for init
 * @param  {object} config
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
    config.forEach(function (configTask) {
        var shouldContinue = tools.decide(configTask, order, env, sys);
        var ignore;
        var src;

        if (shouldContinue) {
            return;
        }

        // Get the right paths
        src = tools.getGlob(configTask.src);
        ignore = configTask.ignore ? tools.getGlob(configTask.ignore) : [];

        // Lets filter files
        ignore = ignore.map(function (fileObj) {
            return fileObj.relative;
        });
        src = src.filter(function (fileObj) {
            return !tools.arrContainsStr(ignore, fileObj.relative);
        });

        // Go through each in the glob
        src.forEach(function (fileObj) {
            // Create task
            var dest = path.join(configTask.dest, fileObj.relative);
            var newTask = {
                src: fileObj.absolute,
                dest: tools.getAbsolute(dest),
                options: configTask.options
            };

            tools.log(fileObj.absolute);
            compile(newTask);
        });
    });
}

// -----------------------------------------
// EXPORTS

module.exports = {
    struct: struct,
    task: task,
    compile: compile
};
