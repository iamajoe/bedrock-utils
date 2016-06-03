package modules

import (
	"github.com/sendoushi/bedrock-utils/modules/tools"
	"os"
	"path"
	"path/filepath"
	"strconv"
	"sync"
)

// ---------------------------------
// Vars

// CmdDir folder of the cmd
var CmdDir, _ = filepath.Abs(filepath.Dir(os.Args[0]))

// ---------------------------------
// Public functions

// Init initializes modules
func Init(commandType string, configPath string, env string, sys string) {
	// Check if there is a config file and load it
	config, err := ConfigGet(configPath)
	if err != nil {
		tools.LogErr("config", err)
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

	// Lets take care of modules ordering
	for order := 0; order <= config.MaxOrder; order++ {
		tools.Log("main", "Order: "+strconv.Itoa(order))
		runOrder(order, commandType, config, env, sys)
	}
}

// runOrder runs each instance per order
func runOrder(order int, commandType string, config ConfigStruct, env string, sys string) {
	var wg sync.WaitGroup

	// Now the routines
	wg.Add(1)
	go func() {
		defer wg.Done()
		FileTask(config.Copy, "copy", order, env, sys)
	}()

	wg.Add(1)
	go func() {
		defer wg.Done()
		FileTask(config.Rename, "rename", order, env, sys)
	}()

	wg.Add(1)
	go func() {
		defer wg.Done()
		FileTask(config.Remove, "remove", order, env, sys)
	}()

	wg.Add(1)
	go func() {
		defer wg.Done()
		CreateTask(config.Create, commandType, order, env, sys)
	}()

	wg.Add(1)
	go func() {
		defer wg.Done()
		RawTask(config.Raw, order, env, sys)
	}()

	wg.Add(1)
	go func() {
		defer wg.Done()
		ServerTask(config.Server, commandType, order, env, sys)
	}()

	wg.Add(1)
	go func() {
		defer wg.Done()
		ScriptTask(config.Script, order, env, sys)
	}()

	// TODO: Style has problems with concurrency because of libsass
	wg.Add(1)
	go func() {
		defer wg.Done()
		StyleTask(config.Style, order, env, sys)
	}()

	// Lets wait now
	wg.Wait()
}
