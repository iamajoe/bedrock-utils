package modules

import (
	"bytes"
	"os/exec"
	"strings"
)

// ---------------------------------
// Vars

// RawStruct struct for the project
type RawStruct struct {
	Command string
	Args    []string
	Order   int
	Env     string
	Sys     string
}

// ---------------------------------
// Public functions

// RawTask for init
func RawTask(config []RawStruct, order int, env string, sys string) {
	for _, task := range config {
		var shouldContinue bool
		if task.Order, task.Env, task.Sys, shouldContinue = InitDecision(
			task.Order, task.Env, task.Sys, order, env, sys,
		); shouldContinue {
			continue
		}

		// Raw command
		Log("raw", task.Command+" "+strings.Join(task.Args, " "))

		logVal, err := RawCommand(task)
		LogErr("raw", err)
		Log("raw] [result", logVal)
	}
}

// ---------------------------------
// Private functions

// RawCommand performs a raw command
func RawCommand(file RawStruct) (log string, err error) {
	// Create an *exec.Cmd
	cmd := exec.Command(file.Command, file.Args...)

	// Stdout buffer
	cmdOutput := &bytes.Buffer{}
	// Attach buffer to command
	cmd.Stdout = cmdOutput

	// Execute command
	err = cmd.Run() // will wait for command to return
	if err != nil {
		return "", err
	}

	// Only output the commands stdout
	output := cmdOutput.Bytes()
	if len(output) > 0 {
		return string(output), nil
	}

	return
}
