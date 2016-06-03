package main

import (
	"errors"
	"github.com/sendoushi/bedrock-utils/modules"
	"github.com/sendoushi/bedrock-utils/modules/tools"
	"os"
	"runtime"
)

// ---------------------------------
// Vars

var args = os.Args[1:]
var sysOs = runtime.GOOS
var availableCommands = []string{"init", "build", "run", "stop", "destroy"}

// ---------------------------------
// Private functions

// Main project function
func main() {
	tools.LogEmpty("############################################")
	tools.Log("main", "Lets task what you need")
	defer tools.LogEmpty("############################################")

	// 2 args at least are needed
	if len(args) < 2 {
		printHelp()
		return
	}

	// None of these tasks?
	exists := false
	for _, val := range availableCommands {
		if args[0] == val {
			exists = true
			break
		}
	}

	if !exists {
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
	tools.LogErr("usage", errors.New(" "))
	tools.LogErr("usage", errors.New("Usage: ./cmd ..."))
	tools.LogErr("usage", errors.New(" "))
	tools.LogErr("usage", errors.New("    init <*.toml>               # Initializes project"))
	tools.LogErr("usage", errors.New("    build <*.toml> [env]        # Builds project"))
	tools.LogErr("usage", errors.New("    run <*.toml>                # Run project"))
	tools.LogErr("usage", errors.New("    stop <*.toml>               # Stop server"))
	tools.LogErr("usage", errors.New("    destroy <*.toml>            # Destroy server related"))
	tools.LogErr("usage", errors.New(" "))
}
