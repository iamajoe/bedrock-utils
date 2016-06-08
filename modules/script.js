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

var pluginStruct = Joi.object().keys({
    name: Joi.string(),
    type: Joi.string(),
    args: Joi.array().items(Joi.string()).default([]),
    dependencies: Joi.array().items(Joi.string()).default([])
}).default({
    args: [], dependencies: []
});

var resolveStruct = Joi.object().keys({
    alias: Joi.array().items(Joi.string()).default([]),
    root: Joi.array().items(Joi.string()).default([]),
    modulesDirectories: Joi.array().items(Joi.string()).default([]), // `toml:"modules_directories"`
    fallback: Joi.array().items(Joi.string()).default([]),
    extensions: Joi.array().items(Joi.string().allow('')).default([]),
    packageMains: Joi.array().items(Joi.string()).default([]), // `toml:"package_mains"`
    packageAlias: Joi.string(), // `toml:"package_alias"`
    unsafeCache: Joi.array().items(Joi.string()).default([]), // `toml:"unsafe_cache"`
    moduleTemplates: Joi.array().items(Joi.string()).default([]) // `toml:"module_templates"` // ResolveLoader only
}).default({
    alias: [], root: [], modulesDirectories: [], fallback: [],
    extensions: [], packageMains: [], unsafeCache: [], moduleTemplates: []
});

var loaderStruct = Joi.object().keys({
    test: Joi.string(),
    exclude: Joi.string(),
    include: Joi.array().items(Joi.string()).default([]),
    loader: Joi.string(),
    loaders: Joi.array().items(Joi.string()).default([]),
    query: Joi.string(),
    dependencies: Joi.array().items(Joi.string()).default([])
}).default({
    include: [], loaders: [], dependencies: []
});

var moduleStruct = Joi.object().keys({
    preLoaders: Joi.array().items(loaderStruct), // `toml:"pre_loaders"`
    loaders: Joi.array().items(loaderStruct).default([]),
    postLoaders: Joi.array().items(loaderStruct).default([]), // `toml:"post_loaders"`
    noParse: Joi.array().items(Joi.string()).default([]), // `toml:"no_parse"`
    unknownContextRegExp: Joi.string(), // `toml:"unknown_context_reg_exp"`
    unknownContextCritical: Joi.boolean(), // `toml:"unknown_context_critical"`
    exprContextRegExp: Joi.string(), // `toml:"expr_context_reg_exp"`
    exprContextCritical: Joi.boolean(), // `toml:"expr_context_critical"`
    wrappedContextRegExp: Joi.string(), // `toml:"wrapper_context_reg_exp"`
    wrappedContextCritical: Joi.boolean() // `toml:"wrapped_context_critical"`
}).default({
    preLoaders: [], loaders: [], postLoaders: [], noParse: []
});

var outputStruct = Joi.object().keys({
    filename: Joi.string(),
    path: Joi.string(),
    publicPath: Joi.string(), // `toml:"public_path"`
    chunkFilename: Joi.string(), // `toml:"chunk_filename"`
    sourceMapFilename: Joi.string(), // `toml:"source_map_filename"`
    devtoolModuleFilenameTemplate: Joi.string(), // `toml:"devtool_module_filename_template"`
    devtoolFallbackModuleFilenameTemplate: Joi.string(), // `toml:"devtool_fallback_module_filename_template"`
    devtoolLineToLine: Joi.boolean(),   // `toml:"devtool_line_to_line"`
    hotUpdateChunkFilename: Joi.string(), // `toml:"hot_update_chunk_filename"`
    hotUpdateMainFilename: Joi.string(), // `toml:"hot_update_main_filename"`
    jsonpFunction: Joi.string(), // `toml:"jsonp_function"`
    hotUpdateFunction: Joi.string(), // `toml:"hot_update_function"`
    pathinfo: Joi.boolean(),
    library: Joi.string(),
    libraryTarget: Joi.string(), // `toml:"library_target"`
    umdNamedDefine: Joi.boolean(), // `toml:"umd_named_define"`
    sourcePrefix: Joi.string(), // `toml:"source_prefix"`
    crossOriginLoading: Joi.string() // `toml:"cross_origin_loading"`
}).default({});

var optionsStruct = Joi.object().keys({
    minify: Joi.boolean(),

    // Webpack related
    context: Joi.string(),
    entry: Joi.string(),
    output: outputStruct,
    module: moduleStruct,
    resolve: resolveStruct,
    resolveLoader: resolveStruct, // `toml:"resolve_loader"`
    externals: Joi.array().items(Joi.string()).default([]),
    target: Joi.string(),
    bail: Joi.boolean(),
    profile: Joi.boolean(),
    cache: Joi.boolean(),
    debug: Joi.boolean(),
    devtool: Joi.string(),
    devServer: Joi.string(), // `toml:"dev_server"`
    node: Joi.string(),
    amd: Joi.string(),
    loader: Joi.string(),
    recordsPath: Joi.string(), // `toml:"records_path"`
    recordsInputPath: Joi.string(), // `toml:"records_input_path"`
    recordsOutputPath: Joi.string(), // `toml:"records_output_path"`
    plugins: Joi.array().items(pluginStruct).default([])
}).default({
    externals: [], plugins: []
});

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
 * Bundles the file
 * @param  {object} fileObj
 */
function webpackFile(fileObj) {
    var vendorPath;
    var scriptPath;
    var options;
    var deps;

    validate.type({ fileObj: fileObj }, { fileObj: struct });

    deps = ['webpack@1.12.2'];
    fileObj.options.plugins.forEach(function (plugin) {
        deps = deps.concat(plugin.dependencies);
    });
    fileObj.options.module.preLoaders.forEach(function (loader) {
        deps = deps.concat(loader.dependencies);
    });
    fileObj.options.module.loaders.forEach(function (loader) {
        deps = deps.concat(loader.dependencies);
    });
    fileObj.options.module.postLoaders.forEach(function (loader) {
        deps = deps.concat(loader.dependencies);
    });

    // Install dependencies
    tools.npmInstall(deps);

    // TODO: Eslint in the compile

    // Set needed files
    fileObj.options.output.filename = tools.getFilename(fileObj.dest);
    fileObj.options.output.path = tools.getDir(fileObj.dest);
    fileObj.options.entry = fileObj.src;

    // Now for the command
    options = JSON.stringify(JSON.stringify(fileObj.options));
    vendorPath = tools.npmFindModules();
    scriptPath = path.join(__dirname, 'external/script/webpack.js');

    // Now lets run the script
    raw.command({
        command: 'node',
        args: [scriptPath, vendorPath, options]
    });
}

/**
 * Minifies js file
 * @param  {object} fileObj
 */
function minify() {
    // TODO: ...
}

// -----------------------------------------
// PUBLIC FUNCTIONS

/**
 * Compiles file
 * @param  {object} fileObj
 */
function compile(fileObj) {
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
    webpackFile(fileObj);

    // Now post process
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
