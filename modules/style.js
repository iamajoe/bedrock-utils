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

var optionsStruct = Joi.object().keys({
    minify: Joi.boolean(),
    autoprefixer: Joi.string(),
    sourceMap: Joi.boolean() // `toml:"source_map"`
});

var struct = Joi.object().keys({
    src: Joi.string().required(), // `toml:"source"`
    dest: Joi.string().required(), // `toml:"destination"`
    ignore: Joi.string().default(''),
    order: Joi.number().default(0),
    env: Joi.string().allow('').default(''),
    sys: Joi.string().allow('').default('all'),
    options: optionsStruct
});

// -----------------------------------------
// PRIVATE FUNCTIONS

/**
 * Bundles the scss file
 * @param  {object} file
 */
function scssFile(file) {
    var vendorPath;
    var scriptPath;
    var options;

    validate.type({ file: file }, { file: struct });

    // Install dependencies
    tools.npmInstall(['node-sass^3.4.2']);

    // Lets get the paths for the script
    options = JSON.stringify(file.options);
    vendorPath = tools.npmFindModules();
    scriptPath = path.join(__dirname, 'external/style/sass.js');

    // Now lets run the script
    raw.command({
        command: 'node',
        args: [scriptPath, vendorPath, file.src, file.dest, options]
    });
}

/**
 * Bundles the less file
 * @param  {object} file
 */
function lessFile(file) {
    var vendorPath;
    var scriptPath;
    var options;

    validate.type({ file: file }, { file: struct });

    // Install dependencies
    tools.npmInstall(['less^2.6.1']);

    // Lets get the paths for the script
    options = JSON.stringify(file.options);
    vendorPath = tools.npmFindModules();
    scriptPath = path.join(__dirname, 'external/style/less.js');

    // Now lets run the script
    raw.command({
        command: 'node',
        args: [scriptPath, vendorPath, file.src, file.dest, options]
    });
}

/**
 * Bundles the css file
 * @param  {object} file
 */
function cssFile(file) {
    validate.type({ file: file }, { file: struct });

    tools.logErr('CSS module isn\'t implemented yet');
}

/**
 * Autoprefixes css file
 * @param  {object} file
 */
function autoprefix(file) {
    var vendorPath;
    var scriptPath;

    validate.type({ file: file }, { file: struct });

    // Install dependencies
    tools.npmInstall(['postcss@5.0.21', 'autoprefixer@6.3.6']);

    // Lets get the paths for the script
    vendorPath = tools.npmFindModules();
    scriptPath = path.join(__dirname, 'external/style/autoprefix.js');

    // Now lets run the script
    raw.command({
        command: 'node',
        args: [scriptPath, vendorPath, file.dest, file.options.autoprefixer]
    });
}

/**
 * Minifies css file
 * @param  {object} file
 */
function minify(file) {
    var vendorPath;
    var scriptPath;

    validate.type({ file: file }, { file: struct });

    // Install dependencies
    tools.npmInstall(['postcss@5.0.21', 'cssnano^3.5.2']);

    // Lets get the paths for the script
    vendorPath = tools.npmFindModules();
    scriptPath = path.join(__dirname, 'external/style/minify.js');

    // Now lets run the script
    raw.command({
        command: 'node',
        args: [scriptPath, vendorPath, file.dest]
    });
}

// -----------------------------------------
// PUBLIC FUNCTIONS

/**
 * Compiles file
 * @param  {object} file
 */
function compile(file) {
    var extension;

    validate.type({ file: file }, { file: struct });

    if (tools.notExist(file.src)) {
        return tools.logErr('File doesn\'t exist');
    }

    // First ensure the path
    tools.ensurePath(file.dest);

    // Remove file if exists
    if (!tools.notExist(file.dest)) {
        file.remove({ src: file.dest });
    }

    // Now we need to go through the compiler
    extension = path.extname(file.src);
    if (extension === '.sass' || extension === '.scss') {
        scssFile(file);
    } else if (extension === '.less') {
        lessFile(file);
    } else {
        cssFile(file);
    }

    // Now post process
    if (file.options.autoprefixer !== '') {
        autoprefix(file);
    }

    if (file.options.minify) {
        minify(file);
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
        ignore = ignore.map(function (file) {
            return file.relative;
        });
        src = src.filter(function (file) {
            return !tools.arrContainsStr(ignore, file.relative);
        });

        // Go through each in the glob
        src.forEach(function (file) {
            // Create task
            var dest = path.join(task.dest, file.relative);
            var newTask = {
                src: file.absolute,
                dest: tools.getAbsolute(dest),
                options: task.options
            };

            tools.log(file);
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
