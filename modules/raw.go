package modules

import (
	"github.com/sendoushi/bedrock-utils/modules/tools"
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
		if task.Order, task.Env, task.Sys, shouldContinue = tools.InitDecision(
			task.Order, task.Env, task.Sys, order, env, sys,
		); shouldContinue {
			continue
		}

		// Raw command
		tools.Log("raw", task.Command+" "+strings.Join(task.Args, " "))

		logVal, err := RawCommand(task)
		tools.LogErr("raw", err)
		tools.Log("raw] [result", logVal)

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
