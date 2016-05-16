package modules

import (
	"os"
	"path"
	"path/filepath"
)

// ---------------------------------
// Vars

// ---------------------------------
// Public functions

// Init initializes modules
func Init(commandType string, configPath string, env string, sys string) {
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

	// Change working dir so that paths may be relative
	wd, _ := os.Getwd()
	os.Chdir(path.Dir(configPath))
	defer os.Chdir(wd)

	// Lets take care of modules
	// Loop each order
	for order := 0; order <= config.MaxOrder; order++ {
		FileTask(config.Copy, "copy", order, env, sys)
		FileTask(config.Rename, "rename", order, env, sys)
		StyleTask(config.Style, order, env, sys)
		ScriptTask(config.Script, order, env, sys)
		FileTask(config.Remove, "remove", order, env, sys)
		RawTask(config.Raw, order, env, sys)
		ServerTask(config.Server, commandType, order, env, sys)
	}

	return
}

// ---------------------------------
// To be used by module functions

// ArrContainsStr checks if an array contains a string
func ArrContainsStr(arr []string, str string) bool {
	for _, val := range arr {
		if val == str {
			return true
		}
	}
	return false
}

// InitDecision decides what should happen
func InitDecision(taskOrder int, taskEnv string, taskSys string, order int, env string, sys string) (int, string, string, bool) {
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

// GetPaths gets right paths
func GetPaths(srcToPath string, ignoreToPath string) ([]string, []string) {
	// Initialize vars
	var src []string
	var ignore []string

	if srcToPath != "" {
		src, _ = GetGlob(GetAbsolute(srcToPath))
	}

	if ignoreToPath != "" {
		ignore, _ = GetGlob(GetAbsolute(ignoreToPath))
	}

	return src, ignore
}

// ConstructDest constructs dest path
func ConstructDest(module string, dest string, file string) string {
	if dest == "" {
		return dest
	}

	// Check if it goes to a directory
	if string(dest[len(dest)-1]) == "/" {
		dest = dest + GetFilename(file)
	}

	// Ensure directory exists
	if module != "remove" {
		if err := EnsurePath(dest); err != nil {
			LogErr(module, err)
			return dest
		}
	}

	return GetAbsolute(dest)
}

// NotExist checks if file exists
func NotExist(src string) bool {
	_, err := os.Stat(src)
	return err != nil
}

// GetAbsolute gets absolute path
func GetAbsolute(filePath string) string {
	if len(filePath) > 0 && string(filePath[0]) != "/" {
		wd, _ := os.Getwd()
		filePath = path.Join(wd, filePath)
	}

	return filePath
}

// GetGlob gets glob of files
func GetGlob(filePath string) (files []string, err error) {
	// Get all matching
	files, err = filepath.Glob(filePath)

	return files, err
}

// GetFilename gets filename
func GetFilename(filePath string) string {
	return path.Base(filePath)
}

// EnsurePath ensures that all directories exist
func EnsurePath(filePath string) (err error) {
	mode := os.FileMode(int(0777))
	dir := path.Dir(filePath)

	if err := os.MkdirAll(dir, mode); err != nil {
		return err
	}

	return
}
