#!/usr/bin/env node

'use strict';

// -----------------------------------------
// IMPORTS

var check = require('check-types');
var tools = require('../modules/tools/main.js');
var init = require('../modules/init.js');

// -----------------------------------------
// VARS

var args = process.argv.slice(2, process.argv.length);
var sysOs = process.platform;
var availableCommands = ["init", "build", "run", "stop", "destroy"];

// -----------------------------------------
// PRIVATE FUNCTIONS

// Main project function
function main() {
    tools.logEmpty("############################################");
    tools.log("main", "Lets task what you need");

    // 2 args at least are needed
    if (args.length < 2) {
        printHelp();
        return;
    }

    // None of these tasks?
    var exists = availableCommands.filter(function (val) {
        return val === args[0];
    }).length;

    if (!exists) {
        printHelp();
        return;
    }

    // Lets take care of modules
    init(args[0], args[1], args[2] || "", sysOs);

    // Final steps before leaving the script
    tools.logEmpty("############################################");
}

// Prints help
function printHelp() {
    tools.logErr("usage", " ");
    tools.logErr("usage", "Usage: ./cmd ...");
    tools.logErr("usage", " ");
    tools.logErr("usage", "    init <*.toml>               # Initializes project");
    tools.logErr("usage", "    build <*.toml> [env]        # Builds project");
    tools.logErr("usage", "    run <*.toml>                # Run project");
    tools.logErr("usage", "    stop <*.toml>               # Stop server");
    tools.logErr("usage", "    destroy <*.toml>            # Destroy server related");
    tools.logErr("usage", " ");
};

// -----------------------------------------
// RUNTIME

main();
