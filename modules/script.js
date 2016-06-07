'use strict';

// -----------------------------------------
// IMPORTS

var Joi = require('joi');

// -----------------------------------------
// VARS

var pluginStruct = Joi.object().keys({
    name: Joi.string(),
    type: Joi.string(),
    args: Joi.array().items(Joi.string()),
    dependencies: Joi.array().items(Joi.string())
});

var resolveStruct = Joi.object().keys({
    Alias: Joi.array().items(Joi.string()),
    Root: Joi.array().items(Joi.string()),
    ModulesDirectories: Joi.array().items(Joi.string()), // `toml:"modules_directories"`
    Fallback: Joi.array().items(Joi.string()),
    Extensions: Joi.array().items(Joi.string()),
    PackageMains: Joi.array().items(Joi.string()), // `toml:"package_mains"`
    PackageAlias: Joi.string(), // `toml:"package_alias"`
    UnsafeCache: Joi.array().items(Joi.string()), // `toml:"unsafe_cache"`
    ModuleTemplates: Joi.array().items(Joi.string()) // `toml:"module_templates"` // ResolveLoader only
});

var loaderStruct = Joi.object().keys({
    test: Joi.string(),
    exclude: Joi.string(),
    include: Joi.array().items(Joi.string()),
    loader: Joi.string(),
    loaders: Joi.array().items(Joi.string()),
    query: Joi.string(),

    dependencies: Joi.array().items(Joi.string())
});

var moduleStruct = Joi.object().keys({
    preLoaders: Joi.array().items(loaderStruct), // `toml:"pre_loaders"`
    loaders: Joi.array().items(loaderStruct),
    postLoaders: Joi.array().items(loaderStruct), // `toml:"post_loaders"`
    noParse: Joi.array().items(Joi.string()), // `toml:"no_parse"`
    unknownContextRegExp: Joi.string(), // `toml:"unknown_context_reg_exp"`
    unknownContextCritical: Joi.boolean(), // `toml:"unknown_context_critical"`
    exprContextRegExp: Joi.string(), // `toml:"expr_context_reg_exp"`
    exprContextCritical: Joi.boolean(), // `toml:"expr_context_critical"`
    wrappedContextRegExp: Joi.string(), // `toml:"wrapper_context_reg_exp"`
    wrappedContextCritical: Joi.boolean() // `toml:"wrapped_context_critical"`
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
    crossOriginLoading: Joi.string(), // `toml:"cross_origin_loading"`
});

var optionsStruct = Joi.object().keys({
    minify: Joi.boolean(),

    // Webpack related
    context: Joi.string(),
    entry: Joi.string(),
    output: outputStruct,
    module: moduleStruct,
    resolve: resolveStruct,
    resolveLoader: resolveStruct, // `toml:"resolve_loader"`
    externals: Joi.array().items(Joi.string()),
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
    plugins: Joi.array().items(pluginStruct)
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
// PUBLIC FUNCTIONS

// -----------------------------------------
// PRIVATE FUNCTIONS

// -----------------------------------------
// EXPORTS

module.exports = { struct: struct };
