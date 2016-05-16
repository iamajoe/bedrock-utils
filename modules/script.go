package modules

import (
	"errors"
)

// ---------------------------------
// Vars

// ScriptStruct struct for the project
type ScriptStruct struct {
	Src     string `toml:"source"`
	Dest    string `toml:"destination"`
	Ignore  string
	Order   int
	Env     string
	Sys     string
	Options scriptOptionsStruct
}

type scriptOptionsStruct struct {
	Target                    string
	ResolveLoaderRoot         string               `toml:"resolve_loader_root"`
	ResolveRoot               string               `toml:"resolve_root"`
	ResolveExtensions         []string             `toml:"resolve_extensions"`
	ResolveModulesDirectories []string             `toml:"resolve_modules_directories"`
	ModuleLoaders             []scriptLoaderStruct `toml:"module_loaders"`
	Devtool                   string
	Cache                     string
	Watch                     string
	Debug                     string
	Bail                      bool

	// Plugins []
	// Externals {}
}

type scriptLoaderStruct struct {
	Test                string
	Loader              string
	QueryCacheDirectory string   `toml:"query_cache_directory"`
	QueryPresets        []string `toml:"query_presets"`
	Include             string
	Exclude             string
}

// ---------------------------------
// Public functions

// ScriptTask for init
func ScriptTask(config []ScriptStruct, order int, env string, sys string) {
	for _, task := range config {
		var shouldContinue bool
		if task.Order, task.Env, task.Sys, shouldContinue = InitDecision(
			task.Order, task.Env, task.Sys, order, env, sys,
		); shouldContinue {
			continue
		}

		// Get the right paths
		src, ignore := GetPaths(task.Src, task.Ignore)

		// Go through each in the glob
		for _, file := range src {
			// Check if is in the ignore
			if ArrContainsStr(ignore, file) {
				continue
			}

			// Style file
			Log("script", file)

			// Needs this
			task.Src = file
			task.Dest = ConstructDest("script", task.Dest, file)

			logVal, err := ScriptFile(task)
			LogErr("script", err)
			Log("script] [result", logVal)
		}
	}
}

// ScriptFile compiles file
func ScriptFile(file ScriptStruct) (log string, err error) {
	src := file.Src

	if NotExist(src) {
		return "", errors.New("File doesn't exist")
	}

	return "", errors.New("Sorry. This feature isn't available yet")
}

// ---------------------------------
// Private functions

// webpackFile bundles the file
func webpackFile() (err error) {
	return
}

// uglifyFile uglify the file
func uglifyFile() (err error) {
	return
}
