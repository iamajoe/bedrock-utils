'use strict';

// -----------------------------------------
// IMPORTS

var Joi = require('joi');

var tools = require('./tools/main');
var validate = tools.validate;

// -----------------------------------------
// VARS

var struct = Joi.object().keys({
    src: Joi.string().required(), // `toml:"source"`
    dest: Joi.string().optional(), // `toml:"destination"`
    ignore: Joi.string().default(''),
    order: Joi.number().default(0),
    env: Joi.string().allow('').default(''),
    sys: Joi.string().allow('').default('all')
});

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
function task(config, taskType, order, env, sys) {
    validate.type(
        {
            config: config,
            taskType: taskType,
            order: order,
            env: env,
            sys: sys
        }, {
            config: Joi.array().items(struct),
            taskType: Joi.string(),
            order: Joi.number(),
            env: Joi.string().allow(''),
            sys: Joi.string()
        }
    );

    // Go through each task
    config.forEach(function (task) {
        var shouldContinue = tools.decide(task, order, env, sys);

        if (shouldContinue) {
            return;
        }

        // Get the right paths
        var src = tools.getGlob(task.src);
        var ignore = task.ignore ? tools.getGlob(task.ignore) : [];

        // Lets filter files
        ignore = ignore.map(function (file) {
            return file.relative;
        });
        src = src.filter(function (file) {
            return !tools.arrContainsStr(ignore, file.relative);
        });

        // Go through each in the glob
        src.forEach(function (file) {
            tools.log(taskType, file);

            // Create task
            var dest = path.join(task.dest, file.relative);
            var newTask = {
                src: file.absolute,
                dest: tools.getAbsolute(dest),
                order: module.order,
                env: module.env,
                sys: module.sys
            };

            switch (taskType) {
            case "rename":
                rename(newTask);
            case "remove":
                remove(newTask);
            default:
                copy(newTask);
            }
        });
    });
}

/**
 * Copies * from source to destination
 * @param  {object} file
 */
function copy(file) {
    validate.type({ file: file }, { file: struct });

    if (tools.notExist(file.src)) {
        return tools.logErr('copy', 'File doesn\'t exist');
    }

    if (tools.isDirectory(file.src)) {
        // We should recursive in case of directory
        task([{
            src: file.src + '/**/*',
            dest: module.dest,
            order: module.order,
            env: module.env,
            sys: module.sys
        }], 'copy', module.order, module.env, module.sys);
    } else {
        // First ensure the path
        tools.ensurePath(file.dest);

        // Remove file if exists
        if (!tools.notExist(file.dest)) {
            remove({
                src: file.dest,
                order: module.order,
                env: module.env,
                sys: module.sys
            });
        }

        // Now copy the file
        // TODO: ...
    }
}

/**
 * Removes * from source
 * @param  {object} file
 */
function remove(file) {
    validate.type({ file: file }, { file: struct });

    if (tools.notExist(file.src)) {
        return;
    }

    if (tools.isDirectory(file.src)) {
        // We should recursive in case of directory
        task([{
            src: file.src + '/**/*',
            order: module.order,
            env: module.env,
            sys: module.sys
        }], 'remove', module.order, module.env, module.sys);
    } else {
        // Now remove the file
        // TODO: ...
    }
}

// FileRename renames * from source to destination
// func FileRename(file FileStruct) (log string, err error) {
//     src := file.Src
//     dest := file.Dest

//     err = os.Rename(src, dest)
//     if err != nil {
//         return "", err
//     }

//     return
// }

// -----------------------------------------
// PRIVATE FUNCTIONS

// Copy file from source to destination
// func fileCopy(file FileStruct) (err error) {
//     src := file.Src
//     dest := file.Dest

//     // We need to ensure that the folder exists
//     err = tools.EnsurePath(dest)
//     if err != nil {
//         return err
//     }

//     // Remove old destination file if exists
//     FileRemove(FileStruct{Src: dest})

//     // Copy the file
//     err = os.Link(src, dest)
//     if err != nil {
//         return err
//     }

//     return
// }

// // Copy folder from source to destination
// func folderCopy(file FileStruct) (err error) {
//     src := file.Src
//     dest := file.Dest

//     // We need to ensure that the folder exists
//     err = tools.EnsurePath(dest)
//     if err != nil {
//         return err
//     }

//     // Remove old destination file if exists
//     FileRemove(FileStruct{Src: dest})

//     // Make folder
//     mode := os.FileMode(int(0777))
//     if err := os.MkdirAll(dest, mode); err != nil {
//         return err
//     }

//     // Read the files inside
//     dir, _ := os.Open(src)
//     files, _ := dir.Readdir(-1)

//     // Loop each file
//     for _, file := range files {
//         srcPath := path.Join(src, file.Name())
//         destPath := path.Join(dest, file.Name())

//         // Copy new file
//         _, err = FileCopy(FileStruct{Src: srcPath, Dest: destPath})
//         if err != nil {
//             return err
//         }
//     }

//     return
// }

// -----------------------------------------
// EXPORTS

module.exports = {
    struct: struct,
    task: task,
    copy: copy
};
