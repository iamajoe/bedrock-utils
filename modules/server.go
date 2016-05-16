package modules

import (
	"errors"
)

// ---------------------------------
// Vars

// ServerStruct struct for the project
type ServerStruct struct {
	VagrantIP       string `toml:"vagrant_ip"`
	VagrantPublicIP string `toml:"vagrant_public_ip"`
	Container       []ServerContainerStruct
	Order           int
	Env             string
	Sys             string
}

// ServerContainerStruct struct for the container
type ServerContainerStruct struct {
	Name      string
	Type      string
	Port      int
	Sleep     int
	InitialDb string `toml:"initial_db"`
	MockDb    string `toml:"mock_db"`
}

// ---------------------------------
// Public functions

// ServerTask for init
func ServerTask(task ServerStruct, commandType string, order int, env string, sys string) {
	// Only some command type should server
	if commandType != "init" && commandType != "run" && commandType != "stop" && commandType != "destroy" {
		return
	}

	var shouldContinue bool
	if task.Order, task.Env, task.Sys, shouldContinue = InitDecision(
		task.Order, task.Env, task.Sys, order, env, sys,
	); shouldContinue {
		return
	}

	Log("server", commandType)

	var logVal string
	var err error

	switch commandType {
	case "init":
		logVal, err = ServerInit(task)
	case "run":
		logVal, err = ServerUp(task)
	case "stop":
		logVal, err = ServerStop(task)
	case "destroy":
		logVal, err = ServerDestroy(task)
	}

	LogErr("server", err)
	Log("server] [result", logVal)
}

// ServerInit sets the server up
func ServerInit(server ServerStruct) (log string, err error) {
	return "", errors.New("Sorry. This feature isn't available yet")
}

// ServerUp sets the server up
func ServerUp(server ServerStruct) (log string, err error) {
	return "", errors.New("Sorry. This feature isn't available yet")
}

// ServerStop sets the server up
func ServerStop(server ServerStruct) (log string, err error) {
	return "", errors.New("Sorry. This feature isn't available yet")
}

// ServerDestroy sets the server up
func ServerDestroy(server ServerStruct) (log string, err error) {
	return "", errors.New("Sorry. This feature isn't available yet")
}

// ---------------------------------
// Private functions
