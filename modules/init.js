'use strict';

// -----------------------------------------
// IMPORTS

var path = require('path');
var tools = require('./tools/main');
var config = require('./config');

// -----------------------------------------
// VARS

// CmdDir folder of the cmd
var CmdDir = path.dirname(process.argv[1]);

// -----------------------------------------
// PUBLIC FUNCTIONS

// Init initializes modules
function init(commandType, configPath, env, sys) {
    check.validate(
        { commandType: commandType, configPath: configPath, env: env, sys: sys },
        {
            commandType: check.Joi.string(),
            configPath: check.Joi.string(),
            env: check.Joi.string(),
            sys: check.Joi.string()
        }
    );

    // Check if there is a config file and load it
    var configObj = config(configPath);

    // Change working dir so that paths may be relative
    // wd, _ := os.Getwd()
    // os.Chdir(path.Dir(configPath))
    // defer os.Chdir(wd)

    // // Lets take care of modules ordering
    // for order := 0; order <= config.MaxOrder; order++ {
    //     tools.Log("main", "Order: "+strconv.Itoa(order))
    //     runOrder(order, commandType, config, env, sys)
    // }
}

// runOrder runs each instance per order
// func runOrder(order int, commandType string, config ConfigStruct, env string, sys string) {
//     var wg sync.WaitGroup

//     // Now the routines
//     wg.Add(1)
//     go func() {
//         defer wg.Done()
//         FileTask(config.Copy, "copy", order, env, sys)
//     }()

//     wg.Add(1)
//     go func() {
//         defer wg.Done()
//         FileTask(config.Rename, "rename", order, env, sys)
//     }()

//     wg.Add(1)
//     go func() {
//         defer wg.Done()
//         FileTask(config.Remove, "remove", order, env, sys)
//     }()

//     wg.Add(1)
//     go func() {
//         defer wg.Done()
//         CreateTask(config.Create, commandType, order, env, sys)
//     }()

//     wg.Add(1)
//     go func() {
//         defer wg.Done()
//         RawTask(config.Raw, order, env, sys)
//     }()

//     wg.Add(1)
//     go func() {
//         defer wg.Done()
//         ServerTask(config.Server, commandType, order, env, sys)
//     }()

//     wg.Add(1)
//     go func() {
//         defer wg.Done()
//         ScriptTask(config.Script, order, env, sys)
//     }()

//     // TODO: Style has problems with concurrency because of libsass
//     wg.Add(1)
//     go func() {
//         defer wg.Done()
//         StyleTask(config.Style, order, env, sys)
//     }()

//     // Lets wait now
//     wg.Wait()
// }

// -----------------------------------------
// PRIVATE FUNCTIONS

// -----------------------------------------
// EXPORTS

module.exports = init;
