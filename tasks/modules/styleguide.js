/* eslint-disable strict */
'use strict';
/* eslint-enable strict */

// Import packages
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var Joi = require('joi');
var doT = require('dot');
var del = require('del');
var scriptModule = require('./script.js');
var styleModule = require('./style.js');

var OPTIONS_STRUCT = Joi.object().keys({
    layouts: Joi.object().min(2).required(),
    components: Joi.array().items(Joi.string()).required().default([]),
    generalLayout: Joi.string().required(),
    patternLayout: Joi.string().required(),
    scriptCompileOptions: scriptModule.OPTIONS_STRUCT,
    styleCompileOptions: styleModule.OPTIONS_STRUCT
});

var STRUCT = Joi.object().keys({
    src: Joi.string().required(),
    dest: Joi.string(),
    // ignore: Joi.string().default('').allow(''),
    // order: Joi.number().default(0),
    options: OPTIONS_STRUCT.required()
});

//-------------------------------------
// Functions

/**
 * Returns file in raw mode
 * @param  {string} pathSrc
 * @return {string}
 */
function readFile(pathSrc) {
    var filename = require.resolve(pathSrc);
    return fs.readFileSync(filename, 'utf8');
}

/**
 * Compiles style
 * @param  {array} srcs
 * @param  {object} options
 * @param  {string} buildSrc
 */
function compileStyle(srcs, options, buildSrc) {
    var tmpl = '';
    var tmpFile = path.join(buildSrc, '_tmp.scss');
    var i;

    if (!srcs.length) {
        return;
    }

    // First we need to create a global js
    for (i = 0; i < srcs.length; i += 1) {
        tmpl += '@import \'' + srcs[i].src + '\';\n';
    }

    // Write the temporary file
    fs.writeFileSync(tmpFile, tmpl);

    // Now finally compile the script
    styleModule.raw({
        src: tmpFile,
        dest: path.join(buildSrc, 'styleguide.css'),
        options: options
    }, function (err) {
        if (err) {
            throw new Error(err);
        }

        // Remove tmp file
        del.sync([tmpFile], { force: true });
    });
}

/**
 * Compiles script
 * @param  {array} srcs
 * @param  {object} options
 * @param  {string} buildSrc
 */
function compileScript(srcs, options, buildSrc) {
    var tmpl = '';
    var tmpFile = path.join(buildSrc, '_tmp.js');
    var i;

    if (!srcs.length) {
        return;
    }

    // First we need to create a global js
    tmpl += 'window.styleguide = {\n';
    for (i = 0; i < srcs.length; i += 1) {
        tmpl += '    ' + srcs[i].name + ': require(\'' + srcs[i].src + '\')';
        tmpl += (i + 1 === srcs.length - 1) ? ',\n' : '\n';
    }
    tmpl += '};\n';

    // Write the temporary file
    fs.writeFileSync(tmpFile, tmpl);

    // Now finally compile the script
    scriptModule.raw({
        src: tmpFile,
        dest: path.join(buildSrc, 'styleguide.js'),
        options: options
    }, function (err) {
        if (err) {
            throw new Error(err);
        }

        // Remove tmp file
        del.sync([tmpFile], { force: true });
    });
}

/**
 * Builds components
 * @param  {array} comps
 * @param  {object} layouts
 * @return {string}
 */
function buildComponents(comps, layouts) {
    var tmpl = '';
    var compTmpl;
    var comp;
    var i;

    // Lets go through each component
    for (i = 0; i < comps.length; i += 1) {
        comp = comps[i];

        // First the component template
        compTmpl = !!comp.template && doT.template(comp.template)({
            modifiers: comp.modifiers
        });

        // Now under the pattern
        compTmpl = compTmpl ? layouts[comp.patternLayout]({
            template: compTmpl,
            parentModifiers: comp.parentModifiers
        }) : '';

        tmpl += compTmpl;
    }

    return tmpl;
}

/**
 * Gets components available
 * @param  {object} task
 * @return {object}
 */
function getComponents(task) {
    var pathSrc = path.join(task.src, 'components');
    var components = [];

    // Lets require and template each in config now
    components = task.options.components.map(function (val) {
        var src = path.join(pathSrc, val);
        var base = path.dirname(src);
        var comp = require(src);

        // Lets build the final component
        comp = {
            name: comp.name,

            template: !!comp.template && readFile(path.join(base, comp.template)),
            style: !!comp.style && path.join(base, comp.style),
            script: !!comp.script && path.join(base, comp.script),
            runtime: !!comp.runtime && readFile(path.join(base, comp.runtime)),

            parentModifiers: comp.parentModifiers || [''],
            modifiers: comp.modifiers || [''],
            patternLayout: comp.patternLayout || task.options.patternLayout
        };

        return comp;
    });

    return components;
}

/**
 * Gets layouts available
 * @param  {object} task
 * @return {object}
 */
function getLayouts(task) {
    var pathSrc = path.join(task.src, 'layouts');
    var keys = Object.keys(task.options.layouts);
    var layouts = {};
    var src;
    var i;

    // Lets require and template each in config now
    for (i = 0; i < keys.length; i += 1) {
        src = path.join(pathSrc, task.options.layouts[keys[i]]);
        layouts[keys[i]] = doT.template(readFile(src));
    }

    return layouts;
}

/**
 * Initialize tasks
 * @param  {object} task
 * @param  {function} cb
 */
function build(task, cb) {
    var components = getComponents(task);
    var layouts = getLayouts(task);
    var tmpl = buildComponents(components, layouts);
    var styleCompileOptions = task.options.styleCompileOptions;
    var scriptCompileOptions = task.options.scriptCompileOptions;

    var scripts = components.filter(function (comp) {
        return !!comp.name && !!comp.script;
    }).map(function (comp) {
        return { name: comp.name, src: comp.script };
    });
    var styles = components.filter(function (comp) {
        return !!comp.style;
    }).map(function (comp) {
        return { name: comp.name, src: comp.style };
    });
    var runtime = components.filter(function (comp) {
        return !!comp.runtime;
    }).map(function (comp) {
        return comp.runtime;
    });

    // We need to pass now the template to the right layout
    tmpl = layouts[task.options.generalLayout]({
        projectId: task.projectId,
        projectName: task.projectName,
        template: tmpl,
        runtime: runtime.join('\n\n')
    });

    // Ensure dirs exist
    mkdirp(path.dirname(task.dest), function (err) {
        if (err) {
            throw new Error(err);
        }

        // Lets compile all assets
        compileScript(scripts, scriptCompileOptions, task.dest);
        compileStyle(styles, styleCompileOptions, task.dest);

        // Save template file
        fs.writeFile(path.join(task.dest, 'styleguide.html'), tmpl, cb);
    });
}

// --------------------------------
// Export

module.exports = { STRUCT: STRUCT, build: build };
