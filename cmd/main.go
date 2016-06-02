package main

import (
	"errors"
	"github.com/sendoushi/bedrock-utils/modules"
	"os"
	"runtime"
)

// ---------------------------------
// Vars

var args = os.Args[1:]
var sysOs = runtime.GOOS

// ---------------------------------
// Private functions

// Main project function
func main() {
	modules.LogEmpty("############################################")
	modules.Log("main", "Lets task what you need")
	defer modules.LogEmpty("############################################")

	// 2 args at least are needed
	if len(args) < 2 {
		printHelp()
		return
	}

	// None of these tasks?
	if args[0] != "init" && args[0] != "build" && args[0] != "run" && args[0] != "stop" && args[0] != "destroy" {
		printHelp()
		return
	}

	// Finally lets start the module
	var env string

	// Check if there is a config file
	if len(args) < 3 {
		env = "dev"
	} else {
		env = args[2]
	}

	// Lets take care of modules
	modules.Init(args[0], args[1], env, sysOs)
}

// Prints help
func printHelp() {
	modules.LogErr("usage", errors.New(" "))
	modules.LogErr("usage", errors.New("Usage: ./cmd ..."))
	modules.LogErr("usage", errors.New(" "))
	modules.LogErr("usage", errors.New("    init <*.toml>               # Initializes project"))
	modules.LogErr("usage", errors.New("    build <*.toml> [env]        # Builds project"))
	modules.LogErr("usage", errors.New("    run <*.toml>                # Run project"))
	modules.LogErr("usage", errors.New("    stop <*.toml>               # Stop server"))
	modules.LogErr("usage", errors.New("    destroy <*.toml>            # Destroy server related"))
	modules.LogErr("usage", errors.New(" "))
}
