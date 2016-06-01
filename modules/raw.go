package modules

import (
	"os"
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

		// TODO: Raw Command should log everything!
		// Not logging a thing!
	}
}

// ---------------------------------
// Private functions

// RawCommand performs a raw command
func RawCommand(file RawStruct) (log string, err error) {
	// Create an *exec.Cmd
	cmd := exec.Command(file.Command, file.Args...)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	// Execute command
	cmd.Run()

	return
}
