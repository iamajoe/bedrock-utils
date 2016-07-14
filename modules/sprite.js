'use strict';

// -----------------------------------------
// IMPORTS

var fs = require('fs');
var path = require('path');
var Joi = require('joi');

var tools = require('./tools/main');
var validate = tools.validate;
var file = require('./file');

// -----------------------------------------
// VARS

var struct = Joi.object().keys({
    src: Joi.string().required(), // `toml:"source"`
    dest: Joi.string().required(), // `toml:"destination"`
    style: Joi.string().required(),
    styleName: Joi.string().allow('').default(''),
    styleRel: Joi.string().allow('').default(''),
    ignore: Joi.string().default('').allow(''),
    order: Joi.number().default(0),
    env: Joi.string().allow('').default(''),
    cmd: Joi.string().allow('').default(''),
    sys: Joi.string().allow('').default('all')
});

// -----------------------------------------
// PRIVATE FUNCTIONS

/**
 * Compiles files
 * @param  {array} filesToSprite
 * @param  {object} fileObj
 */
function compileList(filesToSprite, fileObj) {
    var Spritesmith = require('spritesmith');
    var filesData = filesToSprite.map(function (val) {
        var name = path.basename(val.relative).replace('.png', '').replace('.jpg', '');

        // Only .png and .jpg are allowed
        if (path.basename(val.relative) === name) {
            return;
        }

        return { name: name, src: val.absolute };
    }).filter(function (val) { return !!val; });

    // Generate our spritesheet
    Spritesmith.run({
        src: filesData.map(function (val) { return val.src; }),
        algorithm: 'binary-tree'
    }, function (spriteErr, result) {
        var spriteName = fileObj.styleName.length && fileObj.styleName || 'sprite';
        var styleDest = path.join(fileObj.styleRel, path.basename(fileObj.dest));
        var coordinates;
        var fileData;
        var tmpl;
        var i;

        if (spriteErr) {
            return tools.logErr(spriteErr);
        }

        // Set the basis for the sprite icon
        tmpl = '';
        tmpl += '.' + spriteName + ' {\n';
        tmpl += '    display: inline-block;\n';
        tmpl += '    max-width: 100%;\n';
        tmpl += '    max-height: 100%;\n';
        tmpl += '    vertical-align: middle;\n';
        // TODO: Should it be relative? We need to check this!!!
        tmpl += '    background: url(\'' + styleDest + '\') no-repeat;\n';
        tmpl += '    font-size: 0;\n';
        tmpl += '}\n\n';

        for (i = 0; i < filesData.length; i += 1) {
            fileData = filesData[i];
            coordinates = result.coordinates[fileData.src];

            tmpl += '.' + spriteName + '-' + fileData.name + ' {\n';
            tmpl += '    width: ' + coordinates.width + 'px; height: ' + coordinates.height + 'px; ';
            tmpl += 'background-position: -' + coordinates.x + 'px -' + coordinates.y + 'px;\n';
            tmpl += '}\n\n';
        }

        // Output the image
        fs.writeFileSync(tools.getAbsolute(fileObj.dest), result.image);
        fs.writeFileSync(tools.getAbsolute(fileObj.style), tmpl, 'utf8');
    });
}

// -----------------------------------------
// PUBLIC FUNCTIONS

/**
 * Compiles file
 * @param  {object} fileObj
 */
function compile(fileObj) {
    var filesToSprite;
    var ignore;

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

    // Install dependencies
    tools.npmInstall(['spritesmith@3.1.0']);

    // Get the right paths
    filesToSprite = tools.getGlob(fileObj.src);
    ignore = fileObj.ignore ? tools.getGlob(fileObj.ignore) : [];

    // Lets filter files
    ignore = ignore.map(function (obj) { return obj.relative; });
    filesToSprite = filesToSprite.filter(function (obj) {
        return !tools.arrContainsStr(ignore, obj.relative);
    });

    tools.log(fileObj.dest);

    // Now we need to go through the compiler
    compileList(filesToSprite, fileObj);
}

/**
 * Create task for init
 * @param  {object} bedrockObj
 * @param  {object} config
 */
function task(bedrockObj, configObj) {
    validate.type({ config: configObj }, { config: Joi.array().items(struct) });

    // Go through each task
    configObj.forEach(function (configTask) {
        var shouldContinue = tools.decide(bedrockObj, configTask);

        if (shouldContinue) {
            return;
        }

        // Compile each task
        compile(configTask);
    });
}

// -----------------------------------------
// EXPORTS

module.exports = {
    struct: struct,
    task: task,
    compile: compile
};
