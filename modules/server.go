package modules

import (
	"errors"
	"unsafe"
)

// ---------------------------------
// Vars

// ServerStruct struct for the project
type ServerStruct struct {
	Php       ServerPhpStruct
	Container []ServerContainerStruct
	Order     int
	Env       string
	Sys       string
}

// ServerPhpStruct struct for the php server
type ServerPhpStruct struct {
	Public string
	Port   int
}

// ServerContainerStruct struct for the container
type ServerContainerStruct struct {
	Name    string
	Type    string
	Port    int
	Sleep   int
	Options ServerContainerOptionsStruct
}

// ServerContainerOptionsStruct struct for the container options
type ServerContainerOptionsStruct struct {
	Public  string
	Initial string
	Mock    string
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
	// Check if it is just a php
	if unsafe.Sizeof(server.Php) != 0 {
		public := server.Php.Public
		port := server.Php.Port

		if port == 0 {
			port = 8000
		}

		log, err = RawCommand(RawStruct{
			Command: "php",
			Args:    []string{"-S", "localhost:" + string(port), "-t", public},
		})

		return log, err
	}

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
