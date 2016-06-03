package modules

import (
	"errors"
	"github.com/sendoushi/bedrock-utils/modules/tools"
	"path"
	"strconv"
	"strings"
)

// ---------------------------------
// Vars

// ServerStruct struct for the project
type ServerStruct struct {
	Php       []ServerPhpStruct
	Container []ServerContainerStruct
}

// ServerPhpStruct struct for the php server
type ServerPhpStruct struct {
	Public string
	Port   int
	Order  int
	Env    string
	Sys    string
}

// ServerContainerStruct struct for the container
type ServerContainerStruct struct {
	Name   string
	Type   string
	Port   string
	Link   []string
	EnvVar []string `toml:"env_var"`
	Volume []string
	Sleep  int
	Order  int
	Env    string
	Sys    string
}

// ---------------------------------
// Public functions

// ServerTask for init
func ServerTask(task ServerStruct, commandType string, order int, env string, sys string) {

	// Take care of php
	for _, php := range task.Php {
		var shouldContinue bool
		if php.Order, php.Env, php.Sys, shouldContinue = tools.InitDecision(
			php.Order, php.Env, php.Sys, order, env, sys,
		); shouldContinue {
			continue
		}

		// Log the type
		tools.Log("server", commandType+" php")

		// Instantiate log
		var logVal string
		var err error

		switch commandType {
		case "run":
			logVal, err = ServerPhpUp(php)
		case "stop":
			logVal, err = ServerPhpStop(php)
		default:
			continue
		}

		// Log whatever
		tools.LogErr("server", err)
		tools.Log("server] [result", logVal)
	}

	// Take care of containers
	for _, container := range task.Container {
		var shouldContinue bool
		if container.Order, container.Env, container.Sys, shouldContinue = tools.InitDecision(
			container.Order, container.Env, container.Sys, order, env, sys,
		); shouldContinue {
			continue
		}

		// Log the type
		tools.Log("server", commandType+" container "+container.Type)

		// Instantiate log
		var logVal string
		var err error

		switch commandType {
		case "init":
			logVal, err = ServerContainerInit(container)
		case "run":
			logVal, err = ServerContainerUp(container)
		case "stop":
			logVal, err = ServerContainerStop(container)
		case "destroy":
			logVal, err = ServerContainerDestroy(container)
		default:
			continue
		}

		// Log whatever
		tools.LogErr("server", err)
		tools.Log("server] [result", logVal)
	}
}

// ---------------------------------
// PHP functions

// ServerPhpUp sets the server on
func ServerPhpUp(server ServerPhpStruct) (log string, err error) {
	public := server.Public
	port := server.Port

	if port == 0 {
		port = 8000
	}

	tools.Log("server", "Running server...")
	tools.Log("server", "Folder: "+public)
	tools.Log("server", "   Url: "+"localhost:"+strconv.Itoa(port))

	log, err = RawCommand(RawStruct{
		Command: "php",
		Args:    []string{"-S", "localhost:" + strconv.Itoa(port), "-t", public},
	})

	// TODO: The php server should create a process number,
	// use & to create running on the background script
	// and on stop, stop it

	return log, err
}

// ServerPhpStop sets the server off
func ServerPhpStop(server ServerPhpStruct) (log string, err error) {
	return "", errors.New("Sorry. This feature isn't available yet")
}

// ---------------------------------
// Container functions

// ServerContainerInit sets the container init
func ServerContainerInit(container ServerContainerStruct) (log string, err error) {
	cmdString := container.Name + " " + container.Type + " " + container.Port
	cmdArg := ""

	// Take care of links
	for _, link := range container.Link {
		cmdArg += "--link " + link + " "
	}

	// Take care of envVar
	for _, envVar := range container.EnvVar {
		i := strings.Index(envVar, "=")
		envVarVal := envVar[i+1 : len(envVar)]

		// Lets check if it is a path
		if envVarVal[0:3] == "../" || envVarVal[0:2] == "./" {
			envVar = envVar[0:i] + "=" + tools.GetAbsolute(envVarVal)
		}

		cmdArg += "-e " + envVar + " "
	}

	// Take care of volume
	for _, volume := range container.Volume {
		i := strings.Index(volume, ":")
		volumeKey := volume[0:i]

		// Lets check if it is a path
		if volumeKey[0:3] == "../" || volumeKey[0:2] == "./" {
			volume = tools.GetAbsolute(volumeKey) + ":" + volume[i+1:len(volume)]
		}

		cmdArg += "-v " + volume + " "
	}

	// Now lets get the script path...
	scriptPath := path.Join(CmdDir, "external/server/do.sh")

	// ...and run the script
	log, err = RawCommand(RawStruct{
		Command: scriptPath,
		Args:    []string{"create", cmdString, cmdArg},
	})

	return log, err
}

// ServerContainerUp sets the container on
func ServerContainerUp(container ServerContainerStruct) (log string, err error) {
	scriptPath := path.Join(CmdDir, "external/server/do.sh")

	// Now lets run the script
	log, err = RawCommand(RawStruct{
		Command: scriptPath,
		Args:    []string{"run", container.Name, strconv.Itoa(container.Sleep)},
	})

	return log, err
}

// ServerContainerStop sets the container off
func ServerContainerStop(container ServerContainerStruct) (log string, err error) {
	scriptPath := path.Join(CmdDir, "external/server/do.sh")

	// Now lets run the script
	log, err = RawCommand(RawStruct{
		Command: scriptPath,
		Args:    []string{"stop", container.Name},
	})

	return log, err
}

// ServerContainerDestroy destroys the container
func ServerContainerDestroy(container ServerContainerStruct) (log string, err error) {
	scriptPath := path.Join(CmdDir, "external/server/do.sh")

	// Now lets run the script
	log, err = RawCommand(RawStruct{
		Command: scriptPath,
		Args:    []string{"destroy", container.Name},
	})

	return log, err
}

// ---------------------------------
// Private functions
