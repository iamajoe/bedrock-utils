package main

import (
	"errors"
	"github.com/sendoushi/bedrock_tasks/modules"
	"github.com/sendoushi/bedrock_tasks/modules/build"
	"os"
	"runtime"
)

// ---------------------------------
// Vars

args := os.Args[1:]

// ---------------------------------
// Private functions

// Main project function
func main() {
	modules.LogEmpty("############################################")
	modules.Log("main", "Lets task what you need")
	defer modules.LogEmpty("############################################")

	// 2 args at least are needed
	if len(args) < 1 {
		printHelp()
		return
	}

	// Lets run through the tasks
	switch args[0] {
		case "init":
		runInit()
		case "build":
		runBuild()
		case "run":
		runRun()
		case "stop":
		runStop()
		case "destroy":
		runDestroy()
		default:
		printHelp()
	}
}

// Prints help
func printHelp() {
	modules.LogErr("usage", errors.New(" ")
    modules.LogErr("usage", errors.New("Usage: ./cmd ...")
    modules.LogErr("usage", errors.New(" ")
    modules.LogErr("usage", errors.New("    init <*.toml>               # Initializes project")
    modules.LogErr("usage", errors.New("    build <*.toml> [env]        # Builds project")
    modules.LogErr("usage", errors.New("    run <*.toml>                # Run project")
    modules.LogErr("usage", errors.New("    stop <*.toml>               # Stop servers and containers")
    modules.LogErr("usage", errors.New("    destroy <*.toml>            # Destroy servers and containers")
    modules.LogErr("usage", errors.New(" ")
}

// -------------------------------------------
// Modules

// Runs init
func runInit(config) {
	// TODO: Finish this up
}

// Runs build
func runBuild(config) {
	var env string

	// Check if there is a config file
	if len(args) < 2 {
		env = "dev"
	} else {
		env = args[1]
	}

	// Lets take care of modules
	modulesbuild.Init(args[0], env, runtime.GOOS)
}

// Runs run
func runRun(config) {
	// TODO: Finish this up
}

// Runs stop
func runStop(config) {
	// TODO: Finish this up
}

// Runs destroy
func runDestroy(config) {
	// TODO: Finish this up
}
