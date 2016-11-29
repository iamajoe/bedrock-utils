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
var beautify = require('js-beautify');
var merge = require('deepmerge');
var escape = require('escape-html');
var jsStringEscape = require('js-string-escape');
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
    var isJs = filename.replace('.js', '') !== filename;
    var isHtml = filename.replace('.html', '') !== filename;
    var isCss = filename.replace('.css', '') !== filename;
    var isScss = filename.replace('.scss', '') !== filename;
    var isLess = filename.replace('.less', '') !== filename;
    var file = fs.readFileSync(filename, 'utf8');

    if (isJs) {
        file = beautify.js_beautify(file, { indent_size: 4 });
    } else if (isScss || isLess || isCss) {
        file = beautify.css(file, { indent_size: 4 });
    } else if (isHtml) {
        // Bypass because it will be done after templating
    }

    return file;
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

    // Ensure dirs exist
    mkdirp(path.dirname(tmpFile), function (err) {
        if (err) {
            throw new Error(err);
        }

        // Write the temporary file
        fs.writeFileSync(tmpFile, tmpl);

        // Now finally compile the script
        styleModule.raw({
            src: tmpFile,
            dest: path.join(buildSrc, 'styleguide.css'),
            options: options
        }, function (compileErr) {
            if (compileErr) {
                throw new Error(compileErr);
            }

            // Remove tmp file
            del.sync([tmpFile], { force: true });
        });
    });
}

/**
 * Compiles script
 * @param  {array} srcs
 * @param  {object} options
 * @param  {string} buildSrc
 */
function compileScript(srcs, options, buildSrc) {
    var tmpFile = path.join(buildSrc, '_tmp.js');
    var tmpl = '';
    var name;
    var i;

    if (!srcs.length) {
        return;
    }

    // First we need to create a global js
    tmpl += 'window.styleguide = {\n';
    for (i = 0; i < srcs.length; i += 1) {
        name = srcs[i].name.toLowerCase().replace(/ /g, '');
        tmpl += '    ' + name + ': require(\'' + srcs[i].src + '\')';
        tmpl += (i + 1 === srcs.length - 1) ? ',\n' : '\n';
    }
    tmpl += '};\n';

    // Ensure dirs exist
    mkdirp(path.dirname(tmpFile), function (err) {
        if (err) {
            throw new Error(err);
        }

        // Write the temporary file
        fs.writeFileSync(tmpFile, tmpl);

        // Now finally compile the script
        scriptModule.raw({
            src: tmpFile,
            dest: path.join(buildSrc, 'styleguide.js'),
            options: options
        }, function (compileErr) {
            if (compileErr) {
                throw new Error(compileErr);
            }

            // Remove tmp file
            del.sync([tmpFile], { force: true });
        });
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
    var rawTmpl;
    var rawRuntime;
    var comp;
    var data;
    var i;

    // Lets go through each component
    for (i = 0; i < comps.length; i += 1) {
        comp = comps[i];

        // Data for the templating
        data = merge(comp, {
            id: comp.id || comp.name.toLowerCase().replace(/ /g, '-')
        }, { clone: true });

        // First the component template
        compTmpl = !!comp.template && doT.template(comp.template)(data);

        // Now under the pattern
        data.template = compTmpl;

        // rawTmpl = compTmpl && escape(beautify.html(compTmpl, {
        //     indent_size: 4, eol: '\n',
        // }));
        rawTmpl = compTmpl && escape(beautify.html(compTmpl, {
            indent_size: 4, eol: '\n', unformatted: []
        })).replace(/(?:\r\n|\r|\n)/g, '<br>').replace(/  /g, '&nbsp;&nbsp;');
        data.rawTemplate = rawTmpl;

        rawRuntime = comp.runtime && beautify.js_beautify(comp.runtime, {
            indent_size: 4, eol: '\n'
        });
        rawRuntime = rawRuntime && jsStringEscape(rawRuntime.replace(/(?:\r\n|\r|\n)/g, '<br>'))
        .replace(/\\'/g, '\'').replace(/  /g, '&nbsp;&nbsp;');
        data.rawRuntime = rawRuntime;

        compTmpl = compTmpl ? layouts[comp.patternLayout](data) : '';

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
        comp = merge(comp, {
            template: !!comp.template && readFile(path.join(base, comp.template)),
            style: !!comp.style && path.join(base, comp.style),
            script: !!comp.script && path.join(base, comp.script),
            runtime: !!comp.runtime && readFile(path.join(base, comp.runtime)),

            parentModifiers: comp.parentModifiers || [''],
            modifiers: comp.modifiers || [''],
            patternLayout: comp.patternLayout || task.options.patternLayout
        }, { clone: true });

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
        components: components.filter(function (val) {
            return !!val.template;
        }),
        runtime: runtime.join('\n\n')
    });

    tmpl = beautify.html(tmpl, { indent_size: 4 });

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
