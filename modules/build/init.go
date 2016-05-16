package "modules/build"

import (
	"strings"
)

// ---------------------------------
// Vars

// ModuleStruct is a general module struct
type ModuleStruct struct {
	Type   string
	File   []FileStruct
	Style  []StyleStruct
	Script []ScriptStruct
	Raw    []RawStruct
}

// ---------------------------------
// Public functions

// Init initializes modules
func Init(configPath string, env string, sys string) {
	// Check if there is a config file and load it
	config, err := ConfigGet(configPath)
	if err != nil {
		LogErr("config", err)
		return
	}

	// Take care of env
	if env == "" {
		env = "both"
	}

	// Take care of sys
	if sys == "" {
		sys = "all"
	}

	// Lets take care of modules
	// Loop each order
	for order := 0; order <= config.MaxOrder; order++ {
		fileModule(ModuleStruct{Type: "copy", File: config.Copy}, order, env, sys)
		fileModule(ModuleStruct{Type: "rename", File: config.Rename}, order, env, sys)
		styleModule(config.Style, order, env, sys)
		scriptModule(config.Script, order, env, sys)
		fileModule(ModuleStruct{Type: "remove", File: config.Remove}, order, env, sys)
		rawModule(config.Raw, order, env, sys)
	}

	return
}

// ---------------------------------
// Private functions

// Check if an array contains a string
func arrContainsStr(arr []string, str string) bool {
	for _, val := range arr {
		if val == str {
			return true
		}
	}
	return false
}

// Logs for a module
func log(module string, str string) {
	if str != "" {
		Log(module, str)
	}
}

// Logs an error for a module
func logErr(module string, err error) {
	if err != nil {
		LogErr(module, err)
	}
}

// Decides what should happen
func decision(taskOrder int, taskEnv string, taskSys string, order int, env string, sys string) (int, string, string, bool) {
	if taskEnv == "" {
		taskEnv = "both"
	}

	if taskSys == "" {
		taskSys = "all"
	}

	mayNotOrder := order != taskOrder
	mayNotEnv := taskEnv != "both" && env != taskEnv
	mayNotSys := taskSys != "all" && sys != taskSys

	// Should it continue?
	shouldContinue := (mayNotOrder || mayNotEnv || mayNotSys)

	return taskOrder, taskEnv, taskSys, shouldContinue
}

// Gets right paths
func getPaths(srcToPath string, ignoreToPath string) ([]string, []string) {
	// Initialize vars
	var src []string
	var ignore []string

	if srcToPath != "" {
		src, _ = FileGetGlob(FileGetAbsolute(srcToPath))
	}

	if ignoreToPath != "" {
		ignore, _ = FileGetGlob(FileGetAbsolute(ignoreToPath))
	}

	return src, ignore
}

// Constructs dest path
func constructDest(module string, dest string, file string) string {
	if dest == "" {
		return dest
	}

	// Check if it goes to a directory
	if string(dest[len(dest)-1]) == "/" {
		dest = dest + FileGetFilename(file)
	}

	// Ensure directory exists
	if module != "remove" {
		if err := FileEnsure(dest); err != nil {
			logErr(module, err)
			return dest
		}
	}

	return FileGetAbsolute(dest)
}

// ---------------------------------
// Module functions

// fileModule initializes file module
func fileModule(module ModuleStruct, order int, env string, sys string) {
	for _, task := range module.File {
		var shouldContinue bool
		if task.Order, task.Env, task.Sys, shouldContinue = decision(
			task.Order, task.Env, task.Sys, order, env, sys,
		); shouldContinue {
			continue
		}

		// Get the right paths
		src, ignore := getPaths(task.Src, task.Ignore)

		// Go through each in the glob
		for _, file := range src {
			// Check if is in the ignore
			if arrContainsStr(ignore, file) {
				continue
			}

			// Copy file
			log(module.Type, file)

			// Needs this
			task.Src = file
			task.Dest = constructDest(module.Type, task.Dest, file)

			// Instantiate log
			var logVal string
			var err error

			switch module.Type {
			case "rename":
				logVal, err = FileRename(task)
			case "remove":
				logVal, err = FileRemove(task)
			default:
				logVal, err = FileCopy(task)
			}

			// Log whatever
			logErr(module.Type, err)
			log(module.Type+"] [result", logVal)
		}
	}
}

// Style compile files
func styleModule(config []StyleStruct, order int, env string, sys string) {
	for _, task := range config {
		var shouldContinue bool
		if task.Order, task.Env, task.Sys, shouldContinue = decision(
			task.Order, task.Env, task.Sys, order, env, sys,
		); shouldContinue {
			continue
		}

		// Get the right paths
		src, ignore := getPaths(task.Src, task.Ignore)

		// Go through each in the glob
		for _, file := range src {
			// Check if is in the ignore
			if arrContainsStr(ignore, file) {
				continue
			}

			// Style file
			log("style", file)

			// Needs this
			task.Src = file
			task.Dest = constructDest("style", task.Dest, file)

			logVal, err := StyleFile(task)
			logErr("style", err)
			log("style] [result", logVal)
		}
	}
}

// Script compile files
func scriptModule(config []ScriptStruct, order int, env string, sys string) {
	for _, task := range config {
		var shouldContinue bool
		if task.Order, task.Env, task.Sys, shouldContinue = decision(
			task.Order, task.Env, task.Sys, order, env, sys,
		); shouldContinue {
			continue
		}

		// Get the right paths
		src, ignore := getPaths(task.Src, task.Ignore)

		// Go through each in the glob
		for _, file := range src {
			// Check if is in the ignore
			if arrContainsStr(ignore, file) {
				continue
			}

			// Style file
			log("script", file)

			// Needs this
			task.Src = file
			task.Dest = constructDest("script", task.Dest, file)

			logVal, err := ScriptFile(task)
			logErr("script", err)
			log("script] [result", logVal)
		}
	}
}

// Raw files
func rawModule(config []RawStruct, order int, env string, sys string) {
	for _, task := range config {
		var shouldContinue bool
		if task.Order, task.Env, task.Sys, shouldContinue = decision(
			task.Order, task.Env, task.Sys, order, env, sys,
		); shouldContinue {
			continue
		}

		// Get absolute paths
		command := task.Command

		// Raw command
		log("raw", command+" "+strings.Join(task.Args, " "))

		logVal, err := RawCommand(task)
		logErr("raw", err)
		log("raw] [result", logVal)
	}
}
